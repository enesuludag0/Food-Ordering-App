import { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Verify = () => {
  const { token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) return;

      navigate("/cart");

      const response = await axios.post(
        `${backendUrl}/api/order/verifyStripe`,
        { success, orderId },
        { headers: { token } }
      );

      if (response.statusText === "OK") {
        toast.success(response.data.message);
        setCartItems({});
        navigate("/orders");
      } else {
        toast.error(response.data.message);
        navigate("/cart");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);
};

export default Verify;
