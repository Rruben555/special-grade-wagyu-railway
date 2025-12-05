import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";

import userModel from "./user.js";
import characterModel from "./character.js";
import weaponModel from "./weapon.js";
import postModel from "./post.js";
import commentModel from "./comment.js";

dotenv.config();

// HAPUS 'export' di sini; Gunakan const untuk definisi utama
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// INIT MODELS (HAPUS SEMUA 'export' di sini)
const User = userModel(sequelize, DataTypes);
const Character = characterModel(sequelize, DataTypes);
const Weapon = weaponModel(sequelize, DataTypes);
const Post = postModel(sequelize, DataTypes);
const Comment = commentModel(sequelize, DataTypes);

// RELATIONS
User.hasMany(Post, { foreignKey: "user_id" });
Post.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Comment, { foreignKey: "user_id" });
Comment.belongsTo(User, { foreignKey: "user_id" });

Post.hasMany(Comment, { foreignKey: "post_id", onDelete: "CASCADE" });
Comment.belongsTo(Post, { foreignKey: "post_id" });


// 🔥 EKSPOR AKHIR: Satu blok untuk Named Export, satu untuk Default Export
// Ini memungkinkan import { Post } dari file lain
export {
    sequelize,
    User,
    Character,
    Weapon,
    Post,
    Comment
};

// Ini memungkinkan import db from "..." di file route (seperti postRoutes.js)
export default {
    sequelize,
    User,
    Character,
    Weapon,
    Post,
    Comment,
};