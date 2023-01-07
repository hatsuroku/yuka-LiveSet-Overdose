import { RequestHandler } from 'express'
import busboy from 'busboy'
import fs from 'fs'
import { c, e } from '@/utils/logUtil'
import { imgPath, imgSuffixes } from '@/utils/constants'
import { getSuffix } from '@/utils/fileUtil'
import imgPicker from '@/utils/imgPicker';

export const uploadImg: RequestHandler = (req, res) => {
    const bb = busboy({ headers: req.headers });
    bb.on('file', (name, file, info) => {
        const { filename, encoding, mimeType } = info;
        const utf8filename = Buffer.from(filename, 'latin1').toString('utf8');

        c(
            `Received field [${name}]: filename: %j, encoding: %j, mimeType: %j`,
            utf8filename,
            encoding,
            mimeType
        );
        
        const suffix = getSuffix(utf8filename)
        if (!suffix || !imgSuffixes.has(suffix)) {
            res.status(400).end('The File is not an image')
        }
        // 路径是相对于 backend/dist/utils 来说的
        const imgs = fs.readdirSync(imgPath);
        let neoFilename = utf8filename;
        while (imgs.includes(neoFilename)) {
            const idx = neoFilename.indexOf('.');
            neoFilename = `${neoFilename.slice(0, idx)}-1${neoFilename.slice(idx)}`;
        }
        const saveTo = `${imgPath}/${neoFilename}`;
        c(`field [${name}] with filename [${utf8filename}] save to [${saveTo}]`);
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