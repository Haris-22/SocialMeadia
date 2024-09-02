const express = require('express');
const router = express.Router();
const upload = require('../config/multer')
const {isLogedIn} = require('../middleware/IsLogedIn')
const {signUpUser} = require('../controllers/authcontrollers');
const flash = require('flash');
const userModel = require('../models/userModel');

router.get('/', (req, res) => {
    res.send('Hello from userRouter');
  });


router.get("/logout", (req, res)=>{
    res.cookie("token", '')
    res.redirect('/login')
})

// Profile Picture 
router.get('/upload', isLogedIn, async (req, res)=>{
    let user = await userModel.findOne({email: req.user.email})
    res.render('editProfile', {user})
})

router.post('/upload',isLogedIn, upload.single('image'), async (req, res)=>{
    let {name, age, email} = req.body
    let user = await userModel.findOne({email: req.user.email});
    if(req.file !== undefined){
        user.dp = req.file.buffer;
    }
    if(name !== ''){
       user.name = name;

    }
    if(age !== ''){
        user.age = age;
    }
    if(email !== ''){
        user.email = email
    }
    user.save();
    res.redirect('/')
})

router.get("/profile", isLogedIn, async (req, res)=>{
    let user = await userModel.findOne({email: req.user.email}).populate('posts')
    res.render('profile', {user})
})


module.exports = router;