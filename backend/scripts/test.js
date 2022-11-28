const path = require('path')
const fs = require('fs')
const random = require('../src/utils/randomUtils')

const imgPath = path.resolve(__dirname, '..', 'static', 'img')
const c = console.log.bind(globalThis)

class ImgPicker {
    imgList = []

    constructor() {
        this.imgList = fs.readdirSync(imgPath)
    }

    get() {
        const idx = random.getRandomInt(this.imgList.length)
        const ret = this.imgList[idx]
        // never empty
        if (this.imgList.length > 1) {
            this.imgList.splice(idx, 1)
        }
        return ret
    }

    getImgUrlList() {
        return this.imgList.map(x => x)
    }

    add(imgUrl) {
        this.imgList.push(imgUrl)
    }
}

const picker = new ImgPicker()