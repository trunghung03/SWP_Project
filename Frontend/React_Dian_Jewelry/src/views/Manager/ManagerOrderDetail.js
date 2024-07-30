import React, { useEffect, useState } from "react";
import ManagerSidebar from "../../components/ManagerSidebar/ManagerSidebar.js";
import "../../styles/DeliveryStaff/DSOrderDetail.scss";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from "../../assets/img/logoN.png";
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
import { getBillDetail } from "../../services/SalesStaffService/SSOrderService.js";
import swal from "sweetalert";
import { toast } from "sonner";

const ManagerOrderDetail = () => {
  const [orderDetails, setOrderDetails] = useState({});
  const { orderId } = useParams();
  const [status, setStatus] = useState("");
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [warrantyLoading, setWarrantyLoading] = useState(false);
  const [warrantyExists, setWarrantyExists] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
    }
  }, [orderId]);

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
            <ManagerSidebar currentPage="manager_view_order_list" />
          </div>
          <div className="ss_manage_content_content">
            <div className="ss_manage_content_header">
              <img className="ss_manage_content_logo" src={logo} alt="Logo" />
            </div>
            <hr className="ss_manage_content_line"></hr>
            <div className="SS_back_button_wrapper">
              <button
                className="SS_back_button"
                onClick={() => navigate(`/manager-order-list`)}
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
                          disabled={true}
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
                          src={item.productImageLink.split(";")[0]}
                          alt={item.productName}
                        />
                      </div>
                      <div className="ss_detail_card_content">
                        <p>{item.productDescription}</p>
                        <p>{item.productCode}</p>
                        <p className="ss_detail_card_size">Size: {item.size}</p>
                        <p className="ss_detail_card_price">
                          ${item.lineTotal}
                        </p>
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
                  </div>
                  <div
                    className="ss_warranty_order_manage"
                    style={{ marginBottom: "10px" }}
                  >
                    <WarrantyIcon /> Warranty:
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
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManagerOrderDetail;
