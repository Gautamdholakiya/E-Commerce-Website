import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Product from "../../components/product/Product";
import { axiosClient } from "../../utills/axiosClientCreate";
import "./Collection.scss";

function Collection() {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const params = useParams();

  const sortOption = [
    {
      value: "Price-Low To High",
      sort: "price",
    },
    {
      value: "Newest First",
      sort: "createdAt",
    },
  ];

  const [sortBy, setSortBy] = useState(sortOption[0].sort);

  const url = params.categoryId
    ? `/products?populate=image&filters[category][key][$eq]=${params.categoryId}&sort=${sortBy}`
    : `/products?populate=image&sort=${sortBy}`;

  const fetchProduct = async () => {
    const response = await axiosClient.get(url);
    setProduct(response.data.data);
  };

  const [categoryId, setCategoryId] = useState("");

  const categories = useSelector((state) => state.categoryReducer.categories);
  // console.log(categories);

  useEffect(() => {
    setCategoryId(params.categoryId);
    fetchProduct();
  }, [params, sortBy]);

  function updateCategory(e) {
    navigate(`/category/${e.target.value}`);
  }

  const handelSortFunction = (e) => {
    const sortValue = e.target.value;
    setSortBy(sortValue);
  };

  return (
    <div className="Categories">
      <div className="container">
        <div className="header">
          <div className="info">
            <h2>Explore All Print and Artwork</h2>
            <p>
              India's largest collection of wall posters for your bedroom,
              living room, kids room, kitchen and posters & art prints at
              highest quality lowest price guaranteed.
            </p>
          </div>
          <div className="sort-by">
            <div className="sort-by-container">
              <h3 className="sort-by-text">Sort By</h3>
              <select
                className="select-sort-by"
                name="sort-by"
                id="sort-by"
                onChange={handelSortFunction}
              >
                {sortOption?.map((item) => (
                  <option key={item.sort} value={item.sort}>
                    {item.value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="filter-box">
            <div className="category-filter">
              <h3>Category</h3>
              {categories?.map((categorie) => (
                <div key={categorie?.id} className="filter-radio">
                  <input
                    name="category"
                    type="radio"
                    value={categorie?.attributes.key}
                    id={categorie.id}
                    onChange={updateCategory}
                    checked={categorie?.attributes?.key === categoryId}
                  />
                  <label htmlFor={categorie?.id}>
                    {categorie?.attributes?.title}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="products-box">
            {product?.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collection;
