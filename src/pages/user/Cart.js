import CardCart from "../../components/CardCart";
import {
  incrementCart,
  decrementCart,
  deleteFromCart,
} from "../../store/products/CartSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState, React, useRef } from "react";
import Swal from "sweetalert2";

function Cart() {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState("");
  const [total, setTotal] = useState(0);

  const handleIncrement = (product) => {
    let cart = {
      image: product.image,
      title: product.title,
      price: product.price,
      desc: product.description,
      quantity: 1,
    };
    dispatch(incrementCart(cart));
    setRefresh("increment");
  };

  const handleDecrement = (product) => {
    let cart = {
      image: product.image,
      title: product.title,
      price: product.price,
      desc: product.description,
      quantity: 1,
    };
    dispatch(decrementCart(cart));
    setRefresh("decrement");
  };

  const handleDelete = (title) => {
    Swal.fire({
      title: "Do you want to remove this product?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "", "success");
        dispatch(deleteFromCart({ title: title }));
        setRefresh("decrement");
      }
    });
  };

  const totalPrice = () => {
    let count = 0;
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart !== null) {
      for (let i = 0; i < cart.length; i++) {
        const total = cart[i].quantity * cart[i].price;
        count += total;
      }
      setTotal(count);
      console.log("ert", count);
    }
  };
  const checkdata = () => {
    const data = JSON.parse(localStorage.getItem("cart"));
    if (data !== null) {
      if (data.length === 0) {
        return (
          <div className="justify-center items-center mt-24">
            <i
              class="fa fa-shopping-cart text-6xl mt-8 mb-6"
              aria-hidden="true"
            ></i>
            <div className="justify-center text-center items-center h-3/5 text-lg">
              {" "}
              Your shoping cart is empty
            </div>
          </div>
        );
      } else {
        return (
          <div className="w-3/6 mx-auto mt-4  flex flex-row  ">
            <div className="text-left mt-5 ml-2 text-xl ">
              {" "}
              Total = ${total.toFixed(2)}
            </div>
            <div className="  mt-5 ml-auto mr-2 ">
              <button
                disabled={buttonState()}
                className="disabled:opacity-30 bg-[#cf6137] py-1 px-4 text-white font-base rounded-md "
              >
                Checkout
              </button>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="justify-center items-center mt-24">
          <i
            class="fa fa-shopping-cart text-6xl mt-8 mb-6"
            aria-hidden="true"
          ></i>
          <div className="justify-center text-center items-center h-3/5 text-lg">
            {" "}
            Your shoping cart is empty
          </div>
        </div>
      );
    }
  };
  const listSaved = () => {
    const data = JSON.parse(localStorage.getItem("cart"));
    if (data !== null) {
      if (data.length !== 0) {
        return data.map((item) => (
          <CardCart
            title={item.title}
            price={(item.price * item.quantity).toFixed(2)}
            image={item.image}
            quantity={item.quantity}
            increament={() => handleIncrement(item)}
            decreament={() => handleDecrement(item)}
            deleteClick={() => handleDelete(item.title)}
            stockMsg={checkStock(item.quantity)}
          />
        ));
      }
    }
  };

  const checkStock = (quantity) => {
    const data = JSON.parse(localStorage.getItem("product"));
    for (let i = 0; i < data.length; i++) {
      if (quantity > data[i].stock) {
        return "Insufficient Stock";
      } else {
        return "";
      }
    }
  };

  const buttonState = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    let prop = null;
    for (let i = 0; i < cart.length; i++) {
      console.log("azx", i);
      if (checkStock(cart[i].quantity) === "Insufficient Stock") {
        prop = "true"
        break
      }else{
        prop = "false"
      }
    }
    if (prop === "true"){
      return true
    }else {
      return false
    }
  };

  useEffect(() => {
    setRefresh("buat refresh");
    listSaved();
    totalPrice();
  }, [refresh]);

  return (
    <>
      <div className="">
        <div className="w-11/12 mx-auto ">
          <div className="mt-20">
            <h2 className="text-center text-2xl font-bold  text-darkgreen">
              Cart
            </h2>

            {checkdata()}
            {listSaved()}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-20"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
