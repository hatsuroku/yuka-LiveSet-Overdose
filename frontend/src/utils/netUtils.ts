export const httpBaseUrl = 'http://localhost:3000';
export const wsBaseUrl = 'ws://localhost:3000';

export function getFilenameFromUrl(url) {
    return url.split('#').shift().split('?').shift().split('/').pop()
}