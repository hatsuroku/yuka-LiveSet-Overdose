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

    add(imgUrl: string) {
        if (imgUrl.startsWith('url')) {
            imgUrl = imgUrl.slice(4, -1)
        }
        this.imgUrlList.push(imgUrl)
    }
}

const imgPicker = new ImgPicker()

export default imgPicker