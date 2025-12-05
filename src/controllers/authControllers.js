import bcrypt from "bcryptjs";
import { User } from "../models/index.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  // 1. Cek apakah request masuk
  console.log("Request Register Masuk:", req.body); 

  try {
    const { username, password } = req.body;
    
    // ... kode validasi Anda ...

    // 2. Cek sebelum create user
    console.log("Mencoba membuat user di DB..."); 
    
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashed });

    // 3. Cek setelah berhasil
    console.log("User berhasil dibuat:", user.user_id);

    return res.status(201).json({
      id: user.user_id,
      username: user.username,
      token: generateToken(user.user_id)
    });
  } catch (err) {
    // 4. Cek jika error
    console.error("ERROR Register:", err); 
    return res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Missing fields" });

    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    return res.json({
      id: user.user_id,
      username: user.username,
      token: generateToken(user.user_id)
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};