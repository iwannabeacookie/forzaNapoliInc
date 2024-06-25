import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "forzaNapoliInc",
      version: "1.0.0",
    },
  },
  apis: ["./features/**/*.js"],
};

export const openApiSpecification = swaggerJsdoc(options);
console.log(openApiSpecification.paths);
