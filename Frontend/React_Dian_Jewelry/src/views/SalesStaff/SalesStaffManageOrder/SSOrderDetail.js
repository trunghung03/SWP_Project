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
import { salesStaffUpdateOrderStatus,
   getWarrantyURL, sendWarrantyEmail, getCertificateURL
 } from "../../../services/SalesStaffService/SSOrderService.js";
import swal from "sweetalert";
import SSAddWarrantyPopup from "./SSAddWarrantyPopup.js";


const SSOrderDetail = () => {
  const [orderDetails, setOrderDetails] = useState({});
  const { orderId } = useParams();
  const [status, setStatus] = useState("");
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const navigate = useNavigate();
  const handleChange = (event) => {
    setStatus(event.target.value);
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
    }
  }, [orderId]);
  const handleSendCertificate = async () => {
    try {
      const response = await getCertificateURL(orderId);
      const url = response.url;
      console.log('Certificate URL:', url);
      const emailData = {
        toEmail: orderDetails.email, 
        subject: "Your Diamond's Certificate:",
        body: `Here is a link: ${url}`, 
      };
      console.log('emaildata: ' , emailData);
      await sendWarrantyEmail(emailData);
      swal("Success", "Certificate email sent successfully", "success");
    } catch (error) {
      console.error("Failed to send Certificate email:", error);
      swal("Error", "Failed to send Certificate email", "error");
    }
  }
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
      console.log('emaildata: ' , emailData);
      await sendWarrantyEmail(emailData);
      swal("Success", "Warranty email sent successfully", "success");
    } catch (error) {
      console.error("Failed to send warranty email:", error);
      swal("Error", "Failed to send warranty email", "error");
    }
  };
  const handleSubmit = async () => {
    try {
      await salesStaffUpdateOrderStatus(status, orderId);
      swal("Success", "Update order status successfully", "success");
      navigate('/sales-staff-order-list');
      console.log("status: ", status);
      console.log("Order status updated successfully");
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };
  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {orderDetails && (
        <div className="ss_manage_orderdetail_all_container">
          <div className="ss_manage_orderdetail_sidebar">
            <SalesStaffSidebar currentPage="salesstaff_manage_orderdetail" />
          </div>
          <div className="ss_manage_content_content">
            <div className="ss_manage_content_header">
              <img className="ss_manage_content_logo" src={logo} alt="Logo" />
            </div>
            <hr className="ss_manage_content_line"></hr>
            <button
              className="SS_back_button"
              onClick={() => navigate("/sales-staff-order-list")}
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
                  <p className="ss_order_detail_p_tag">
                    #{orderDetails.orderId}
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
                          disabled={isOrderCompleted}
                        >
                          <MenuItem value ="Unpaid">UnPaid</MenuItem>
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
                    <div class="ss_detail_card" key={item.id}>
                      <div className="ss_detail_card_left">
                        <h3 className="ss_detail_card_name">
                          {item.productName}
                        </h3>
                        <img
                          src={item.productImageLink}
                          alt={item.productName}
                        />
                      </div>
                      <div class="ss_detail_card_content">
                        <p>{item.productDescription}</p>
                        <p>{item.productCode}</p>
                        <p class="ss_detail_card_size">Size: {item.size}</p>
                        <p class="ss_detail_card_price">${item.lineTotal}</p>
                      </div>
                    </div>
                  ))}
                {/* <hr className="manager_header_line"></hr> */}
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
                    <button className="salesstaff_manage_send_email_button" onClick={handleSendCertificate}>Send Certificate</button>
                  </div>
                  <div className="ss_warranty_order_manage" style={{ marginBottom: "10px" }}>
                    <WarrantyIcon /> Warranty:
                    <SSAddWarrantyPopup orderId={orderDetails.orderId} />
                    <button className="salesstaff_manage_send_email_button" onClick={handleSendEmail}>Send via Email</button>
                  </div>
                </div>
                <p style={{ textAlign: "right", marginRight: "10%" }}>
                  Total Price: ${orderDetails.totalPrice}
                </p>
                {/* <hr className="manager_header_line"></hr> */}
                <div className="ss_detail_confirmbutton">
                  <button onClick={handleSubmit} disabled={isOrderCompleted}>Confirm</button>
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
