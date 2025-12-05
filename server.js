import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { sequelize } from "./src/models/index.js";

// Routes Imports
import authRoutes from "./src/routes/auth.js";
import characterRoutes from "./src/routes/characterRoutes.js";
import weaponRoutes from "./src/routes/weaponRoutes.js";
import postRoutes from "./src/routes/postRoutes.js";
import commentRoutes from "./src/routes/commentRoutes.js";

const allowedOrigins = [
  'http://localhost:3000', // Jika frontend React berjalan di port 3000
  'http://localhost:4000', // Port backend lokal
  'http://localhost:5173', // Port backend lokal
  'https://nama-proyek-frontend-anda.vercel.app', // GANTI INI dengan domain Vercel frontend Anda
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
// 🔥 AKHIR PERUBAHAN CORS

dotenv.config();
const app = express();

app.use(cors(corsOptions)); // 🔥 Menggunakan konfigurasi yang lebih aman
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Register Routes
app.use("/api/auth", authRoutes);
app.use("/api/characters", characterRoutes);
app.use("/api/weapons", weaponRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to PostgreSQL");
  
    // Gunakan alter:true untuk menyesuaikan kolom jika ada yang kurang
    await sequelize.sync({ alter: true });
    console.log("📌 Database synced");
  } catch (err) {
    console.error("❌ Database connection error:", err);
  }
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});