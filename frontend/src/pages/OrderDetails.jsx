import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import Title from "../components/Title";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FcHome, FcShipped } from "react-icons/fc";
import CartTotal from "../components/CartTotal";

const OrderDetails = () => {
  const { id } = useParams();
  const { token, backendUrl } = useContext(ShopContext);
  const [orderData, setOrderData] = useState(null);

  const getOrderDetails = async () => {
    try {
      if (!token) return;

      const response = await axios.get(
        `${backendUrl}/api/order/userorders/${id}`,
        {
          headers: { token }
        }
      );

      if (response.statusText === "OK") {
        setOrderData(response.data.order);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, [id, token]);

  return (
    <section className="flex flex-col gap-6 pb-20">
      {orderData && (
        <>
          <div className="flex items-center">
            <Link to={"/orders"}>
              <Title
                title1={"Siparişlerim"}
                titleStyles={"!pb-0"}
                title1Styles={"hover:text-secondary transition !m-0"}
              />
            </Link>
            <MdKeyboardArrowRight className="text-3xl" />
            <Title
              title1={"Sipariş Detay"}
              titleStyles={"!pb-0"}
              title1Styles={"!m-0"}
            />
          </div>

          {/* Address */}
          <div className="flex flex-col gap-2">
            <h5 className="text-lg font-semibold">Teslimat Adresi</h5>
            <div className="flex items-center gap-6 bg-white shadow-sm rounded-2xl p-6">
              <FcHome className="size-14 shadow-md rounded-full p-2.5" />
              <p className="text-base">
                {orderData.address.fullAddress} {orderData.address.district}/
                {orderData.address.province}
              </p>
            </div>
          </div>

          {/* Order Status */}
          <div className="flex flex-col gap-2">
            <h5 className="text-lg font-semibold">Sipariş Durumu</h5>
            <div className="flex items-center gap-6 bg-white shadow-sm rounded-2xl p-6">
              <FcShipped className="size-14 shadow-md rounded-full p-2.5" />
              <div className="flex flex-col">
                <p className="text-lg text-green-500 font-semibold">
                  {orderData.status}
                </p>
                <p className="text-base text-gray-500 font-medium">
                  {orderData.date.split("/").join("")}
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="flex flex-col gap-2">
            <h5 className="text-lg font-semibold">Sepetim</h5>
            <div className="bg-white shadow-sm rounded-2xl p-6">
              {orderData.items.map((item, index) => (
                <div key={item._id} className="">
                  <div className="flex items-center gap-6">
                    <div>
                      <img src={item.image} alt="" className="w-16 sm:w-18" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h5 className="text-base font-bold">{item.name}</h5>
                      {item.size && (
                        <p className="text-sm text-gray-500">
                          {item.size.includes("P")
                            ? `Porsiyon: ${item.size.slice(0, -1)} porsiyon`
                            : `Boyut: ${item.size}`}
                        </p>
                      )}
                      <p className="text-secondary text-base font-bold">
                        {item.price[item.size] * item.quantity} TL
                      </p>
                    </div>
                    <div className="ml-auto">
                      <span className="size-10 text-2xl font-semibold text-secondary bg-secondary bg-opacity-20 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                  </div>
                  {index < orderData.items.length - 1 && (
                    <hr className="my-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Payment Details */}
          <div className="flex flex-col gap-2">
            <h5 className="text-lg font-semibold">Ödeme Detayları</h5>
            <CartTotal page={"OrderDetails"} orderData={orderData} />
          </div>
        </>
      )}
    </section>
  );
};

export default OrderDetails;
