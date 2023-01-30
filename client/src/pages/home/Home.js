import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Category from "../../components/category/Category";
import Hero from "../../components/hero/Hero";
import Product from "../../components/product/Product";
import { axiosClient } from "../../utills/axiosClientCreate";
import "./Home.scss";

function Home() {
  // const [categories, setCategory] = useState(null);
  const [topproduct, setProduct] = useState(null);
  const categories = useSelector((state) => state.categoryReducer.categories);

  async function fetchData() {
    // const categoryData = await axiosClient.get("/categories?populate=image");
    const productData = await axiosClient.get(
      "/products?filters[isTopPick][$eq]=true&populate=image"
    );
    // console.log("product data", productData);
    // console.log("category data", categoryData);

    // setCategory(categoryData.data.data);
    setProduct(productData.data.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="Home">
      <Hero />
      <section className="collection container">
        <div className="info">
          <h2 className="heading">Shop By Categories</h2>
          <p className="subheading">
            Shop from the best, our Film and TV Posters Collection.
          </p>
        </div>
        <div className="content">
          {categories?.map((category) => (
            <Category key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section className="collection container">
        <div className="info">
          <h2 className="heading">Our Top Picks</h2>
          <p className="subheading">All New Designs, Same Old Details.</p>
        </div>
        <div className="content">
          {/* <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product /> */}
          {topproduct?.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
