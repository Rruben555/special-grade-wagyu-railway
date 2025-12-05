import express from "express";
// Import controller yang sudah Anda buat
import { register, login } from "../controllers/authControllers.js"; 

const router = express.Router();

// Sambungkan URL ke Fungsi Controller
router.post("/register", register); // <-- Panggil fungsi register
router.post("/login", login);       // <-- Panggil fungsi login

export default router;