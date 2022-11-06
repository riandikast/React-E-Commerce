import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/login/LoginSlice";

function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [path, setPath] = useState(null);
  const [showNav, setShowNav] = useState(false);
  const { isLogin } = useSelector((state) => state.login);

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  const handleLogout = async () => {
    dispatch(logoutUser());
  }

  return (
    <div className="flex justify-around items-center bg-dark-plain py-3">
      <img src="/logo.svg" alt="logo" width="90" />
      <div className="flex">

        <NavLink
            exact="true"
            to={"/"}
            className={
              path === "/" 
                ? "text-xs md:text-base mr-3 border-b-2 border-black  "
                : "text-xs md:text-base mr-3"
            }
          >
            Home
          </NavLink>
      
          <NavLink
            to={"/products"}
            className={
              path === "/products"
                ? "text-xs md:text-base mr-3 border-b-2 border-black  "
                : "text-xs md:text-base mr-3"
            }
          >
            Products
          </NavLink>
          <NavLink
            to={"/categories"}
            className={
              path === "/categories"
                ? "text-xs md:text-base mr-3 border-b-2 border-black "
                : "text-xs md:text-base mr-3 whitespace-nowrap"
            }
          >
            Categories
          </NavLink>
         
      </div>
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 mr-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        {isLogin? (
          <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          <button className="bg-[#cf6137] py-1 px-4 text-white font-base rounded-md ml-3" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">
            <button className="bg-green py-1 px-4 text-white font-base rounded-md ml-3">Login</button>
          </Link>
        )}

            </div>
        </div>
    )
}

export default Navbar;
