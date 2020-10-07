const express = require("express");
const routes = require("./routes/routes");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

app.set("view engine", "hbs");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use((req, res, next) => {
  if (req.body.therms) {
    req.body.therms = req.body.therms === "on" ? true : false;
  }
  next();
});
app.use((req, res, next) => {
  res.cookie("time", new Date().toString(), {
    maxAge: 900000,
    httpOnly: true,
  });
  console.log("Cookie created");
  next();
});

app.use(routes);

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
