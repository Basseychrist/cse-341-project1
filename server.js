const express = require("express");
const dotenv = require("dotenv");
const mongodb = require("./dataBase/db");
const app = express();
const port = process.env.PORT || 5000;

mongodb.initDb((err) => {
  if (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
  console.log("Connected to MongoDB");
});


//Routes
app.use("/", require("./routes"));



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
});
