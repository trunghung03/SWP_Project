import React, { useState } from "react";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import { createWarranty } from "../../../services/SalesStaffService/SSWarrantyService";

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
      orderId,
      startDate,
      endDate,
      status: true,
    };

    try {
      await createWarranty(warranty);
      console.log("Warranty added:", warranty);
      setOpen(false);
    } catch (error) {
      console.error("Failed to add warranty:", error);
      alert("Failed to add warranty. Please try again.");
    }
  };

  return (
    <div>
      <button
        className="manager_manage_diamond_create_button"
        onClick={() => setOpen(true)}
      >
        Add new Warranty
      </button>
      <Popup open={open} onClose={() => setOpen(false)} modal>
        <div className="popup-content">
          <h2>Add New Warranty</h2>
          <form>
            <div>
              <label>Order ID:</label>
              <input
                type="text"
                value={orderId}
                readOnly
              />
            </div>
            <div>
              <label>Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
              />
            </div>
            <div>
              <label>End Date:</label>
              <input type="date" value={endDate} readOnly />
            </div>
            <button type="button" onClick={handleConfirm}>
              Confirm
            </button>
          </form>
        </div>
      </Popup>
    </div>
  );
};

export default SSAddWarrantyPopup;
