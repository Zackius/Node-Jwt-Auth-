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

app.listen 

app.listen (4500, ()=>{
    connect()
    console.log("Connected to Backend !")
})