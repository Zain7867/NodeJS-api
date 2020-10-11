const bodyParser = require('body-parser');
const express = require('express');
const session = require("express-session");
const cookieParser = require('cookie-parser')
const app = express();
const port = 3000;

app.use(
    session({
        secret: "ssshhhhh",
        resave: false,
        saveUninitialized: false
    })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", "views");

const route = require("./routes/routing");

app.use("/", route.routes);

app.listen(port, () => {
    console.log(`3000 listening on port!`) 
});