export const httpBaseUrl = 'http://localhost:3000';
export const wsBaseUrl = 'ws://localhost:3000';

export async function fetchImgUrl() {
    const res = await fetch(`${httpBaseUrl}/pickImg`, {
        method: 'GET',
        mode: 'cors',
    });
    if (res.ok) {
        const path = await res.text()
        console.log(`[fetchImgUrl]: fetched [${httpBaseUrl}${path}]`);
        return `${httpBaseUrl}${path}`;
    }
    return '';
}

export async function returnImgUrl(imgFilename: string) {
    const body = new URLSearchParams();
    body.append('filename', imgFilename)
    fetch(`${httpBaseUrl}/collectImg`, {
        method: 'POST',
        mode: 'cors',
        body,
        keepalive: true
    })
}

export function getFilenameFromUrl(url) {
    return url.split('#').shift().split('?').shift().split('/').pop()
}