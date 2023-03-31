import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = await bcrypt.hash("req.body.password", salt);
        const newUser = new User({
            fullnames: req.body.fullnames, 
            username: req.body.username, 
            email: req.body.email,
            password: passwordHash
        })
        await newUser.save()
        res.status(200).send("New User created")
    } catch (err) {
        next(err)
    }
}
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next("user not found")
        
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        const token = jwt.sign({ id: user._id }, process.env.JWT)
        const{password, ...userDetails} =user._doc
        res.cookie("acces token", token, {
            httpOnly: true
        }).status(200).json({ user})
        
        if (!isPasswordCorrect) 
            return next("Wrong Password or Username")
    } catch (err) {
        next(err)
    }
}
