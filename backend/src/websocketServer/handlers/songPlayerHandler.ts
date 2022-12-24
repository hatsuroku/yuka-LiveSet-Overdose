import WebSocket from 'ws';
import fs from 'fs';
import path from 'path';
import MyWSServer from '@/websocketServer/MyWSServer';
import { lyricPath } from '@/utils/constants';
import { c } from '@/utils/logUtil';

type MsgType = 'lyric' | 'currentTime';

interface PlayerMsg {
    type: MsgType,
    data: SongData | TimeData;
}

interface SongData {
    name: string;
    hasLyric: boolean;
}

interface TimeData {
    currentTime: number;
}

interface LyricViewMsg {
    type: MsgType;
    data: LyricData | TimeData;
}

interface LyricData {
    name: string;
    lrc: string;
}

function handleSong(songData: SongData, ws: WebSocket, wss: MyWSServer) {
    const lyricMsg: LyricViewMsg = {
        type: 'lyric',
        data: {
            name: songData.name,
            lrc: '...',
        }
    };
    if (songData.hasLyric) {
        const lrcFilePath = path.join(lyricPath, `${songData.name}.lrc`);
        const lrcText = fs.readFileSync(lrcFilePath, 'utf-8').toString();
        (lyricMsg.data as LyricData).lrc = lrcText;
    }
    
    for (const lyricView of wss.lyrics) {
        lyricView.send(JSON.stringify(lyricMsg));
    }
}

function handleTime(timeData: TimeData, ws: WebSocket, wss: MyWSServer) {
    const timeMsg: LyricViewMsg = {
        type: 'currentTime',
        data: {
            currentTime: timeData.currentTime,
        }
    }
    for (const lyricView of wss.lyrics) {
        lyricView.send(JSON.stringify(timeMsg));
    }
}

export default function songPlayerAddListener(ws: WebSocket, wss: MyWSServer) {
    ws.on('message', (data, isBinary) => {
        const msg: PlayerMsg = JSON.parse(data.toString());
        if (msg.type === 'lyric') {
            handleSong(msg.data as SongData, ws, wss);
        } else {
            handleTime(msg.data as TimeData, ws, wss);
        }
    });
    ws.on('close', (code, reason) => {
        wss.songPlayers.delete(ws);
    });
}