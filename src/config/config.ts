export default () => ({
  server: {
    port: process.env.PORT || 4000,
  },
  database: {
    connectionString: process.env.DB_CONNECTION_STRING,
  },
  security: {
    encryptionSecretKey: process.env.ENCRYPTION_KEY,
  },
});
