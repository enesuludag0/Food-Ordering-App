const User = require("../models/User");
const createToken = require("../utils/createToken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passwordValidation = require("../utils/passwordValidation");

//! user signup
const signupUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const user = await User.signup(firstName, lastName, email, password);
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//! user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//! admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET_KEY);
      res.status(200).json({ email, password, token });
    } else {
      throw new Error("E-posta ve şifre hatalı.");
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select("-password"); // Şifre hariç tüm bilgileri al
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.userId;
    const { firstName, lastName, email, phoneNumber } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        error:
          "Bu e-posta ile kayıtlı bir kullanıcı bulunmaktadır. Lütfen başka bir e-posta adresi deneyiniz."
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, email, phoneNumber },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Kullanıcı bilgileri başarıyla güncellendi", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updatePassword = async (req, res) => {
  try {
    const userId = req.userId;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    const isMatchPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isMatchPassword) {
      return res.status(400).json({ error: "Eski şifrenizi yanlış girdiniz" });
    }

    passwordValidation(newPassword);

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res
        .status(400)
        .json({ error: "Yeni şifre eski şifreyle aynı olamaz" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashPassword;
    await user.save();
    res.status(200).json({ message: "Şifre başarıyla güncellendi" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  adminLogin,
  getUserInfo,
  updateUser,
  updatePassword
};
