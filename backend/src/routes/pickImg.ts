import path from 'path'
import fs from 'fs'
import { RequestHandler } from 'express'
import imgPicker from '@/utils/imgPicker'
import { c } from '@/utils/logUtil'
import { imgServerPath } from '@/utils/constants'


export const pick: RequestHandler = (req, res, next) => {
    const filename = imgPicker.get()
    res.send(`${imgServerPath}/${filename}`)
    console.log(`img Picked: ${filename}`)
}

export const collect: RequestHandler = (req, res) => {
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