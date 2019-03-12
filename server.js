var Http = require("http");

var server = Http.createServer((req,res)=>{
    var authHeader = req.headers.authorization;
    if(!authHeader){
        res.setHeader('WWW-Authenticate', 'Basic');
        res.statusCode = 401;
        res.statusMessage = "You are not authenticated!";
        res.end();
    } else {
        // beacute authheader contain  inform of "basic username:password"
        var auth = new Buffer(authHeader.split(' ')[1],"base64").toString().split(':');
        var username = auth[0];
        var password = auth[1];

        if(username === "admin" && password==="admin"){
            res.statusCode = 200;
            res.end("Authentication Successfull");
        } else {
            res.setHeader('WWW-Authenticate', 'Basic');
            res.statusCode = 401;
            res.statusMessage = "You are not authenticated!";
            res.end();    
        }
    }
    res.status = 200;
    res.end("success");
}); 

server.listen(3000,"localhost",()=>{
    console.log("server is listening on localhost:3000")
});