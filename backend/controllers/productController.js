const Product = require("../models/Product");
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;

//! tüm ürünleri getir
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//! id'ye göre ürün getir
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({ product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//! ürün ekleme
const addProduct = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const { name, description, category, prices, popular } = req.body;

    if (category === "") {
      throw new Error("Lütfen bir kategori seçin.");
    }

    const image = req.file;
    if (!image) {
      throw new Error("Lütfen bir resim yükleyin.");
    }

    const imageUrl = await cloudinary.uploader
      .upload(image.path, {
        resource_type: "image"
      })
      .then((res) => res.secure_url);

    const parsedPrices = JSON.parse(prices); // JSON, string'i diziye çevirdi
    if (!Array.isArray(parsedPrices) || parsedPrices.length === 0) {
      throw new Error("Lütfen bir fiyat bilgisi girin.");
    }

    const price = parsedPrices.reduce((total, currentValue) => {
      total[currentValue.size] = Number(currentValue.price);
      return total;
    }, {});

    const sizes = parsedPrices.map((item) => item.size);

    const product = await Product.create({
      name,
      description,
      category,
      price,
      image: imageUrl,
      sizes,
      popular: popular === "true"
    });
    res.status(200).json({ message: "Yemek eklendi", product });
    console.log("Product data:", product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//! ürün silme
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    await Product.findByIdAndDelete(productId);

    // Tüm kullanıcıların sepetlerinden bu ürünü sil
    await User.updateMany(
      {
        [`cartData.${productId}`]: { $exists: true }
      },
      {
        $unset: {
          [`cartData.${productId}`]: ""
        }
      }
    );

    res.status(200).json({ message: "Yemek silindi" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getAllProducts, getProductById, addProduct, deleteProduct };
