const fs = require('fs')
const path = require('path')

function readJSON(file) {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname,`./${file}.json`)), 'utf-8')
}
  
function saveJSON(file, data) {
    fs.writeFileSync(path.resolve(__dirname,`./${file}.json`), JSON.stringify(data))
}

const config = {}
let configUpdate = false

function getConfig() {
    if (configUpdate) { return config }
    config = readJSON('config')
    configUpdate = true
    return config
}

function setConfig(data) {
    config = data
    saveJSON('config', data)
}

// const fileList = []
// let fileListUpdate = false

function getFileList() {

}

function uploadFile() {

}

module.exports = { getConfig, setConfig, getFileList, uploadFile }