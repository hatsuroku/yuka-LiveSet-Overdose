import WebSocket, { WebSocketServer } from 'ws';
import { IncomingMessage, Server as httpServer } from 'http';
import { Server as httpsServer } from 'https';
import { c, e } from '@/utils/logUtil';
import bulletinAddListener from './handlers/bulletinHandler';
import bulletinEditorAddListener from './handlers/bulletinEditorHandler';

export default class MyWSServer extends WebSocketServer  {
    constructor(server: httpServer | httpsServer) {
        super({ server });
        this.init();
    }

    bulletins: Set<WebSocket> = new Set();
    bulletinEditors: Set<WebSocket> = new Set();

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
                'bulletinEditor',
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

        if (!clientUrl.searchParams.has('wstype')) {
            e('[MyWSServer connectionHandler] wstype of req is invalid!');
            return;
        }

        c(clientUrl.searchParams.get('wstype'));
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
        }
        
        // ws.on('message', (data) => {
        //     c('received: %s', data);
        //     c(`client's number: ${this.clients.size}`);
        // });
        // ws.on('close', (data) => {
        //     c('a client closed. : %s', data);
        //     c(`client's number: ${this.clients.size}`);
        // })
        
      
        // ws.send('hello from server');
    }


}