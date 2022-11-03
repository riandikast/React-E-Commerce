import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Rekap from "../pages/admin/Rekap";
import Stok from "../pages/admin/Stok";
import Cart from "../pages/user/Cart";
import Detail from "../pages/user/Detail";
import Home from "../pages/user/Home";
import Login from "../pages/user/Login";

function AnimatedRoutes() {
  let location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
        {/* admin */}
        <Route path="/stok" element={<Stok />} />
        <Route path="/rekap" element={<Rekap />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
