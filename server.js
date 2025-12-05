import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// 🔥 Panggil dotenv SEGERA SETELAH import modul utilitas
dotenv.config();

// Import sequelize HANYA SETELAH dotenv.config()
import { sequelize } from "./src/models/index.js";

// Routes
import authRoutes from "./src/routes/auth.js";
import characterRoutes from "./src/routes/characterRoutes.js";
// ... routes lainnya

const app = express();

// CORS
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8080",
  "http://localhost:5173",
  process.env.FRONTEND_URL, 
];
// ... konfigurasi corsOptions

app.use(cors(corsOptions));
app.use(bodyParser.json());
// ... app.use() lainnya

// ROUTES
app.use("/api/auth", authRoutes);
// ... routes lainnya

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  try {
    // Koneksi sequelize akan menggunakan DATABASE_URL dari Railway
    await sequelize.authenticate();
    console.log("✅ Connected to PostgreSQL");

    await sequelize.sync({ alter: true });
    console.log("📌 Database synced");
  } catch (err) {
    console.error("❌ Database connection error:", err);
  }

  console.log(`🚀 Server running at http://localhost:${PORT}`);
});