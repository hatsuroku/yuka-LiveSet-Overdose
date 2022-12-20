import path from 'path'
import fs from 'fs'
import * as random from './randomUtil'
import { imgPath } from './constants'

class ImgPicker {
    allImg = new Set()
    restImgList: string[] = []

    constructor() {
        this.restImgList = fs.readdirSync(imgPath).filter((e: string) => !e.startsWith('.'))
        for (let filename of this.restImgList) {
            this.allImg.add(filename)
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

    add(imgFilename: string) {
        if (!this.allImg.has(imgFilename)) {
            return false
        }
        if (this.restImgList.findIndex(e => e === imgFilename) === -1) {
            this.restImgList.push(imgFilename)
        }
        return true
    }

    addNewImg(imgFilename: string) {
        this.allImg.add(imgFilename)
        this.restImgList.push(imgFilename)
    }
}

const picker = new ImgPicker()
export default picker