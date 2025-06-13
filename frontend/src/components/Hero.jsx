import React from "react";
import { NavLink } from "react-router-dom";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdShareLocation } from "react-icons/md";

const Hero = () => {
  return (
    <section className="mx-auto">
      <div className="relative bg-hero bg-cover bg-center bg-no-repeat w-full h-[746px]">
        <div className="max-container !px-12 absolute top-36 sm:top-72 text-white">
          <h1 className="h1 max-w-[48rem] capitalize">
            Acıktıysan düşünme hemen sipariş ver,
            <span className="text-secondary"> tık diye kapına gelsin!</span>
          </h1>
          <p className="text-white text-base mt-6 max-w-[36rem]">
            İster yoğun bir iş gününde olun, ister evde keyif yapıyor olun,
            acıktığınız anda en sevdiğiniz lezzetler parmaklarınızın ucunda!
            Özenle hazırlanmış, taptaze yemekler güvenilir ve hızlı teslimatla
            dakikalar içinde kapınızda. İster bol malzemeli bir burger, ister
            çıtır çıtır bir pizza… Canınız ne isterse hemen sipariş verin,
            dilediğiniz lezzetin keyfini çıkarın.
          </p>
          <div className="max-xs:flex-col flex gap-4 mt-10">
            <NavLink
              to={"/menu"}
              className="btn-white flex justify-center gap-3"
            >
              <IoFastFoodOutline className="text-xl" />
              Sipariş ver
            </NavLink>
            <NavLink
              to={"/orders"}
              className="btn-white flex justify-center gap-3"
            >
              <MdShareLocation className="text-xl" />
              Siparişi takip et
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
