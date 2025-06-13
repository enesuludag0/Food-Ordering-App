import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import { LuTrash2 } from "react-icons/lu";
import { FaMinus, FaPlus } from "react-icons/fa6";
import CartTotal from "../components/CartTotal";
import PopularFoods from "../components/PopularFoods";
import { RiShoppingBasketLine } from "react-icons/ri";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [quantities, setQuantities] = useState({});
  const {
    foods,
    cartItems,
    clearCart,
    updateQuantity,
    getCartCount,
    navigate
  } = useContext(ShopContext);

  //! sepetteki ürünü arttırma
  const increment = (itemId, size) => {
    const key = `${itemId}-${size}`;
    const count = quantities[key] + 1;
    setQuantities((prev) => ({ ...prev, [key]: count }));
    updateQuantity(itemId, size, count);
  };

  //! sepetteki ürünü azaltma
  const decrement = (itemId, size) => {
    const key = `${itemId}-${size}`;
    if (quantities[key] > 1) {
      const count = quantities[key] - 1;
      setQuantities((prev) => ({ ...prev, [key]: count }));
      updateQuantity(itemId, size, count);
    }
  };

  useEffect(() => {
    if (foods.length > 0) {
      const cartList = []; // Sepetteki ürünleri tutacak geçici liste
      const quantitiesData = {}; // Ürünlerin miktarlarını ayrı tutacak nesne
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            cartList.push({
              _id: itemId,
              size: size,
              quantity: cartItems[itemId][size]
            });
            quantitiesData[`${itemId}-${size}`] = cartItems[itemId][size];
          }
        }
      }
      setCartData(cartList);
      setQuantities(quantitiesData);
    }
  }, [cartItems, foods]);

  return (
    <section className="max-container mt-24">
      {getCartCount() > 0 ? (
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-8 lg:gap-x-16 pt-6">
          <div className="col-span-2">
            <div className="flex items-center justify-between">
              <Title
                title1={"Sepetim"}
                title2={`(${getCartCount()} ürün)`}
                title1Styles={"h2 !m-0"}
              />
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={clearCart}
              >
                <span className="text-secondary text-sm">Ürünleri sil</span>
                <LuTrash2 className="text-secondary text-xl" />
              </div>
            </div>
            {/* product list */}
            {cartData.map((item, i) => {
              const productData = foods.find(
                (product) => product._id === item._id
              );
              const key = `${item._id}-${item.size}`;

              return (
                <div key={i} className="bg-white rounded-xl mt-6 p-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-start rounded-xl p-2">
                      <img src={productData.image} alt="" className="w-20" />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <div className="flex items-center justify-between">
                        <h4 className="h4 !my-0 line-clamp-1">
                          {productData.name}
                        </h4>
                        <LuTrash2
                          className="size-7 bg-secondary rounded-full bg-opacity-15 text-secondary cursor-pointer p-1.5"
                          onClick={() => updateQuantity(item._id, item.size, 0)}
                        />
                      </div>
                      <p className="bold-14 my-0.5">{item.size}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-primary ring-1 ring-slate-900/5 rounded-full">
                          <button
                            className={`rounded-full shadow-md p-1 ${
                              quantities[key] === 1
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-white text-secondary"
                            }`}
                            onClick={() => decrement(item._id, item.size)}
                          >
                            <FaMinus />
                          </button>
                          <p>{quantities[key]}</p>
                          <button
                            className="bg-white text-secondary rounded-full shadow-md p-1"
                            onClick={() => increment(item._id, item.size)}
                          >
                            <FaPlus />
                          </button>
                        </div>
                        <h4 className="h4 font-extrabold  text-secondary">
                          {productData.price[item.size] * quantities[key]} TL
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* cart total */}
          {Object.keys(cartItems).length > 0 && (
            <div className="col-span-1">
              <CartTotal />
              <button
                className="btn-dark mt-7 !px-6"
                onClick={() => navigate("/place-order")}
              >
                Sepeti Onayla
              </button>
            </div>
          )}
        </div>
      ) : (
        //! empty cart
        <div className="flex flex-col items-center text-center space-y-4 mt-40 mb-12">
          <RiShoppingBasketLine className="text-7xl" />
          <h1 className="text-4xl font-bold">Sepetin şu an boş</h1>
          <p className="text-sm">
            Sepetini lezzetli yemeklerle doldurmak için <br /> aşağıdaki butona
            tıklayarak hemen ürünlere göz atabilirsin.
          </p>
          <button className="btn-dark !mt-10" onClick={() => navigate("/menu")}>
            Alışverişe Başla
          </button>
        </div>
      )}
      {/* popular foods */}
      <div className="col-span-full mt-8">
        <PopularFoods />
      </div>
    </section>
  );
};

export default Cart;
