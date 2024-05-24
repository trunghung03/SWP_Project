function Manager_Update_Product() {
    return (
        <>
            <div class="main" style={{backgroundColor: "white"}}>
                <div class="text-center">
                    <header class="d-flex justify-content-between">
                        <img src="images/Logo.jpg" id="logo" alt="Shop Logo" />
                        <div>
                            <div class="input-group mt-5 pe-5">
                                <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search"
                                    aria-describedby="search-addon" />
                                <button type="button" class="btn text-white" data-mdb-ripple-init
                                    style={{backgroundColor: "#020a31"}}>search</button>
                            </div>
                        </div>
                    </header>
                    <br/>
                        <hr class="container-fluid"/>
                            <h1 id="formHeader" class="d-flex display-4 justify-content-start mt-5 ms-5">Update product information
                            </h1>
                            <div class="d-flex justify-content-start ms-5 mt-5">
                                <div class="border border-2 rounded rounded-2 mb-5 col-sm-8">
                                    <form class="p-3">
                                        <div>
                                            <h1 class="d-flex justify-content-start">General Information</h1>
                                            <div class="form-group mt-4 ">
                                                <label class="fw-bold d-flex justify-content-start">Product name</label>
                                                <input type="text" class="form-control" name="diamondName"
                                                    placeholder="Diamond name"/>
                                            </div>
                                            <div class="d-flex justify-content-around">
                                                <div class="form-group mt-5">
                                                    <label class="fw-bold ">Category</label>
                                                    <select name="role" class="optionSelect container-fluid ">
                                                        <option value="none">None</option>
                                                        <option value="necklace">Necklace</option>
                                                        <option value="earrings">Earrings</option>
                                                        <option value="ring">Ring</option>
                                                    </select>
                                                </div>
                                                <div class="form-group mt-5">
                                                    <label class="fw-bold">Main diamond</label>
                                                    <select name="role" class="optionSelect container-fluid">
                                                        <option value="none">None</option>
                                                        <option value="DIA001">Diamond 1</option>
                                                        <option value="DIA002">Diamond 2</option>

                                                    </select>
                                                </div>

                                            </div>
                                            <div class="form-group mt-4 ">
                                                <label class="fw-bold d-flex justify-content-start">Description</label>
                                                <input type="text" class="form-control" name="diamondName"
                                                    placeholder="Enter description   " />
                                            </div>
                                        </div>

                                    </form>

                                </div>
                                <div class="border border-2 rounded rounded-2 mb-5 col-sm-3 ms-5 p-3 me-2">
                                    <form>
                                        <div class="form-group mt-4 ">
                                            <label class="fw-bold d-flex justify-content-start">Price</label>
                                            <input type="text" class="form-control" name="diamondName" placeholder="Enter Price   " />
                                        </div>
                                        <div class="form-group mt-4 ">
                                            <label class="fw-bold d-flex justify-content-start">Quantity</label>
                                            <input type="text" class="form-control" name="diamondName"
                                                placeholder="Enter quantity   " />
                                        </div>
                                        <div class="d-grid gap-2 col-4  mx-auto m-5">
                                            <button type="submit" style={{backgroundColor: "#020a31", color: "white"}}
                                                class="btn">Submit</button>
                                        </div>
                                    </form>
                                </div>
                                <div class="border border-2 rounded rounded-2 mb-5 col-sm-3 ms-5 p-3 me-2">
                                    <form>
                                        <div class="form-group mt-4 ">
                                            <label class="fw-bold d-flex justify-content-start">Price</label>
                                            <input type="text" class="form-control" name="diamondName" placeholder="Enter Price   " />
                                        </div>
                                        <div class="form-group mt-4 ">
                                            <label class="fw-bold d-flex justify-content-start">Quantity</label>
                                            <input type="text" class="form-control" name="diamondName"
                                                placeholder="Enter quantity   " />
                                        </div>
                                        <div class="d-grid gap-2 col-4  mx-auto m-5">
                                            <button type="submit" style={{backgroundColor: "#020a31", color: "white"}}
                                                class="btn">Submit</button>
                                        </div>
                                    </form>
                                </div>

                            </div>

                            <div class="border border-2 rounded rounded-2 mb-5 col-sm-8 ms-5 p-5">
                                <form>
                                    <div class="form-group mt-4 ">
                                        <label class="fw-bold  d-flex justify-content-start">Image</label>
                                        <input type="text" class="form-control" name="diamondName" />
                                    </div>
                                </form>
                            </div>
                        
                </div>
            </div>    
            </>
            );
}
export default Manager_Update_Product;