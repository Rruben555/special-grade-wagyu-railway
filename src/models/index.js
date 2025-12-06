import { Sequelize, DataTypes } from "sequelize";

import userModel from "./user.js";
import characterModel from "./character.js";
import weaponModel from "./weapon.js";
import postModel from "./post.js";
import commentModel from "./comment.js";

// Variabel untuk menyimpan instance setelah diinisialisasi
let sequelizeInstance = null;
let Models = {}; 

// 🔥 Fungsi untuk inisialisasi yang tertunda (Deferred Initialization)
export function initializeDatabase() {
  // Jika sudah diinisialisasi, kembalikan yang sudah ada
  if (sequelizeInstance) return { sequelize: sequelizeInstance, ...Models };

  // 1. Inisialisasi Sequelize HANYA di dalam fungsi ini
  if (!process.env.DATABASE_URL) {
      console.error("❌ DATABASE_URL is not defined.");
      throw new Error("Cannot initialize Sequelize: DATABASE_URL is undefined.");
  }
  
  sequelizeInstance = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false,
    // Menghapus blok dialectOptions/SSL yang menyebabkan konflik di Railway
  });

  // 2. Inisialisasi Model
  const User = userModel(sequelizeInstance, DataTypes);
  const Character = characterModel(sequelizeInstance, DataTypes);
  const Weapon = weaponModel(sequelizeInstance, DataTypes);
  const Post = postModel(sequelizeInstance, DataTypes);
  const Comment = commentModel(sequelizeInstance, DataTypes);

  // 3. Relasi
  User.hasMany(Post, { foreignKey: "user_id" });
  Post.belongsTo(User, { foreignKey: "user_id" });

  User.hasMany(Comment, { foreignKey: "user_id" });
  Comment.belongsTo(User, { foreignKey: "user_id" });

  Post.hasMany(Comment, { foreignKey: "post_id", onDelete: "CASCADE" });
  Comment.belongsTo(Post, { foreignKey: "post_id" });

  // 4. Simpan model dan instance sequelize
  Models = { User, Character, Weapon, Post, Comment };
  return { sequelize: sequelizeInstance, ...Models };
}

// Ekspor hanya fungsi inisialisasi
export default {
  initializeDatabase
};