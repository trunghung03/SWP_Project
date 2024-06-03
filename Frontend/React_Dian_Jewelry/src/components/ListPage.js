function ListPage() {
    const paths = [];
    paths.push("/");
    paths.push("/home");
    paths.push("/education");
    paths.push("/search");
    paths.push("/productDetail");
    paths.push("/cart");
    paths.push("/FAQs");
    paths.push("/login");
    paths.push("/register");
    paths.push("/forgotPassword");
    paths.push("/resetPassword");
    paths.push("/diamondJewelry");
    paths.push("/collection");
    paths.push("/priceList");
    paths.push("/contact");
    paths.push("/introduce");

    const managerPaths = [];
    managerPaths.push("/managerStatitic");
    managerPaths.push("/managerDiamondList");
    managerPaths.push("/managerAddDiamond");
    managerPaths.push("/managerProductList");

    const customerPaths = [];
    customerPaths.push("/checkout");
    customerPaths.push("/invoice");
    customerPaths.push("/editProfile");
    customerPaths.push("/orderHistory");
    customerPaths.push("/orderDetail");
    customerPaths.push(paths);

    // Now you can use the `paths` array as needed

}


export default ListPage;