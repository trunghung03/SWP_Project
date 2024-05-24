function Admin_Show_Log() {
    return (
        <>
            <div class="main" style={{backgroundColor: "white"}}>
                <div class="text-center">
                    <header class="d-flex justify-content-between">
                        <img src="images/Logo.jpg" id="logo" alt="Shop Logo" />
                        <div>
                            <div class="input-group mt-5 pe-5">
                                <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                                <button type="button" class="btn text-white" data-mdb-ripple-init style={{backgroundColor: "#020a31"}}>search</button>
                            </div>
                        </div>
                    </header>
                    <br />
                    <hr class="container-fluid" />
                    <div class="form-wrapper m-5">
                        <h1 id="formHeader" class="d-flex display-4 justify-content-start mt-5 mb-2"> Logs</h1>
                        <table class="container-fluid border border-1">
                            <thead>
                                <tr>
                                    <th class="p-3">Email</th>
                                    <th>Date</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                    <th>Country</th>
                                </tr>
                            </thead>
                            <tbody class="border border-1">
                                <tr class="">
                                    <td class="p-3">Michaeldang1101@gmail.com</td>
                                    <td>2023-06-30</td>
                                    <td>Customer</td>
                                    <td>Buy</td>
                                    <td>VietNam</td>
                                </tr>
                                <tr class="">
                                    <td class="p-3">Michaeldang1101@gmail.com</td>
                                    <td>2023-06-30</td>
                                    <td>Customer</td>
                                    <td>Buy</td>
                                    <td>VietNam</td>
                                </tr>
                                <tr class="">
                                    <td class="p-3">Michaeldang1101@gmail.com</td>
                                    <td>2023-06-30</td>
                                    <td>Customer</td>
                                    <td>Buy</td>
                                    <td>VietNam</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Admin_Show_Log;