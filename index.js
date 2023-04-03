import express  from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRoute from "./routes/auth.js"

const app = express()

dotenv.config()
const connect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO); 
        console.log("Connected to MongoDB")
    }    

    catch (error) {
           throw error  
        }
}

//middleware 

app.use(cookieParser())
app.use(express.json())

app.use("/user-auth-node/auth", authRoute)

//cookies
app.get('/set-cookies', (req, res) => {
    res.cookie('newUser', false)
    res.cookie('isEmployee', true, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true})

    res.send("you got the cookies")
    
})
app.get('/read-cookies', (req, res) => {
    const cookies = req.cookies
res.json(cookies)
})
app.listen (4500, ()=>{
    connect()
    console.log("Connected to Backend !")
})