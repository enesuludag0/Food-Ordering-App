import { createContext, useEffect, useState } from "react";
import { toastSuccess } from "../components/Toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  let deliveryCharges = 50;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [foods, setFoods] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  //! tüm ürünleri getirme
  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product`);

      if (response.statusText === "OK") {
        setFoods(response.data.products);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error);
    }
  };

  //! sepete ürün ekleme
  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems); //derin kopya

    // Sepette bu ürün varsa
    if (cartData[itemId]) {
      // Sepette bu ürünün seçilen boyutu varsa, adeti 1 artır
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      }
      // Yoksa sepete yeni boyut ekle
      else {
        cartData[itemId][size] = 1;
      }
    }
    // Sepette bu ürün yoksa ürünü ve seçilen boyutu sepete ekle
    else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart`,
          { itemId, size },
          { headers: { token } }
        );

        toastSuccess("Ürün sepete eklendi", "/cart", "Sepete git", navigate);
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.error);
      }
    }
  };

  //! sepetteki ürünün miktarını güncelleme
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    if (quantity === 0) {
      // Ürünün o bedenini sil
      delete cartData[itemId][size];

      // Eğer o ürünün hiç bedeni kalmadıysa, ürünü de sil
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      // Quantity > 0 ise güncelle
      cartData[itemId][size] = quantity;
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.put(
          `${backendUrl}/api/cart/${itemId}`,
          { size, quantity },
          { headers: { token } }
        );
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.error);
      }
    }
  };

  //! sepetteki tüm ürünleri silme
  const clearCart = async () => {
    const confirmation = window.confirm(
      "Sepetteki tüm ürünleri silmek istediğinize emin misiniz?"
    );
    if (confirmation) {
      setCartItems({});

      if (token) {
        try {
          await axios.delete(`${backendUrl}/api/cart`, {
            headers: { token }
          });
        } catch (err) {
          console.log(err);
          toast.error(err.response.data.error);
        }
      }
    }
  };

  //! toplam sepet tutarı
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      let filtered = foods.find((food) => food._id === itemId);
      if (!filtered) continue;

      for (const size in cartItems[itemId]) {
        try {
          // Ürünün price'ı direkt bir sayıysa
          if (typeof filtered.price === "number") {
            totalAmount += filtered.price[size] * cartItems[itemId][size];
          }
          // Ürünün boyutlara göre fiyatı varsa
          else if (
            typeof filtered.price === "object" &&
            filtered.price[size] !== undefined
          ) {
            totalAmount += filtered.price[size] * cartItems[itemId][size];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalAmount;
  };

  //! toplam sepet sayısı
  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        try {
          if (cartItems[itemId][size] > 0) {
            totalCount += cartItems[itemId][size];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCount;
  };

  //! kullanıcının sepetini getirme
  const getUserCart = async (token) => {
    try {
      const response = await axios.get(`${backendUrl}/api/cart`, {
        headers: { token }
      });

      if (response.statusText === "OK") {
        setCartItems(response.data.cartData);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
    getAllProducts();
  }, []);

  useEffect(() => {
    if (token) {
      getUserCart(token);
    }
  }, [token]);

  const contextValue = {
    foods,
    token,
    setToken,
    navigate,
    cartItems,
    setCartItems,
    addToCart,
    updateQuantity,
    clearCart,
    getCartCount,
    getTotalCartAmount,
    backendUrl,
    deliveryCharges
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
