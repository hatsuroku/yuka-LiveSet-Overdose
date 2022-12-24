import { audioPath, lyricPath } from '@/utils/constants';
import { removeSuffix, getSuffix } from '@/utils/fileUtil';
import fs from 'fs';

const lyrics = new Set(), songsWithLyric = new Set(), songsWithoutLyric = new Set();
const audioSuffix = new Map();

function init() {
    readSongsInfo();
}
init();

// 可以有歌没歌词，但是不能有歌词没歌
function readSongsInfo() {
    let songList = fs.readdirSync(audioPath), lyricList = fs.readdirSync(lyricPath);
    
    lyrics.clear();
    songsWithLyric.clear();
    songsWithoutLyric.clear();
    audioSuffix.clear();

    updateSongsInfo(songList, lyricList);
}

function updateAudioSuffix(songList: string[]) {
    songList.forEach((songfileName) => {
        audioSuffix.set(removeSuffix(songfileName), getSuffix(songfileName));
    });
}

export function updateSongsInfo(songList: string[], lyricList: string[]) {
    updateAudioSuffix(songList);
    songList = songList.map(removeSuffix), lyricList = lyricList.map(removeSuffix);
    lyricList.forEach((lyric) => {
        lyrics.add(lyric);
        if (songsWithoutLyric.has(lyric)) {
            songsWithLyric.add(lyric);
            songsWithoutLyric.delete(lyric);
        }
    });
    
    songList.forEach((song) => {
        if (lyrics.has(song)) {
            songsWithLyric.add(song);
        } else {
            songsWithoutLyric.add(song);
        }
    });
}

export function singleUpdateSongsInfo(filename: string) {
    if (getSuffix(filename) === 'lrc') {
        const lyric = removeSuffix(filename);
        lyrics.add(lyric);
        if (songsWithoutLyric.has(lyric)) {
            songsWithLyric.add(lyric);
            songsWithoutLyric.delete(lyric);
        }
        return;
    }
    updateAudioSuffix([filename]);
    const song = removeSuffix(filename);
    if (lyrics.has(song)) {
        songsWithLyric.add(song);
    } else {
        songsWithoutLyric.add(song);
    }
}

export function getSongs() {
    return {
        songs: Array.from(songsWithLyric).map((name) => ({
            name,
            suffix: audioSuffix.get(name),
        })),
        songsWithoutLyric: Array.from(songsWithoutLyric),
    };
}