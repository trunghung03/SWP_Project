import React, { useEffect, useState } from "react";
import SalesStaffSidebar from "../../../components/SalesStaffSidebar/SalesStaffSidebar.js";
import "../../../styles/SalesStaff/SalesStaffManageOrder/SSOrderDetail.scss";
import { useNavigate } from "react-router-dom";
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
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import WarrantyIcon from "@mui/icons-material/EventAvailable";
import { Box } from "@mui/material";
import { getBillDetail } from "../../../services/SalesStaffService/SSOrderService.js";
import { useParams } from "react-router-dom";
import { salesStaffUpdateOrderStatus, getWarrantyURL, sendWarrantyEmail, getWarrantyById } from "../../../services/SalesStaffService/SSOrderService.js";
import { createWarranty } from "../../../services/SalesStaffService/SSWarrantyService.js";
import swal from "sweetalert";

const SSOrderDetail = () => {
  const [orderDetails, setOrderDetails] = useState({});
  const { orderId } = useParams();
  const [status, setStatus] = useState("");
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [warrantyExists, setWarrantyExists] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const newStatus = event.target.value;
    if (isPreviousStatus(newStatus, status)) {
      swal("Error", "Cannot update to a previous status", "error");
      return;
    }
    setStatus(newStatus);
  };

  const isPreviousStatus = (newStatus, currentStatus) => {
    const statusOrder = ["Unpaid", "Paid", "Preparing", "Delivering", "Completed", "Cancelled"];
    return statusOrder.indexOf(newStatus) < statusOrder.indexOf(currentStatus);
  };

  useEffect(() => {
    console.log("orderId:", orderId); // Log the orderId
    if (orderId) {
      getBillDetail(orderId)
        .then((data) => {
          console.log("orderDetails:", data); // Log the orderDetails after fetching
          setOrderDetails(data);
          setStatus(data.orderStatus); // Set status from fetched order details
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

  const handleSendCertificate = async () => {
    try {
      if (!orderDetails.productDetails || orderDetails.productDetails.length === 0) {
        throw new Error("No product details available");
      }

      let certificateUrls = [];

      for (const item of orderDetails.productDetails) {
        const urls = item.certificateScans;
        if (!urls || urls.length === 0) {
          throw new Error(`No certificate scans available for product ${item.productName}`);
        }
        console.log('Certificate URLs:', urls);
        certificateUrls = certificateUrls.concat(urls);
      }

      const emailData = {
        toEmail: orderDetails.email,
        subject: "Your Diamond's Certificate:",
        body: `Here are your certificate links: ${certificateUrls.join('; ')}`
      };
      console.log('emaildata: ', emailData);
      await sendWarrantyEmail(emailData);
      swal("Success", "Certificate emails sent successfully", "success");
    } catch (error) {
      console.error("Failed to send Certificate emails:", error);
      swal("Error", `Failed to send Certificate emails: ${error.message}`, "error");
    }
  };

  const handleSendEmail = async () => {
    try {
      const response = await getWarrantyURL(orderId);
      const url = response.url;
      console.log('Warranty URL:', url);
      const emailData = {
        toEmail: orderDetails.email,
        subject: "Your Warranty",
        body: `Here is your warranty link: ${url}`,
      };
      console.log('emaildata: ', emailData);
      await sendWarrantyEmail(emailData);
      swal("Success", "Warranty email sent successfully", "success");
    } catch (error) {
      console.error("Failed to send warranty email:", error);
      swal("Error", `Failed to send warranty email: ${error.message}`, "error");
    }
  };

  const handleAddWarranty = async () => {
    const warrantyData = {
      orderDetailId: orderDetails.orderId,
      startDate: new Date().toISOString().split("T")[0], // current date
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0], // one year from now
      status: "true"
    };

    try {
      await createWarranty(warrantyData);
      setWarrantyExists(true);
      swal("Success", "Warranty added successfully", "success");
    } catch (error) {
      console.error("Failed to add warranty:", error);
      swal("Error", `Failed to add warranty: ${error.message}`, "error");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (orderDetails.paymentMethod === "VNPAY") {
        await handleSendCertificate();
        await handleSendEmail();
      } else {
        const updateOrderStatusDto = {
          orderId: orderId,
          status: isOverdue ? "Cancelled" : status
        };
        
        await salesStaffUpdateOrderStatus(updateOrderStatusDto);

        // Check if the updated status is "Paid"
        if (status === "Paid") {
          await handleSendCertificate();
          await handleSendEmail();
        }

        swal("Success", "Order status updated successfully", "success");
        navigate('/sales-staff-order-list');
        console.log("status: ", updateOrderStatusDto.status);
        console.log("Order status updated successfully");
      }
    } catch (error) {
      console.error("Failed to update order status", error);
      swal("Error", `Failed to update order status: ${error.message}`, "error");
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
                onClick={() => navigate("/sales-staff-order-list")}
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
                  <p className="ss_order_detail_p_tag" style={{ color: isOverdue ? "#e05858" : "inherit" }}>
                    #{orderDetails.orderId} {isOverdue && <span style={{ color: "#e05858" }}>(Overdue)</span>}
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
                          disabled={isOrderCompleted || isOverdue}
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
                        <h3 className="ss_detail_card_name">
                          {item.productName}
                        </h3>
                        <img
                          src={item.productImageLink.split(';')[0]}
                          alt={item.productName}
                        />
                      </div>
                      <div className="ss_detail_card_content">
                        <p>{item.productDescription}</p>
                        <p>{item.productCode}</p>
                        <p className="ss_detail_card_size">Size: {item.size}</p>
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
                  <div style={{ marginBottom: "10px" }}>
                    <VerifiedUserIcon /> Certificate:
                    {/* Removed individual send certificate button */}
                  </div>
                  <div className="ss_warranty_order_manage" style={{ marginBottom: "10px" }}>
                    <WarrantyIcon /> Warranty:
                    {/* Removed individual send warranty button */}
                  </div>
                </div>
                <p style={{ textAlign: "right", marginRight: "40px", fontSize: "18px", fontWeight: "bold" }}>
                  Total Price: ${orderDetails.totalPrice}
                </p>
                <div className="ss_detail_confirmbutton">
                  <button onClick={handleSubmit} disabled={isOrderCompleted || loading}>
                    {loading ? "Loading..." : (orderDetails.paymentMethod === "VNPAY" ? "Send Certificate, Warranty" : (isOverdue ? "Cancel Order" : "Confirm"))}
                  </button>
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
