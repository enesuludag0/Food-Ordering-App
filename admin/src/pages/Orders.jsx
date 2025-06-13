import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { FaBox } from "react-icons/fa";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const getAllOrders = async () => {
    try {
      if (!token) return;

      const response = await axios.get(`${backendUrl}/api/order/allorders`, {
        headers: { token }
      });

      if (response.statusText === "OK") {
        setOrders(response.data.orders.reverse());
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/order/status/${orderId}`,
        { status: newStatus },
        { headers: { token } }
      );

      if (response.statusText === "OK") {
        toast.success(response.data.message);
        await getAllOrders();
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
    <div className="px-8 max-sm:py-8">
      <div className="flex flex-col gap-6 pb-20">
        {orders.length &&
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-sm rounded-lg p-6 cursor-pointer"
              // onClick={() => navigate(`/orders/${order._id}`)}
            >
              <div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-20">
                    <div className="flex flex-col justify-center gap-2">
                      <h5 className="medium-14 text-gray-500">Ad Soyad</h5>
                      <p className="text-tertiary text-base font-bold">
                        {order.address.firstName} {order.address.lastName}
                      </p>
                    </div>
                    <div className="flex flex-col justify-center gap-2">
                      <h5 className="medium-14 text-gray-500">
                        Sipariş Tarihi
                      </h5>
                      <p className="text-tertiary text-base font-bold">
                        {order.date}
                      </p>
                    </div>
                    <div className="flex flex-col justify-center gap-2">
                      <h5 className="medium-14 text-gray-500">
                        Sipariş Tutarı
                      </h5>
                      <p className="text-secondary text-base font-bold">
                        {order.totalAmount} TL
                      </p>
                    </div>

                    <button
                      className="text-secondary font-bold border border-secondary rounded-full hover:bg-secondary hover:text-white px-4 py-2"
                      onClick={() => navigate(`/orders/${order._id}`)}
                    >
                      Sipariş Detayı
                    </button>
                  </div>
                  <hr />
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-2">
                        <FaBox className="text-green-500" />
                        <h5 className="text-green-500 font-bold">
                          {order.status}
                        </h5>
                      </div>
                      <div className="flex flex-col gap-2">
                        {order.items.map((item, index) => (
                          <p
                            key={`${item._id}-${item.size}-${index}`}
                            className="text-tertiary text-base"
                          >
                            {item.name}
                            {item.size && ` - ${item.size}`} ({item.quantity}{" "}
                            adet)
                          </p>
                        ))}
                      </div>
                    </div>
                    <select
                      className="bg-primary text-sm font-semibold ring-1 ring-slate-900/5 rounded max-w-40 p-2"
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      value={order.status}
                    >
                      <option value="Onay Bekleniyor">Onay Bekleniyor</option>
                      <option value="Hazırlanıyor">Hazırlanıyor</option>
                      <option value="Yola Çıktı">Yola Çıktı</option>
                      <option value="Teslim Edildi">Teslim Edildi</option>
                      <option value="İptal Edildi">İptal Edildi</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Orders;
