const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Object, required: true },
  sizes: { type: Array, required: true, trim: true },
  date: {
    type: String,
    default: () =>
      DateTime.now()
        .setZone("Europe/Istanbul")
        .setLocale("tr")
        .toFormat("dd LLLL yyyy HH:mm")
  },
  popular: { type: Boolean, default: false }
});

module.exports = mongoose.model("Product", productSchema);
