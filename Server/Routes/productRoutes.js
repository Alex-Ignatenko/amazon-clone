import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../Models/ProductModel.js";
import GetSearchFilter from "../Services/GetSearchFilter.js";


const productRouter = express.Router();

const PAGE_SIZE = 6;

//Get All Products
productRouter.get("/",expressAsyncHandler(async (req, res) => {
    
    const products = await Product.find();
    res.send(products);

}));

//Get All Products in given category
productRouter.get("/categories",expressAsyncHandler(async (req, res) => {

    const ProductsInCategory = await Product.find().distinct("category");
    res.send(ProductsInCategory);

}));

//Get product by token
productRouter.get("/token/:token",expressAsyncHandler(async (req, res) => {

    const { token } = req.params;
    const product = await Product.findOne({ token });
    product ? res.send(product) : res.status(404).send("Product not found");

}));

//Get product by id
productRouter.get("/id/:id",expressAsyncHandler(async (req, res) => {

    const { id } = req.params;
    const product = await Product.findById(id);
    product ? res.send(product) : res.status(404).send("Product not found");

}));

//Search 
productRouter.get("/search",expressAsyncHandler(async (req, res) => {

    //Get needed params from query string
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;

    //Get search params and sort order from GetFilter service
    const {queryFilter,categoryFilter,ratingFilter,priceFilter,sortOrder} = GetSearchFilter(query);

    //Get products that fit the selected filtering and sorting options   
    const products = await Product.find({...queryFilter,...categoryFilter,...ratingFilter,...priceFilter }).sort(sortOrder).skip((page - 1) * pageSize).limit(pageSize);
    const countProducts = await Product.countDocuments({
        ...queryFilter,
        ...categoryFilter,
        ...ratingFilter,
        ...priceFilter,
    });

    res.send({products,page,countProducts,pages: Math.ceil(countProducts / pageSize)});

}));

export default productRouter;

