module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123",
  database: "test",
  synchronize: false,
  logging: process.env.NODE_ENV === "DEV" ? true : false,
  entities:
    process.env.NODE_ENV === "DEV"
      ? ["src/database/entities/**/*.ts"]
      : ["dist/database/entities/**/*.js"],
  migrations:
    process.env.NODE_ENV === "DEV"
      ? ["src/database/migrations/**/*.ts"]
      : ["dist/database/migrations/**/*.js"],
  subscribers:
    process.env.NODE_ENV === "DEV"
      ? ["src/database/subscriber/**/*.ts"]
      : ["dist/database/subscriber/**/*.js"],
  cli: {
    entitiesDir: "src/database/entities",
    migrationsDir: "src/database/migrations",
    subscribersDir: "src/database/subscriber",
  },
};
