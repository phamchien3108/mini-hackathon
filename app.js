require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = 5555;
const ejs = require("ejs");
const session = require("express-session");
const cookieParser = require('cookie-parser')
const MongoStore = require("connect-mongo")(session);

app.use(cookieParser())

app.set("view engine", "ejs");



// Kết nối database
mongoose
  .connect("mongodb://localhost/myData", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(function () {
    console.log("Successfully connected to the database");
  })
  .catch(function (err) {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

const db = mongoose.connect;


app.use(session({
  resave: true, 
  saveUninitialized: true, 
  secret: 'mysecret', 
  cookie: { maxAge: 60000 }}));

  // Import routes
const indexUser = require("./routers/index");

//Sử dụng css,img,js trong public
app.use(express.static("public"));
// Gửi yêu cầu phân tích kiểu nội dung application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Gửi yêu cầu phân tích kiểu nội dung application/json
app.use(bodyParser.json());


const fileUpload = require('express-fileupload')
app.use(fileUpload());



// Route middlewares
app.use("/", indexUser);

// Lắng nghe các requests
app.listen(port, function () {
  console.log("Server listening port ", +port);
});
