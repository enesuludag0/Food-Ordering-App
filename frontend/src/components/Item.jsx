import React, { useContext, useState } from "react";
import { FaStar, FaStarHalfStroke } from "react-icons/fa6";
import { TbShoppingBagPlus } from "react-icons/tb";
import { ShopContext } from "../context/ShopContext";

const Item = ({ food }) => {
  const [size, setSize] = useState(food.sizes[0]);
  const { addToCart } = useContext(ShopContext);

  return (
    <div className="bg-white rounded-xl relative -mt-20">
      {/* photo -top-[111px] */}
      <div className="flex justify-center rounded-full absolute left-0 right-0 m-6">
        <img src={food.image} alt="" width={177} height={177} className="object-contain aspect-square rounded-xl" />
      </div>
      {/* info */}
      <div className="mx-4 pt-52">
        {/* title and description */}
        <div className="py-3">
          <h4 className="bold-16 line-clamp-1 mb-1">{food.name}</h4>
          <div className="flex items-start justify-between pb-1">
            <h5 className="medium-14 mb-1">{food.category}</h5>
          </div>
          <p className="line-clamp-2">{food.description}</p>
        </div>
        {/* food sizes */}
        <div className="flex justify-between mb-2">
          <p className="flex items-center bold-16 text-secondary">{food.price[size]} TL</p>
          {food.sizes && food.sizes.filter(Boolean).length > 0 && (
            <div className="flex gap-1">
              {[...food.sizes]
                .filter(Boolean)
                .sort((a, b) => {
                  const order = ["H", "F", "S", "M", "L", "XL"];
                  return order.indexOf(a) - order.indexOf(b);
                })
                .map((item, i) => (
                  <button
                    key={i}
                    className={`h-6 w-8 bg-primary text-xs font-semibold rounded-sm ${
                      item === size ? "ring-1 ring-slate-900/10" : ""
                    }`}
                    onClick={() => setSize(item)}
                  >
                    {item}
                  </button>
                ))}
            </div>
          )}
        </div>
        {/* order button */}
        <div className="flex justify-center py-3">
          <button
            className="flex items-center gap-2 bg-secondary text-white medium-14 rounded px-2 py-1"
            onClick={() => addToCart(food._id, size)}
          >
            <TbShoppingBagPlus />
            Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
