import path from 'path';

export const staticPath = path.resolve(__dirname, '..', '..', 'static')
export const imgPath = path.resolve(__dirname, '..', '..', 'static', 'img');
export const songPath = path.resolve(__dirname, '..', '..', 'static', 'songs');
export const songInfoPath = path.resolve(songPath, 'info.json');
export const audioPath = path.resolve(__dirname, '..', '..', 'static', 'songs', 'audio');
export const lyricPath = path.resolve(__dirname, '..', '..', 'static', 'songs', 'lyric');
export const imgServerPath = '/img';
export const audioServerPath = '/songs/audio';
export const lyricServerPath = '/songs/lyric';

const imgSuffixes = new Set();

const imgSuffixList = [
    'jpg',
    'jpeg',
    'png',
    'webp',
    'gif',
    'tif',
    'tiff',
    'svg',
    'raw',
    'bmp',
    'ico',
]
imgSuffixList.forEach(ele => imgSuffixes.add(ele))

export { imgSuffixes };
