import React, { useEffect, useState } from "react";
import SalesStaffSidebar from "../../../components/SalesStaffSidebar/SalesStaffSidebar.js";
import "../../../styles/SalesStaff/SalesStaffManageOrder/SSOrderDetail.scss";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from "../../../assets/img/logoN.png";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import PaymentIcon from "@mui/icons-material/Payment";
import { Box } from "@mui/material";
import swal from "sweetalert";
import { toast } from "sonner";
import {
  getBillDetail,
  salesStaffUpdateOrderStatus,
  getWarrantyURL,
  sendWarrantyEmail,
  getWarrantyById,
} from "../../../services/SalesStaffService/SSOrderService.js";
import { createWarranty } from "../../../services/SalesStaffService/SSWarrantyService.js";

const SSOrderDetail = () => {
  const [orderDetails, setOrderDetails] = useState({});
  const { orderId } = useParams();
  const [status, setStatus] = useState("");
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [warrantyLoading, setWarrantyLoading] = useState(false);
  const [warrantyExists, setWarrantyExists] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event) => {
    const newStatus = event.target.value;
    if (status === "Delivering" && newStatus === "Completed") {
      toast.error("Your role cannot update the status to 'Completed'", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
    if (isInvalidStatusTransition(newStatus, status)) {
      toast.error("Cannot update to this status from the current status", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
    setStatus(newStatus);
  };

  const isInvalidStatusTransition = (newStatus, currentStatus) => {
    const nextStatusMap = {
      Unpaid: ["Paid"],
      Paid: ["Preparing"],
      Preparing: ["Delivering"],
      Delivering: ["Completed"],
      Completed: [],
      Cancelled: [],
    };

    return !nextStatusMap[currentStatus].includes(newStatus);
  };

  useEffect(() => {
    if (orderId) {
      getBillDetail(orderId)
        .then((data) => {
          setOrderDetails(data);
          setStatus(data.orderStatus);
          setIsOrderCompleted(data.orderStatus === "Completed");
        })
        .catch((error) => {
          console.error("Failed to fetch order details:", error);
        });

      getWarrantyById(orderId)
        .then((data) => {
          setWarrantyExists(data !== null);
        })
        .catch((error) => {
          console.error("Failed to fetch warranty details:", error);
        });
    }
  }, [orderId]);

  const handleSendCertificateAndWarranty = async () => {
    setWarrantyLoading(true);
    try {
      if (
        !orderDetails.productDetails ||
        orderDetails.productDetails.length === 0
      ) {
        throw new Error("No product details available");
      }

      let certificateUrls = [];

      for (const item of orderDetails.productDetails) {
        const urls = item.certificateScans;
        if (!urls || urls.length === 0) {
          throw new Error(
            `No certificate scans available for product ${item.productName}`
          );
        }
        certificateUrls = certificateUrls.concat(urls);
      }

      const emailData = {
        toEmail: orderDetails.email,
        subject: "Your Diamond's Certificate:",
        body: `Here is your certificate: ${certificateUrls.join("; ")}`,
      };

      await sendWarrantyEmail(emailData);
      toast.success("Send certificate success", {
        position: "top-right",
        autoClose: 2000,
      });
      let concatenatedWarrantyURLs = "";

      try {
        const warrantyPromises = orderDetails.productDetails?.map((product) => {
          return handleAddWarranty(product?.orderDetailId).then((response) => {
            return getWarrantyURL(response?.orderDetailId)
              .then((res) => {
                return res?.url;
              })
              .catch((error) => {
                swal(
                  "Error",
                  `Failed to get warranty URL: ${error.message}`,
                  "error"
                );
                throw error;
              });
          });
        });

        Promise.all(warrantyPromises)
          .then((urls) => {
            concatenatedWarrantyURLs = urls.join("; ");

            const wemailData = {
              toEmail: orderDetails.email,
              subject: "Your Diamond's Warranty:",
              body: `Here is your warranty: ${concatenatedWarrantyURLs}`,
            };

            sendWarrantyEmail(wemailData).then(() => {
              toast.success("Send warranty success", {
                position: "top-right",
                autoClose: 2000,
              });
            });
          })
          .catch((error) => {
            swal(
              "Error",
              `Failed to process warranties: ${error.message}`,
              "error"
            );
          });
      } catch (error) {
        toast.error("Failed to send warranty", {
          position: "top-right",
          autoClose: 2000,
        });
      }

      const updateOrderStatusDto = {
        orderId: orderId,
        status: "Preparing",
      };
      await salesStaffUpdateOrderStatus(updateOrderStatusDto);
      setStatus("Preparing");
    } catch (error) {
      toast.error("Failed to send certificate and warranty", {
        position: "top-right",
        autoClose: 2000,
      });
    } finally {
      setWarrantyLoading(false);
    }
  };

  const handleAddWarranty = async (orderDetailId) => {
    const warrantyData = {
      orderDetailId: orderDetailId,
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString()
        .split("T")[0],
      status: "true",
    };

    return createWarranty(warrantyData);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const updateOrderStatusDto = {
        orderId: orderId,
        status: isOverdue ? "Cancelled" : status,
      };
      await salesStaffUpdateOrderStatus(updateOrderStatusDto);
      toast.success("Order status updated successfully", {
        position: "top-right",
        autoClose: 2000,
      });
      navigate(
        `/sales-staff-order-list?tab=${new URLSearchParams(location.search).get(
          "tab"
        )}`
      );
    } catch (error) {
      console.error("Failed to update order status", error);
      toast.error("Failed to update order status", {
        position: "top-right",
        autoClose: 2000,
      });
    }
    setLoading(false);
  };

  const isOrderOverdue = (orderDate) => {
    const currentDate = new Date();
    const createdDate = new Date(orderDate);
    const diffTime = Math.abs(currentDate - createdDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 3;
  };

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  const isOverdue = status === "Unpaid" && isOrderOverdue(orderDetails.date);
  const isStatusDisabled =
    isOrderCompleted ||
    isOverdue ||
    status === "Paid" ||
    status === "Cancelled";
  const isButtonDisabled =
    isOrderCompleted ||
    loading ||
    status === "Cancelled" ||
    status === "Completed";

  return (
    <>
      {orderDetails && (
        <div className="ss_manage_orderdetail_all_container">
          <div className="ss_manage_orderdetail_sidebar">
            <SalesStaffSidebar currentPage="salesstaff_manage_order" />
          </div>
          <div className="ss_manage_content_content">
            <div className="ss_manage_content_header">
              <img className="ss_manage_content_logo" src={logo} alt="Logo" />
            </div>
            <hr className="ss_manage_content_line"></hr>
            <div className="SS_back_button_wrapper">
              <button
                className="SS_back_button"
                onClick={() =>
                  navigate(
                    `/sales-staff-order-list?tab=${new URLSearchParams(
                      location.search
                    ).get("tab")}`
                  )
                }
              >
                Back
              </button>
            </div>

            <div className="ss_order_detail_container">
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "1%",
                  }}
                >
                  <p
                    className="ss_order_detail_p_tag"
                    style={{ color: isOverdue ? "#e05858" : "inherit" }}
                  >
                    #{orderDetails.orderId}{" "}
                    {isOverdue && (
                      <span style={{ color: "#e05858" }}>(Overdue)</span>
                    )}
                  </p>
                  <div className="ss_button_status">
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={status}
                          label="Status"
                          onChange={handleChange}
                          disabled={isStatusDisabled}
                          size="small"
                        >
                          <MenuItem value="Unpaid">Unpaid</MenuItem>
                          <MenuItem value="Paid">Paid</MenuItem>
                          <MenuItem value="Preparing">Preparing</MenuItem>
                          <MenuItem value="Delivering">Delivering</MenuItem>
                          <MenuItem value="Completed">Completed</MenuItem>
                          <MenuItem value="Cancelled">Cancelled</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                </div>
                {orderDetails &&
                  orderDetails.productDetails?.map((item) => (
                    <div className="ss_detail_card" key={item.productCode}>
                      <div className="ss_detail_card_left">
                        <img
                          src={item.productImageLink.split(";")[0]}
                          alt={item.productName}
                        />
                      </div>
                      <div className="ss_detail_card_content">
                        <div className="ss_detail_card_header">
                          <h5 className="ss_detail_card_name">
                            {item.productName}
                          </h5>
                        </div>
                        <div className="ss_detail_card_line">
                          <p className="ss_detail_card_item">
                            Shell: {item.shellMaterial}
                          </p>
                          <p className="ss_detail_card_item">Size: {item.size}</p>
                        </div>
                        <div className="ss_detail_card_line">
                          <p className="ss_detail_card_item">
                            Main Diamond ID: {item.mainDiamondId?.join(", ") || "N/A"}
                          </p>
                          <p className="ss_detail_card_item">
                            Main Diamond Quantity: {item.mainDiamondQuantity || "N/A"}
                          </p>
                        </div>
                        <div className="ss_detail_card_line">
                          <p className="ss_detail_card_item">
                            Sub Diamond ID: {item.subDiamondId || "N/A"}
                          </p>
                          <p className="ss_detail_card_item">
                            Sub Diamond Quantity: {item.subDiamondQuantity || "N/A"}
                          </p>
                        </div>
                        <p className="ss_detail_card_size">
                          Certificate:{" "}
                          {item.certificateScans?.map((scan, index) => (
                            <React.Fragment key={index}>
                              {index > 0 && ", "}
                              <a
                                href={scan}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {scan}
                              </a>
                            </React.Fragment>
                          ))}
                        </p>
                        <p className="ss_detail_card_price">${item.lineTotal}</p>
                      </div>
                    </div>
                  ))}
                <div style={{ margin: "4.3%", padding: "10px" }}>
                  <div style={{ marginBottom: "10px" }}>
                    <AccountCircleIcon /> Name: {orderDetails.firstName}{" "}
                    {orderDetails.lastName}
                  </div>
                  <div style={{ marginBottom: "10px" }}>
                    <PhoneIcon /> Phone Number: {orderDetails.phoneNumber}
                  </div>
                  <div style={{ marginBottom: "10px" }}>
                    <HomeIcon /> Address: {orderDetails.address}
                  </div>
                  <div style={{ marginBottom: "10px" }}>
                    <PaymentIcon /> Payment Method: {orderDetails.paymentMethod}
                  </div>
                </div>
                <p
                  style={{
                    textAlign: "right",
                    marginRight: "40px",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  Total Price: ${orderDetails.totalPrice}
                </p>
                <div className="ss_detail_confirmbutton">
                  {isOverdue ? (
                    <button onClick={handleSubmit} disabled={isButtonDisabled}>
                      {loading ? "Loading..." : "Cancel order"}
                    </button>
                  ) : (
                    status !== "Paid" && (
                      <button
                        onClick={handleSubmit}
                        disabled={isButtonDisabled}
                      >
                        {loading ? "Loading..." : "Confirm"}
                      </button>
                    )
                  )}
                  {status === "Paid" && (
                    <button
                      onClick={handleSendCertificateAndWarranty}
                      disabled={warrantyLoading}
                    >
                      {warrantyLoading
                        ? "Sending..."
                        : "Send Certificate, Warranty"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SSOrderDetail;
