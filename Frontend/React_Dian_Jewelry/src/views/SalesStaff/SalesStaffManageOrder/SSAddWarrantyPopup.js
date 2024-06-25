import React, { useState } from "react";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import { createWarranty } from "../../../services/SalesStaffService/SSWarrantyService.js";
import '../../../styles/SalesStaff/SalesStaffManageOrder/SSAddWarrantyPopup.scss';

const SSAddWarrantyPopup = ({ orderId }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [open, setOpen] = useState(false);

  const handleStartDateChange = (e) => {
    const start = e.target.value;
    setStartDate(start);

    // Automatically generate the end date (e.g., 1 year after start date)
    const startDateObj = new Date(start);
    const endDateObj = new Date(startDateObj.setFullYear(startDateObj.getFullYear() + 1));
    setEndDate(endDateObj.toISOString().split('T')[0]);
  };

  const handleConfirm = async () => {
    const warranty = {
      orderDetailId: orderId, 
      startDate,
      endDate,
      status: true,
    };


    try {
      await createWarranty(warranty);
      console.log("Warranty added:", warranty);
      alert("Warranty added successfully.");
      setOpen(false);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("There is an existing warranty.");
      } else {
        console.error("Failed to add warranty:", error);
        alert("Failed to add warranty. Please try again.");
      }
    }
  };

  return (
    <div>
      <button
        className="salesstaff_manage_send_email_button"
        onClick={() => setOpen(true)}
      >
        Add Warranty
      </button>
      <Popup open={open} onClose={() => setOpen(false)} modal className="ss_popup_div">
        <div className="popup-content" style={{border:'none'}}>
          <h4 style={{fontWeight:'bold', textAlign:'center', marginBottom:'10px'}}>Add Warranty</h4>
          <form>
            <div style={{marginLeft:'8px', marginBottom:'13px'}}>
              <label>Order ID: </label>
              <input
                type="text"
                value={orderId}
                readOnly
                style={{marginLeft:'10px', paddingLeft:'10px', borderRadius: '5px solid black'}}
              />
            </div>
            <div style={{marginLeft:'8px', marginBottom:'13px'}}>
              <label>Start Date: </label>
              <input
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                style={{marginLeft:'10px', paddingLeft:'10px', borderRadius: '5px solid black'}}
              />
            </div>
            <div style={{marginLeft:'8px', marginBottom:'13px'}}>
              <label>End Date: </label>
              <input type="date" value={endDate} readOnly
               style={{marginLeft:'10px', paddingLeft:'10px', borderRadius: '5px solid black'}}
              />
            </div>
            <button className="salesstaff_manage_send_email_confirm_button" style={{alignItems:'flex-end'}} type="button" onClick={handleConfirm}>
              Confirm
            </button>
          </form>
        </div>
      </Popup>
    </div>
  );
};

export default SSAddWarrantyPopup;
