<script setup lang="ts">
import { ref, reactive, onMounted, Ref, StyleValue } from 'vue'
import { getRandomInt } from '../utils/randomUtils'
// import imgPicker from '../utils/imgPicker'

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

type Direction = 'top' | 'bottom' | 'left' | 'right'
const classObj: Ref<string[][]> = ref([
    reactive([]),
    reactive([]),
])

const styleObj: Ref<StyleValue[]> = ref([
    reactive({}),
    reactive({}),
])

let using = 1

function switchAlbum(newAlbumUrl, fromDirection: Direction) {
    let nowClass, nextClass
    let nowStyle, nextStyle
    nowClass = classObj.value[using]
    nowStyle = styleObj.value[using]
    using = (using + 1) % classObj.value.length
    nextClass = classObj.value[using]
    nextStyle = styleObj.value[using]

    nextStyle.backgroundImage = `url(${newAlbumUrl})`
    imgPicker.add(nowStyle.backgroundImage)
    
    // clear array
    nowClass.splice(0, nowClass.length)
    nextClass.splice(0, nextClass.length)
    
    nowClass.push('lower')
    nowClass.push('current-album')

    nextClass.push('upper')
    nextClass.push(`${fromDirection}-album`)
    setTimeout(() => {
        nextClass[1] = 'current-album'
        nextClass.push('album-transition')
    }, 0);
}


onMounted(() => {
    styleObj.value[using].backgroundImage = `url(${imgPicker.get()})`
    const dir: Direction[] = ['top', 'bottom', 'left', 'right']
    setInterval(() => {
        switchAlbum(imgPicker.get(), dir[getRandomInt(dir.length)])
    }, 5000)
})

</script>

<template>
    <div class="outer-container">
        <div class="album" :class="classObj[0]" :style="styleObj[0]"></div>
        <div class="album" :class="classObj[1]" :style="styleObj[1]"></div>
    </div>
</template>

<style scoped>
.outer-container {
    /* margin: 100px; */
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;
}

.album {
    position: absolute;
    height: 100%;
    width: 100%;
    background: blanchedalmond;
    background-size: cover;
    background-position: center;
}

.album-transition {
    transition: left 3s, top 3s;
    transition-timing-function: cubic-bezier(.48, 0, 0, 1.01);
}

.current-album {
    left: 0;
    top: 0;
}

.top-album {
    left: 0;
    top: calc(-100%);
    background: lightblue;
}

.right-album {
    left: calc(100%);
    top: 0;
    background: pink;
}

.bottom-album {
    left: 0;
    top: calc(100%);
    background: lightyellow;
}

.left-album {
    left: calc(-100%);
    top: 0;
    background: lightcoral;
}

.upper {
    z-index: 1000;
}

.lower {
    z-index: 100;
}

</style>
