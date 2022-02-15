const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const inventors = [
  {
    id: 1,
    first: "Albert",
    last: "Einstein",
    year: 1879,
    passed: 1955,
  },
  {
    id: 2,
    first: "Isaac",
    last: "Newton",
    year: 1643,
    passed: 1727,
  },
  {
    id: 3,
    first: "Galileo",
    last: "Galilei",
    year: 1564,
    passed: 1642,
  },
  {
    id: 4,
    first: "Marie",
    last: "Curie",
    year: 1867,
    passed: 1934,
  },
  {
    id: 5,
    first: "Johames",
    last: "Kepler",
    year: 1571,
    passed: 1630,
  },
  {
    id: 6,
    first: "Nicolaus",
    last: "Copernicus",
    year: 1473,
    passed: 1543,
  },
];

app.listen(PORT, () => {
  console.log(`Ứng dụng đã chạy với port: ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("<p>Trang chủ</p>");
});

app.get("/product", (req, res) => {
  res.send("Trang Product");
});

app.post("/product", (req, res) => {
  res.send("Thêm sản phẩm POST");
});

app.get("/add-product", (req, res) => {
  res.send(
    "<form action='/product' method='POST'><input type='text' name='productName' /> <button type='submit'>Add Product</button></form>"
  );
});

app.get("/inventors", (req, res) => {
  let list =
    "<h2>Danh sách nhà khoa học</h2><ul style='list-style-type: none'>";
  inventors.forEach((item) => {
    list += `<li style='max-width: 160px; padding: 8px 16px; border-radius: 4px; border: 1px solid #ddd'><a style='text-decoration: none; color: #000' href="/inventor/${item.id}">${item.last}</a></li>`;
  });
  list += "</ul>";
  res.send(list);
});

app.get("/inventor/:id", (req, res) => {
  let id = req.params.id;
  const inventor = inventors.find((e) => {
    return e.id == id;
  });

  let info = `<h2>Thông tin chi tiết nhà khoa học: </h2>`;
  info += `<div style="border: 1px solid #ddd; padding: 8px 4px; max-width: 240px; border-radius: 4px"><p>Full name: ${inventor.first} ${inventor.last} </p>`;
  info += `Year: ${inventor.year}, Passed: ${inventor.passed}<div>`;
  res.send(info);
});

app.get("/add-inventor", (req, res) => {
  res.send(
    '<h1>Thêm Nhà Khoa Học</h1><form action="/inventor" method="POST"><input style="padding: 4px;  type="text" name="first" placeholder="Tên nhà khoa học"><input style="padding: 4px;" type="text" name="last" placeholder="Họ nhà khoa học"><br><input style="padding: 4px;"  type="number" name="year" placeholder="Year"><input style="padding: 4px;"  type="number" name="passed" placeholder="passed"><br><button style="padding: 4px; background-color: green; border: none;margin-top: 5px; color: white"  type="submit">Add Inventor</button></form>'
  );
});

app.get("/myinfo", (req, res) => {
  let id = req.params.id;
  const inventor = inventors.find((e) => {
    return e.id == id;
  });

  let info = `<h2>Thông tin sinh viên: </h2>`;
  info += `<div style="border: 1px solid #ddd; padding: 8px 4px; max-width: 240px; border-radius: 4px"><p>Full name: Đào Đức Minh Khôi </p>`;
  info += `Year: 2002<div>`;
  res.send(info);
});

app.post("/inventor", (req, res) => {
  let newInventor = req.body;
  newInventor.id = inventors.length + 1;
  inventors.push(newInventor);
  res.redirect("/inventors");
});
