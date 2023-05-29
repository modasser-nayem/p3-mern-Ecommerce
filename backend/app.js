const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");

// middleware
app.use(express.json());

// Route Imports
const product = require("./routes/product.routes");

app.use("/api/v1/", product);

app.get("/", (req, res) => {
   res.send("<h1>E-commerce is Running...</h1>");
});

// Error Middleware
app.use(errorMiddleware);

module.exports = app;
