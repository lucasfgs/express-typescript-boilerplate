export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Boilerplate Example",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "example",
        url: "https://github.com/lucasfgs",
        email: "lucsferreira.dev@gmail.com",
      },
    },
    servers: [
      {
        url: `${process.env.HOST}:${process.env.PORT}`,
      },
    ],
  },
  apis: ["./routes/index.ts"],
};
