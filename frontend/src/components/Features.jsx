import React from "react";
import { MdOutlineDeliveryDining } from "react-icons/md";
import delivery from "../assets/fast-delivery.svg";
import hot from "../assets/hot-food.svg";
import fresh from "../assets/fresh-food.svg";
import chef from "../assets/hat-chef.svg";

const Features = () => {
  return (
    <section className="max-container !px-12 py-16 !pb-12 xl:py-28">
      <div className="max-container !px-12 grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="flex flex-col items-center justify-center gap-4">
          <img src={delivery} alt="" width={44} height={44} />
          <div className="flex flex-col items-center justify-center gap-1">
            <h4 className="h4 my-0">Hızlı Teslimat</h4>
            <hr className="w-8 h-1 bg-secondary rounded-full border-none" />
          </div>
          <p className="text-center">
            Siparişinizi güvenilir ve etkili hizmetimizle hızlı bir şekilde
            alın.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <img src={hot} alt="" width={44} height={44} />
          <div className="flex flex-col items-center justify-center gap-1">
            <h4 className="h4 my-0">Sıcak Lezzetler</h4>
            <hr className="w-8 h-1 bg-secondary rounded-full border-none" />
          </div>
          <p className="text-center">
            Taze hazırlanmış, dumanı üstünde yemeklerin tadını çıkarın; doğrudan
            kapınıza teslim edilir.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <img src={fresh} alt="" width={44} height={44} />
          <div className="flex flex-col items-center justify-center gap-1">
            <h4 className="h4 my-0">Taze Yiyecekler</h4>
            <hr className="w-8 h-1 bg-secondary rounded-full border-none" />
          </div>
          <p className="text-center">
            Her gün en taze ve en kaliteli malzemelerle hazırlanmış yemekler
            sunuyoruz.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <img src={chef} alt="" width={44} height={44} />
          <div className="flex flex-col items-center justify-center gap-1">
            <h4 className="h4 my-0">Uzman Şefler</h4>
            <hr className="w-8 h-1 bg-secondary rounded-full border-none" />
          </div>
          <p className="text-center">
            Usta şeflerimiz her yemeği tutku ve titizlikle hazırlar.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
