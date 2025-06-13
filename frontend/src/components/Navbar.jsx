import React from "react";
import { Link, NavLink } from "react-router-dom";
import { TbHomeFilled } from "react-icons/tb";
import { IoMdListBox } from "react-icons/io";
import { IoMailOpen } from "react-icons/io5";
import { FaRegWindowClose } from "react-icons/fa";

const Navbar = ({ containerStyles, toggleMenu, menuOpened }) => {
  const navItems = [
    { to: "/", label: "Anasayfa", icon: <TbHomeFilled /> },
    { to: "/menu", label: "Menü", icon: <IoMdListBox /> },
    { to: "/contact", label: "İletişim", icon: <IoMailOpen /> }
  ];

  return (
    <nav className={containerStyles}>
      {/* inside navbar */}
      {menuOpened && (
        <>
          <FaRegWindowClose
            className="absolute top-4 right-4 text-xl cursor-pointer hover:text-secondary transition"
            onClick={toggleMenu}
          />
          <Link to={"/"} className="bold-24 my-10">
            <h1>
              <span className="text-secondary">Food</span>y
            </h1>
          </Link>
        </>
      )}
      {/* main navbar */}
      {navItems.map(({ to, label, icon }) => (
        <div key={label} className="inline-flex">
          <NavLink
            to={to}
            className={({ isActive }) =>
              isActive
                ? "navbar-active-link flex items-center gap-2"
                : "flex items-center gap-2"
            }
          >
            <span className="text-xl">{icon}</span>
            <span className="medium-16">{label}</span>
          </NavLink>
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
