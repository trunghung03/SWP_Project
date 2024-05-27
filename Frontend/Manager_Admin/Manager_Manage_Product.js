function Manager_Manage_Product() {
    return (
        <>
            <div className="main" style={{backgroundColor: "white"}}>
                <div className="text-center">
                    <header className="d-flex justify-content-between">
                        <img src="images/Logo.jpg" id="logo" alt="Shop Logo" />
                        <div>
                            <div className="input-group mt-5 pe-5">
                                <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
                                    aria-describedby="search-addon" />
                                <button type="button" className="btn text-white" data-mdb-ripple-init
                                    style={{backgroundColor: "#020a31"}}>search</button>
                            </div>
                        </div>
                    </header>
                    <br />
                    <hr className="container-fluid" />
                    <div className="d-flex justify-content-between">
                        <h1 id="formHeader" className="d-flex display-4 col-9 justify-content-start mt-5 ms-5">Manage product</h1>
                        <div className="d-grid gap-2 col-3  mx-auto pt-3 m-5">
                            <a href="Add_New_Product.html"><button className="btn text-white" style={{backgroundColor:"#020a31"}} id="createButton"
                                type="submit">Add new product</button></a>
                        </div>
                    </div>
                    <div className="form-wrapper m-5">
                        <table className="container-fluid border border-1">
                            <thead>
                                <tr>
                                    <th className="p-3">ID</th>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Price</th>
                                    <th>Main Diamond</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="border border-1">
                                <tr className="">
                                    <td className="p-3">PRODUCT001</td>
                                    <td>Eternal Love Ring</td>
                                    <td>image</td>
                                    <td>2200.00</td>
                                    <td>DIA001</td>
                                    <td>
                                        <div>
                                            <a href="Update_Product.html" style={{color: "#020a31"}}><i
                                                className="fa-solid fa-pen me-2"></i></a>
                                            <a href="Delete.html" style={{color: "#020a31"}}><i
                                                className="fa-solid fa-trash-can ms-2"></i></a>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="">
                                    <td className="p-3">PRODUCT001</td>
                                    <td>Eternal Love Ring</td>
                                    <td>image</td>
                                    <td>2200.00</td>
                                    <td>DIA001</td>
                                    <td>
                                        <div>
                                            <a href="Update_Product.html" style={{color: "#020a31"}}><i
                                                className="fa-solid fa-pen me-2"></i></a>
                                            <a href="Delete.html" style={{color: "#020a31"}}><i
                                                className="fa-solid fa-trash-can ms-2"></i></a>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="">
                                    <td className="p-3">PRODUCT001</td>
                                    <td>Eternal Love Ring</td>
                                    <td>image</td>
                                    <td>2200.00</td>
                                    <td>DIA001</td>
                                    <td>
                                        <div>
                                            <a href="Update_Product.html" style={{color: "#020a31"}}><i
                                                className="fa-solid fa-pen me-2"></i></a>
                                            <a href="Delete.html" style={{color: "#020a31"}}><i
                                                className="fa-solid fa-trash-can ms-2"></i></a>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="">
                                    <td className="p-3">PRODUCT001</td>
                                    <td>Eternal Love Ring</td>
                                    <td>image</td>
                                    <td>2200.00</td>
                                    <td>DIA001</td>
                                    <td>
                                        <div>
                                            <a href="Update_Product.html" style={{color: "#020a31"}}><i
                                                className="fa-solid fa-pen me-2"></i></a>
                                            <a href="Delete.html" style={{color: "#020a31"}}><i
                                                className="fa-solid fa-trash-can ms-2"></i></a>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="">
                                    <td className="p-3">PRODUCT001</td>
                                    <td>Eternal Love Ring</td>
                                    <td>image</td>
                                    <td>2200.00</td>
                                    <td>DIA001</td>
                                    <td>
                                        <div>
                                            <a href="Update_Product.html" style={{color: "#020a31"}}><i
                                                className="fa-solid fa-pen me-2"></i></a>
                                            <a href="Delete.html" style={{color: "#020a31"}}><i
                                                className="fa-solid fa-trash-can ms-2"></i></a>
                                        </div>
                                    </td>
                                </tr>


                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

        </>
    );
}
export default Manager_Manage_Product;