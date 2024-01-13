import express,{Request,Response} from "express";
import asyncHandler from "express-async-handler";
import {UserModel} from "../models/userModle.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../utils.js";
export const userRouter=express.Router();
userRouter.post(
    '/signin',
    asyncHandler(async (req: Request, res: Response) => {
        const user = await UserModel.findOne({ email: req.body.email })
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user),
                })
                res.status(401).send({ message: 'Invalid password' })
                return
            }
        }
        res.status(401).send({ message: 'Invalid email or password' })
    })
)