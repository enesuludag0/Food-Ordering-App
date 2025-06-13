import React from "react";
import Title from "../components/Title";
import { FaLocationDot, FaEnvelope, FaPhone } from "react-icons/fa6";

const Contact = () => {
  return (
    <section className="max-container mt-24">
      <div className="flex flex-col xl:flex-row xl:justify-between gap-20 py-6">
        {/* contact form */}
        <div>
          <Title title1={"İletişime"} title2={"Geçin"} title1Styles={"h3"} />
          <p className="max-w-xl mb-5">
            Sorularınız mı var ya da yardıma mı ihtiyacınız var? Bize bir mesaj
            gönderin, en kısa sürede size geri dönüş yapalım.
          </p>
          <form action="">
            <div className="flex gap-5">
              <div className="w-1/2 flex flex-col mb-4">
                <label htmlFor="firstName">Ad</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Ad"
                  required
                  className="border-none ring-1 ring-slate-900/5 regular-14 rounded mt-1 py-1.5 px-3"
                />
              </div>
              <div className="w-1/2 flex flex-col mb-4">
                <label htmlFor="lastName">Soyad</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Soyad"
                  required
                  className="border-none ring-1 ring-slate-900/5 regular-14 rounded mt-1 py-1.5 px-3"
                />
              </div>
            </div>
            <div className="flex gap-5">
              <div className="w-1/2 flex flex-col mb-4">
                <label htmlFor="email">E-posta adresi</label>
                <input
                  type="email"
                  name="email"
                  placeholder="E-posta adresi"
                  required
                  className="border-none ring-1 ring-slate-900/5 regular-14 rounded mt-1 py-1.5 px-3"
                />
              </div>
              <div className="w-1/2 flex flex-col mb-4">
                <label htmlFor="phoneNumber">Telefon</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Telefon"
                  required
                  className="border-none ring-1 ring-slate-900/5 regular-14 rounded mt-1 py-1.5 px-3"
                />
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="message">Mesaj</label>
              <textarea
                name="message"
                rows="4"
                placeholder="Mesaj"
                required
                className="border-none ring-1 ring-slate-900/5 regular-14 rounded resize-none mt-1 py-1.5 px-3"
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn-dark !rounded shadow-sm uppercase tracking-wider"
            >
              Gönder
            </button>
          </form>
        </div>

        {/* contact details */}
        <div>
          <Title title1={"İletişim"} title2={"Bilgileri"} title1Styles={"h3"} />
          <p className="max-w-xl mb-4">
            Size yardımcı olmak için her zaman buradayız! Aşağıdaki iletişim
            bilgilerinden herhangi biriyle bize ulaşmaktan çekinmeyin.
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <h5 className="h5 text-base">Konum</h5>
              <p className="flex items-center gap-2">
                <FaLocationDot className="-mt-4" />
                Tozkoparan, General Ali Rıza Gürcan Cd. Çırpıcı Çıkmazı Sok.{" "}
                <br /> No: 2 34173 Güngören/İstanbul
              </p>
            </div>
            <div className="flex flex-col">
              <h5 className="h5 text-base">E-posta adresi</h5>
              <p className="flex items-center gap-2">
                <FaEnvelope />
                info@espressolab.com
              </p>
            </div>
            <div className="flex flex-col">
              <h5 className="h5 text-base">Telefon</h5>
              <p className="flex items-center gap-2">
                <FaPhone />
                444 8 464
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* location map */}
      <div className="pt-14 pb-20">
        <h3 className="h3 mb-6">Konumumuz</h3>
        <div className="w-full h-96 rounded-lg shadow-sm overflow-hidden">
          <iframe
            className="size-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d632.9151288123337!2d28.89816225555456!3d41.0106240712218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cabbc3d267cc89%3A0x3d0d6b0fdc1af0ea!2sT%C3%BCrk%20Telekom%20Prime%20Espressolab%20Roastery!5e0!3m2!1str!2str!4v1745772381789!5m2!1str!2str"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
