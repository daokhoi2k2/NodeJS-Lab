var express = require("express");
var router = express.Router();
var db = require("../models/database");

router.get("/", function (req, res, next) {
  let sql = `SELECT sach.*, loai.tenLoai FROM sach inner join loai on sach.idLoai = loai.id`;
  db.query(sql, function (err, data) {
    res.render("sach_list", { list: data });
  });
});

router.get("/addnew", function (req, res, next) {
  let sql = `SELECT *  FROM loai`;
  db.query(sql, function (err, data) {
    res.render("sach_them", { loai: data });
  });
});

router.post("/store", function (req, res, next) {
  let ts = req.body.tenSach;
  let ah = req.body.anHien;
  let gia = req.body.gia;
  let moTa = req.body.moTa;
  let fileHinh = "images/" + req.body.fileHinh;
  let idLoai = req.body.loai;
  sach = { anHien: ah, gia: +gia, tenSach: ts, moTa: moTa, urlHinh: fileHinh, idLoai: idLoai };
  db.query("insert into sach SET ?", sach, function (err, data) {
    console.log(data);
    if (err) throw err;
    res.redirect("/sach/");
  });
});

router.get("/edit/:id", function (req, res, next) {
  var id = req.params.id;
  let sql = `SELECT sach.*, loai.tenLoai FROM sach inner join loai on sach.idLoai = loai.id where sach.id = ${id}`;
  db.query(sql, function (err, data) {
    let sql = `SELECT *  FROM loai`;
    db.query(sql, function (err, loai) {
      res.render("sach_sua", { loai: loai, sach: data[0] });
    });
  });
});

router.post("/update/", function (req, res, next) {
  let ts = req.body.tenSach;
  let ah = req.body.anHien;
  let gia = req.body.gia;
  let moTa = req.body.moTa;
  let fileHinh = "images/" + req.body.fileHinh;
  let idLoai = req.body.loai;
  let id = req.body.id;
  db.query(
    `UPDATE sach SET tenSach=?,moTa=?, urlHinh=?, gia=?, idLoai=?, anHien=? WHERE id = ?`,
    [ts, moTa, fileHinh, gia, idLoai, ah, id],
    function (err, data) {
        console.log(data);
      if (data.affectedRows == 0) {
        console.log(`Không có id loại ${id} để cập nhật`);
      }
      res.redirect("/sach/");
    }
  );
});

router.get("/delete/:id", function (req, res) {
  let id = req.params.id;
  let sql = `DELETE FROM sach WHERE id = ?`;
  db.query(sql, [id], function (err, data) {
    if (data.affectedRows == 0) {
      console.log(`Không có sách ${id} để xóa`);
    }
    res.redirect("/sach");
  });
});

module.exports = router;
