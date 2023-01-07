import { RequestHandler } from 'express';
import busboy from 'busboy';
import fs from 'fs';
import { c, e } from '@/utils/logUtil';

export const uploadInfo: RequestHandler = (req, res, next) => {
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

export interface Verifier {
    action: (info: busboy.FileInfo) => boolean;
    failedHint: string;
}

export interface FileSaveInfo {
    path: string;
    name: string;
}

export function createUploadHanlder(
        verify: Verifier,
        saveProcess: (fileInfo: busboy.FileInfo) => FileSaveInfo | undefined
    ): RequestHandler {
    return (req, res) => {
        const bb = busboy({ headers: req.headers });
        bb.on('file', (name, file, info) => {
            const { filename, encoding, mimeType } = info;
            const utf8filename = Buffer.from(filename, 'latin1').toString('utf8');
            
            info.filename = utf8filename;

            c(
                `Received field [${name}]: filename: %j, encoding: %j, mimeType: %j`,
                utf8filename,
                encoding,
                mimeType
            );
            
            if (!verify.action(info)) {
                res.status(400).end(verify.failedHint);
            }

            const storeInfo = saveProcess(info); 
            if (!storeInfo) {
                return;
            }

            const saveTo = `${storeInfo.path}/${storeInfo.name}`;
            c(`field [${name}] with filename [${utf8filename}] save to [${saveTo}]`);
            const writableStream = fs.createWriteStream(saveTo);
            writableStream.on('finish', () => {
                c(`write [${storeInfo.name}] finished!`);
            })
            file.pipe(writableStream);
        });
        bb.on('close', () => {
            res.writeHead(200, { 'Connection': 'close' });
            res.end('Thank for uploading!\n');
        });
        bb.on('error', (err) => {
            e(err);
            res.status(500).end('Error while saving file!');
        });
        req.pipe(bb);
    };
}