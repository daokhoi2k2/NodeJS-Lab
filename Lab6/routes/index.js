var express = require("express");
var router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/danhsachuser", (req, res) => {
  res.render("listusers");
});

router.get("/chitietuser", (req, res) => {
  res.render("chitietuser");
});

router.get("/chitietuser/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  res.render("chitietuser", {
    id,
  });
});

router.get("/capnhatuser/:id", (req, res) => {
  const id = req.params.id;
  axios.get(`http://localhost:3000/users/${id}`)
    .then((res) => res.data)
    .then((data) => {
      res.render("capnhatuser", {user: data});
    })
    .catch((err) => {
      console.error(err);
    })
});

router.get('/dangky', (req, res) => {
  res.render("dangky");
});

module.exports = router;
