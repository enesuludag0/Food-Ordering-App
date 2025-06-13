import React from "react";
import { Link } from "react-router-dom";
import { PiForkKnifeFill } from "react-icons/pi";

const Header = () => {
  return (
    <header className="w-full bg-white">
      <div className="max-container flex items-center justify-center py-4">
        {/* { logo } */}
        <Link to={"/"} className="flex items-center gap-2 bold-24">
          <PiForkKnifeFill />
          <h1>
            <span className="text-secondary">Food</span>y
          </h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
