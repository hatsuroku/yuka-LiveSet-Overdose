const path = require('path')
const fs = require('fs')
const imgPicker = require('../utils/imgPicker')

const imgPath = '/img'

const c = console.log.bind(globalThis)

const pick = (req, res, next) => {
    const filename = imgPicker.get()
    res.send(`${imgPath}/${filename}`)
    console.log(`img Picked: ${filename}`)
}

const collect = (req, res) => {
    const imgFilename = req.body.filename;
    if (imgFilename.length === 0 
            || !/\.\w+$/.test(imgFilename) 
            || !imgPicker.add(imgFilename)) {
        res.status(400).send(`filename invalid: [${imgFilename}]\n`)
    } else {
        c(`collected: [${imgFilename}]`)
        res.send('ok\n')
    }
}

module.exports = {
    pick,
    collect
}