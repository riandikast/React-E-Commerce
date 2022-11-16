import { useEffect, useState, React, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getDetailProduct,
  productSelector,
} from "../../store/products/ProductSlice";
import { addProduct, checkData } from "../../store/products/CartSlice";
import { useNavigate } from "react-router-dom";

function Detail() {
  const [refresh, setRefresh] = useState("");
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const { product } = useSelector(productSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const buttonState = () => {
    const data = JSON.parse(localStorage.getItem("product"));
    let findProduct = data.find((data) => product.id === data.id);
    if (findProduct !== null && findProduct !== undefined) {
      console.log("wer", findProduct.stock);
      if (findProduct.stock > 0) {
        return (
          <button
            onClick={() => handleCart(product)}
            className="w-full p-2 bg-green text-white font-semibold font-jost my-5 flex justify-center items-center rounded-md"
          >
            Add to cart
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </button>
        );
      } else {
        return (
          <button
            onClick={() => handleCart(product)}
            disabled={true}
            className="w-full p-2 bg-[#cf6137]  disabled:opacity-40 text-white font-semibold font-jost my-5 flex justify-center items-center rounded-md"
          >
            Sold out!
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </button>
        );
      }
    }
  };
  const handleSave = (product) => {
    let cart = {
      id: product.id,
      image: product.image,
      title: product.title,
      price: product.price,
      desc: product.description,
      status: "Available",
      quantity: 1,
    };
    dispatch(checkData(cart));
    dispatch(addProduct(cart));
    setRefresh("Refresh");
  };

  useEffect(() => {
    dispatch(getDetailProduct({ id }));
  }, []);

  useEffect(() => {
    setRefresh("buat refresh ");
  }, [refresh]);

  const handleCart = (product) => {
    if (token === null) {
      return navigate("/login");
    } else {
      return handleSave(product);
    }
  };
  console.log(product);
  return (
    <div className="w-4/6 mx-auto mt-20">
      <div className="px-3 py-5 rounded-md bg-white flex justify-center">
        <img src={product?.image} alt="img" className="w-48 mr-20" />
        <div className="w-1/2 text-left">
          <h2 className="text-darkgreen text-lg font-bold mb-2">
            {product?.title}
          </h2>
          <p className="text-darkgreen text-base font-bold mb-5">
            ${product?.price}
          </p>
          <p>{product?.description}</p>

          {buttonState()}
        </div>
      </div>
    </div>
  );
}

export default Detail;
