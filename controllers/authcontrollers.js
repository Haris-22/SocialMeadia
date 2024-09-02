const userModel = require("../models/userModel.js");
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const {generateToken} = require('../utils/generateToken.js')


module.exports.userLogin = async (req,res)=>{
    let{email, password} = req.body;
    let user = await userModel.findOne({email});
    if(!user) {
        req.flash("logError", "Invalid email or password")
        res.redirect('/login')
    }else {
        bcrypt.compare(password, user.password,  (err, result)=>{
            if(err) {console.error('result')}
            console.log(result)

            if(result){
                let token = generateToken(user);
                res.cookie("token", token);
                res.redirect("/")
            }else{
                req.flash("logError", "Invalid email or password")
                res.redirect('/login');
            }
        })
    }
}

module.exports.signUpUser = async (req, res)=>{
    let{email, password, name, age} = req.body;
    let user = await userModel.findOne({email});
    if(user) {
        req.flash("signError", "User already registed please login!");
        res.redirect('/register');
    }else{
        bcrypt.genSalt(10, (err, salt)=>{
            if(err){
                console.log(err.message)
            }
            bcrypt.hash(password, salt, async (err, hash)=>{
                if(err){
                    console.log(err.message)
                }
                let user = await userModel.create({
                    name,
                    age,
                    email,
                    password: hash
                });
    
                let token = generateToken(user);
                res.cookie("token", token);
                res.redirect('/');
            })
        })
    }
}   