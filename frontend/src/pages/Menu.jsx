import { useContext, useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { LuSettings2 } from "react-icons/lu";
import { categories } from "../assets/data";
import Title from "../components/Title";
import Item from "../components/Item";
import { ShopContext } from "../context/ShopContext";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const Menu = () => {
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [showCategories, setShowCategories] = useState(true);
  const [search, setSearch] = useState("");

  const { foods } = useContext(ShopContext);

  const applyFilters = () => {
    let filtered = [...foods];

    //! search filter
    if (search) {
      filtered = filtered.filter((food) =>
        food.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    //! category filter
    if (category.length) {
      filtered = filtered.filter((food) => category.includes(food.category));
    }

    return filtered;
  };

  const applySorting = (foodsList) => {
    const sortedFoods = [...foodsList];

    switch (sortType) {
      case "low":
        return sortedFoods.sort((a, b) => {
          const aPrice = a.price[a.sizes[0]];
          const bPrice = b.price[b.sizes[0]];
          return aPrice - bPrice;
        });
      case "high":
        return sortedFoods.sort((a, b) => {
          const aPrice = a.price[a.sizes[0]];
          const bPrice = b.price[b.sizes[0]];
          return bPrice - aPrice;
        });
      default:
        return sortedFoods;
    }
  };

  const toggleFilter = (value, checked, setState) => {
    setState(
      (prev) =>
        checked
          ? [...prev, value] // işaretlendi → ekle
          : prev.filter((item) => item !== value) // kaldırıldı → çıkar
    );
  };

  const toggleShowCategories = () => {
    setShowCategories(!showCategories);
  };

  useEffect(() => {
    let filtered = applyFilters();
    let sorted = applySorting(filtered);
    setFilteredFoods(sorted);
  }, [category, foods, search, sortType]); // category, foods, search ve sort'daki değer değiştiğinde useEffect çalışacak

  return (
    <section className="max-container mt-24">
      {/* search box */}
      <div className="flex justify-center">
        <div className="flex items-center justify-center bg-white w-full sm:w-2/3 lg:w-1/3 rounded-full p-4 px-5 overflow-hidden">
          <div className="text-lg">
            <RiSearch2Line />
          </div>
          <input
            type="text"
            placeholder="Ürün Ara"
            className="border-none outline-none w-full text-sm pl-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div
            className="flex items-center h-full text-lg border-l cursor-pointer pl-3"
            onClick={toggleShowCategories}
          >
            <LuSettings2 />
          </div>
        </div>
      </div>

      {/* categories filter */}
      {showCategories && (
        <div className="mt-12">
          <div className="flex justify-center flex-wrap gap-x-10 gap-y-4">
            {categories.map((categ) => (
              <label key={categ.name} className="relative bg-white rounded-lg">
                <input
                  type="checkbox"
                  className="hidden peer"
                  value={categ.name}
                  checked={category.includes(categ.name)}
                  onChange={(e) =>
                    toggleFilter(e.target.value, e.target.checked, setCategory)
                  }
                />
                <div className="hidden peer-checked:flex absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white size-10 rounded-full items-center justify-center">
                  <IoMdCheckmarkCircleOutline className="text-secondary text-3xl" />
                </div>
                <div className="flex flex-col gap-2 peer-checked:bg-secondary peer-checked:bg-opacity-40 peer-checked:rounded-lg cursor-pointer">
                  <div className="w-40 h-32 flex items-center justify-center">
                    <img
                      src={categ.image}
                      alt=""
                      className="size-32 object-cover mt-2"
                    />
                  </div>
                  <hr className="" />
                  <span className="flex justify-center pb-2 text-secondary">
                    {categ.name}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* food container */}
      <div className="mt-16 mb-24">
        {/* title and sort */}
        <div className="flex items-start justify-between gap-7 max-sm:flex-col max-sm:items-center max-sm:text-center">
          <Title
            title1={"Yemek"}
            title2={"Listemiz"}
            titleStyles={"!pb-0"}
            descriptionStyles={"!block"}
          />
          <div className="flex items-center gap-x-2">
            <span className="hidden sm:flex medium-16">Sırala:</span>
            <select
              className="text-sm p-2.5 outline-none bg-white rounded"
              onChange={(e) => setSortType(e.target.value)}
              value={sortType}
            >
              <option value="relevant">En Alakalı</option>
              <option value="low">En Düşük</option>
              <option value="high">En Yüksek</option>
            </select>
          </div>
        </div>
        {/* foods */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-28 mt-28 xl:mt-28">
          {filteredFoods.length > 0 ? (
            filteredFoods.map((food) => <Item key={food._id} food={food} />)
          ) : (
            <div className="col-span-full text-center space-y-4 ">
              <h1 className="text-4xl font-bold">Oops!</h1>
              <p className="text-sm">
                Şu anda seçtiğiniz kriterlere uygun bir yemek bulunamadı.
                <br />
                Başka bir filtre deneyin!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Menu;
