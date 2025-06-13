const Order = require("../models/Order");
const User = require("../models/User");
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const deliveryCharge = 50;

//! nakit ile ödeme yapma
const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, deliveryCharge, totalAmount, address } = req.body;

    await Order.create({
      userId,
      items,
      amount,
      deliveryCharge,
      totalAmount,
      address,
      paymentMethod: "Nakit"
    });

    // Sipariş verdikten sonra kullanıcının sepeti temizlendi
    await User.findByIdAndUpdate(userId, { cartData: {} });
    res.status(200).json({ message: "Sipariş başarıyla oluşturuldu" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//! kredi/banka kartı ile ödeme
const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, address } = req.body;
    const { origin } = req.headers;

    const shouldAddDelivery = amount < 500;
    const finalDeliveryCharge = shouldAddDelivery ? deliveryCharge : 0;
    const totalAmount = amount + finalDeliveryCharge;

    // Sipariş kaydını "ödenmedi" olarak aç (onay gelince güncellenecek)
    const newOrder = await Order.create({
      userId,
      items,
      amount,
      deliveryCharge: finalDeliveryCharge,
      totalAmount,
      address,
      paymentMethod: "Stripe",
      paymentStatus: false
    });

    const line_items = items.map((item) => ({
      price_data: {
        currency: "TRY",
        product_data: { name: item.name },
        unit_amount: item.price[item.size] * 100
      },
      quantity: item.quantity
    }));

    if (shouldAddDelivery) {
      line_items.push({
        price_data: {
          currency: "TRY",
          product_data: { name: "Getirme Ücreti" },
          unit_amount: finalDeliveryCharge * 100
        },
        quantity: 1
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`
    });

    res.status(200).json({
      success: true,
      session_url: session.url
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

//! stripe doğrulama
const verifyStripe = async (req, res) => {
  try {
    const userId = req.userId;
    const { success, orderId } = req.body;

    if (success === "true") {
      await Order.findByIdAndUpdate(orderId, { paymentStatus: true });
      await User.findByIdAndUpdate(userId, { cartData: {} });
      res.status(200).json({ message: "Sipariş başarıyla oluşturuldu." });
    } else {
      await Order.findByIdAndDelete(orderId);
      res
        .status(400)
        .json({ message: "Ödeme iptal edildi veya başarısız oldu." });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//! admin panelde tüm siparişleri getirme
const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json({ orders });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//! admin panelde siparişin detaylarını getirme
const getAdminOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findById(orderId);
    res.status(200).json({ order });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//! kullanıcının tüm siparişlerini getirme
const userOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await Order.find({ userId });
    res.status(200).json({ orders });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//! kullanıcının verdiği siparişin detaylarını getirme
const getOrderDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const orderId = req.params.id;

    const order = await Order.findOne({ _id: orderId, userId });
    res.status(200).json({ order });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//! admin panelde siparişin durumunu güncelleme
const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true } // Güncellenmiş veriyi geri döndür
    );
    res.status(200).json({ message: "Sipariş durumu güncellendi", order });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  placeOrder,
  placeOrderStripe,
  verifyStripe,
  allOrders,
  userOrders,
  getOrderDetails,
  getAdminOrderDetails,
  updateOrderStatus
};
