import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import PlaceOrder from "./pages/PlaceOrder";
import Verify from "./pages/Verify";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import Layout from "./layouts/Layout";
import UserInfo from "./pages/UserInfo";

const App = () => {
  return (
    <main className="bg-primary text-tertiary overflow-hidden">
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/user-info" element={<UserInfo />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
        </Route>

        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
      <Footer />
    </main>
  );
};

export default App;
