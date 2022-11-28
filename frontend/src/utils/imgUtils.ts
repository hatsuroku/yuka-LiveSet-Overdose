import { getRandomInt } from "./randomUtils"

class ImgPicker {
    imgUrlList: string[] = [];

    constructor() {
        for (let i = 1; i <= 17; ++i) {
            this.imgUrlList.push(`/img/${i}.jpg`)
        }
    }

    get(): string {
        const idx = getRandomInt(this.imgUrlList.length)
        const ret = this.imgUrlList[idx]
        // never empty
        if (this.imgUrlList.length > 1) {
            this.imgUrlList.splice(idx, 1)
        }
        return ret
    }

    getImgUrlList(): string[] {
        return this.imgUrlList.map(x => x)
    }

    add(imgUrl: string) {
        if (imgUrl.startsWith('url')) {
            imgUrl = imgUrl.slice(4, -1)
        }
        this.imgUrlList.push(imgUrl)
    }
}


export const imgPicker = new ImgPicker()

export function preloadImgs(imgUrlList) {  
    for (let i = 0; i < imgUrlList.length; i++) {
        const img = new Image()
        img.src = imgUrlList[i]
    }
}