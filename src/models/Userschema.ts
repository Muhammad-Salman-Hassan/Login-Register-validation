import { NextFunction } from "express";
import mongoose from "mongoose";
// import { generateAuthToken } from "../jwt/utils.jwt";
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
interface Iuser {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    address: string;
    tokens: string;
}

export const UserSchema = new mongoose.Schema<Iuser>({
    username: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});

UserSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }
});

export const Users = mongoose.model("USERS", UserSchema);
