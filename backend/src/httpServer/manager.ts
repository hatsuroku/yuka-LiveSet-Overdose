import { Express } from 'express';
import path from 'path';
import * as pickImg from './handlers/pickImg';
import { uploadImg } from './handlers/uploadImg';
import { uploadInfo } from './handlers/uploadHandler';
import { uploadSong } from './handlers/uploadSong';
import { querySongs } from './handlers/querySongs';

export default function configureHttpServer(app: Express) {
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', '..', 'static', 'index.html'));
    });
    
    app.get('/pickImg', pickImg.pick);
    app.post('/collectImg', pickImg.collect);
    
    app.post('/uploadInfo', uploadInfo);
    app.post('/uploadImg', uploadImg);

    app.get('/getSongs', querySongs);
    app.post('/uploadSong', uploadSong);
}