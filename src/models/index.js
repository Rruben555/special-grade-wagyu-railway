import { Sequelize, DataTypes } from "sequelize";

// Import model definitions
import userModel from "./user.js";
import characterModel from "./character.js";
import weaponModel from "./weapon.js";
import postModel from "./post.js";
import commentModel from "./comment.js";

// Variabel untuk menyimpan instance dan models setelah diinisialisasi
let sequelizeInstance = null;
let Models = {}; 

/**
 * Menginisialisasi Sequelize dan Models. Aman dipanggil berkali-kali.
 * @returns {object} Objek berisi instance sequelize dan semua Models.
 */
export function initializeDatabase() {
  // Cek jika sudah diinisialisasi untuk mencegah pemrosesan ulang
  if (sequelizeInstance) return { sequelize: sequelizeInstance, ...Models };

  // Verifikasi lingkungan sebelum inisialisasi
  if (!process.env.DATABASE_URL) {
      console.error("❌ FATAL: DATABASE_URL is not defined in environment variables.");
      throw new Error("Cannot initialize Sequelize: DATABASE_URL is undefined.");
  }
  
  // 1. Inisialisasi Sequelize HANYA di dalam fungsi ini
  sequelizeInstance = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false,
    // Blok dialectOptions/SSL dihapus untuk koneksi internal Railway
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

  // 4. Simpan dan kembalikan model
  Models = { User, Character, Weapon, Post, Comment };
  return { sequelize: sequelizeInstance, ...Models };
}

export default {
  initializeDatabase
};