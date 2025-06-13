import React, { useState } from "react";
import upload_icon from "../assets/upload_icon.png";
import { TbTrash } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import { BsInfoCircle } from "react-icons/bs";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [prices, setPrices] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [popular, setPopular] = useState(false);

  const addSizePrice = () => {
    const hasEmptySize = prices.some((p) => !p.size);
    if (hasEmptySize) {
      toast.error("Boyut eklemek istiyorsanız lütfen boyut alanını girin.");
      return;
    }
    setPrices([...prices, { size: "", price: "" }]); // Yeni bir boyut-fiyat çifti ekleniyor
  };

  const removeSizePrice = (index) => {
    setPrices(prices.filter((_, i) => i !== index)); // O boyut-fiyat çifti çıkartıldı
  };

  const handleSizePriceChange = (value, index, field) => {
    const updatedPrices = prices.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          [field]:
            field === "size"
              ? value.trim() === ""
                ? null
                : value.toUpperCase()
              : value.trim() === ""
              ? null
              : value
        };
      }
      return item;
    });

    setPrices(updatedPrices);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("image", image);
      // formData.append("prices", JSON.stringify(prices));
      formData.append(
        "prices",
        JSON.stringify(
          prices.filter((p) => p.price) // sadece dolu olanları gönder
        )
      );
      formData.append("popular", popular);

      const response = await axios.post(`${backendUrl}/api/product`, formData, {
        headers: { token }
      });

      if (response.statusText === "OK") {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setCategory("");
        setImage(null);
        setPrices([]);
        setPopular(false);
      }
      // console.log(...formData.entries());
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error);
    }
  };

  return (
    <div className="px-8 max-sm:py-8">
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-3 medium-14 sm:w-[777px]"
      >
        <div className="w-full">
          <h5 className="h5">Ürün Adı</h5>
          <input
            type="text"
            placeholder="Ürün adı"
            required
            className="w-full bg-white ring-1 ring-slate-900/10 rounded max-w-lg mt-1 px-3 py-1.5"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="w-full mt-2">
          <h5 className="h5">Açıklama</h5>
          <textarea
            rows={5}
            placeholder="Açıklama"
            required
            className="w-full bg-white ring-1 ring-slate-900/10 rounded max-w-lg mt-1 px-3 py-1.5"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className="flex items-end gap-6">
          <div>
            <h5 className="h5">Kategori</h5>
            <select
              className="sm:w-full bg-white text-gray-30 ring-1 ring-slate-900/10 rounded cursor-pointer mt-1 px-3 py-2"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="" hidden>
                Seçiniz
              </option>
              <option value="Pizza">Pizza</option>
              <option value="Burger">Burger</option>
              <option value="Döner">Döner</option>
              <option value="Izgara & Kebap">Izgara & Kebap</option>
              <option value="Pide & Lahmacun">Pide & Lahmacun</option>
              <option value="Tatlı">Tatlı</option>
              <option value="İçecek">İçecek</option>
            </select>
          </div>
          <div className="flex gap-2 pt-2">
            <label htmlFor="image">
              <img
                src={image ? URL.createObjectURL(image) : upload_icon}
                alt=""
                className="size-14 object-cover aspect-square ring-1 ring-slate-900/5 bg-white rounded-lg cursor-pointer"
              />
              <input
                type="file"
                name="image"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
                hidden
              />
            </label>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-center gap-2">
            <h5 className="h5 !mb-0">Boyut ve Fiyatlandırma</h5>
            <div className="relative flex items-center">
              <div className="group relative cursor-pointer">
                <BsInfoCircle className="text-base" />
                <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden group-hover:block bg-white text-xs px-2 py-1 rounded shadow-lg z-10 whitespace-nowrap">
                  Boyut eklemek istemezseniz sadece fiyatı girmeniz yeterlidir.
                </div>
              </div>
            </div>
          </div>
          {prices.map((item, index) => (
            <div key={index} className="flex items-end gap-4 mt-2">
              <input
                type="text"
                placeholder="(S, M, L)"
                className="w-20 bg-white ring-1 ring-slate-900/10 rounded px-3 py-2"
                onChange={(e) =>
                  handleSizePriceChange(e.target.value, index, "size")
                }
                value={item.size}
              />
              <input
                type="number"
                placeholder="Fiyat"
                min={0}
                required
                className="w-20 bg-white ring-1 ring-slate-900/10 rounded px-3 py-2"
                onChange={(e) =>
                  handleSizePriceChange(e.target.value, index, "price")
                }
                value={item.price}
              />
              <button
                type="button"
                className="text-red-500 text-xl !p-2"
                onClick={() => removeSizePrice(index)}
              >
                <TbTrash />
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn-secondary flex items-center gap-2 !rounded !text-sm mt-4 !px-3 !py-1"
            onClick={addSizePrice}
          >
            <FaPlus />
            {prices.length === 0 ? <span>Fiyat Gir</span> : "Boyut ekle"}
          </button>
        </div>
        <div className="flex items-center gap-2 my-2">
          <input
            type="checkbox"
            checked={popular}
            id="popular"
            className="cursor-pointer"
            onChange={(e) => setPopular(e.target.checked)}
          />
          <label htmlFor="popular" className="select-none cursor-pointer">
            Popüler ürünlere ekle
          </label>
        </div>
        <button
          type="submit"
          className="btn-dark !rounded mt-3 max-w-44 sm:w-full"
        >
          Ekle
        </button>
      </form>
    </div>
  );
};

export default Add;
