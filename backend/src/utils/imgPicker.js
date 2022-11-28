const path = require('path')
const fs = require('fs')
const random = require('./randomUtils')

const imgPath = path.resolve(__dirname, '..', '..', 'static', 'img')

class ImgPicker {
    allImgList = new Set()
    restImgList = []

    constructor() {
        this.restImgList = fs.readdirSync(imgPath).filter(e => !e.startsWith('.'))
        for (let filename of this.restImgList) {
            this.allImgList.add(filename)
        }
    }

    get() {
        const idx = random.getRandomInt(this.restImgList.length)
        const ret = this.restImgList[idx]
        // never empty
        if (this.restImgList.length > 1) {
            this.restImgList.splice(idx, 1)
        }
        return ret
    }

    getImgUrlList() {
        return this.restImgList.map(x => x)
    }

    add(imgUrl) {
        if (!this.allImgList.has(imgUrl)) {
            return false
        }
        if (this.restImgList.findIndex(e => e === imgUrl) === -1) {
            this.restImgList.push(imgUrl)
        }
        return true
    }
}

const picker = new ImgPicker()

module.exports = picker