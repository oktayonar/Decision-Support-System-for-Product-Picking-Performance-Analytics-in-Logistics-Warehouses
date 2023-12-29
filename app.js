const express = require("express");
const app = express();
const router = require("./routers");
const port = 3000;
const path = require("path");
// const nodemailer = require("nodemailer");
// const bodyParser = require("body-parser");

app.use(express.json({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "giris.html"));
});

app.get("/index.html", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/urun_performans_goruntule.html", function (req, res) {
  res.sendFile(path.join(__dirname, "urun_performans_goruntule.html"));
});

app.get("/tur_performans_goruntule.html", function (req, res) {
  res.sendFile(path.join(__dirname, "tur_performans_goruntule.html"));
});

app.get("/takim_performans_goruntule.html", function (req, res) {
  res.sendFile(path.join(__dirname, "takim_performans_goruntule.html"));
});

app.get("/urun_gelecek_analizi.html", function (req, res) {
  res.sendFile(path.join(__dirname, "urun_gelecek_analizi.html"));
});

app.get("/Admin.png", function (req, res) {
  res.sendFile(path.join(__dirname, "Admin.png"));
});

app.get("/tur_gelecek_analizi.html", function (req, res) {
  res.sendFile(path.join(__dirname, "tur_gelecek_analizi.html"));
});

app.get("/takim_gelecek_analizi.html", function (req, res) {
  res.sendFile(path.join(__dirname, "takim_gelecek_analizi.html"));
});

app.get("/logo.png", function (req, res) {
  res.sendFile(path.join(__dirname, "logo.png"));
});

app.get("/personelin_sahte_rapor_alma_analizi.html", function (req, res) {
  res.sendFile(
    path.join(__dirname, "personelin_sahte_rapor_alma_analizi.html")
  );
});

app.get("/personel1.png", function (req, res) {
  res.sendFile(path.join(__dirname, "personel1.png"));
});

app.get("/personel2.png", function (req, res) {
  res.sendFile(path.join(__dirname, "personel2.png"));
});

app.get("/52.jpg", function (req, res) {
  res.sendFile(path.join(__dirname, "52.jpg"));
});

app.get("/depo-yonetimi-otomasyon.jpg", function (req, res) {
  res.sendFile(path.join(__dirname, "depo-yonetimi-otomasyon.jpg"));
});

app.use("/api", router);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
