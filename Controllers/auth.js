import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = { fullnames: '', username: '', email: '', password: ''}
    
    //validation errors
    if (err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(({properties}) => {
errors[properties.path] = properties.message
})
    }
    return errors;
}


export const register = async (req, res) => {
    const { fullnames, username, email, password } = req.body
    try {
        const user = await User.create({ fullnames, username, email, password })
        res.status(201).json(user)
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({errors})
         
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body
    try {

        //validate user
        if (!(username && password)) {
            res.status(400).send("All inputs are required")
        }
        //validate if user exist in the database
        const user = await User.findOne({ username })
        if (user) {
            const auth = await bcrypt.compare(password, user.password)
            if (auth) {
                return user
            } 
            throw Error ("Incorrect Password")
            
    //            if (user &&  results ) {
    //         const token = jwt.sign(
    //             { user_id: user._id, username }, process.env.JWT );
    //         user.token = token
    //         res.status(200).json(user)
    //     } else {
    //         res.status(400).send("Incorrect  password")
    //    }
        }
    throw error("Incorrect Username");}
    catch (err) {
      (err)
    }
}
