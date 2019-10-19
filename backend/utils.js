const fs = require("fs")
const path = require("path")
const DATA_DIR = path.resolve("../dataset")
const crypto = require("crypto")

const id = () => crypto.randomBytes(8).toString("hex")
const getDirName = specieName =>
  `${DATA_DIR}/${specieName.replace(/[^a-zA-Z]/g, "_").toLowerCase()}`

function readJSONFile(fname, defaultObject) {
  try {
    const contents = fs.readFileSync(fname)
    return JSON.parse(contents)
  } catch {
    return defaultObject
  }
}

function writeJSONFile(fname, object) {
  fs.writeFileSync(fname, JSON.stringify(object, null, 2))
}

module.exports = {
  DATA_DIR,
  getDirName,
  readJSONFile,
  writeJSONFile,
  id
}
