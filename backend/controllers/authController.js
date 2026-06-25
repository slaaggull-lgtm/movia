import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

export const register = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, avatar } = req.body;

    if (!firstName || !lastName || !username || !email || !password) {
      return res.status(400).json({ message: "Tüm alanlar zorunludur." });
    }

    const existing = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
    });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Bu e-posta veya kullanıcı adı zaten kullanılıyor." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      avatar,
    });

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Kayıt sırasında hata oluştu.", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase() });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "E-posta veya şifre hatalı." });
    }

    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      quiz: user.quiz,
      lastMood: user.lastMood,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Giriş sırasında hata oluştu.", error: error.message });
  }
};

export const getMe = async (req, res) => {
  res.json(req.user);
};
