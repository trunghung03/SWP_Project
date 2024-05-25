function Reset_Password() {
    return (
        <>
            <div class="d-flex justify-content-center">
                <div class="col-sm-6">
                    <header class="d-flex justify-content-center mb-5">
                        <img src="images/Logo.jpg" alt="Shop Logo"/>
                    </header>
                    <div class="d-flex justify-content-center mt-5">
                        <div class="border border-2 rounded rounded-2 col-sm-9">
                            <form>
                                <h2 class="d-flex m-3 justify-content-center">Reset Password</h2>
                                <div class="form-group m-3">
                                    <label class="fw-bold">Password</label>
                                    <input type="email" class="form-control" name="Password_forgot_enter"
                                        placeholder="Enter email"/>
                                </div>
                                <div class="form-group m-3">
                                    <label class="fw-bold">Re-enter password</label>
                                    <input type="password" class="form-control" name="Password_forgot_renter"
                                        placeholder="Password"/>
                                </div>
                                <div class="d-grid m-3">
                                    <button type="submit" class="btn btn-lg text-white" style={{backgroundColor : "#0f2770"}} >Submit</button>
                                </div>
                            </form>
                        </div>

                    </div>

                </div>
                <div class="col-sm-6">
                    <img src="images/Nhan_Login.jpg" class="img-fluid" alt="Ring photo"/>
                </div>
            </div>

        </>
    );
}
export default Reset_Password;