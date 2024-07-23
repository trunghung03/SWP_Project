import React, { useEffect, useState } from "react";
import logo from "../../../assets/img/logoN.png";
import ManagerSidebar from "../../../components/ManagerSidebar/ManagerSidebar.js";
import "../../../styles/Manager/ManagerAdd.scss";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useNavigate, useParams } from "react-router-dom";
import { getManageProductDetail } from "../../../services/ManagerService/ManagerProductService.js";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const ManagerProductDetail = () => {
  const [productDetail, setProductDetail] = useState({});
  const [imageLinks, setImageLinks] = useState([]);
  const { productId } = useParams();
  
  useEffect(() => {
    console.log("productId: ", productId);
    if(productId){
      getManageProductDetail(productId)
        .then((data) => {
          console.log("productDetail: ", data);
          setProductDetail(data);
          if (data.imageLinkList) {
            const links = data.imageLinkList.split(";").map((link, index) => ({
              img: link,
              title: `Image ${index + 1}`,
              rows: 1,
              cols: 1,
            }));
            setImageLinks(links);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch product details: ", error);
        });
    }
  }, [productId]);

  const navigate = useNavigate();
  return (
    <div className="manager_add_diamond_all_container">
      <div className="manager_add_diamond_sidebar">
        <ManagerSidebar currentPage="manager_manage_product" />
      </div>
      <div className="manager_add_diamond_content">
        <div className="manager_add_diamond_header">
          <img className="manager_add_diamond_logo" src={logo} alt="Logo" />
        </div>
        <hr className="manager_add_diamond_header_line" />
        <button
          className="manager_back_button"
          onClick={() => navigate("/manager-product-list")}
        >
          &lt; Back
        </button>
        
        <div className="manager_product_detail_box">
          <div
            className="manager_product_detail_subcontent"
            style={{ textAlign: "end", fontWeight: "600" }}
          >
            {productDetail.productCode}
          </div>
          <div
            className="manager_product_detail_subcontent"
            style={{
              textAlign: "center",
              fontFamily: "cursive",
              fontSize: "30px",
            }}
          >
            {productDetail.productName}
          </div>
          <div
            className="manager_product_detail_content_2"
            style={{ display: "flex" }}
          >
            <div className="manager_product_detail_subcontent">
              <ImageList
                sx={{ width: 500, height: 500 }} // Set height to ensure no scrollbar
                variant="quilted"
                cols={2}  // 2 columns for 2x2 grid
                rowHeight={250}  // Height of each row
              >
                {imageLinks.map((item, index) => (
                  <ImageListItem
                    key={index}
                    cols={item.cols}
                    rows={item.rows}
                  >
                    <img
                      {...srcset(item.img, 250, item.rows, item.cols)}  // Adjust size accordingly
                      alt={item.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
            <div>
              <div className="manager_product_detail_subcontent">
                <p>Description:</p>
                <p>
                  {productDetail.description}
                </p>
              </div>
              <div className="manager_product_detail_subcontent">
                <p>Category: {productDetail.categoryName}</p>
              </div>
              <div className="manager_product_detail_subcontent">
                <p>Collection: {productDetail.collectionName}</p>
              </div>
              <div className="manager_product_detail_subcontent">
                <p>Material: {productDetail.materialName}</p>
              </div>
              <div className="manager_product_detail_subcontent">
                <p>Main Diamond ID: {productDetail.mainDiamondAttributeId}</p>
              </div>
              <div className="manager_product_detail_subcontent">
                <p>Amount: {productDetail.mainDiamondAmount}</p>
              </div>
              <div className="manager_product_detail_subcontent">
                <p>Sub Diamond ID: {productDetail.subDiamondAttributeId}</p>
              </div>
              <div className="manager_product_detail_subcontent">
                <p>Amount: {productDetail.subDiamondAmount}</p>
              </div>
              <div className="manager_product_detail_subcontent">
                <p>Labor Cost: {productDetail.laborCost}</p>
              </div>
            </div>
          </div>

          <div
            className="manager_product_detail_subcontent"
            style={{ textAlign: "end", marginRight: "10%" }}
          >
            Price: {productDetail.price}
          </div>
          <div
            className="manager_product_detail_subcontent"
            style={{ textAlign: "end", marginRight: "10%" }}
          >
            Stock: {productDetail.amountAvailable}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerProductDetail;
