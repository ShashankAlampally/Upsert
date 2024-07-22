const user = require('../Models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cart = require('../Models/cart');
require('dotenv').config();

exports.signup = async(req,res) => {
    try {
        const {firstname , lastname , email , password} = req.body;
        if(!(firstname && lastname && password && email)){
            return res.status(400).send({message:"all fields are compulsory"})
        }
        const exist = await  user.findOne({email: email})
        if(exist){
            return res.status(400).send({message:"Email already exists"})
        }
        const cryptedPassword = await bcrypt.hash(password,10)
        const create = await user.create({firstname :firstname, lastname :lastname , email :email, password :cryptedPassword})
        const cartCreate = await cart.create({userID : create._id});
        return res.status(200).send({message:"Registered Successfully"})


    } catch (error) {
        return res.status(400).send({"error": error.message})
    }
}

exports.login = async(req,res) => {
    try {
        const {email, password} = req.body
        if(!(email)) {
            return res.status(400).send({message : "Email is required"})
        }
        if(!(password)){
            return res.status(400).send({message : "Password is required"})
        }

        const exist = await user.findOne({email: email})
        if(!exist){
            return res.status(400).send({message : "User not found"})
        }
        const passwordMatch = await bcrypt.compare(password , exist.password)
        if(!(passwordMatch)){
            return res.status(400).send({message : "Password Incorrect"})
        }
        const token = jwt.sign({"user_id": exist._id},process.env.secretKey,{expiresIn:1000*60*5})
        return res.status(200).send({message :"Login Successful" , data :{token: token , userID : exist._id ,exist : exist}})
    } catch (error) {
        return res.status(400).send({error : error.message})
    }
}