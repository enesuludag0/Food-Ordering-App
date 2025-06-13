import React, { useState } from "react";
import loginImg from "../assets/Login.png";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(`${backendUrl}/api/user/admin`, {
        email,
        password
      });

      const token = response.data.token;
      if (token) {
        setToken(token);
        console.log(response);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error);
    }
  };

  return (
    <section className="absolute top-0 left-0 size-full z-50 bg-white">
      <div className="flex size-full">
        {/* image */}
        <div className="w-1/2 hidden sm:block">
          <img src={loginImg} alt="" className="size-full object-cover" />
        </div>
        {/* form side */}
        <div className="w-full flex items-center justify-center sm:w-1/2">
          <form
            action=""
            className="flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-5 text-gray-800"
            onSubmit={submitHandler}
          >
            <h3 className="bold-36 mb-4">Giriş Yap</h3>
            <div className="w-full">
              <label htmlFor="email" className="medium-14 ml-1">
                E-posta adresi
              </label>
              <input
                type="email"
                placeholder="E-posta adresi"
                required
                className="w-full bg-primary focus:bg-white border-none outline-none ring-1 ring-slate-900/15 focus:ring-gray-400 regular-14 rounded mt-1 py-1.5 px-3"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="w-full">
              <label htmlFor="password" className="medium-14 ml-1">
                Şifre
              </label>
              <input
                type="password"
                placeholder="Şifre"
                required
                className="w-full bg-primary focus:bg-white border-none outline-none ring-1 ring-slate-900/15 focus:ring-gray-400 regular-14 rounded mt-1 py-1.5 px-3"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <button
              type="submit"
              className="btn-dark w-full !rounded mt-5 !py-2"
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
