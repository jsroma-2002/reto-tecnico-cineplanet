import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Premieres Service API",
      version: "1.0.0",
      description:
        "Microservicio de estrenos para cadena de cines. Retorna listado de premieres (imágenes y textos).",
    },
    servers: [
      {
        url: "/",
        description: "Servidor actual",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./dist/routes/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);
