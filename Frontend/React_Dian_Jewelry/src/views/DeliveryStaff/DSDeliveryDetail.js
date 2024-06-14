import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo from "../../assets/img/logoN.png";
import DeliveryStaffSidebar from "../../components/DeliveryStaffSidebar/DeliveryStaffSidebar.js";
import {getOrderById} from "../../services/TrackingOrderService.js";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import PaymentIcon from "@mui/icons-material/Payment";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import WarrantyIcon from "@mui/icons-material/EventAvailable";
import FormControl from "@mui/material/FormControl";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import "@fortawesome/fontawesome-free/css/all.min.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "../../styles/DeliveryStaff/DSOrderDetail.scss";
function DSDeliveryDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderStatus, setStatus] = useState(
    (location.state && location.state.orderStatus) || "defaultStatus"
  );
  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  useEffect(() => {
    // Add your code here
  }, []);
  return (
    <div className="manager_manage_diamond_all_container">
      <div className="manager_manage_diamond_sidebar">
        <DeliveryStaffSidebar currentPage="deliverystaff_manage_order" />
      </div>
      <div className="manager_manage_diamond_content">
        <div className="manager_manage_diamond_header">
          <img className="manager_manage_diamond_logo" src={logo} alt="Logo" />
        </div>
        <hr className="manager_header_line"></hr>
        <button className="DS_back_button" onClick={() => navigate('/delivery-staff-delivery-list')}>Back</button>
        <div className="ss_order_detail_container">
          {/* Content outside the Box but inside the Container */}
          {/* <Typography variant="h6">Order Detail</Typography> */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "1%",
              }}
            >
              <p className="ss_order_detail_p_tag">#23423423423</p>
              <div className="ss_button_status">
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={orderStatus}
                      label="Age"
                      onChange={handleChange}
                    >
                      <MenuItem value={orderStatus}>Delivering</MenuItem>
                      <MenuItem value={orderStatus}>Delivered</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>
            <div class="ss_detail_card">
              <div class="ss_detail_card_left">
                <h3 className="ss_detail_card_name">Engagement Ring</h3>
                <img
                  src="https://image.brilliantearth.com/cdn-cgi/image/width=886,height=1026,quality=100,format=auto/https://cdn.builder.io/api/v1/image/assets%2F9f2a69003c86470ea05deb9ecb9887be%2Fa6b8799f188d4d38a8ed85460df45a29"
                  alt="Engagement Ring"
                />
              </div>
              <div class="ss_detail_card_content">
                <p>
                  💍 Brushed and Polished Comfort Fit Wedding Ring in White
                  Tungsten Carbide (6mm)
                </p>
                <p>SKU 600936TW</p>
                <p class="ss_detail_card_size">Size 9</p>
                <p class="ss_detail_card_price">219$</p>
              </div>
            </div>
            <div class="ss_detail_card">
              <div class="ss_detail_card_left">
                <h3 className="ss_detail_card_name">Engagement Ring</h3>
                <img
                  src="https://image.brilliantearth.com/cdn-cgi/image/width=886,height=1026,quality=100,format=auto/https://cdn.builder.io/api/v1/image/assets%2F9f2a69003c86470ea05deb9ecb9887be%2Fa6b8799f188d4d38a8ed85460df45a29"
                  alt="Engagement Ring"
                />
              </div>
              <div class="ss_detail_card_content">
                <p>
                  💍 Brushed and Polished Comfort Fit Wedding Ring in White
                  Tungsten Carbide (6mm)
                </p>
                <p>SKU 600936TW</p>
                <p class="ss_detail_card_size">Size 9</p>
                <p class="ss_detail_card_price">Price: 219$</p>
              </div>
            </div>
            {/* <hr className="manager_header_line"></hr> */}
            <div style={{ margin: "4.3%", padding: "10px" }}>
              <div style={{ marginBottom: "10px" }}>
                <AccountCircleIcon /> Name
              </div>
              <div style={{ marginBottom: "10px" }}>
                <PhoneIcon /> Phone Number
              </div>
              <div style={{ marginBottom: "10px" }}>
                <HomeIcon /> Address
              </div>
              <div style={{ marginBottom: "10px" }}>
                <PaymentIcon /> Payment Method
              </div>
              <div style={{ marginBottom: "10px" }}>
                <VerifiedUserIcon /> Certificate
              </div>
              <div style={{ marginBottom: "10px" }}>
                <WarrantyIcon /> Warranty
              </div>
            </div>
            {/* <hr className="manager_header_line"></hr> */}
            <p style={{ textAlign: "right", marginRight: "10%" }}>Total Price:</p>
            {/* <hr className="manager_header_line"></hr> */}
            <div class="ss_detail_confirmbutton">
                <button>Confirm</button>
            </div>
          </div>
          </div>
      </div>
    </div>
  );
}

export default DSDeliveryDetail;
