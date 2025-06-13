const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✔️  Veritabanı bağlandı");
  } catch (error) {
    console.log("❌ Veritabanı bağlantısı başarısız:", error.message);
  }
};

module.exports = connectDb;
