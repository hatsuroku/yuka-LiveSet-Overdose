import WebSocket from 'ws';
import MyWSServer from '@/websocketServer/MyWSServer';
import { c } from '@/utils/logUtil';

export default function bulletinEditorAddListener(ws: WebSocket, wss: MyWSServer) {
    ws.on('message', (data, isBinary) => {
        // c('%s', data);
        for (const bulletinsWS of wss.bulletins) {
            bulletinsWS.send(data);
        }
    });
    ws.on('close', (code, reason) => {
        wss.bulletinEditors.delete(ws);
    });
}