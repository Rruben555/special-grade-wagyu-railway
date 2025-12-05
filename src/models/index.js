import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";

import userModel from "./user.js";
import characterModel from "./character.js";
import weaponModel from "./weapon.js";
import postModel from "./post.js";
import commentModel from "./comment.js";

dotenv.config();

console.log("DEBUG (models): DATABASE_URL =", process.env.DATABASE_URL); // 🔥 Debug

// Init Sequelize using DATABASE_URL
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

// Init models
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
