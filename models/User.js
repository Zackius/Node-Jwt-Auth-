import mongoose from "mongoose";
import isEmail from "validator"


const UserSchema = new mongoose.Schema({
  fullnames: {
    type: String,
    required: [true, "Please  enter your full names"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Please enter your username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "please enter your email "],
    unique: true,
    lowecase: true,
     },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Password should be 6 character and above"],
  },
});
export default mongoose.model("User", UserSchema);
