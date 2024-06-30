import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/img/logoN.png";
import swal from 'sweetalert';
import DeliveryStaffSidebar from "../../components/DeliveryStaffSidebar/DeliveryStaffSidebar.js";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import PaymentIcon from "@mui/icons-material/Payment";
import FormControl from "@mui/material/FormControl";
import { Box } from "@mui/material";
import "@fortawesome/fontawesome-free/css/all.min.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "../../styles/DeliveryStaff/DSOrderDetail.scss";
import { getBillDetail, deliStaffUpdateOrderStatus } from "../../services/SalesStaffService/SSOrderService.js";

function DSDeliveryDetail() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState({});
  const [status, setStatus] = useState('Deli');
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  useEffect(() => {
    if (orderId) {
      getBillDetail(orderId)
        .then((data) => {
          setOrderDetails(data);
          setStatus(data.orderStatus); // Set status from fetched order details
          setIsOrderCompleted(data.orderStatus === "Completed"); // Set isOrderCompleted based on fetched status
        })
        .catch((error) => {
          console.error("Failed to fetch order details:", error);
        });
    }
  }, [orderId]);

  const handleSubmit = async () => {
    try {
      await deliStaffUpdateOrderStatus(status, orderId);
      swal("Success", "Update order status successfully", "success");
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  return (
    <div className="manager_manage_diamond_all_container">
      <div className="manager_manage_diamond_sidebar">
        <DeliveryStaffSidebar currentPage="deliverystaff_manage_order" />
      </div>
      <div className="manager_manage_diamond_content">
        <div className="manager_manage_diamond_header">
          <img className="manager_manage_diamond_logo" src={logo} alt="Logo" />
        </div>
        <hr className="manager_header_line" />
        <button
          className="DS_back_button"
          onClick={() => navigate("/delivery-staff-delivery-list")}
        >
          Back
        </button>
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
              <p className="ss_order_detail_p_tag">#{orderDetails.orderId}</p>
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
                      disabled={isOrderCompleted} // Disable select if order is completed
                    >
                      <MenuItem value="Delivering">Delivering</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>
            {orderDetails &&
              orderDetails.productDetails?.map((item) => (
                <div className="ss_detail_card" key={item.id}>
                  <div className="ss_detail_card_left">
                    <h3 className="ss_detail_card_name">{item.productName}</h3>
                    <img src={item.productImageLink} alt={item.productName} />
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
            </div>
            <p style={{ textAlign: "right", marginRight: "10%" }}>
              Total Price: ${orderDetails.totalPrice}
            </p>
            <div className="ss_detail_confirmbutton">
              <button onClick={handleSubmit} disabled={isOrderCompleted}>Done</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DSDeliveryDetail;
