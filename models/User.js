import mongoose from "mongoose";
import isEmail from "validator"

const UserSchema = new mongoose.Schema({
  fullnames: {
    type: String,
    required: [true, "please enter your fullname"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Please enter your Username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your Email"],
    unique: true,
    lowercase:true,
    validate: [isEmail, "Please enter a valid email "]
  },
  password: {
    type: String,
    required: [true, "please enter your password"],
    minLength:[6, "Minimum passwor length is 6 characters"],
  },
});
export default mongoose.model("User", UserSchema);
