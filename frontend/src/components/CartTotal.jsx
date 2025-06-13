import { useContext } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";

const CartTotal = ({ page, orderData }) => {
  const { getTotalCartAmount, deliveryCharges } = useContext(ShopContext);

  const orderTotalAmount =
    page === "OrderDetails"
      ? orderData.items.reduce((acc, item) => {
          const price = item.price[item.size];
          return acc + price * item.quantity;
        }, 0)
      : getTotalCartAmount();

  return (
    <div className="bg-white rounded-xl p-6">
      {page !== "OrderDetails" && (
        <Title title1={"Sipariş"} title2={"Özeti"} title1Styles={"h3"} />
      )}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h5>Sepet Tutarı</h5>
          <h5>{orderTotalAmount} TL</h5>
        </div>
        <hr />
        <div className="flex items-center justify-between">
          <h5>Getirme Ücreti</h5>
          <h5 className={orderTotalAmount >= 500 ? "line-through" : ""}>
            {deliveryCharges} TL
          </h5>
        </div>
        <hr />
        <div className="flex items-center justify-between text-secondary font-bold">
          <h5 className="text-lg">Ödenecek Tutar</h5>
          <h5 className="text-lg">
            {orderTotalAmount >= 500
              ? `${orderTotalAmount} TL`
              : `${orderTotalAmount + deliveryCharges} TL`}
          </h5>
        </div>
        {page === "OrderDetails" && (
          <>
            <hr />
            <div className="flex items-center justify-between">
              <h5 className="text-lg font-bold">Ödeme Şekli</h5>
              <h5 className="text-lg font-bold">{orderData.paymentMethod}</h5>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartTotal;
