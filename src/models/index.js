import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";

import userModel from "./user.js";
import characterModel from "./character.js";
import weaponModel from "./weapon.js";
import postModel from "./post.js";
import commentModel from "./comment.js";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    dialect: "postgres",
    logging: false,
  }
);

export const User = userModel(sequelize, DataTypes);
export const Character = characterModel(sequelize, DataTypes);
export const Weapon = weaponModel(sequelize, DataTypes);
export const Post = postModel(sequelize, DataTypes);
export const Comment = commentModel(sequelize, DataTypes);

// ---- User ↔ Post ----
User.hasMany(Post, { foreignKey: "user_id" });
Post.belongsTo(User, { foreignKey: "user_id" });

// ---- User ↔ Comment ----
User.hasMany(Comment, { foreignKey: "user_id" });
Comment.belongsTo(User, { foreignKey: "user_id" });

// ---- Post ↔ Comment ----
Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE"
});
Comment.belongsTo(Post, { foreignKey: "post_id" });


export default {
  sequelize,
  User,
  Character,
  Weapon,
  Post,
  Comment,
};
