import React, { useContext, useEffect, useState } from "react";
import loginImg from "../assets/Login.png";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [currentPage, setCurrentPage] = useState("Giriş Yap");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (currentPage === "Kayıt Ol") {
        const response = await axios.post(`${backendUrl}/api/user/signup`, {
          firstName,
          lastName,
          email,
          password
        });

        if (response.statusText === "OK") {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Kayıt işlemi başarılı. Giriş yapabilirsiniz.");
          // setCurrentPage("Giriş Yap");
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password
        });

        if (response.statusText === "OK") {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Giriş işlemi başarılı.");
        }
      }
    } catch (err) {
      console.log(err);
      const errorMessages = err.response.data.error.split(",");
      toast.error(
        <div>
          {errorMessages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
      );
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <section className="absolute top-0 left-0 size-full z-50 bg-white">
      <div className="flex size-full">
        {/* image */}
        <div className="w-1/2 hidden sm:block">
          <img src={loginImg} alt="" className="size-full object-cover" />
        </div>
        {/* form side */}
        <div className="flex items-center justify-center w-full sm:w-1/2">
          <form
            onSubmit={handleLogin}
            className="flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-5 text-gray-800"
          >
            <h3 className="bold-36 mb-4">{currentPage}</h3>
            {currentPage === "Kayıt Ol" && (
              <div className="w-full flex-wrap flex gap-5">
                <div className="flex-1 min-w-[150px] flex flex-col">
                  <label htmlFor="firstName" className="medium-14 ml-1">
                    Ad
                  </label>
                  <input
                    type="text"
                    placeholder="Ad"
                    required
                    className="bg-primary focus:bg-white border-none outline-none ring-1 ring-slate-900/15 focus:ring-gray-400 regular-14 rounded mt-1 py-1.5 px-3"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                  />
                </div>
                <div className="flex-1 min-w-[150px] flex flex-col">
                  <label htmlFor="lastName" className="medium-14 ml-1">
                    Soyad
                  </label>
                  <input
                    type="text"
                    placeholder="Soyad"
                    required
                    className="bg-primary focus:bg-white border-none outline-none ring-1 ring-slate-900/15 focus:ring-gray-400 regular-14 rounded mt-1 py-1.5 px-3"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                  />
                </div>
              </div>
            )}
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
            <span className="w-full medium-14 underline cursor-pointer">
              Şifremi Unuttum
            </span>
            <button type="submit" className="btn-dark w-full !rounded !py-2">
              {currentPage === "Kayıt Ol" ? "Kayıt Ol" : "Giriş Yap"}
            </button>
            {currentPage === "Kayıt Ol" ? (
              <div className="flex flex-col items-center medium-14">
                Zaten bir hesabınız var mı?
                <span
                  className="text-secondary cursor-pointer"
                  onClick={() => setCurrentPage("Giriş Yap")}
                >
                  Giriş Yap
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center medium-14">
                Hesabınız yok mu?
                <span
                  className="text-secondary cursor-pointer"
                  onClick={() => setCurrentPage("Kayıt Ol")}
                >
                  Kaydol
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
