import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const register = async (req, res, next) => {
    try {
        //get user
        const { fullnames, username, email, password } = req.body

        //validate inputs
        if (!(fullnames && username && email && password)) {
            res.status(400).send("All inputs are required")
        }
        
        //checking if the user exist 

        const oldUser = await User.findOne({ email })
        
        if (oldUser) {
            return res.status(409).send("User already exist. Please login")
        }
        //encrypt Password
       const  encryptP = await bcrypt.hash(password, 10)
        const newUser = new User({
            fullnames: req.body.fullnames,
            username: req.body.username,
            email: req.body.email,
            password: encryptP
        })
        const token = jwt.sign({ newUser_id: newUser._id, email }, process.env.JWT)
        newUser.token = token

        res.status(201).json(newUser)
    } catch (err) {
        next(err)
    }
}

export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body
        //validate user
        if (!(username && password)) {
            res.status(400).send("All inputs are required")
        }
        //validate if user exist in the database
        const user = await User.findOne({ username })
        if (!user) return next("User not Found")
   
        const results = await  bcrypt.compare(password, user.password)
        if (user && results ) {
            const token = jwt.sign(
                { user_id: user._id, username }, process.env.JWT );
            user.token = token
            res.status(200).json(user)
        } else {
            res.status(400).send("Incorrect  password")
       }    }
    catch (err) {
        next(err)
    }
}
