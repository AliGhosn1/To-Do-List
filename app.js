const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

const items = [];
const workItems = [];


app.get("/", function(req, res){
    res.render("list", {day: "Its " + date.getDate(), items: items});
});

app.get("/work", function(req, res){
    res.render("list", {day: "Work List", items: workItems});
});

app.get("/about", (req, res) => {
    res.render("about", {});
})

app.post("/", function(req, res){
    console.log(req.body.list)
    if(req.body.list === "Work"){
        workItems.push(req.body.task);
        res.redirect("/work");
    }
    else{
        items.push(req.body.task);
        res.redirect("/");
    }
});

app.get("*", (req, res) => {
    res.send("Page not found");
});

app.listen(3000, function(){
    console.log("Server started on port 3000.");
});