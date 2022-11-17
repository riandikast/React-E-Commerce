import CardCart from "../../components/CardCart";
import {
  incrementCart,
  decrementCart,
  deleteFromCart,
  outStock,
  readyStock,
  clearCart,
} from "../../store/products/CartSlice";
import { checkoutProduct } from "../../store/products/ProductSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState, React } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
function Cart() {
  const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };
  const pageVariants = {
    initial: { scale: 0.2, opacity: 100 },
    in: { scale: 1, opacity: 1, transition: { duration: 0.5, ...transition } },
    out: {
      scale: 0.2,
      opacity: 0,
      transition: { duration: 0.5, ...transition },
    },
  };
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState("");
  const [total, setTotal] = useState(0);
  const cart = JSON.parse(localStorage.getItem("cart"));

  const setRecap = (cart) => {
    let rekapPenjualan = localStorage.getItem("rekap")
      ? JSON.parse(localStorage.getItem("rekap"))
      : [];
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].title === rekapPenjualan[i]?.title) {
        rekapPenjualan[i].quantity++;
      } else {
        rekapPenjualan.push(cart[i]);
      }
    }
    return localStorage.setItem("rekap", JSON.stringify(rekapPenjualan));
  };

  const handleCheckout = () => {
    Swal.fire({
      title: "Do you want to checkout?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setRefresh("checkout");
        Swal.fire("Success!", "", "success");
        const cart = JSON.parse(localStorage.getItem("cart"));
        for (let i = 0; i < cart.length; i++) {
          dispatch(checkoutProduct(cart[i]));
          setRecap(cart);
        }
        dispatch(clearCart());
      }
    });
  };

  const handleIncrement = (product) => {
    let cart = {
      image: product.image,
      title: product.title,
      price: product.price,
      desc: product.description,
      status: product.status,
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
      status: product.status,
      quantity: 1,
    };
    dispatch(decrementCart(cart));
    setRefresh("delete");
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
    }
  };

  const checkdata = (title) => {
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
          <div className="w-5/6 md:w-4/6 lg:w-3/6 mx-auto mt-4  flex flex-row  ">
            <div className="text-left mt-5 ml-2 text-xl ">
              {" "}
              Total = ${total.toFixed(2)}
            </div>
            <div className="  mt-5 ml-auto mr-2 ">
              <button
                disabled={buttonState()}
                onClick={() => handleCheckout()}
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
            stockMsg={checkStock(item.status)}
          />
        ));
      }
    }
  };

  const checkStock = (status) => {
    let result = "";
    if (status === "Not Available") {
      result = "Insufficient Stock";
    } else {
      result = "";
    }

    return result;
  };

  const buttonState = () => {
    let result = "";
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].status === "Not Available") {
        result = "true";
        break;
      } else {
        result = "false";
      }
    }

    if (result === "true") {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    setRefresh("buat refresh");
    listSaved();
    totalPrice();
    const data = JSON.parse(localStorage.getItem("product"));
    if (cart !== null && data !== null) {
      for (let i = 0; i < cart.length; i++) {
        let findProduct = data.find((product) => product.id === cart[i].id);
        if (cart[i].quantity > findProduct.stock) {
          dispatch(outStock(cart[i]));
        } else {
          dispatch(readyStock(cart[i]));
        }
      }
    }
  }, [refresh]);

  return (
    <>
      <motion.div
        className=""
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
      >
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
      </motion.div>
    </>
  );
}

export default Cart;
