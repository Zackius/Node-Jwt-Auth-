import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullnames: {
        type: String,
        required: true,
        unique: true,
    }, 
    username: {
        type: String,
        required: true,
        unique: true
    }, 
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        reuired: true
    }

})
export default mongoose.model("User", UserSchema)
