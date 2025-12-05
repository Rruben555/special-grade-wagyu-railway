import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// Load env FIRST
dotenv.config();

import { sequelize } from "./src/models/index.js";

// Routes
import authRoutes from "./src/routes/auth.js";
import characterRoutes from "./src/routes/characterRoutes.js";
import weaponRoutes from "./src/routes/weaponRoutes.js";
import postRoutes from "./src/routes/postRoutes.js";
import commentRoutes from "./src/routes/commentRoutes.js";

const app = express();

console.log("DEBUG: DATABASE_URL =", process.env.DATABASE_URL); // 🔥 Debug penting

// CORS
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8080",
  "http://localhost:5173",
  process.env.FRONTEND_URL,
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/characters", characterRoutes);
app.use("/api/weapons", weaponRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to PostgreSQL");

    await sequelize.sync({ alter: true });
    console.log("📌 Database synced");
  } catch (err) {
    console.error("❌ Database connection error:", err);
  }

  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
