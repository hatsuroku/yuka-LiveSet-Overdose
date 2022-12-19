import { Express } from 'express';
import * as pickImg from './handlers/pickImg';
import { uploadImgInfo, uploadImg } from './handlers/uploadImg';
import path from 'path';

export default function configureHttpServer(app: Express) {
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', '..', 'static', 'index.html'));
    });
    
    app.get('/pickImg', pickImg.pick);
    app.post('/collectImg', pickImg.collect);
    
    app.post('/uploadImgInfo', uploadImgInfo);
    app.post('/uploadImg', uploadImg);
}