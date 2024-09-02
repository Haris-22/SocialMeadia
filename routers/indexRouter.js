const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel')
const postModel = require('../models/postModel')
const {userLogin, signUpUser} = require('../controllers/authcontrollers');
const {isLogedIn} = require("../middleware/IsLogedIn")

router.get("/", isLogedIn, async (req, res)=>{
    let user = await userModel.findOne({email: req.user.email}).populate('posts');
    let feeds = await postModel.find().populate('user')
    console.log("User:",feeds.name)
    res.render("home", {user, feeds})
})

router.get("/login", async (req, res)=>{
  let logError = req.flash("logError");
  let error = req.flash('error')
    res.render('login', {logError, error})
});

router.post('/login', userLogin)

router.get("/register", (req, res)=>{
  let error = req.flash('signError')
    res.render("register", {error})
})

router.post("/register", signUpUser);


module.exports = router;