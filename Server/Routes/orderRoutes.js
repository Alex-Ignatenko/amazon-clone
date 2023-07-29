import express from "express";
import expressAsyncHandler from "express-async-handler";

import Order from "../Models/OrderModel.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.get("/:id",isAuth,expressAsyncHandler(async (req, res) => {

    const { id } = req.params;
    const order = await Order.findById(id);
    if (order) {
        res.send(order);
    }else {
        res.status(404).send({ message: "Order not found" });
    }

}));

orderRouter.post("/",isAuth,expressAsyncHandler(async (req, res) => {

    //Create new order Order
    const newOrder = new Order({
        orderItems: req.body.orderItems.map((item) => ({ ...item, product: item._id })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
    });

    try 
    {
        const order = await newOrder.save();
        res.status(201).send({ message: "Order created", order });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }

}));

export default orderRouter;