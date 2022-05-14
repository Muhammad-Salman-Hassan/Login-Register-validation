import mongoose from "mongoose";

interface Iuser {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    address: string;

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
    }
})


export const LoginUser=mongoose.model("LOGINUSER",UserSchema)