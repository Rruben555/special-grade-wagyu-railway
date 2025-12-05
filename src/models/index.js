import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";

import userModel from "./user.js";
import characterModel from "./character.js";
import weaponModel from "./weapon.js";
import postModel from "./post.js";
import commentModel from "./comment.js";

dotenv.config();

// Railway pakai DATABASE_URL
export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// INIT MODELS
export const User = userModel(sequelize, DataTypes);
export const Character = characterModel(sequelize, DataTypes);
export const Weapon = weaponModel(sequelize, DataTypes);
export const Post = postModel(sequelize, DataTypes);
export const Comment = commentModel(sequelize, DataTypes);

// RELATIONS
User.hasMany(Post, { foreignKey: "user_id" });
Post.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Comment, { foreignKey: "user_id" });
Comment.belongsTo(User, { foreignKey: "user_id" });

Post.hasMany(Comment, { foreignKey: "post_id", onDelete: "CASCADE" });
Comment.belongsTo(Post, { foreignKey: "post_id" });

// ❗ EXPORT NAMED ONLY (tidak ada default)
export {
  sequelize,
  User,
  Character,
  Weapon,
  Post,
  Comment
};

