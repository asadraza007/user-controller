"use strict";
var passport = require("passport");
var localStrategy = require("passport-local").Strategy;

/*  
This function use 3 perametors 
1- username
2- password
3- callback function
*/
 passport.use(new localStrategy((username,Password,done) =>{

    if(username === "admin" && Password==="admin"){
        done(null,true);
    } else if (username === "admin"){
        var error = new Error("Password is Incorrect");
        error.status = 403;
        done(error,null);
    } else {
        var error = new Error("Username is Incorrect");
        error.status = 403;
        done(error,null);
    }    

}));


passport.serializeUser(function(user, done) {
    done(null,user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});