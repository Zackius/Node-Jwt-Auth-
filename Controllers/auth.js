import User from "../models/User.js";
import jwt  from "jsonwebtoken";

const handleErrors = (err) => {
  let errors = { fullnames: "", username: "", email: "", password: "" };
 
  //incorrect username
  if (err.message === "Incorrect Username") {
    errors.username = "the username entered is not registered" 
  }

  //incorrect password
  if (err.message === "Incorrect Password") {
    errors.password = "That password is incorrect"
  }

  //duplicate user error

  if (err.code === 11000) {
    errors.email = "This email is already registered";
    return errors;
  }

  //validation errors
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const maxAge = 3 * 24 * 60 * 60;


const createToken = (id) => {
  return jwt.sign({ id }, "net ninja secret", {
    expiresIn: maxAge,
  });
};

export const register = async (req, res) => {
  const { fullnames, username, email, password } = req.body;
  try {
    const user = await User.create({ fullnames, username, email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user});
  } catch (err) {
    const errors = handleErrors(err); 
    res.status(400).json({ errors });
  }
};
