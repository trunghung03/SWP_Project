import React from "react";
import logo from "../../../assets/img/logoN.png";
import ManagerSidebar from "../../../components/ManagerSidebar/ManagerSidebar.js";
import "../../../styles/Manager/ManagerAdd.scss";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useNavigate } from "react-router-dom";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const ManagerProductDetail = () => {
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
            #PROD001
          </div>
          <div
            className="manager_product_detail_subcontent"
            style={{
              textAlign: "center",
              fontFamily: "cursive",
              fontSize: "30px",
            }}
          >
            Cocktail Ring
          </div>
          <div
            className="manager_product_detail_content_2"
            style={{ display: "flex" }}
          >
            <div className="manager_product_detail_subcontent">
              <ImageList
                sx={{ width: 500, height: 450 }}
                variant="quilted"
                cols={4}
                rowHeight={121}
              >
                {itemData.map((item) => (
                  <ImageListItem
                    key={item.img}
                    cols={item.cols || 1}
                    rows={item.rows || 1}
                  >
                    <img
                      {...srcset(item.img, 121, item.rows, item.cols)}
                      alt={item.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
            <div>
              <div className="manager_product_detail_subcontent">
                <p style={{ textDecoration: "underline" }}>Description:</p>
                <p>
                  Cocktail rings are large, bold rings typically featuring a
                  large gemstone or cluster of gemstones. They are designed to
                  make a statement and are often worn on special occasions or
                  events. Cocktail rings can come in a variety of styles and
                  designs, ranging from classic to modern, and are popular among
                  those who want to add a touch of glamour to their outfit.
                </p>
              </div>
              <div className="manager_product_detail_subcontent">
                <p style={{ textDecoration: "underline" }}>Category:</p>
              </div>
              <div className="manager_product_detail_subcontent">
                <p style={{ textDecoration: "underline" }}>Collection:</p>
              </div>
              <div className="manager_product_detail_subcontent">
                <p style={{ textDecoration: "underline" }}>Material:</p>
              </div>
            </div>
          </div>

          <div
            className="manager_product_detail_subcontent"
            style={{ textAlign: "end", marginRight: "10%" }}
          >
            Price:
          </div>
          <div
            className="manager_product_detail_subcontent"
            style={{ textAlign: "end", marginRight: "10%" }}
          >
            Stock:
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerProductDetail;
const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    cols: 2,
  },
];
