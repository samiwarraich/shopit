const Product = require("../models/product");
require("dotenv").config();
const connectDatabase = require("../config/database");

const products = require("../data/products");

connectDatabase();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Products are deleted");
    await Product.insertMany(products);
    console.log("All products are Added");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
