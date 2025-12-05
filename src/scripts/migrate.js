const { sequelize } = require("../models");

(async () => {
  await sequelize.sync({ alter: true });
  console.log("Database synced");
  process.exit();
})();
