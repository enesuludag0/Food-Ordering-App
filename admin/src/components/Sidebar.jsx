import { NavLink } from "react-router-dom";
import { FaSquarePlus } from "react-icons/fa6";
import { FaListAlt, FaBox } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

const Sidebar = ({ setToken }) => {
  const navLinkClasses = ({ isActive }) =>
    `max-sm:w-10 sm:pl-7 ${
      isActive
        ? "active-link max-sm:justify-center max-sm:border-b-4 sm:border-r-4"
        : "flex items-center max-sm:justify-center gap-3 medium-15 h-10 rounded-lg hover:bg-secondary hover:bg-opacity-25"
    }`;

  return (
    <aside className="max-sm:flex max-sm:justify-center bg-white rounded pb-4 sm:w-1/5 sm:min-h-screen">
      <div className="flex max-sm:items-center sm:flex-col pt-5 px-6">
        <div className="flex sm:flex-col gap-x-5 gap-y-8 sm:pt-10">
          <NavLink to={"/"} className={navLinkClasses}>
            <FaSquarePlus />
            <span className="hidden lg:flex text-tertiary">Ürün Ekle</span>
          </NavLink>
          <NavLink to={"/list"} className={navLinkClasses}>
            <FaListAlt />
            <span className="hidden lg:flex text-tertiary">Tüm Ürünler</span>
          </NavLink>
          <NavLink to={"/orders"} className={navLinkClasses}>
            <FaBox />
            <span className="hidden lg:flex text-tertiary">Siparişler</span>
          </NavLink>
        </div>
        <div className="max-sm:ml-5 sm:mt-80">
          <button
            className="flex items-center gap-2 text-red-500 medium-15 h-10 rounded-xl cursor-pointer p-5 sm:pl-12"
            onClick={() => setToken("")}
          >
            <MdLogout className="rotate-180 text-lg" />
            <span className="hidden lg:flex">Çıkış Yap</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
