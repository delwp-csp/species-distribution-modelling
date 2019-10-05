const express = require("express");
const bodyparser = require("body-parser");
const fs = require("fs");
const multer = require("multer");
const cors = require("cors");
const ai = require("./ai");
const utils = require("./utils")
const app = express();

app.use(bodyparser.json());
app.use(cors());

// let specieCount = 1;
const specieJsonPath = `${utils.DATA_DIR}/species.json`;

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const dirName = utils.getDirName(req.header('specieName'))
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName)
    }
    cb(null, dirName);
  },
  filename: function(req, file, cb) {
    cb(null, 'observations.csv');
  }
});

const upload = multer({ storage: storage }).single("file");

app.post("/", (req, res) => {
  const data = utils.readJSONFile(specieJsonPath, [])
  data.push(req.body);
  utils.writeJSONFile(specieJsonPath, data)

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
    ai.process(req.header("specieName"))

    return res.status(200).end();
  });
});

const port = 5000;

app.listen(port, () => {
  console.log("server running");
});
