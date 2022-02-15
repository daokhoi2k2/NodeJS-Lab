const express = require("express");
const ejs = require("ejs");
const app = express();
const formidable = require("formidable");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const PORT = 3000;

const listProduct = [
  {
    id: 0101,
    title: "Sống Xanh Như Những Lá Trà",
    slug: "song-xanh-nhu-nhung-la-tra",
    price: 63500,
    description:
      "Khám phá kho tàng ý tưởng về sự đơn giản,  trí tuệ của người Nhật",
    imageURL: "song-xanh-nhu-nhung-la-tra.png",
  },
  {
    id: 0102,
    title: "Sống Như Lần Đầu, Yêu Như Lần Cuối",
    slug: "song-nhu-lan-dau-tien-yeu-thuong-nhu-lan-cuoi",
    price: 52000,
    description:
      "Những câu chuyện hằng ngày, những hạnh phúc giản dị mà chúng ta dễ bỏ lỡ",
    imageURL: "song-nhu-lan-dau-tien-yeu-thuong-nhu-lan-cuoi.jpg",
  },
  {
    id: 0103,
    title: "Sức Mạnh Của Sự Tử Tế",
    slug: "suc-manh-cua-su-tu-te",
    price: 29000,
    description: "Những câu chuyện sâu sắc và ý nghĩa về sự tử tế mỗi ngày",
    imageURL: "suc-manh-cua-su-tu-te.png",
  },
  {
    id: 0105,
    title: "Mắt Biếc",
    slug: "mat-biet",
    price: 160000,
    description:
      "Mắt biếc kể về cuộc đời của nhân vật chính tên Ngạn và sự hy sinh vì tình yêu",
    imageURL: "mat-biet.jpg",
  },
  {
    id: 0106,
    title: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh",
    slug: "toi-thay-hoa-vang-tren-co-xanh",
    price: 87000,
    description:
      "Tôi Thấy Hoa Vàng Trên Cỏ Xanh lắng đọng nhẹ nhàng trong tâm tưởng để rồi ai đã lỡ đọc rồi mà muốn quên đi thì thật khó.",
    imageURL: "toi-thay-hoa-vang-tren-co-xanh.jpg",
  },
  {
    id: 0107,
    title: "Đừng Bao Giờ Đi Ăn Một Mình",
    slug: "dung-bao-gio-di-an-mot-minh",
    price: 120000,
    description: "Đừng Bao Giờ Đi Ăn Một Mình – Sức mạnh của sự kết nối",
    imageURL: "dung-bao-gio-an-mot-minh.jpg",
  },
];

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.listen(PORT, () => {
  console.log("App is running on PORT" + PORT);
});

app.get("/", (req, res) => {
  var today = new Date();
  currentDay = today.getDay();
  var day = "";
  switch (currentDay) {
    case 0:
      day = "Chủ nhật";
      break;
    case 1:
      day = "Thứ hai";
      break;
    case 2:
      day = "Thứ ba";
      break;
    case 3:
      day = "Thứ tư";
      break;
    case 4:
      day = "Thứ năm";
      break;
    case 5:
      day = "Thứ sáu";
      break;
    case 6:
      day = "Thứ bảy";
      break;
    default:
      console.log(`Error: ${currentDay}`);
  }
  res.render("home", { kindOfDay: day });
});

app.get("/shop", (req, res) => {
  res.render("shop", { products: listProduct });
});

app.get("/addnew", (req, res) => {
  res.render("add-product");
});

app.post("/addnew", (req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    let pathFile = files.hinhsp.filepath;
    let tenFile = files.hinhsp.originalFilename;
    let tensp = fields.tensp;
    let giasp = fields.giasp;
    let motasp = fields.motasp;
    let destPath = __dirname + "\\public\\images\\" + tenFile;
    console.log(pathFile, destPath);
    fs.copyFile(pathFile, destPath, (err) => {
      if (err) throw err;
      fs.unlink(pathFile, () => {
        console.log("Đã xóa file tạm");
      });
      console.log("Đã upload xong file " + tenFile);
    });
    listProduct.push({
      id: uuidv4(),
      title: tensp,
      price: giasp,
      description: motasp,
      imageURL: tenFile,
    });
    //res.send(JSON.stringify({ fields, files,pathFile , destPath}, null, 2));
    res.redirect("/shop");
  });
});

app.get("/detail/:id", (req, res) => {
  const id = req.params.id;
  const sp = listProduct.find((e) => {
    return e.id == id;
  });
  res.render("chitietsp", { id: id, sp: sp });
});
