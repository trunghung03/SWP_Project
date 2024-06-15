import React, { useEffect, useState } from "react";
import SalesStaffSidebar from "../../../components/SalesStaffSidebar/SalesStaffSidebar.js";
import "../../../styles/SalesStaff/SalesStaffManageOrder/SSOrderDetail.scss";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from "../../../assets/img/logoN.png";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import PaymentIcon from "@mui/icons-material/Payment";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import WarrantyIcon from "@mui/icons-material/EventAvailable";
import { Box } from "@mui/material";
import { getBillDetail } from "../../../services/SalesStaffService/SSOrderService.js";
import { useParams } from "react-router-dom";

const SSOrderDetail = () => {
  const [orderDetails, setOrderDetails] = useState({});
  const { orderId } = useParams();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
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
        })
        .catch((error) => {
          console.error("Failed to fetch order details:", error);
        });
    }
  }, []);

  if (!orderDetails) {
    return <div>Loading...</div>;
  }
  console.log("orderId: " ,orderDetails?.orderId);
  console.log("orderId: " ,orderDetails?.productName);
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
                          value={orderDetails.orderStatus}
                          label="Age"
                          onChange={handleChange}
                        >
                          <MenuItem value={orderDetails.orderStatus}>
                            Paid
                          </MenuItem>
                          <MenuItem value={orderDetails.orderStatus}>
                            Preparing
                          </MenuItem>
                          <MenuItem value={orderDetails.orderStatus}>
                            Delivering
                          </MenuItem>
                          <MenuItem value={orderDetails.orderStatus}>
                            Delivered
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                </div>
                <div class="ss_detail_card">
                  <div class="ss_detail_card_left">
                    <h3 className="ss_detail_card_name">{orderDetails.note}</h3>
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
                <p style={{ textAlign: "right", marginRight: "10%" }}>
                  Total Price:
                </p>
                {/* <hr className="manager_header_line"></hr> */}
                <div class="ss_detail_confirmbutton">
                  <button>Accept Order</button>
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
