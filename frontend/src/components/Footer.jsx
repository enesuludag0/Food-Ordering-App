import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PiForkKnifeFill } from "react-icons/pi";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaLinkedinIn } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FOOTER_LINKS } from "../assets/data";

const Footer = () => {
  const SOCIALS = {
    links: [
      "https://www.facebook.com/",
      "https://www.instagram.com/",
      "https://x.com/",
      "https://www.youtube.com/",
      "https://www.linkedin.com/"
    ],
    icons: [<FaFacebookF />, <FaInstagram />, <FaTwitter />, <FaYoutube />, <FaLinkedinIn />]
  };

  const [hoveredColumn, setHoveredColumn] = useState("left");

  return (
    <footer>
      {/* main footer */}
      <div className="grid grid-cols-7" onMouseLeave={() => setHoveredColumn("left")}>
        {/* footer left */}
        <div
          className={`col-span-2 footer-left ${hoveredColumn === "left" ? "hovered" : ""}`}
          onMouseEnter={() => setHoveredColumn("left")}
        >
          <div className="flex flex-col items-center gap-8">
            {/* { logo } */}
            <Link
              to={"/"}
              className={`flex items-center gap-2 bold-52 ${hoveredColumn === "left" ? "text-white" : "text-black"}`}
            >
              <PiForkKnifeFill />
              <h1>
                <span className="text-secondary">Food</span>y
              </h1>
            </Link>
            {/* social media */}
            <FooterColumn>
              <ul className="flex gap-4">
                {SOCIALS.links.map((link, i) => (
                  <li key={i} className="relative">
                    <Link to={link} target="_blank" rel="noopener noreferrer" className="social-btn border border-tertiary">
                      <span className="z-10">{SOCIALS.icons[i]}</span>
                      {/* <span className="absolute inset-1 bg-white scale-0 group-hover:scale-100 origin-center transition-transform duration-500"></span> */}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterColumn>
          </div>
          <p
            className={`w-full text-center text-xs uppercase absolute left-0 bottom-10 ${
              hoveredColumn === "left" ? "text-white" : "text-black"
            }`}
          >
            Copyright © {new Date().getFullYear()} Foody Tüm hakları saklıdır.
          </p>
        </div>

        {/* footer right */}
        <div
          className={`col-span-5 footer-right ${hoveredColumn === "right" ? "hovered" : ""}`}
          onMouseEnter={() => setHoveredColumn("right")}
        >
          {FOOTER_LINKS.map((col) => (
            <FooterColumn key={col.title} title={col.title} hoveredColumn={hoveredColumn}>
              <ul className="flex flex-col gap-4 regular-14">
                {col.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={col.urls && col.urls[i] ? col.urls[i] : "/"}
                      className="relative flex items-start gap-4 max-w-[290px] break-words"
                    >
                      {col.icons &&
                        (Array.isArray(col.icons) ? (
                          <>
                            <span className="text-tertiary pt-1">{col.icons[i]}</span>
                            <span>{link}</span>
                          </>
                        ) : (
                          <>
                            <span className="text-tertiary text-xs pt-1 ">{col.icons}</span>
                            <span className="-ml-2.5">{link}</span>
                          </>
                        ))}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterColumn>
          ))}
          <div className={`${hoveredColumn === "right" ? "text-white" : "text-tertiary"}`}>
            <div className="flex flex-col gap-1 pb-[30px]">
              <h4 className="bold-18 whitespace-nowrap uppercase">E-bülten</h4>
              <hr className={`w-[50px] h-[2.5px] border-0 ${hoveredColumn === "right" ? "bg-white" : "bg-tertiary "}`} />
            </div>
            <p className="max-w-[290px] break-words mb-4">Yeniliklerden haberdar olmak için e-posta listemize kayıt olun</p>
            <form method="post" className="flex mb-4">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                required
                className={`h-10 w-52 text-sm bg-transparent text-tertiary border outline-none px-4 py-1.5 ${
                  hoveredColumn === "right" ? "border-tertiary placeholder:text-tertiary" : "border-black"
                }`}
              />
              <button
                type="submit"
                className={`size-10 flex items-center justify-center ${
                  hoveredColumn === "right" ? "bg-white text-black" : "bg-black text-white"
                }`}
              >
                <FaLongArrowAltRight />
              </button>
            </form>
            <p>Gizliliğe önem veriyoruz</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, children, hoveredColumn }) => {
  return (
    <div className={`${hoveredColumn === "right" ? "text-white" : "text-tertiary"}`}>
      {title && (
        <div className="flex flex-col gap-1 pb-[30px]">
          <h4 className="bold-18 whitespace-nowrap uppercase">{title}</h4>
          <hr className={`w-[50px] h-[2.5px] border-0 ${hoveredColumn === "right" ? "bg-white" : "bg-tertiary "}`} />
        </div>
      )}
      {children}
    </div>
  );
};

export default Footer;
