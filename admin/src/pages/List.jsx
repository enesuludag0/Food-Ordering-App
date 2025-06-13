import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { TbTrash } from "react-icons/tb";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product`);

      if (response.statusText === "OK") {
        setList(response.data.products);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/product/${id}`, {
        headers: { token }
      });

      if (response.statusText === "OK") {
        toast.success(response.data.message);
        await getAllProducts();
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="px-8 max-sm:py-8 pb-8">
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr] items-center gap-8 bg-white rounded bold-14 sm:bold-15 mb-3 p-2">
          <h5>Resim</h5>
          <h5>Ürün Adı</h5>
          <h5>Kategori</h5>
          <h5>Fiyat</h5>
        </div>
        {/* Food list */}
        {list.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-[1fr_1fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr] items-center gap-8 bg-white rounded-xl p-2"
          >
            <img
              src={item.image}
              alt=""
              className="w-14 bg-primary rounded-lg p-1"
            />
            <h5 className="text-sm font-semibold">{item.name}</h5>
            <h5 className="text-sm font-semibold">{item.category}</h5>
            <div className="flex items-center justify-between">
              <h5 className="text-sm font-semibold">
                {Object.values(item.price)[0]} TL
              </h5>
              <TbTrash
                className="text-red-500 text-lg cursor-pointer"
                onClick={() => removeProduct(item._id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
