import express,{ Response,Request, Router } from "express";
import { RegisterUser,Login } from "../controller/Register";
import { LoginUser} from "../models/Userschema";

const router=express.Router()


router.get('/',(req:Request,res:Response)=>{
    res.send("hello")
})


router.post('/register',RegisterUser)
router.post('/login',Login)

module.exports=router
