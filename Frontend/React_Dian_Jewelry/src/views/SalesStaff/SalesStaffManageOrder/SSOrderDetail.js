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
import { sendEmail } from "../../../services/SalesStaffService/SSOrderService.js";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

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
  const [emailData, setEmailData] = useState({
    ToEmail: "mimitrucduyen@gmail.com",
    Subject: "warranty",
    Body: "warranty from dian",
    Attachments: [],
  });

  const convertOrderDetailsToHTML = () => {
    return `
      <html>
        <body>
          <h1>Order Details</h1>
          ${
            orderDetails && orderDetails.productDetails
              ? orderDetails.productDetails
                  .map(
                    (item) => `
                      <div>
                        <p>Product Name: ${item.productName}</p>
                        <p>Warranty Start Date: ${item.warrantyStartDate}</p>
                        <p>Warranty End Date: ${item.warrantyEndDate}</p>
                      </div>
                    `
                  )
                  .join("")
              : ""
          }
        </body>
      </html>
    `;
  };

  const HandleGeneratePdf = async () => {
    const element = convertOrderDetailsToHTML();
    if (element) {
      const pdf = new jsPDF();
      pdf.html(element, {
        callback: function (pdf) {
          const pdfBlob = pdf.output("blob");
          const reader = new FileReader();
          reader.readAsDataURL(pdfBlob);
          reader.onloadend = () => {
            const base64PDF = reader.result.split(",")[1];
            setEmailData((prevState) => ({
              ...prevState,
              Attachments: [base64PDF],
            }));
          };
        },
      });
    }
  };

  const htmlContent = convertOrderDetailsToHTML();
  const convertHTMLToPDF = (htmlContent) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const pdfBlob = new Blob([htmlContent], { type: "application/pdf" });
        resolve(pdfBlob);
      }, 1000);
    });
  };

  convertHTMLToPDF(htmlContent).then((pdfBlob) => {
    console.log("PDF Blob:", pdfBlob);
  });
  const generateHTMLContent = () => {
    return `
      <html>
        <body>
          ${
            orderDetails && orderDetails.productDetails
              ? orderDetails.productDetails
                  .map(
                    (item) => `
            <div>
              <p>Product Name: ${item.productName}</p>
              <p>Warranty Start Date: ${item.warrantyStartDate}</p>
              <p>Warranty End Date: ${item.warrantyEndDate}</p>
            </div>
            `
                  )
                  .join("")
              : ""
          }
        </body>
      </html>
    `;
  };
  // Correct the issue with setting Attachments in setEmailData
  convertHTMLToPDF(generateHTMLContent()).then((pdfBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(pdfBlob);
    reader.onloadend = async () => {
      const base64PDF = reader.result.split(",")[1];
      setEmailData((prevState) => ({
        ...prevState,
        Attachments: [...prevState.Attachments, base64PDF],
      }));
    };
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      HandleGeneratePdf();
      const formData = new FormData();
      formData.append("ToEmail", emailData.ToEmail);
      formData.append("Subject", emailData.Subject);
      formData.append("Body", emailData.Body);
      emailData.Attachments.forEach((attachment, index) => {
        formData.append(`Attachment${index}`, attachment);
      });
      await sendEmail(formData); // Adjust sendEmail to accept FormData
      alert("Email sent successfully!");
    } catch (error) {
      console.error("Error in sending email:", error);
      alert("Failed to send email.");
    }
  };
  if (!orderDetails) {
    return <div>Loading...</div>;
  }
  console.log("orderId: ", orderDetails?.orderId);
  console.log("orderId: ", orderDetails?.productName);

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
                          <MenuItem value="Paid">Paid</MenuItem>
                          <MenuItem value="Preparing">Preparing</MenuItem>
                          <MenuItem value="Delivering">Delivering</MenuItem>
                          <MenuItem value="Delivered">Delivered</MenuItem>
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
                  </div>
                  <div style={{ marginBottom: "10px" }}>
                    <WarrantyIcon /> Warranty
                  </div>
                </div>
                {orderDetails && (
                  <div className="ss_manage_orderdetail_all_container">
                    {/* Existing markup */}
                    <div className="ss_detail_confirmbutton">
                      <button type="button" onClick={handleSubmit}>
                        Send Email
                      </button>
                      {/* This is the new button */}
                    </div>
                  </div>
                )}
                {/* <hr className="manager_header_line"></hr> */}
                <p style={{ textAlign: "right", marginRight: "10%" }}>
                  Total Price: ${orderDetails.totalPrice}
                </p>
                {/* <hr className="manager_header_line"></hr> */}
                <div class="ss_detail_confirmbutton">
                  <button type="button" onClick={handleSubmit}>
                    Send Email
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
