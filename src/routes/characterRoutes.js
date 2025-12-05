import express from "express";
import { Character } from "../models/index.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// --- FITUR AKTIF: READ (Membaca Data) ---
router.get("/", async (req, res) => {
  try {
    const list = await Character.findAll();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await Character.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: "Character not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- FITUR AKTIF: CREATE (Menambah Data) ---
router.post("/", protect, async (req, res) => {
  try {
    // Note: Jika di Model 'timestamps: true', kolom createdAt otomatis terisi disini
    const created = await Character.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --- UPDATE (Mengubah Data) ---
router.put("/:id", protect, async (req, res) => {
  try {
    // Note: Jika 'timestamps: true', kolom updatedAt otomatis berubah ke waktu sekarang
    const [updated] = await Character.update(req.body, {
      where: { char_id: req.params.id }
    });
    
    if (!updated) return res.status(404).json({ message: "Character not found" });
    
    const item = await Character.findByPk(req.params.id);
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --- DELETE (Menghapus Data) ---
router.delete("/:id", protect, async (req, res) => {
  try {
    const deleted = await Character.destroy({
      where: { char_id: req.params.id }
    });
    
    if (!deleted) return res.status(404).json({ message: "Character not found" });
    res.json({ message: "Character deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;