const express = require("express")
const app = express();
const path = require('path');
const bodyParser = require("body-parser");

app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json());

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));
app.use("/webfonts", express.static(__dirname + "public/webfonts"));
app.use("/images", express.static(__dirname + "public/images"));
app.use("/images/icon", express.static(__dirname + "public/images/icon"));
app.use("/vendor", express.static(__dirname + "public/vendor"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const userRoute = require('./components/api');
const rootRoute='/components';
app.use(rootRoute,userRoute);
app.set("views", "./views");
app.set("view engine", "ejs");


app.get("/index", (req, res) => {
    res.render("index");
  });
  app.get("/", (req, res) => {
    res.render("index");
  });
  
app.get("/log-in", (req, res) => {
    res.render("log-in");
  
  });
  
app.get("/log-out", (req, res) => {
    return res.render("log-out");
  });
  
app.get("/signup", (req, res) => {
    res.render("signup");
  });
app.get("/home", (req, res) => {
    res.render("home");
  });

app.post("/signup", (req, res) => {
    res.render("log-in");
});

app.post("/log-in", (req, res) => {
    res.render("home");
});


app.get("/battles", (req, res) => {
    res.render("battles");
  });

app.get("/unverified", (req, res) => {
    res.render("unverified");
  });
  
app.get("/challenge", (req, res) => {
    res.render("challenge");
  });
  
app.get("/connections", (req, res) => {
    res.render("connections");
  });


app.get("/popup", (req, res) => {
    res.render("popup");
  });

app.get("/succesful", (req, res) => {
    res.render("popup");
  });
  
app.get("/profile", async (req, res) => {
    res.render("profile");
  });

module.exports = app;