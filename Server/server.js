import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './Routes/UserRoutes.js';
import productRouter from './Routes/ProductRoutes.js';
import orderRouter from './Routes/OrderRoutes.js';
import seedRouter  from './Routes/SeedRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express()

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/users" , userRouter)
app.use("/api/seed/resetData" , seedRouter)
app.use("/api/products" , productRouter)
app.use("/api/orders" , orderRouter)

mongoose.connect(process.env.MONGO_DB_URI).then(() => {
    app.listen(PORT);
    console.log(`Server running on port ${PORT}`);
}).catch(err => console.log(err));
