import WebSocket from 'ws';
import MyWSServer from '@/websocketServer/MyWSServer';

export default function bulletinAddListener(ws: WebSocket, wss: MyWSServer) {
    ws.on('close', (code, reason) => {
        wss.bulletins.delete(ws);
    });
}