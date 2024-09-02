const express = require('express');
const router = express.Router();
const {isLogedIn} = require('../middleware/IsLogedIn')
const userModel = require('../models/userModel');
const postModel = require('../models/postModel');
const upload = require('../config/multer')

router.get('/', (req, res) => {
    res.send('Hello from postRouter');
});

router.get("/like/:_id", isLogedIn, async (req, res)=>{
    let post = await postModel.findOne({_id: req.params._id});  
    if(post.like.indexOf(req.user.id) === -1){
        post.like.push(req.user._id);
        
    }else{
        post.like.splice(post.like.indexOf(req.user._id), 1)
    }
    await post.save();
    res.status(200).redirect("/")
})

router.get("/edit/:_id", isLogedIn, async (req, res)=>{
    let post = await postModel.findOne({_id: req.params._id});
    res.render('edit', {post});
})

router.post("/edit/:_id", isLogedIn, async (req, res)=>{
    let post = await postModel.findOneAndUpdate({_id: req.params._id}, {content: req.body.content}, {new: true});
    
    res.redirect('/');
})

router.get("/delete/:_id", isLogedIn, async (req, res)=>{
    let post = await postModel.findOneAndDelete({_id: req.params._id});
    let user = await userModel.findOne({email: req.user.email});
    user.posts.splice(user.posts.indexOf(post), 1)
    user.save();
    res.status(200).redirect("/users/profile");
});

router.get("/post", isLogedIn, async (req, res)=>{
    let user = await userModel.findOne({email: req.user.email})
    res.render("post", {user})
})

router.post("/post", isLogedIn, upload.single('image'),async (req, res)=>{
    let user = await userModel.findOne({email: req.user.email})
    let post = await postModel.create({
        image: req.file.buffer,
        user: user._id,
        name: user.username,
        content: req.body.content
    });
    user.posts.push(post._id);
    await user.save()
    res.redirect("/posts/post")
})


module.exports = router;