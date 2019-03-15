var express = require("express");
var bodyParser = require("body-parser")
var expressSession = require("express-session");
var passport = require("passport");
var authenticate = require("./authentication");


var server = express();
server.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6000 }
  }))

server.use(bodyParser.json());
server.use(passport.initialize());
server.use(passport.session());


function auth (req,res, next){
    console.log(req.user)
    if(!req.user){
        res.statusCode = 403;
        res.end("Authentication is required");
    }else{
        next();
    } 
}



server.post("/",passport.authenticate("local"),(req,res)=>{
    res.statusCode = 200;
    res.end("success");
})

server.use(auth);


server.get("/",(req,res,next)=>{
    res.statusCode = 200;
    res.end("success ");
})


server.listen(3000,"localhost",()=>{
    console.log("server is listening on localhost:3000")
});