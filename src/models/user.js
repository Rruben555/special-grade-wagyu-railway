export default (sequelize, DataTypes) => {
  return sequelize.define("User", {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'users', // Sesuaikan nama tabel SQL
    timestamps: false   // SQL tidak ada created_at/updated_at
  });
};