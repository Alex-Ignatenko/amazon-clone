import  express  from "express";
import expressAsyncHandler  from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../Models/UserModel.js";
import { generateToken, isAuth } from "../utils.js";

const userRouter = express.Router();

userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        res.send({ _id: user._id, name: user.name, email: user.email, token: generateToken(user) })
        return;
    }
    res.status(401).send({ message: 'Invalid Credentials' });
}))

userRouter.post("/signup" , expressAsyncHandler(async (req, res) => {
    const newUser = new User({ name: req.body.name, email: req.body.email, password: bcrypt.hashSync(req.body.password) });
    const newUserSaved = await newUser.save();
    res.send({ _id: newUserSaved._id, name: newUserSaved.name, email: newUserSaved.email, token: generateToken(newUserSaved) })
}))

//test if the isAuth middleware is working
userRouter.get("/" , isAuth , async (req, res) => {
 res.status(200).send({message : "ok!"});   
}) 

export default userRouter;