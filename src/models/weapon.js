export default (sequelize, DataTypes) => {
  return sequelize.define("Weapon", {
    weapon_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: { type: DataTypes.STRING(100), allowNull: false },
    type: { type: DataTypes.STRING(30), allowNull: false }, // Sesuai SQL
    rarity: { type: DataTypes.INTEGER, allowNull: false },
    image: { type: DataTypes.TEXT },
    description: {type: DataTypes.TEXT}
  }, {
    tableName: 'weapon_list',
    timestamps: false
  });
};