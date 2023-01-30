import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import dummyImg from "../../assets/naruto.jpeg";
import Loading from "../../components/loader/Loading";
import { addToCart, removeToCart } from "../../redux/cartSlices";
import { axiosClient } from "../../utills/axiosClientCreate";
import "./ProductDetail.scss";

function ProductDetail() {
  const params = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cartReducer.cart);
  const quantity =
    cart.find((item) => item.key === params.productId)?.quantity || 0;

  async function fetchingData() {
    const productData = await axiosClient.get(
      `/products?filters[key][$eq]=${params.productId}&populate=*`
    );
    // console.log(productData);

    if (productData?.data.data.length > 0) {
      setProductDetail(productData?.data.data[0]);
    }

    if (!productDetail) {
      return <Loading />;
    }
  }

  useEffect(() => {
    setProductDetail(null);
    fetchingData();
  }, [params]);

  return (
    <div className="ProductDetail">
      <div className="container">
        <div className="product-layout">
          <div className="product-img center">
            <img
              src={productDetail?.attributes?.image?.data.attributes?.url}
              alt="product img"
            />
          </div>
          <div className="product-info">
            <h1 className="heading">{productDetail?.attributes.title}</h1>
            <h3 className="price">₹ {productDetail?.attributes.price}</h3>
            <p className="description">{productDetail?.attributes.desc} </p>
            <div className="cart-options">
              <div className="quantity-selector">
                <span
                  className="btn decrement"
                  onClick={() => dispatch(removeToCart(productDetail))}
                >
                  -
                </span>
                <span className="quantity">{quantity}</span>
                <span
                  className="btn increment"
                  onClick={() => {
                    dispatch(addToCart(productDetail));
                  }}
                >
                  +
                </span>
              </div>
              <button
                className="btn-primary add-to-cart"
                onClick={() => {
                  dispatch(addToCart(productDetail));
                }}
              >
                Add to Cart
              </button>
            </div>

            <div className="return-policy">
              <ul>
                <li>
                  This product is made to order and is typically printed in 3-6
                  working days. Your entire order will ship out together.
                </li>
                <li>
                  Since this product is printed on demand especially for you, it
                  is not eligible for cancellations and returns. Read our Return
                  Policy.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
