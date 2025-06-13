const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  deliveryCharge: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: {
    type: String,
    enum: ["Onay Bekleniyor", "Hazırlanıyor", "Yola Çıktı", "Teslim Edildi", "İptal Edildi"],
    default: "Onay Bekleniyor",
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ["Nakit", "Stripe"],
    required: true
  },
  paymentStatus: {
    type: Boolean,
    required: true,
    default: false
  },
  date: {
    type: String,
    default: () => DateTime.now().setZone("Europe/Istanbul").setLocale("tr").toFormat("dd LLLL yyyy HH:mm")
  }
});

module.exports = mongoose.model("Order", orderSchema);
