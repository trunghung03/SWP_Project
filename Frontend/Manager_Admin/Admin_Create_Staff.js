function Admin_Create_Staff() {
    return (
        <div className="main" style={{ backgroundColor: "white" }}>
            <div className="text-center">
                <header className="d-flex justify-content-start">
                    <img src="images/Logo.jpg" id="logo" alt="Shop Logo" />
                </header>
                <br />
                <hr className="container-fluid" />
                <h1 id="formHeader" className="d-flex display-4 justify-content-center mt-5">Create Staff Account</h1>
                <div className="d-flex justify-content-center mt-5">
                    <div className="border border-2 rounded rounded-2 mb-5 col-sm-9">
                        <form className="p-5">
                            <div className="d-flex justify-content-start">
                                <div className="form-group m-3 col-5">
                                    <label className="fw-bold d-flex justify-content-start">First name</label>
                                    <input type="text" className="form-control" name="firstName"
                                        placeholder="Enter first name" />
                                </div>
                                <div className="form-group m-3 col-6">
                                    <label className="fw-bold d-flex justify-content-start ">Last Name</label>
                                    <input type="text" className="form-control" name="lastName"
                                        placeholder="Enter last name" />
                                </div>
                            </div>
                            <div className="d-flex justify-content-start ">
                                <div className="form-group mt-5 me-5 col-5">
                                    <label className="fw-bold">Role</label>
                                    <select name="role" className="optionSelect col-8">
                                        <option value="none">None</option>
                                        <option value="manager">Manager</option>
                                        <option value="saleStaff">Sale Staff</option>
                                        <option value="deliveryStaff">Delivery Staff</option>
                                    </select>
                                </div>
                                <div className="form-group mt-3 col-6">
                                    <label className="fw-bold d-flex justify-content-start">Phone number (optional)</label>
                                    <input type="text" className="form-control" name="phoneNumber"
                                        placeholder="Enter phone number" />
                                </div>
                            </div>
                            <div className="form-group m-4 ">
                                <label className="fw-bold d-flex justify-content-start">Email</label>
                                <input type="text" className="form-control" name="email" placeholder="Enter Email" />
                            </div>
                            <div className="form-group m-4">
                                <label className="fw-bold d-flex justify-content-start">Address (optional)</label>
                                <input type="text" className="form-control" name="address" placeholder="Enter your address" />
                            </div>
                            <div className="form-group m-4">
                                <label className="fw-bold d-flex justify-content-start">Password </label>
                                <input id="pass01" type="password" className="form-control " placeholder="Password"
                                    name="staffPassword" /><i className="far fa-eye m-1 d-flex justify-content-start"
                                        id="togglePassword"> </i>
                            </div>

                            <div className="form-group m-4  ">
                                <label className="fw-bold d-flex justify-content-start">Confirm password</label>
                                <input id="pass02" type="password" className="form-control" placeholder="Password"
                                    name="staffConfirmPassword" /><i className="far fa-eye m-1 d-flex justify-content-start"
                                        id="togglePassword"></i>
                            </div>
                            <div className="d-grid gap-2 col-4  mx-auto m-5">
                                <button className="btn text-white" style={{backgroundColor: "#020a31"}} id="createButton" type="submit">Create</button>
                            </div>
                        </form>
                    </div>

                </div>

            </div>
        </div>
    );
}
export default Admin_Create_Staff;