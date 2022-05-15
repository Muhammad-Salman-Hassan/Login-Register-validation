import { NextFunction } from "express";
import mongoose from "mongoose";
const jwt=require('jsonwebtoken')

const bcrypt=require('bcrypt')
interface Iuser{
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    address: string;
    tokens:string
    
}

export const UserSchema = new mongoose.Schema<Iuser>({
    username: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    }, email: {
        type: String,
        required: true
    }, password: {
        type: String,
        required: true
    }, address: {
        type: String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})




UserSchema.pre('save',async function() {
  if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,12)
        
  }  
})

UserSchema.methods.generateAuthToken=async function () {
    try {
        let token=jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY)
        this.tokens=this.tokens.concat({token:token})
        await this.save()
        return token
    } catch (error) {
        console.log(error)
    }
}

export const LoginUser=mongoose.model("LOGINUSER",UserSchema)