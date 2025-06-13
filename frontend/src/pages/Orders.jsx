import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Title from "../components/Title";
import { FaBox } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa6";

const Orders = () => {
  const { token, backendUrl, navigate } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const getAllOrders = async () => {
    try {
      if (!token) return;

      const response = await axios.get(`${backendUrl}/api/order/userorders`, {
        headers: { token }
      });

      if (response.statusText === "OK") {
        setOrderData(response.data.orders.reverse());
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, [token]);

  return (
    <section className="flex flex-col gap-6 pb-20">
      {orderData.length ? (
        <>
          <Title title1={"Siparişlerim"} titleStyles={"!pb-0"} title1Styles={"!m-0"} />
          {orderData.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-sm rounded-2xl p-6 cursor-pointer"
              onClick={() => navigate(`/orders/${order._id}`)}
            >
              <div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col justify-center gap-2">
                      <h5 className="medium-14 text-gray-500">Sipariş tarihi</h5>
                      <p className="text-base font-bold">{order.date}</p>
                    </div>
                    <div className="flex flex-col justify-center gap-2">
                      <h5 className="medium-14 text-gray-500">Sipariş tutarı</h5>
                      <p className="text-secondary text-base font-bold">{order.totalAmount} TL</p>
                    </div>
                    <div className="flex flex-col justify-center gap-2">
                      <h5 className="medium-14 text-gray-500">Ödeme yöntemi</h5>
                      <p className="text-base font-bold">{order.paymentMethod}</p>
                    </div>
                    <button
                      className="text-secondary font-bold border border-secondary rounded-full hover:bg-secondary hover:text-white px-4 py-2"
                      onClick={() => navigate(`/orders/${order._id}`)}
                    >
                      Sipariş Detayı
                    </button>
                  </div>
                  <hr />
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      {/* <FaBox className="text-green-500" />
                      <h5 className="text-green-500 font-bold">
                        {order.status}
                      </h5> */}
                      <h5 className="text-blue-500 font-bold">{order.status}</h5>
                    </div>
                    <div className="flex flex-col gap-2">
                      {order.items.map((item) => (
                        <p key={item._id} className="text-tertiary text-base">
                          {item.name}
                          {item.size && ` - ${item.size}`} ({item.quantity} adet)
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="flex flex-col items-center text-center space-y-4 my-20">
          <FaBoxOpen className="text-7xl" />
          <h1 className="text-4xl font-bold">Henüz hiç siparişiniz yok.</h1>
          <p className="text-sm">
            Şu anda aktif veya geçmişte verilmiş bir siparişiniz bulunmuyor. <br />
            Hemen alışverişe başlayarak ilk siparişinizi oluşturabilirsiniz.
          </p>
          <button className="btn-dark !mt-10" onClick={() => navigate("/menu")}>
            Alışverişe Başla
          </button>
        </div>
      )}
    </section>
  );
};

export default Orders;
