import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Coperex API",
      version: "1.0.0",
      description: "API documentation for Coperex",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Company: {
          type: "object",
          required: ["name", "email", "phone", "foundedYear", "impactLevel", "category"],
          properties: {
            name: {
              type: "string",
            },
            email: {
              type: "string",
            },
            phone: {
              type: "string",
            },
            foundedYear: {
              type: "integer",
            },
            impactLevel: {
              type: "string",
              enum: ["LOW", "MEDIUM", "HIGH"],
            },
            category: {
              type: "string",
            },
          },
        },
      },
    },
  },
  apis: ["./src/**/*.js"], // Archivos donde se encuentran las rutas y controladores
};

const specs = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};

export default swaggerDocs;