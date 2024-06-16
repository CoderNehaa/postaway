import jwt from "jsonwebtoken";
import UserModel from "./user.model.js";

export default class UserController{
    handleRegistration(req, res){
        const userExist = UserModel.getUserByEmail(req.body.email);
        if(userExist){
            return res.status(404).send("User already exist");
        } else {
            const result = UserModel.addUser(req.body);
            return res.status(201).send(result)
        } 
    }

    handleLogin(req, res){
        const {email, password} = req.body;
        if(!email.length || !password.length){
            return res.status(400).send("Email or password cannot be empty");
        }
        try{
            const user = UserModel.confirmLogin({email, password});
            if(user){
                const token = jwt.sign(
                    {userId:user.id, email:user.email},
                    "pi0ubpUcs2JFH17dPd7unDpIq1fyupQz",
                    {expiresIn:"1h"}
                )
                return res.status(200).send(token)
            } else {
                return res.status(404).send("User does not exist");
            }  
        } catch (err){
            console.log(err);
            return res.status(404).send(err.message);
        }
    }

    getUsers(req, res){
        const result = UserModel.getAllUsers();
        return res.status(200).send(result);
    }
}

