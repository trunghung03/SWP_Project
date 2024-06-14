import React, { useEffect, useState } from "react";
import SalesStaffSidebar from "../../../components/SalesStaffSidebar/SalesStaffSidebar.js";
import "../../../styles/SalesStaff/SalesStaffManageOrder/SSOrderDetail.scss";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { getOrderDetailsByOrderId } from "../../../services/TrackingOrderService.js";
import { getProductDetail } from "../../../services/ProductService.js";
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
import { getShellDetail } from "../../../services/ManagerService/ManagerShellService.js";
//order detail, warranty, product (main diamond => certi),

const SSOrderDetail = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [order, setOrders] = useState([]);
  const [productName, setProductName] = useState("");
  const [productSize, setProductSize] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [lineTotal, setLineTotal] = useState("");
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("orderId");
  const [orderStatus, setStatus] = useState(
    (location.state && location.state.orderStatus) || "defaultStatus"
  );
  const [warranty, setWarranty] = useState("");
  const [certificate, setCertificate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [shellName, setShellName] = useState("");
  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (orderId) {
          // Fetch the order details
          const data = await getOrderDetailsByOrderId(orderId);
          const filteredDetails = data.filter(
            (detail) => detail.orderId === orderId
          );
          setOrderDetails(filteredDetails);
          if (filteredDetails.length > 0) {
            if (filteredDetails[0].productId) {
              const productDetail = await getProductDetail(
                filteredDetails[0].productId
              );
              // Set the product detail in state, or handle it as needed
              console.log(productDetail); // For demonstration, replace this with your state update or other logic
            }
            // Assuming detail is derived from filteredDetails, e.g., detail = filteredDetails[0]
            const detail = filteredDetails[0]; // Adjust this line based on how you actually get 'detail'
            if (detail && detail.shellMaterialId) {
              const shellName = await getShellDetail(detail.shellMaterialId);
              setShellName(shellName); // Assuming you have a state setter for shellName
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [orderId]);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <div className="ss_manage_orderdetail_all_container">
      <div className="ss_manage_orderdetail_sidebar">
        <SalesStaffSidebar currentPage="salesstaff_manage_orderdetail" />
      </div>
      <div className="ss_manage_content_content">
        <div className="ss_manage_content_header">
          <img className="ss_manage_content_logo" src={logo} alt="Logo" />
        </div>
        <hr className="ss_manage_content_line"></hr>
        <button className="SS_back_button" onClick={() => navigate('/sales-staff-order-list')}>Back</button>
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
                      <MenuItem value={orderStatus}>Paid</MenuItem>
                      <MenuItem value={orderStatus}>Preparing</MenuItem>
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
                <button>Accept Order</button>
            </div>
          </div>
          </div>
      </div>
    </div>
  );
};

export default SSOrderDetail;
