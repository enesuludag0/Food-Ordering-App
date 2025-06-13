import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import Item from "../components/Item";

const PopularFoods = () => {
  const [popularFoods, setPopularFoods] = useState([]);
  const { foods } = useContext(ShopContext);

  useEffect(() => {
    const data = foods.filter((item) => item.popular);
    setPopularFoods(data.slice(0, 5));
  }, [foods]); // foods değiştiğinde useEffect çalışacak

  return (
    <section className="max-container pt-16 pb-24">
      <Title
        title1={"Popüler"}
        title2={"Yemekler"}
        titleStyles={"text-center"}
        descriptionStyles={"!block"}
      />
      {/* container */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-36 pt-28">
        {popularFoods.map((food) => (
          <div key={food._id}>
            <Item food={food} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularFoods;

{
  /* <div className="relative group">
<span className="text-3xl font-bold text-white relative z-10 px-4 py-2">
  Arka Plan Animasyonu
</span>
<span className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left z-0 rounded" />
</div>

<button className="relative overflow-hidden px-6 py-3 text-black border border-white rounded-lg group bg-red-700">
<span className="relative z-10">Tıklayın</span>
<span className="absolute inset-0 bg-white scale-0 group-hover:scale-150 transition-transform duration-500 ease-out rounded-full origin-center"></span>
</button> */
}
