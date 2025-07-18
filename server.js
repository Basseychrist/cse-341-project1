const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongodb = require("./dataBase/db");
const app = express();
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./docs/swagger.yaml");
const port = process.env.PORT || 5000;
const cors = require("cors");

mongodb.initDb((err) => {
  if (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
  console.log("Connected to MongoDB");
});

app.use(bodyParser.json());
app.use(cors());

//Routes
app.use("/", require("./routes"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
