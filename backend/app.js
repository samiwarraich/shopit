const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const RateLimit = require("express-rate-limit");
require("dotenv").config();
const path = require("path");

const errorMiddleware = require("./middlewares/errors");

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
});

app.set('trust proxy', 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());
app.use(limiter);

const products = require("./routes/product");
const auth = require("./routes/auth");
const payment = require("./routes/payment");
const order = require("./routes/order");

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", payment);
app.use("/api/v1", order);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}

app.use(errorMiddleware);

module.exports = app;
