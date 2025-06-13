/** @type {import('mongoose').Model} */
const mongoose = require("mongoose");
const validator = require("validator");
const passwordValidation = require("../utils/passwordValidation");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: false },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} }
  },
  { minimize: false }
);

// signup statics function
userSchema.statics.signup = async function (
  firstName,
  lastName,
  email,
  password
) {
  if (!firstName || !lastName || !email || !password) {
    throw new Error("Alanlar boş geçilemez.");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Geçerli bir e-posta adresi giriniz.");
  }

  passwordValidation(password);

  const userExists = await this.findOne({ email });
  if (userExists) {
    throw new Error("Bu e-posta ile kayıtlı bir kullanıcı bulunmaktadır.");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await this.create({
    firstName,
    lastName,
    email,
    password: hashPassword
  });
  return newUser;
};

// login statics function
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("E-posta ve şifre alanları boş geçilemez.");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("E-posta ve şifre hatalı.");
  }

  const isMatchPassword = await bcrypt.compare(password, user.password);
  if (!isMatchPassword) {
    throw new Error("E-posta ve şifre hatalı.");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
