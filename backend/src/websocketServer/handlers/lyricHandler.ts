import WebSocket from 'ws';
import MyWSServer from '@/websocketServer/MyWSServer';

export default function LyricAddListener(ws: WebSocket, wss: MyWSServer) {
    ws.on('close', (code, reason) => {
        wss.lyrics.delete(ws);
    });
}