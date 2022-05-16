import { Users } from "../models/Userschema";
import { sign, SignOptions } from "jsonwebtoken";
const jwt = require("jsonwebtoken");

require("dotenv").config();

export function generateAuthToken(id: any, key: any) {
    const payload = {
        _id: id,
    };
    const privateKey = key;

    return jwt.sign(payload, privateKey);
}
