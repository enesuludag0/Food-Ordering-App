import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { PiForkKnifeFill } from "react-icons/pi";
import Navbar from "./Navbar";
import { CgMenuLeft } from "react-icons/cg";
import { TbUserCircle, TbArrowNarrowRight } from "react-icons/tb";
import { RiUserLine, RiShoppingBag4Line } from "react-icons/ri";
import { FaUser } from "react-icons/fa6";
import { ShopContext } from "../context/ShopContext";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);

  const { token, setToken, navigate, getCartCount } = useContext(ShopContext);

  const toggleMenu = () => {
    setMenuOpened((prev) => !prev);
  };

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <header className="fixed w-full bg-white top-0 left-0 right-0 z-50 py-4">
      <div className="max-container flex items-center justify-between">
        {/* { logo } */}
        <Link to={"/"} className="flex items-center gap-2 bold-24">
          <PiForkKnifeFill />
          <h1>
            <span className="text-secondary">Food</span>y
          </h1>
        </Link>

        {/* navbar */}
        <Navbar
          menuOpened={menuOpened}
          toggleMenu={toggleMenu}
          containerStyles={
            menuOpened
              ? "flex flex-col gap-12 h-screen w-[222px] absolute left-0 top-0 bg-white z-50 shadow-xl px-12 py-4 transition duration-500 ease-in-out"
              : "hidden md:flex items-center gap-5 py-2 xl:gap-8"
          }
        />

        {/* right side */}
        <div className="flex items-center gap-3 sm:gap-10">
          <CgMenuLeft
            className="cursor-pointer md:hidden hover:text-secondary transition"
            onClick={toggleMenu}
          />
          <Link to={"/cart"} className="flex items-center gap-2 cursor-pointer">
            <RiShoppingBag4Line className="text-[21px]" />
            <span className="text-base font-medium pt-0.5">Sepetim</span>
            {getCartCount() > 0 && (
              <div className="bg-secondary rounded-full text-white flex items-center justify-center medium-14 size-5">
                <span className="text-xs pt-0.5">{getCartCount()}</span>
              </div>
            )}
          </Link>
          <div className="group relative">
            <div onClick={() => !token && navigate("/login")}>
              {token ? (
                <div className="flex items-center gap-2 text-lg cursor-pointer">
                  <FaUser className="rounded-lg" />
                  <span className="text-base font-medium">Hesabım</span>
                </div>
              ) : (
                <button className="btn-outline flex items-center justify-center gap-2 !border-none hover:bg-primary transition-all duration-300">
                  <span className="text-base">Giriş Yap</span>
                  <RiUserLine />
                </button>
              )}
            </div>
            {token && (
              <ul className="z-50 bg-white shadow-sm p-2 w-40 ring-1 ring-slate-900/15 rounded cursor-pointer absolute right-[-30px] top-5 hidden group-hover:flex flex-col">
                <li
                  className="flex items-center justify-between"
                  onClick={() => navigate("/orders")}
                >
                  <p>Siparişlerim</p>
                  <TbArrowNarrowRight className="opacity-70 text-lg" />
                </li>
                <hr className="my-2" />
                <li
                  className="flex items-center justify-between"
                  onClick={() => navigate("/user-info")}
                >
                  <p>Kullanıcı Bilgilerim</p>
                  <TbArrowNarrowRight className="opacity-70 text-lg" />
                </li>
                <hr className="my-2" />
                <li
                  className="flex items-center justify-between"
                  onClick={logout}
                >
                  <p className="text-red-700">Çıkış Yap</p>
                  <TbArrowNarrowRight className="opacity-70 text-lg" />
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
