import { sequelize, Weapon, Character } from "../models/index.js";

const weapons = [
  { name: "AK-47", damage: 70, rarity: "Common" },
  { name: "M4A1", damage: 65, rarity: "Common" },
  { name: "Desert Eagle", damage: 95, rarity: "Rare" }
];

const characters = [
  { name: "Ranger", role: "Assault" },
  { name: "Medic", role: "Support" },
  { name: "Sniper", role: "Marksman" }
];

const seed = async () => {
  try {
    await sequelize.sync({ alter: true });

    if ((await Weapon.count()) === 0) await Weapon.bulkCreate(weapons);
    if ((await Character.count()) === 0) await Character.bulkCreate(characters);

    console.log("Seeder completed ✔️");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
};

seed();
