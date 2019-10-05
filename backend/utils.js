const fs = require("fs")
const DATA_DIR = "../dataset"

const getDirName = (specieName) => `${DATA_DIR}/${specieName.replace(/[^a-zA-Z]/g,"_").toLowerCase()}`

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
    DATA_DIR, getDirName, readJSONFile, writeJSONFile
}