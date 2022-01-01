require("dotenv/config");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const { version } = require("./package.json");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

const swaggerSpecs = swaggerJsdoc({
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: "Swager Example",
      version: version,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        apiKey: {
          type: "apiKey",
          name: "x-api-key",
          in: "header",
        },
      },
    },
    security: [
      {
        apiKey: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use(require("./routes/auth").router);

app.listen(PORT, () => {
  console.log("Ready on http://localhost:" + PORT);
});
