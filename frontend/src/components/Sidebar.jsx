import { NavLink } from "react-router-dom";
import { FaSquarePlus } from "react-icons/fa6";
import { FaListAlt, FaBox } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import Title from "./Title";

const Sidebar = () => {
  const navLinkClasses = ({ isActive }) =>
    `px-4 h-10 ${
      isActive
        ? "sidebar-active-link border-r-4"
        : "flex items-center gap-3 medium-15 rounded-lg hover:bg-secondary hover:bg-opacity-25"
    }`;

  return (
    <aside className="hidden md:flex flex-col gap-6 w-72 mb-12">
      <Title title1={"Hesabım"} titleStyles={"!pb-0"} title1Styles={"!m-0"} />
      <div className="bg-white rounded-2xl">
        <div className="flex flex-col gap-2 px-6 py-6">
          <NavLink to={"/orders"} className={navLinkClasses}>
            <FaBox />
            <span className="hidden lg:flex text-tertiary">Siparişlerim</span>
          </NavLink>
          <NavLink to={"/user-info"} className={navLinkClasses}>
            <FaUser className="rounded-md" />
            <span className="hidden lg:flex text-tertiary">
              Kullanıcı Bilgilerim
            </span>
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
