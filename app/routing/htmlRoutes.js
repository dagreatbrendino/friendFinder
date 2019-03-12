var path = require("path");

module.exports = function(app){
    //The following routes handle requests from specific url visits, and will
    //send the user the corresponding HTML page 
    app.get("/survey", function(req, res){
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });
    app.get("/assets/css/style.css", function(req, res){
        res.sendFile(path.join(__dirname, "../public/assets/css/style.css"));
    });
    app.get("/assets/images/halftone-yellow.png", function(req, res){
        res.sendFile(path.join(__dirname,"../public/assets/images/halftone-yellow.png"));
    });
    app.get("*", function(req, res){
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
}