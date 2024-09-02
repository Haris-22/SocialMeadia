const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path')
const expressSession = require('express-session');
const flash = require('connect-flash');



require("dotenv").config();

const userRouter = require("./routers/userRouter")
const postRouter = require("./routers/postRouter")
const indexRouter = require("./routers/indexRouter")

const db = require("./config/mongooseConnection")

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(
    expressSession({
        secret: 'your_secret_key',
        resave: false,
        saveUninitialized: true,
}));

app.use(flash());
app.use(express.static(path.join(__dirname, "Public")))
app.set("view engine", "ejs")

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/", indexRouter)


// app.get("/like/:_id", isLoggedIn, async (req, res)=>{
//     let post = await postModel.findOne({_id: req.params._id});  
//     if(post.likes.indexOf(req.user.userid) === -1){
//         post.likes.push(req.user.userid);
        
//     }else{
//         post.likes.splice(post.likes.indexOf(req.user.userid), 1)
//     }
//     await post.save();
//     res.status(200).redirect("/")
// })

// app.get("/edit/:_id", isLoggedIn, async (req, res)=>{
//     let post = await postModel.findOne({_id: req.params._id});
//     res.render('edit', {post});
// })

// app.post("/edit/:_id", isLoggedIn, async (req, res)=>{
//     let post = await postModel.findOneAndUpdate({_id: req.params._id}, {content: req.body.content}, {new: true});
//     console.log(post)
//     res.redirect('/');
// })

// app.get("/delete/:_id", isLoggedIn, async (req, res)=>{
//     let post = await postModel.findOneAndDelete({_id: req.params._id});
//     let user = await userModel.findOne({_id: req.user.userid});
//     user.posts.splice(user.posts.indexOf(post), 1)
//     user.save();
//     res.status(200).redirect("/");
// });

// app.post("/post", isLoggedIn, async (req, res)=>{
//     let user = await userModel.findOne({email: req.user.email})
//     let post = await postModel.create({
//         user: user._id,
//         name: user.username,
//         content: req.body.content
//     });
//     user.posts.push(post._id);
//     await user.save()
//     res.redirect("/")
// })



// function isLoggedIn(req, res, next){
//     if(req.cookies.token === ''){
//         res.status(404).redirect('/login');
//     }
//         let data = jwt.verify(req.cookies.token, 'secret');
//         req.user = data;
    
//     next();
// }



app.listen(3000, ()=>{
    console.log(`app listning on http://localhost:3000`)
})