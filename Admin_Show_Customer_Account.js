function Admin_Show_Customer_Account() {
    return (
        <div class="main" style={{ backgroundColor: "white" }}>
            <div class="text-center">
                <header class="d-flex justify-content-between">
                    <img src="images/Logo.jpg" id="logo" alt="Shop Logo" />
                    <div>
                        <div class="input-group mt-5 pe-5">
                            <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                            <button type="button" class="btn text-white" data-mdb-ripple-init style={{ backgroundColor: "#020a31" }}>search</button>
                        </div>
                    </div>
                </header>
                <br />
                <hr class="container-fluid" />
                <div class="form-wrapper m-5">
                    <h1 id="formHeader" class="d-flex display-4 justify-content-start mt-5 mb-2">Customer accounts</h1>
                    <table class="container-fluid border border-1">
                        <thead>
                            <tr>
                                <th class="p-3">Email</th>
                                <th>Password</th>
                                <th>City</th>
                                <th>Phone Number</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody class="border border-1">
                            <tr class="">
                                <td class="p-3">Michaeldang1101@gmail.com</td>
                                <td>1241fsgsdf</td>
                                <td>Ho Chi Minh</td>
                                <td>0912345678</td>
                                <td><button class="btn btn-white">Active</button></td>
                            </tr>
                            <tr class="">
                                <td class="p-3">Michaeldang1101@gmail.com</td>
                                <td>1241fsgsdf</td>
                                <td>Ho Chi Minh</td>
                                <td>0912345678</td>
                                <td><button class="btn btn-white">Active</button></td>
                            </tr>
                            <tr class="">
                                <td class="p-3">Michaeldang1101@gmail.com</td>
                                <td>1241fsgsdf</td>
                                <td>Ho Chi Minh</td>
                                <td>0912345678</td>
                                <td><button class="btn btn-white">Active</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}
export default Admin_Show_Customer_Account;