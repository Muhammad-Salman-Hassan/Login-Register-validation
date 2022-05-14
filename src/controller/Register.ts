import express, { Request, Response } from "express";
import { LoginUser } from "../models/Userschema";

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
  User.save()
    .then((err: any) => {
      res.send(err);
    })
    .then((user) => {
      res.send(user);
    });
};

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send({ message: "Please fill both Field" });
  }
  const EmailMatch = await LoginUser.findOne({ email: email });
  if (EmailMatch) {
    res.send("User Sign in Successfully");
  }
};
