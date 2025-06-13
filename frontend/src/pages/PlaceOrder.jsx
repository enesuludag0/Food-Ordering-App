import { useContext, useEffect, useState } from "react";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const {
    foods,
    cartItems,
    setCartItems,
    getTotalCartAmount,
    backendUrl,
    navigate,
    token,
    deliveryCharges
  } = useContext(ShopContext);

  const amount = getTotalCartAmount();
  const deliveryCharge = amount >= 500 ? 0 : deliveryCharges;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    province: "",
    district: "",
    fullAddress: ""
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    // Form verilerini güncelle
    setFormData((data) => ({ ...data, [name]: value }));

    if (name === "province") {
      setSelectedProvince(value);
    }
    if (name === "district") {
      setSelectedDistrict(value);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!token) {
        toast.error("Sipariş vermek için giriş yapmalısınız.");
        return;
      }

      let orderItems = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const itemInfo = structuredClone(
              foods.find((food) => food._id === itemId)
            );
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[itemId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        items: orderItems,
        amount: amount,
        deliveryCharge,
        totalAmount: amount + deliveryCharge,
        address: formData
      };

      switch (paymentMethod) {
        case "cash":
          const response = await axios.post(
            `${backendUrl}/api/order/cash`,
            orderData,
            { headers: { token } }
          );

          if (response.statusText === "OK") {
            setCartItems({});
            toast.success(response.data.message);
            console.log(response);
            navigate("/orders");
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(
            `${backendUrl}/api/order/stripe`,
            orderData,
            { headers: { token } }
          );

          if (responseStripe.statusText === "OK") {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          }
          break;

        default:
          break;
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error);
    }
  };

  useEffect(() => {
    fetch("https://turkiyeapi.herokuapp.com/api/v1/provinces")
      .then((response) => response.json())
      .then((data) => {
        const sortedProvinces = data.data.sort((a, b) =>
          a.name.localeCompare(b.name, "tr")
        );
        setProvinces(sortedProvinces);
      })
      .catch((error) => console.log("İller alınırken hata oluştu:", error));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      fetch(
        `https://turkiyeapi.herokuapp.com/api/v1/provinces?name=${selectedProvince}`
      )
        .then((response) => response.json())
        .then((data) => {
          const districts = data.data[0]?.districts || [];
          setDistricts(districts);
          setSelectedDistrict(""); // il değişince ilçe sıfırlansın
        })
        .catch((error) => console.log("İlçeler alınırken hata oluştu:", error));
    } else {
      setDistricts([]);
      setSelectedDistrict("");
    }
  }, [selectedProvince]);

  return (
    <section className="max-container mt-24">
      <form
        onSubmit={onSubmitHandler}
        className="grid grid-cols-1 gap-y-8 md:grid-cols-3 md:gap-x-8 lg:gap-x-12 py-6"
      >
        <div className="col-span-2 bg-white rounded-xl p-6 md:mb-12">
          <Title
            title1={"Delivery"}
            title2={"Information"}
            title1Styles={"h3"}
          />
          {/* FirstName & LastName */}
          <div className="flex gap-5 max-[576px]:flex-wrap max-[576px]:gap-0">
            <div className="w-1/2 flex flex-col mb-4 max-[576px]:w-full">
              <label htmlFor="firstName" className="medium-14 ml-1">
                Ad
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Ad"
                required
                className="bg-primary focus:bg-white border-none outline-none ring-1 ring-slate-900/15 focus:ring-gray-400 regular-14 rounded mt-1 py-1.5 px-3"
                onChange={onChangeHandler}
                value={formData.firstName}
              />
            </div>
            <div className="w-1/2 flex flex-col mb-4 max-[576px]:w-full">
              <label htmlFor="lastName" className="medium-14 ml-1">
                Soyad
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Soyad"
                required
                className="bg-primary focus:bg-white border-none outline-none ring-1 ring-slate-900/15 focus:ring-gray-400 regular-14 rounded mt-1 py-1.5 px-3"
                onChange={onChangeHandler}
                value={formData.lastName}
              />
            </div>
          </div>

          {/* Email & Phone Number */}
          <div className="flex gap-5 max-[576px]:flex-wrap max-[576px]:gap-0">
            <div className="w-1/2 flex flex-col mb-4 max-[576px]:w-full">
              <label htmlFor="email" className="medium-14 ml-1">
                E-posta adresi
              </label>
              <input
                type="email"
                name="email"
                placeholder="E-posta adresi"
                required
                className="bg-primary focus:bg-white border-none outline-none ring-1 ring-slate-900/15 focus:ring-gray-400 regular-14 rounded mt-1 py-1.5 px-3"
                onChange={onChangeHandler}
                value={formData.email}
              />
            </div>
            <div className="w-1/2 flex flex-col mb-4 max-[576px]:w-full">
              <label htmlFor="phoneNumber" className="medium-14 ml-1">
                Telefon
              </label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Telefon"
                required
                className="bg-primary focus:bg-white border-none outline-none ring-1 ring-slate-900/15 focus:ring-gray-400 regular-14 rounded mt-1 py-1.5 px-3"
                onChange={onChangeHandler}
                value={formData.phoneNumber}
              />
            </div>
          </div>

          {/* Province & District */}
          <div className="flex gap-5 max-[576px]:flex-wrap max-[576px]:gap-0">
            <div className="w-1/2 flex flex-col mb-4 max-[576px]:w-full">
              <label htmlFor="province" className="medium-14 ml-1">
                İl
              </label>
              <select
                name="province"
                required
                className="bg-primary focus:bg-white border-none outline-none ring-1 ring-slate-900/15 focus:ring-gray-400 regular-14 rounded cursor-pointer mt-1 py-2 px-2"
                onChange={onChangeHandler}
                value={selectedProvince}
              >
                <option value="" hidden>
                  Seçiniz
                </option>
                {provinces.map((province) => (
                  <option key={province.id} value={province.name}>
                    {province.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/2 flex flex-col mb-4 max-[576px]:w-full">
              <label htmlFor="district" className="medium-14 ml-1">
                İlçe
              </label>
              <select
                name="district"
                required
                className="bg-primary focus:bg-white border-none outline-none ring-1 ring-slate-900/15 focus:ring-gray-400 regular-14 rounded cursor-pointer mt-1 py-2 px-2"
                onChange={onChangeHandler}
                value={selectedDistrict}
                disabled={!districts.length}
              >
                <option value="" hidden>
                  Seçiniz
                </option>
                {districts.map((district, i) => (
                  <option key={i} value={district.name}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label htmlFor="fullAddress" className="medium-14 ml-1">
              Açık Adres
            </label>
            <textarea
              name="fullAddress"
              rows="4"
              placeholder="Açık Adres"
              required
              className="bg-primary focus:bg-white border-none outline-none ring-1 ring-slate-900/15 focus:ring-gray-400 regular-14 rounded resize-none mt-1 py-1.5 px-3"
              onChange={onChangeHandler}
              value={formData.fullAddress}
            ></textarea>
          </div>
        </div>

        {/* Cart Total & Payment Method */}
        <div className="col-span-1">
          <CartTotal />
          <div className="p-6 mb-8">
            <h3 className="bold-20 mb-4">
              Payment
              <span className="text-secondary"> Method</span>
            </h3>
            <div className="flex gap-3 my-4">
              <span
                onClick={() => setPaymentMethod("stripe")}
                className={`flex items-center text-center border text-xs cursor-pointer !py-1 !px-3  ${
                  paymentMethod === "stripe" ? "btn-secondary" : "btn-white"
                }`}
              >
                Kredi/Banka Kartı
              </span>
              <span
                onClick={() => setPaymentMethod("cash")}
                className={`flex items-center text-center border text-xs cursor-pointer !py-1 !px-3 ${
                  paymentMethod === "cash" ? "btn-secondary" : "btn-white"
                }`}
              >
                Nakit
              </span>
            </div>
            <button type="submit" className="btn-dark !rounded mt-2">
              Sipariş Ver
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default PlaceOrder;
