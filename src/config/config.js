export default {
  development: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    logging: false,
    // Tambahkan properti lain jika diperlukan
  },
  production: { // Tambahkan mode production untuk deployment
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    logging: false,
    // Tambahkan SSL jika diperlukan, tetapi biasanya tidak untuk Railway Internal
  }
};