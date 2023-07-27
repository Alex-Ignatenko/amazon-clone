import express from "express";
import Product from "../Models/ProductModel.js";
import User from "../Models/UserModel.js";
import Order from "../Models/OrderModel.js";
import data from "../data.js";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res, next) => {
  try {
    await Product.deleteMany({}); // delete by filter-> {} is all
    await Order.deleteMany({});
    await User.deleteMany({});
    const createdProducts = await Product.insertMany(data.products); // insert products from json products object from data.js
    const createdUsers = await User.insertMany(data.users); // insert users from json users object from data.js

    res.send({ createdProducts, createdUsers });
  } catch (e) {
    console.log("failed to update " + e.message);
  }
});

export default seedRouter;