<script setup lang="ts">
import { ref, reactive, onMounted, Ref, StyleValue } from 'vue'
import { getRandomIntRange, getRandomElement } from '../utils/randomUtils'
import { imgPicker, preloadImgs } from '../utils/imgUtils'

type Direction = 'top' | 'bottom' | 'left' | 'right'
const classObj: Ref<string[][]> = ref([
    reactive([]),
    reactive([]),
])

const styleObj: Ref<StyleValue[]> = ref([
    reactive({}),
    reactive({}),
])

const switchTime = {
    lo: 5,
    hi: 60,
}
const dir: Direction[] = ['top', 'bottom', 'left', 'right']

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
    }, 0)
    setTimeout(() => {
        switchAlbum(imgPicker.get(), getRandomElement(dir))
    }, getRandomIntRange(switchTime.lo, switchTime.hi) * 1000)
}

preloadImgs(imgPicker.getImgUrlList())
onMounted(() => {
    styleObj.value[using].backgroundImage = `url(${imgPicker.get()})`
    setTimeout(() => {
        switchAlbum(imgPicker.get(), getRandomElement(dir))
    }, getRandomIntRange(switchTime.lo, switchTime.hi) * 1000)
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
    background-size: cover;
    background-position: center;
}

.album-transition {
    transition: left 1s, top 1s;
    transition-timing-function: cubic-bezier(.48, 0, 0, 1.01);
}

.current-album {
    left: 0;
    top: 0;
}

.top-album {
    left: 0;
    top: calc(-100%);
}

.right-album {
    left: calc(100%);
    top: 0;
}

.bottom-album {
    left: 0;
    top: calc(100%);
}

.left-album {
    left: calc(-100%);
    top: 0;
}

.upper {
    z-index: 1000;
}

.lower {
    z-index: 100;
}

</style>
