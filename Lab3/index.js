const express = require("express");
const app = express();
const mysql = require("mysql");
const formidable = require("formidable");
const bodyParser = require("body-parser");
const fs = require("fs");
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "labnodejs",
});

db.connect();

app.get("/", (req, res) => {
  const qr = "select id, tenLoai from loai";
  const qrSach = "select id, tenSach, moTa, urlHinh, gia from sach";
  db.query(qr, (err, listLoai) => {
    if (err) throw err;
    db.query(qrSach, (err, listSach) => {
      if (err) throw err;
      res.render("shop", { loaiSach: listLoai, listSach: listSach });
    });
  });
});

app.get("/category/:cateId", (req, res) => {
  let id = req.params.cateId;
  let qr = "select * from loai";
  let sqlSach = `select * from sach where idLoai=${id}`;
  db.query(qr, function (err, listLoai) {
    db.query(sqlSach, function (err, listSach) {
      if (err) throw err;
      res.render("shop", { loaiSach: listLoai, listSach: listSach });
    });
  });
});

// Admin
app.get("/admin/sachThem", (req, res) => {
  let qr = "select * from loai";
  db.query(qr, function (err, listLoai) { 
    res.render("admin/sach_them", {loaiSach: listLoai});
  });
});

app.post("/admin/sachThem", (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    const pathFile = files.image.filepath;
    const tenFile = "images/" + files.image.originalFilename;
    let tenSach = fields.tenSach;
    let gia = fields.gia;
    let moTa = req.moTa;
    let destPath = __dirname + "\\public\\" + tenFile;

    sach = { tenSach, gia, moTa, urlHinh: tenFile, anHien: 1};

    fs.copyFile(pathFile, destPath, (err) => {
      if (err) throw err;
      fs.unlink(pathFile, () => {
        console.log("Đã xóa file tạm");
      });
      console.log("Đã upload xong file " + tenFile);
    });
    db.query("insert into sach SET ?", sach, function (err, data) {
      if (err) throw err;
      res.redirect("/");
    });
  });
});

app.listen(PORT, () => {
  console.log(`App is running PORT ${PORT}`);
});
