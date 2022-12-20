import express from 'express';
import cors from 'cors';
import http from 'http';

import { staticPath } from '@/utils/constants';
import configureHttpServer from '@/httpServer/manager';
import MyWSServer from '@/websocketServer/MyWSServer';


const app = express();
const server = http.createServer(app);
const corsOptions = {
  origin: [
    'http://localhost:5173'
  ],
  optionsSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  // allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(express.static(staticPath));
app.use(cors(corsOptions));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configureHttpServer(app);
const WSServer = new MyWSServer(server);


server.listen(3000, () => {
  console.log('listening on *:3000')
});
