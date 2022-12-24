import WebSocket, { WebSocketServer } from 'ws';
import { IncomingMessage, Server as httpServer } from 'http';
import { Server as httpsServer } from 'https';
import { c, e } from '@/utils/logUtil';
import bulletinAddListener from './handlers/bulletinHandler';
import bulletinEditorAddListener from './handlers/bulletinEditorHandler';
import LyricAddListener from './handlers/lyricHandler';
import songPlayerAddListener from './handlers/songPlayerHandler';

export default class MyWSServer extends WebSocketServer  {
    VALID_WSTYPE: string[] | undefined;
    constructor(server: httpServer | httpsServer) {
        super({ server });
        this.init();
    }

    bulletins: Set<WebSocket> = new Set();
    bulletinEditors: Set<WebSocket> = new Set();
    songPlayers: Set<WebSocket> = new Set();
    lyrics: Set<WebSocket> = new Set();

    init() {
        this.on('listening', () => {
            c(`WebSocket server created, listening on ${JSON.stringify(this.address(), null, 4)}`);
        });
        this.on('connection', this.connectionHandler);
        // 定义合法的 wstype 常量
        Object.defineProperty(this, 'VALID_WSTYPE', {
            configurable: false,
            enumerable: true,
            writable: false,
            value: [
                'bulletin',
                'bulletin-editor',
                'song-player',
                'lyric',
            ]
        })
    }

    connectionHandler(ws: WebSocket, req: IncomingMessage) {
        if (!req.url) {
            e('[MyWSServer connectionHandler] req.url not exist!');
            return;
        }
        const clientUrl = new URL(req.url, `http://${req.headers.host}`);
        c(clientUrl);

        const wstype = clientUrl.searchParams.get('wstype');
        if (!wstype || this.VALID_WSTYPE!.indexOf(wstype) === -1) {
            e(`[MyWSServer connectionHandler] wstype is [${wstype}], invalid!`);
            return;
        }

        switch (clientUrl.searchParams.get('wstype')) {
            case 'bulletin': {
                this.bulletins.add(ws);
                bulletinAddListener(ws, this);
                break;
            }
            case 'bulletin-editor': {
                this.bulletinEditors.add(ws);
                bulletinEditorAddListener(ws, this);
                break;
            }
            case 'song-player': {
                this.songPlayers.add(ws);
                songPlayerAddListener(ws, this);
                break;
            }
            case 'lyric': {
                this.lyrics.add(ws);
                LyricAddListener(ws, this);
                break;
            }
        }
        console.log(`current conn: ${this.clients.size }`);
        console.log(`current total size: ${this.bulletinEditors.size + this.bulletins.size}`);

        ws.on('close', (code, reason) => {
            console.log(`[${ws.url}] disconnected.`);
            console.log(`current conn: ${this.clients.size }`);
            console.log(`current total size: ${this.bulletinEditors.size + this.bulletins.size}`);    
        })
    }


}