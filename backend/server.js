const express = require("express");
const bodyparser = require("body-parser");
const fs = require("fs");
const multer = require("multer");
const cors = require("cors");
const app = express();

// let specieCount = 1;
let specieJsonPath = "./specie_data/species.json";

app.use(bodyparser.json());
app.use(cors());

let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./specie_data/observation_data");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
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
  // console.log("The request body", req.body);

  let jsonString = JSON.stringify(req.body, null, 2);
  let data = fs.readFileSync(specieJsonPath, "utf-8");

  if (data.length == 0) {
    writeSpecie(specieJsonPath, "[" + jsonString + "]");
  } else {
    data = data.substring(0, data.length - 1);
    data = data + ",\n" + jsonString + "]";

    writeSpecie(specieJsonPath, data);
  }
  res.json(req.body);
});

app.get("/get_data", (req, res) => {
  let data = fs.readFileSync(specieJsonPath, "utf-8");
  data = data.replace(/\n|\r/g, "");
  data = JSON.parse(data);
  console.log("data being sent back", data);
  res.json(data);
});

app.post("/upload", (req, res) => {
  console.log("file recieved:");
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
