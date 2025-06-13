const User = require("../models/User");

//! kullanıcının sepetini getir
const getUserCart = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);
    const cartData = await user.cartData;

    res.status(200).json({ cartData });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//! sepete ürün ekleme
const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId, size } = req.body;

    const user = await User.findById(userId);
    const cartData = await user.cartData;

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

    await User.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ message: "Ürün sepete eklendi" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//! sepeti güncelleme
const updateCart = async (req, res) => {
  try {
    const userId = req.userId;
    const itemId = req.params.id;
    const { size, quantity } = req.body;

    const user = await User.findById(userId);
    const cartData = await user.cartData;

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

    await User.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ message: "Sepetiniz güncellendi" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//! sepetteki tüm ürünleri silme
const clearCart = async (req, res) => {
  try {
    const userId = req.userId;

    await User.findByIdAndUpdate(userId, { cartData: {} });
    res.status(200).json({ message: "Sepetinizdeki tüm ürünler silindi" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getUserCart, addToCart, updateCart, clearCart };
