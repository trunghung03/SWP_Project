
function Add_Product() {
    return (
        <>
            <div className="main" style={{backgroundColor: "white"}}>
                <div className="text-center">
                    <header className="d-flex justify-content-between">
                        <img src="images/Logo.jpg" id="logo" alt="Shop Logo" />
                        <div>
                            <div className="input-group mt-5 pe-5">
                                <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                                <button type="button" className="btn text-white" data-mdb-ripple-init style={{backgroundColor: "#020a31"}}>search</button>
                            </div>
                        </div>
                    </header>
                    <br />
                    <hr className="container-fluid" />
                    <h1 id="formHeader" className="d-flex display-4 justify-content-start mt-5 ms-5">Add new product</h1>
                    <div className="d-flex justify-content-start ms-5 mt-5">
                        <div className="border border-2 rounded rounded-2 mb-5 col-sm-8">
                            <form className="p-3">
                                <div>
                                    <h1 className="d-flex justify-content-start">General Information</h1>
                                    <div className="form-group mt-4 ">
                                        <label className="fw-bold d-flex justify-content-start">Product name</label>
                                        <input type="text" className="form-control" name="diamondName"
                                            placeholder="Diamond name" />
                                    </div>
                                    <div className="d-flex justify-content-around">
                                        <div className="form-group mt-5">
                                            <label className="fw-bold ">Category</label>
                                            <select name="role" className="optionSelect container-fluid ">
                                                <option value="none">None</option>
                                                <option value="necklace">Necklace</option>
                                                <option value="earrings">Earrings</option>
                                                <option value="ring">Ring</option>
                                            </select>
                                        </div>
                                        <div className="form-group mt-5">
                                            <label className="fw-bold">Main diamond</label>
                                            <select name="role" className="optionSelect container-fluid">
                                                <option value="none">None</option>
                                                <option value="DIA001">Diamond 1</option>
                                                <option value="DIA002">Diamond 2</option>

                                            </select>
                                        </div>

                                    </div>
                                    <div className="form-group mt-4 ">
                                        <label className="fw-bold d-flex justify-content-start">Description</label>
                                        <input type="text" className="form-control" name="diamondName"
                                            placeholder="Enter description   " />
                                    </div>
                                </div>

                            </form>

                        </div>
                        <div className="border border-2 rounded rounded-2 mb-5 col-sm-3 ms-5 p-3 me-2">
                            <form>
                                <div className="form-group mt-4 ">
                                    <label className="fw-bold d-flex justify-content-start">Price</label>
                                    <input type="text" className="form-control" name="diamondName" placeholder="Enter Price   " />
                                </div>
                                <div className="form-group mt-4 ">
                                    <label className="fw-bold d-flex justify-content-start">Quantity</label>
                                    <input type="text" className="form-control" name="diamondName"
                                        placeholder="Enter quantity   " />
                                </div>
                                <div className="d-grid gap-2 col-4  mx-auto m-5">
                                    <button type="submit" style={{backgroundColor: "#020a31" ,color: "white"}}
                                        className="btn">Submit</button>
                                </div>
                            </form>
                        </div>
                        <div className="border border-2 rounded rounded-2 mb-5 col-sm-3 ms-5 p-3 me-2">
                            <form>
                                <div className="form-group mt-4 ">
                                    <label className="fw-bold d-flex justify-content-start">Price</label>
                                    <input type="text" className="form-control" name="diamondName" placeholder="Enter Price " />
                                </div>
                                <div className="form-group mt-4 ">
                                    <label className="fw-bold d-flex justify-content-start">Quantity</label>
                                    <input type="text" className="form-control" name="diamondName"
                                        placeholder="Enter quantity   " />
                                </div>
                                <div className="d-grid gap-2 col-4  mx-auto m-5">
                                    <button type="submit" style={{backgroundColor: "#020a31", color: "white"}}
                                        className="btn">Submit</button>
                                </div>
                            </form>
                        </div>

                    </div>

                </div>
                <div className="border border-2 rounded rounded-2 mb-5 col-sm-8 ms-5 p-5">
                    <form>
                        <div className="form-group mt-4 ">
                            <label className="fw-bold  d-flex justify-content-start">Image</label>
                            <input type="text" className="form-control" name="diamondName" />
                        </div>
                    </form>
                </div>
            </div>

        </>
    );
} 
export default Add_Product;