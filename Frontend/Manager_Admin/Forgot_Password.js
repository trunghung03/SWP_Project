function Forgot_Password() {
    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="col-sm-6">
                    <header className="d-flex justify-content-center mb-5">
                        <img src="images/Logo.jpg" alt="Shop Logo" />
                    </header>
                    <div className="d-flex justify-content-center mt-5">
                        <div className="border border-2 rounded rounded-2 col-sm-9">
                            <form>
                                <h2 className="d-flex m-3 justify-content-center">Forgot Password ?</h2>
                                <p className="text-muted d-flex justify-content-center ">Enter your email so that we can send you password reset link</p>
                                <div className="form-group m-3">
                                    <label className="fw-bold">Email</label>
                                    <input type="email" className="form-control" name="email"
                                        placeholder="Enter your email" />
                                </div>
                                <div className="d-grid m-3">
                                    <button type="submit" className="btn btn-lg text-white" style = {{backgroundColor: "#020b34"}}>Send verify email</button>
                                </div>
                                <a className="d-flex justify-content-center text-dark text-decoration-none m-3" href="Login.html"> Back to login </a>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <img src="images/Nhan_Login.jpg" className="img-fluid" alt="Ring photo" />
                </div>
            </div>

        </>
    );
}
export default Forgot_Password;