import express from "express";
import { Weapon } from "../models/index.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// --- FITUR AKTIF: READ ---
router.get("/", async (req, res) => {
  const list = await Weapon.findAll();
  res.json(list);
});

router.get("/:id", async (req, res) => {
  const item = await Weapon.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: "Weapon not found" });
  res.json(item);
});

// --- FITUR AKTIF: CREATE ---
router.post("/", protect, async (req, res) => {
  try {
    const created = await Weapon.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.put("/:id", protect, async (req, res) => {
  try {
    const [updated] = await Weapon.update(req.body, {
      where: { weapon_id: req.params.id }
    });

    if (!updated) return res.status(404).json({ message: "Weapon not found" });
    
    const item = await Weapon.findByPk(req.params.id);
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const deleted = await Weapon.destroy({ where: { weapon_id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Weapon not found" });
    res.json({ message: "Weapon deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;