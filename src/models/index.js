import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";

import userModel from "./user.js";
import characterModel from "./character.js";
import weaponModel from "./weapon.js";
import postModel from "./post.js";
import commentModel from "./comment.js";

// Hapus dotenv.config() di sini

// 🔥 PERBAIKAN UTAMA: Gunakan DATABASE_URL dan HAPUS konfigurasi SSL
// DATABASE_URL adalah variabel yang disediakan otomatis oleh Railway
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  // Hapus dialectOptions SSL yang menyebabkan ECONNREFUSED di koneksi internal Railway
});

// INIT MODELS (Gunakan const, HAPUS 'export' di sini)
const User = userModel(sequelize, DataTypes);
const Character = characterModel(sequelize, DataTypes);
const Weapon = weaponModel(sequelize, DataTypes);
const Post = postModel(sequelize, DataTypes);
const Comment = commentModel(sequelize, DataTypes);

// RELATIONSHIPS
User.hasMany(Post, { foreignKey: "user_id" });
Post.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Comment, { foreignKey: "user_id" });
Comment.belongsTo(User, { foreignKey: "user_id" });

Post.hasMany(Comment, { foreignKey: "post_id", onDelete: "CASCADE" });
Comment.belongsTo(Post, { foreignKey: "post_id" });

// EKSPOR AKHIR
export {
  sequelize,
  User,
  Character,
  Weapon,
  Post,
  Comment,
};

export default {
  sequelize,
  User,
  Character,
  Weapon,
  Post,
  Comment,
};