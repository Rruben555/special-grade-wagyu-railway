export default (sequelize, DataTypes) => {
  return sequelize.define("Comment", {
    comment_id: { // Sesuai SQL
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    post_id: { 
        type: DataTypes.INTEGER,
        allowNull: false, // Komentar harus terkait dengan sebuah Post
        references: {
            model: 'posts', // Nama model yang direferensikan (sesuai definisi Sequelize)
            key: 'post_id' // Nama kolom Primary Key di model Post
        }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id"
      }
    },
    content: { type: DataTypes.TEXT, allowNull: false }
    // post_id akan ditangani oleh relasi di index.js
  }, {
    tableName: 'comments',
    timestamps: true
  });
};