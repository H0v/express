const { Router } = require("express");
const path = require("path");
const router = Router();
const globalVar = require("../globalVar");

router.get("/", (req, res) => {
  res.render(path.join(__dirname, "../", "index.hbs"), {
    time: req.cookies.time,
  });
  console.log(req.cookies);
});

router.get("/form", (req, res) => {
  res.render(path.join(__dirname, "../", "form.hbs"));
});

router.post("/form", (req, res) => {
  //   console.dir(req.body);
  globalVar.push(req.body);
  res.redirect("/results");
  res.end();
});

router.get("/results", (req, res) => {
  console.dir(globalVar);
  res.send(globalVar);
  res.end();
});

router.get("/api/time", (req, res) => {
  res.send({
    time: req.cookies.time,
  });
});

router.get("/api/users", (req, res) => {
  res.send(globalVar);
});

router.post("/api/users", (req, res) => {
  console.log(req.body);
  res.end();
});

router.get("/myroute/:param", (req, res) => {
  const param = req.params.param;
  if (req[param]) {
    res.send(req[param]);
  } else {
    res.send("No such parametr");
  }
  res.end();
});

module.exports = router;
