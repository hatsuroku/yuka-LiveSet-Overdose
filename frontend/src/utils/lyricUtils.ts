import { Lyric } from '@/type/lyric';

export function splitLyric(lyricText): Lyric[] {
    const lines = lyricText.split('\n').filter(line => /\[\d{2}:\d{2}\.\d{2,3}\]/.test(line));
    const ret = lines.map((line) => {
        const res = /\[(\d{2}):(\d{2})\.(\d{2,3})\]\s*(.*)\s*$/.exec(line) as RegExpExecArray;
        const mm = parseInt(res[1]), ss = parseInt(res[2]), ms = parseInt(res[3]);
        const text = res[4];
        const second = mm * 60 + ss + ms / 1000;
        return {
            second,
            text
        };
    });
    // console.log(ret);
    return ret;
}