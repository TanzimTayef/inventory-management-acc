const express = require("express");
const app = express();
const cors = require("cors");

// middlewares
app.use(express.json());
app.use(cors());

// routes
const prodcutRoute = require("./routes/product.route");
const branRoute = require("./routes/brand.route");
const categoryRoute = require("./routes/category.route");
const storeRoute = require("./routes/store.route");
const supplierRoute = require("./routes/supplier.route");
const stockRoute = require("./routes/stock.route");

const userRoute = require("./routes/user.route");

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});


app.use("/api/v1/product", prodcutRoute);
app.use("/api/v1/brand", branRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/store", storeRoute);
app.use("/api/v1/supplier", supplierRoute);
app.use("/api/v1/stock", stockRoute);

app.use("/api/v1/user", userRoute);

module.exports = app;