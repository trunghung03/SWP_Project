import "@fortawesome/fontawesome-free/css/all.min.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import PaymentIcon from "@mui/icons-material/Payment";
import PhoneIcon from "@mui/icons-material/Phone";
import { Box } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import logo from "../../assets/img/logoN.png";
import DeliveryStaffSidebar from "../../components/DeliveryStaffSidebar/DeliveryStaffSidebar.js";
import {
  deliStaffUpdateOrderStatus,
  getBillDetail,
} from "../../services/SalesStaffService/SSOrderService.js";
import "../../styles/DeliveryStaff/DSOrderDetail.scss";
import { toast } from "sonner";

function DSDeliveryDetail() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState({});
  const [status, setStatus] = useState("Deli");
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
      toast.success("Update order status successfully");
      navigate("/delivery-staff-delivery-list");
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  return (
    <div className="ds_manage_orderdetail_all_container">
      <div className="ds_manage_orderdetail_sidebar">
        <DeliveryStaffSidebar currentPage="deliverystaff_manage_order" />
      </div>
      <div className="ds_manage_content_content">
        <div className="ds_manage_content_header">
          <img className="ds_manage_content_logo" src={logo} alt="Logo" />
        </div>
        <hr className="ds_manage_content_line"></hr>
        <div className="ds_back_button_wrapper">
          <button
            className="ds_back_button"
            onClick={() => navigate("/delivery-staff-delivery-list")}
          >
            Back
          </button>
        </div>
        <div className="ds_order_detail_container">
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "1%",
              }}
            >
              <p className="ds_order_detail_p_tag">#{orderDetails.orderId}</p>
              <div className="ds_button_status">
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
                <div className="ds_detail_card" key={item.productCode}>
                  <div className="ds_detail_card_left">
                    <img
                      src={item.productImageLink.split(";")[0]}
                      alt={item.productName}
                    />
                  </div>
                  <div className="ds_detail_card_content">
                    <div className="ds_detail_card_header">
                      <h5 className="ds_detail_card_name">
                        {item.productName}
                      </h5>
                    </div>
                    <div className="ds_detail_card_line">
                      <p className="ds_detail_card_item">
                        Shell: {item.shellMaterial}
                      </p>
                      <p className="ds_detail_card_item">Size: {item.size}</p>
                    </div>
                    <div className="ds_detail_card_line">
                      <p className="ds_detail_card_item">
                        Main Diamond ID: {item.mainDiamondId?.join(", ") || "N/A"}
                      </p>
                      <p className="ds_detail_card_item">
                        Main Diamond Quantity: {item.mainDiamondQuantity || "N/A"}
                      </p>
                    </div>
                    <div className="ds_detail_card_line">
                      <p className="ds_detail_card_item">
                        Sub Diamond ID: {item.subDiamondId || "N/A"}
                      </p>
                      <p className="ds_detail_card_item">
                        Sub Diamond Quantity: {item.subDiamondQuantity || "N/A"}
                      </p>
                    </div>
                    <p className="ds_detail_card_size">
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
                    <p className="ds_detail_card_price">${item.lineTotal}</p>
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
            <div className="ds_detail_confirmbutton">
              <button onClick={handleSubmit} disabled={isOrderCompleted}>
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DSDeliveryDetail;
