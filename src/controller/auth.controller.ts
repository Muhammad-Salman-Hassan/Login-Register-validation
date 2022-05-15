import express, { Request, Response } from "express";
import { LoginUser } from "../models/Userschema";
const bcrypt=require('bcrypt')


export const RegisterUser = async (req: Request, res: Response) => {
  const { username, firstname, lastname, password, address, email } = req.body;

  if (!username || !firstname || !lastname || !password || !email || !address) {
    return res.json({ message: "Please Filled all Fields" });
  }

  let User = new LoginUser({
    username,
    firstname,
    lastname,
    password,
    email,
    address,
  });
  
  try {
    await User.save()
    const token=await User.generateAuthToken()
  } catch (error) {
    res.send(error)
  }
  

  
};

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send({ message: "Please fill both Field" });
  }
  const UserLoggedIn = await LoginUser.findOne({ email: email });
  
  const matchCredentials=await bcrypt.compare(password,UserLoggedIn?.password)
  const token=UserLoggedIn?.generateAuthToken()
  

  if (matchCredentials) {
    res.send("User Sign in Successfully");
  }
};
