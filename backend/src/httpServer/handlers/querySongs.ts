import { getSongs } from '@/dataManager/song';
import { RequestHandler } from 'express';
import { audioServerPath } from '@/utils/constants';

export const querySongs: RequestHandler = (req, res, next) => {
    const rawSongsInfo = getSongs();
    const rawToUrlInfo = (song: any) => ({
        name: song.name,
        audioPath: `${audioServerPath}/${song.name}.${song.suffix}`
    });
    const songs = {
        songsWithLyric: rawSongsInfo.songsWithLyric.map(rawToUrlInfo),
        songsWithoutLyric: rawSongsInfo.songsWithoutLyric.map(rawToUrlInfo),
    };
    console.log(`[querySongs] sending: ${JSON.stringify(songs, null, 4)}`);
    res.json(songs);
}