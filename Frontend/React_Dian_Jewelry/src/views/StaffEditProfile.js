import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/Setting/EditProfile.scss";
import { UserContext } from "../services/UserContext";
import ManagerSidebar from "../components/ManagerSidebar/ManagerSidebar.js";
import logo from "../assets/img/logoN.png";
import DeliveryStaffSidebar from "../components/DeliveryStaffSidebar/DeliveryStaffSidebar.js";
import SalesStaffSidebar from "../components/SalesStaffSidebar/SalesStaffSidebar.js";
import axios from "axios";
import { getUserInfo } from "../services/UserService.js";
import {
  getEmployeeDetail,
  updateEmployeeById,
  updateEmployeePassword,
} from "../services/ManagerService/ManagerEmployeeService.js";
import { X } from "@mui/icons-material";

function StaffEditProfile() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [isPasswordFormVisible, setPasswordFormVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [storedPassword, setStoredPassword] = useState("");
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const id = localStorage.getItem("employeeId");
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeDetailResponse = await getEmployeeDetail(id);
        console.log(employeeDetailResponse);
        setRole(employeeDetailResponse.role);
        setFirstName(employeeDetailResponse.firstName || "");
        setLastName(employeeDetailResponse.lastName || "");
        setAddress(employeeDetailResponse.address || "");
        setPhoneNumber(employeeDetailResponse.phoneNumber || "");
        setEmail(employeeDetailResponse.email || "");
        setStoredPassword(employeeDetailResponse.password || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [id]);

  const togglePasswordForm = () => {
    setPasswordFormVisible(!isPasswordFormVisible);
  };

  useEffect(() => {
    console.log("Role: ", role);
    console.log("Email: ", email);
  }, [role, email]);

  const togglePasswordVisibility = (id, eyeId) => {
    const passwordField = document.getElementById(id);
    const eyeIcon = document.getElementById(eyeId);
    const type =
      passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);
    eyeIcon.classList.toggle("fa-eye");
    eyeIcon.classList.toggle("fa-eye-slash");
  };

  const isValidPhoneNumber = (phone) => {
    const phonePattern =
      /^(\+?\d{1,4}[\s-]?)?(\(?\d{3}\)?[\s-]?)?\d{3}[\s-]?\d{4}$/;
    return phonePattern.test(phone);
  };

  const handleSaveChanges = async () => {
    if (!firstName || !lastName) {
      toast.error(
        "Field cannot be empty! Please fill out all required fields.",
        {
          position: "top-right",
          autoClose: 8000,
        }
      );
      return;
    }

    if (phoneNumber && !isValidPhoneNumber(phoneNumber)) {
      toast.error("Phone number is invalid! Please try again.", {
        position: "top-right",
        autoClose: 8000,
      });
      return;
    }

    if (isPasswordFormVisible && !isGoogleUser) {
      if (!currentPassword || !newPassword || !confirmPassword) {
        toast.error(
          "Please fill in all fields. All password fields are required.",
          {
            position: "top-right",
            autoClose: 8000,
          }
        );
        return;
      }
      if (currentPassword !== storedPassword) {
        toast.error("Current password is incorrect! Please try again.", {
          position: "top-right",
          autoClose: 8000,
        });
        return;
      }
      if (newPassword !== confirmPassword) {
        toast.error("New passwords do not match! Please try again.", {
          position: "top-right",
          autoClose: 8000,
        });
        return;
      }
      if (newPassword === storedPassword) {
        toast.error(
          "New password cannot be the same as the current password! Please try again.",
          {
            position: "top-right",
            autoClose: 8000,
          }
        );
        return;
      }
    }

    const updatedData = {
      email,
      password: isPasswordFormVisible ? newPassword : storedPassword,
      lastName,
      firstName,
      address,
      phoneNumber,
      role,
      status: true,
    };

    try {
      console.log("Hello WOrld");
      await updateEmployeeById(id, updatedData);
      toast.success("Profile has been updated successfully.", {
        position: "top-right",
        autoClose: 8000,
      });
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);
      setUser({
        firstName,
        lastName,
        email,
      });
    } catch (error) {
      toast.error("Failed to update profile! Please try again.", {
        position: "top-right",
        autoClose: 8000,
      });
    }
  };

  const handleChangePassword = async () => {
    try {
      const updatePasswordData = {
        email: email,
        oldPassword: currentPassword,
        newPassword: newPassword,
      };
      const response = await updateEmployeePassword(updatePasswordData);
      console.log(response);
      if (response && response.email) {
        toast.success("Password updated successfully!", {
          position: "top-right",
          autoClose: 8000,
        });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setPasswordFormVisible(false);
      } else if (response) {
        throw new Error(response);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred", {
        position: "top-right",
        autoClose: 8000,
      });
    }
  };

  return (
    <div className="manager_manage_diamond_all_container">
      <div className="manager_manage_diamond_sidebar">
        {role === "Manager" && (
          <ManagerSidebar currentPage="manager_edit_profile" />
        )}
        {role === "SalesStaff" && (
          <SalesStaffSidebar currentPage="salesstaff_edit_profile" />
        )}
        {role !== "Manager" && role !== "SalesStaff" && (
          <DeliveryStaffSidebar currentPage="delistaff_edit_profile" />
        )}
      </div>

      <div className="ss_manage_content_content">
        <div className="ss_manage_content_header">
          <img className="ss_manage_content_logo" src={logo} alt="Logo" />
        </div>

        <hr className="ss_manage_content_line"></hr>
        <div className="edit_profile_form">
          <h2>Profile Setting</h2>
          <form>
            <div className="edit_form_group">
              <label>First name *</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={isGoogleUser}
                className={isGoogleUser ? "disabled_input" : ""}
              />
            </div>
            <div className="edit_form_group">
              <label>Last name *</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={isGoogleUser}
                className={isGoogleUser ? "disabled_input" : ""}
              />
            </div>
            <div className="edit_form_group">
              <label>Email *</label>
              <input
                className="edit_email"
                type="email"
                value={email}
                readOnly
              />
            </div>
            <div className="edit_form_group">
              <label>Phone number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="edit_form_group full_width">
              <label>Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="edit_form_save_button"
              onClick={handleSaveChanges}
            >
              Save change
            </button>
          </form>
          <>
            <hr className="edit_profile_line"></hr>
            <h2 onClick={togglePasswordForm} className="toggle_password_form">
              Change Password
              <i
                className={`fas ${
                  isPasswordFormVisible ? "fa-chevron-up" : "fa-chevron-down"
                } toggle_icon`}
              ></i>
            </h2>
            {isPasswordFormVisible && (
              <form>
                <div className="edit_form_group full_width position-relative">
                  <label>Current password</label>
                  <input
                    type="password"
                    id="current_password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <span className="edit_password_eye">
                    <i
                      className="far fa-eye"
                      id="edit_current_password_eye"
                      onClick={() =>
                        togglePasswordVisibility(
                          "current_password",
                          "edit_current_password_eye"
                        )
                      }
                      style={{ cursor: "pointer" }}
                    ></i>
                  </span>
                </div>
                <div className="edit_form_group full_width position-relative">
                  <label>New password</label>
                  <input
                    type="password"
                    id="new_password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <span className="edit_password_eye">
                    <i
                      className="far fa-eye"
                      id="edit_new_password_eye"
                      onClick={() =>
                        togglePasswordVisibility(
                          "new_password",
                          "edit_new_password_eye"
                        )
                      }
                      style={{ cursor: "pointer" }}
                    ></i>
                  </span>
                </div>
                <div className="edit_form_group full_width position-relative">
                  <label>Confirm new password</label>
                  <input
                    type="password"
                    id="confirm_password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span className="edit_password_eye">
                    <i
                      className="far fa-eye"
                      id="edit_confirm_password_eye"
                      onClick={() =>
                        togglePasswordVisibility(
                          "confirm_password",
                          "edit_confirm_password_eye"
                        )
                      }
                      style={{ cursor: "pointer" }}
                    ></i>
                  </span>
                </div>
                <button
                  type="button"
                  className="edit_form_save_button"
                  onClick={handleChangePassword}
                >
                  Save new password
                </button>
              </form>
            )}
          </>
        </div>
      </div>
    </div>
  );
}

export default StaffEditProfile;
