const express = require("express");
const bodyparser = require("body-parser");
const fs = require("fs");
const multer = require("multer");
const cors = require("cors");
const ai = require("./ai");
const utils = require("./utils")
const app = express();

app.use(express.static('frontend'))
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

app.get("/progress/:specieName", (req, res) => {
  res.json(ai.get_progress(req.params.specieName)).end()
})

app.get("/distribution/:specieName/:balancer/:model", (req, res) => {
  const {specieName, balancer, model} = req.params
  const fname = `${utils.DATA_DIR}/${specieName.replace(/[^a-zA-Z]/g,'_')}/${balancer}-${model}.png`
  if (fs.existsSync(fname)) {
    res.sendFile(fname)
  } else {
    res.status(404);
  }
})

app.get("/get_data", (req, res) => {
  res.json(utils.readJSONFile(specieJsonPath, []))
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
