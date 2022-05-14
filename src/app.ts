import bodyParser from "body-parser";
import express, { Application, Request, Response } from "express";

import mongoose from "mongoose";
const app: Application = express();
const port: Number = 8000;

const userrouter = require("./Routes/Regestration");

const url: string =
  "mongodb+srv://root:salman@cluster0.rvau9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";




export const conn = mongoose.connect(url, (err: any) => {
  if (err) {
    return err;
  } else {
    console.log("Successfull");
  }
});

app.use(bodyParser.json());

app.use("/", userrouter);

app.get('/login',(req:Request,res:Response)=>{
  res.send("Login page")
})
app.listen(port);

