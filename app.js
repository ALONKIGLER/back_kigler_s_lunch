var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const env = require("dotenv");
const bodyParser = require("body-parser");
const { connect } = require("mongoose");

var app = express();

env.config();

const userRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");

connect("mongodb+srv://Aloni:1234@cluster0.xfwelvs.mongodb.net/BLAGAN", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(
  () => {
    console.log("we are now connected to the db");
  },
  (err) => {
    console.log(`we failed to connect to the db: ${err.message}`);
  }
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser());

app.get("/api/api", function (req, res) {
  res.status(400).json({
    message: "Invalid Password",
  });
});

app.use("/api", userRoutes);
app.use("/api", adminRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
