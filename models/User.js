import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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


//action before the a user is saved to the db
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//static method to login user 

UserSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username })
  if (user) {
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      return user 
    }
    throw Error("Incorrect Password")
  } throw Error("Incorrect Username")
}
export default mongoose.model("User", UserSchema);
 