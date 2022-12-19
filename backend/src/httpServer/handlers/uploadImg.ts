import { RequestHandler } from 'express'
import busboy from 'busboy'
import path from 'path'
import os from 'os'
import fs from 'fs'
import { c, e } from '@/utils/logUtil'
import { imgPath, imgSuffixes } from '@/utils/constants'
import { getSuffixName } from '@/utils/fileUtil'
import imgPicker from '@/utils/imgPicker';

export const uploadImgInfo: RequestHandler = (req, res, next) => {
    const bb = busboy({ headers: req.headers })
    bb.on('file', (name, file, info) => {
        const { filename, encoding, mimeType } = info;
        c(
            `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
            filename,
            encoding,
            mimeType
        );
        file.on('data', (data) => {
            c(`File [${name}] got ${data.length} bytes`);
        }).on('close', () => {
            c(`File [${name}] done`);
        });
    });
    bb.on('field', (name, val, info) => {
        c(`Field [${name}]: value: %j`, val);
    });
    bb.on('close', () => {
        c('Done parsing form!\n');
        res.end('ok!\n');
    });
    req.pipe(bb);
}

export const uploadImg: RequestHandler = (req, res) => {
    const bb = busboy({ headers: req.headers });
    bb.on('file', (name, file, info) => {
        const { filename, encoding, mimeType } = info;
        c(
            `Received field [${name}]: filename: %j, encoding: %j, mimeType: %j`,
            filename,
            encoding,
            mimeType
        );
        
        const suffix = getSuffixName(filename)
        if (!suffix || !imgSuffixes.has(suffix)) {
            res.status(400).end('The File is not an image')
        }
        // 路径是相对于 dist/routes 来说的
        const imgs = fs.readdirSync(imgPath);
        let neoFilename = filename;
        while (imgs.includes(neoFilename)) {
            const idx = neoFilename.indexOf('.');
            neoFilename = `${neoFilename.slice(0, idx)}-1${neoFilename.slice(idx)}`;
        }
        const saveTo = `${imgPath}/${neoFilename}`;
        c(`field [${name}] with filename [${filename}] save to [${saveTo}]`);
        const writableStream = fs.createWriteStream(saveTo);
        writableStream.on('finish', () => {
            c(`write [${neoFilename}] finished!`);
            imgPicker.addNewImg(neoFilename);
        })
        file.pipe(writableStream);
    });
    bb.on('close', () => {
        res.writeHead(200, { 'Connection': 'close' });
        res.end(`Thank for uploading!\n`);
    });
    bb.on('error', (err) => {
        e(err);
        res.status(500).end('Error while saving img!');
    });
    req.pipe(bb);
}