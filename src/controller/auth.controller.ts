import express, { Request, Response } from "express";
import { generateAuthToken } from "../jwt/utils.jwt";
import { Users } from "../models/Userschema";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

export const RegisterUser = async (req: Request, res: Response) => {
  const { username, firstname, lastname, password, address, email } = req.body;

  if (!username || !firstname || !lastname || !password || !email || !address) {
    return res.json({ message: "Please Filled all Fields" });
  }

  let User = new Users({
    username,
    firstname,
    lastname,
    password,
    email,
    address,
  });

  try {
    await User.save();
    // const token=await User.generateAuthToken()
  } catch (error) {
    res.send(error);
  }
};

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send({ message: "Please fill both Field" });
  }
  const UserLoggedIn = await Users.findOne({ email: email });
  console.log(UserLoggedIn);
  const matchCredentials = await bcrypt.compare(
    password,
    UserLoggedIn?.password
  );
  console.log(matchCredentials);

  if (matchCredentials && UserLoggedIn) {
    const token = generateAuthToken(UserLoggedIn?._id, process.env.SECRET_KEY);
    console.log(token);
  }
};
