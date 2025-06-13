import { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import { ToastContainer } from "react-toastify";
import Login from "./components/Login";
import OrderDetails from "./pages/OrderDetails";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token); // token'ı localStorage'a kaydet
    } else {
      localStorage.removeItem("token"); // localStorage'dan token'ı sil
    }
  }, [token]);

  return (
    <main className="bg-primary text-tertiary">
      <ToastContainer />
      {token ? (
        <>
          <Header />
          <div className="mx-auto max-w-[1440px] flex flex-col sm:flex-row mt-8">
            <Sidebar setToken={setToken} />
            <Routes>
              <Route path="/" element={<Add token={token} />} />
              <Route path="/list" element={<List token={token} />} />
              <Route path="/orders" element={<Orders token={token} />} />
              <Route
                path="/orders/:id"
                element={<OrderDetails token={token} />}
              />
            </Routes>
          </div>
        </>
      ) : (
        <Login setToken={setToken} />
      )}
    </main>
  );
};

export default App;
