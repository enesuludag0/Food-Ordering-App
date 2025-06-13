import React from "react";
import { GiCheckMark } from "react-icons/gi";
import process1 from "../assets/process1.jpg";
import process2 from "../assets/process2.jpg";

const Process = () => {
  return (
    <section className="max-container !px-12 py-16 md:py-20">
      {/* container */}
      <div className="flex flex-col gap-20 lg:flex-row">
        {/* left side */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="h2 lg:max-w-[400px] text-center lg:text-left">
            Yalnızca Birkaç Tıklamayla Favori Yemeğini Sipariş Et
          </h2>
          <p className="text-center lg:text-left">
            Lezzetli yemekleri dilediğin zaman, dilediğin yerden sipariş etmenin
            rahatlığını yaşa. Aşağıdaki basit adımları takip et ve favori
            yemeğin kapına gelsin.
          </p>
          <div className="flex flex-col gap-4 my-7 md:items-center lg:items-start">
            <div className="flex items-center gap-4">
              <span className="size-6 bg-secondary text-white rounded-full flex items-center justify-center p-1.5">
                <GiCheckMark />
              </span>
              <p>Geniş yemek ve mutfak seçeneklerini keşfet.</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="size-6 bg-secondary text-white rounded-full flex items-center justify-center p-1.5">
                <GiCheckMark />
              </span>
              <p>Favori ürünlerini seç ve sepete ekle.</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="size-6 bg-secondary text-white rounded-full flex items-center justify-center p-1.5">
                <GiCheckMark />
              </span>
              <p>Bilgilerini gir ve siparişini kolayca onayla.</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="size-6 bg-secondary text-white rounded-full flex items-center justify-center p-1.5">
                <GiCheckMark />
              </span>
              <p>Yemeğin gelene kadar takip et.</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="size-6 bg-secondary text-white rounded-full flex items-center justify-center p-1.5">
                <GiCheckMark />
              </span>
              <p>Lezzetin keyfini çıkar.</p>
            </div>
          </div>
        </div>
        {/* right side */}
        <div className="flex-1 flex justify-center gap-6 md:gap-12">
          <div className="">
            <img src={process1} alt="" className="rounded-xl" />
          </div>
          <div className="relative top-8">
            <img src={process2} alt="" className="rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
