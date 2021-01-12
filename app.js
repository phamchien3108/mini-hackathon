require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = 5555;
const ejs = require("ejs");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo")(session);

app.use(cookieParser());

app.set("view engine", "ejs");

// Kết nối database
const mongoAtlatUrl =
  "mongodb+srv://pvchien:chien1ok@cluster0.3ljlk.mongodb.net/myData?retryWrites=true&w=majority";
try {
  mongoose.connect(
    mongoAtlatUrl,
    { userNewUrlParse: true, useUnifiedTopology: true },
    () => console.log("Mongoose blog mindx is connected")
  );
} catch (e) {
  console.log("cloud not connect");
}

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "mysecret",
    cookie: { maxAge: 60000 },
  })
);

// Import routes
const indexUser = require("./routers/index");

//Sử dụng css,img,js trong public
app.use(express.static("public"));
// Gửi yêu cầu phân tích kiểu nội dung application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Gửi yêu cầu phân tích kiểu nội dung application/json
app.use(bodyParser.json());

const fileUpload = require("express-fileupload");
app.use(fileUpload());

// Route middlewares
app.use("/", indexUser);
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

// Lắng nghe các requests
app.listen(process.env.PORT || 3000, function () {
  console.log("Server listening port ", +process.env.PORT);
});
