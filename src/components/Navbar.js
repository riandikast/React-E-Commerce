import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/login/LoginSlice";
import Swal from "sweetalert2";
import { Link as ScrollLink, animateScroll as scroll, scroller } from "react-scroll";
import { useAtom, atom } from 'jotai'

export const navbarState = atom("active")

function Navbar() {

  const [showNav, setShowNav] = useState(false);
  const [refresh, setRefresh] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const [path, setPath] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [active, setActive] = useAtom(navbarState);
  const { token } = useSelector((state) => state.login);
  const adminCheck = JSON.parse(localStorage.getItem("admin"));
  const navigate = useNavigate();

  const scrollToTop = () => {
    setActive("active");
    scroll.scrollToTop();
  };
  const scrollToProduct = () => {
    setActive("productActive");
  };

  useEffect(() => {
    setPath(location.pathname);
    if (active==="productActive"){
      setTimeout(()=>{scroller.scrollTo('productElement',{smooth:true, spy:true, duration:700})} , 1000)
    }   
  }, [location]);

  useEffect(() => {
    setRefresh("");

  }, [refresh]);

  const handleLogout = async () => {
    Swal.fire({
      title: "Are you sure want to logout?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logoutUser());
        setIsAdmin(false);
        setRefresh("Refresh");
        navigate("/");
      }
    });
  };

  useEffect(() => {
    if (adminCheck !== null) {
      for (let i = 0; i < adminCheck.length; i++) {
        if (adminCheck[i].admin === true) {
          return setIsAdmin(true);
        } else {
          return setIsAdmin(false);
        }
      }
    }
  }, [adminCheck || isAdmin]);

  const linkNavbar = () => {
    return (
      <>
        {!isAdmin ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <NavLink
              onClick={() => setShowNav(false)}
              exact="true"
              to={"/"}
              className={
                path === "/" && active === "active"
                  ? "text-sm md:text-base mr-3 border-b-2 border-white sm:border-black mb-3 text-white sm:mb-0 sm:text-black"
                  : "text-sm md:text-base mr-3 mb-3 text-white sm:mb-0 sm:text-black"
              }
            >
              {path === "/" ? (
                <ScrollLink onClick={scrollToTop} smooth={true} spy={true}>
                  Home
                </ScrollLink>
              ) : (
                <Link onClick={()=>setActive("active")} to={"/"}>Home</Link>
              )}
            </NavLink>

            <NavLink 
              onClick={() => setShowNav(false)}
              className={
                path === "/" && active === "productActive"
                  ? "text-sm md:text-base mr-3  border-b-2 border-white sm:border-black mb-3 text-white sm:mb-0 sm:text-black  "
                  : "text-sm md:text-base mr-3 mb-3 text-white sm:mb-0 sm:text-black"
              }>
              {path === "/" ? (
                <ScrollLink
                  onClick={()=>setActive("productActive")}
                
                  to={"products"}
                  smooth={true}
                  spy={true}
                >
                  Product
                </ScrollLink>
              ) : (
                <Link onClick={scrollToProduct} to={"/"}>Product</Link>
              )}
            </NavLink>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <NavLink
              exact="true"
              to={"/"}
              className={
                path === "/"
                  ? "text-sm md:text-base mr-3 border-b-2 border-white sm:border-black mb-3 text-white sm:mb-0 sm:text-black  "
                  : "text-sm md:text-base mr-3 mb-3 text-white sm:mb-0 sm:text-black"
              }
            >
              Home
            </NavLink>

            <NavLink
              to={"/rekap"}
              onClick={() => setShowNav(false)}
              className={
                path === "/rekap"
                  ? "text-sm md:text-base mr-3 border-b-2 border-white sm:border-black mb-3 text-white sm:mb-0 sm:text-black  "
                  : "text-sm md:text-base mr-3 mb-3 text-white sm:mb-0 sm:text-black"
              }
            >
              Rekap Penjualan
            </NavLink>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          {token !== null  && (
            <Link to="/cart">
              <p 
                onClick={() => setShowNav(false)}
                className={
                  path === "/cart"
                    ? "text-sm md:text-base mr-3 border-b-2 border-white sm:border-black mb-3 text-white sm:mb-0 sm:text-black block sm:hidden font-playfair"
                    : "text-sm md:text-base mr-3 mb-3 text-white sm:mb-0 sm:text-black block sm:hidden font-playfair"
                }
              >
                Cart
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-4 hidden sm:block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </Link>
          )}
          {token !== null || isAdmin ? (
            <>
              <button
                className="bg-[#cf6137] py-1 px-4 text-white font-base rounded-md mt-5 sm:mt-0 ml-0 sm:ml-3 w-full hidden sm:block"
                onClick={handleLogout}
              >
                Logout
              </button>
              <p 
                onClick={handleLogout}
                className="text-sm md:text-base mr-3 mb-3 text-white sm:mb-0 sm:text-black block sm:hidden font-playfair font-semibold"
              >
                Logout
              </p>
            </>
          ) : (
            <Link to="/login">
              <button className="bg-green py-1 px-4 text-white font-base rounded-md ml-3 hidden sm:block">
                Login
              </button>
              <p
                onClick={() => setShowNav(false)}
                className="text-sm md:text-base mr-3 mb-3 text-white sm:mb-0 sm:text-black block sm:hidden font-playfair font-semibold"
              >
                Login
              </p>
            </Link>
          )}
        </div>
      </>
    )
  }

  return (
    <>
      <div className="flex justify-unset sm:justify-around items-center bg-dark-plain py-3 pl-5 sm:pl-0">
        {/* button menu mobile */}
        <div className="block sm:hidden">
          <button onClick={() => setShowNav(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#07484A" className="w-6 h-6 mr-5 mt-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        {/* end button menu */}
        <h1 className="text-darkgreen font-bold text-xl">Bukapedia</h1>

        {/* laptop nav */}
        <div className="hidden sm:flex w-1/2 justify-between">
          {linkNavbar()}
        </div>

        {/* mobile nav */}
        {showNav && (
          <div className="fixed top-4 left-2 w-full max-w-[50%] bg-green rounded-lg shadow-lg p-6 block sm:hidden">
            <button className="absolute top-5 right-5" onClick={() => setShowNav(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {linkNavbar()}
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
