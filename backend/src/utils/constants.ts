import path from 'path';

export const staticPath = path.resolve(__dirname, '..', '..', 'static')
export const imgPath = path.resolve(__dirname, '..', '..', 'static', 'img');
export const imgServerPath = '/img'

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
