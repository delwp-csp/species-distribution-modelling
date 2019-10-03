const express = require("express");
const bodyparser = require("body-parser");
const fs = require("fs");
const multer = require("multer");
const cors = require("cors");
const app = express();
const flash = require('connect-flash');
const session = require('express-session');

const DATA_DIR = "../dataset"

//Express session middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(bodyparser.json());
app.use(cors());

app.use(flash());

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// let specieCount = 1;
let specieJsonPath = `${DATA_DIR}/species.json`;

fs.writeFileSync(specieJsonPath, "", { flag: 'a+' });

let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    let dirName = `${DATA_DIR}/${req.header('dirName')}`
    dirName = dirName.replace(" ","_").toLowerCase();
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName)
    }
    cb(null, dirName);
  },
  filename: function(req, file, cb) {
    cb(null, 'observations.csv');
  }
});

let upload = multer({ storage: storage }).single("file");

writeSpecie = (path, jsonString) => {
  fs.writeFile(path, jsonString, err => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
};


app.post("/", (req, res) => {

  let jsonString = JSON.stringify(req.body, null, 2);
  let data = fs.readFileSync(specieJsonPath, "utf-8");
  fs.writeFileSync(specieJsonPath, "", { flag: 'a+' });
  if (data.length == 0) {
    writeSpecie(specieJsonPath, "[" + jsonString + "]");
  } else {
    data = data.substring(0, data.length - 1);
    data = data + ",\n" + jsonString + "]";

    writeSpecie(specieJsonPath, data);
  }
  req.flash('success_msg', 'Video idea added');
  res.json(req.body);
});


app.get("/get_data", (req, res) => {
  let data = fs.readFileSync(specieJsonPath, "utf-8");

  if (data.length != 0){
    data = data.replace(/\n|\r/g, "");
    data = JSON.parse(data);
    res.json(data);
  }else{
    res.json("")
  }
  
});

app.post("/upload", (req, res) => {

  upload(req, res, err => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

const port = 5000;

app.listen(port, () => {
  console.log("server running");
});
