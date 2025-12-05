import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id, { attributes: ["user_id", "username"] });
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalid", detail: err.message });
  }
};
