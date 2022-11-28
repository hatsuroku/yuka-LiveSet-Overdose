<script setup lang="ts">
import { ref, reactive, onMounted, Ref, StyleValue } from 'vue'
import { getRandomIntRange, getRandomElement } from '../utils/randomUtils'
import { imgPicker, preloadImgs } from '../utils/imgUtils'
import { baseUrl, getFilenameFromUrl } from '../utils/netUtils'

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
    // lo: 2,
    // hi: 2,
    lo: 5,
    hi: 60,
}
const dir: Direction[] = ['top', 'bottom', 'left', 'right']

let using = 1

function switchAlbum(newAlbum, fromDirection: Direction) {

    const removeUrlParenthesis = (str: string) => str.slice(4, -1)

    let nowClass, nextClass
    let nowStyle, nextStyle
    nowClass = classObj.value[using]
    nowStyle = styleObj.value[using]
    using = (using + 1) % classObj.value.length
    nextClass = classObj.value[using]
    nextStyle = styleObj.value[using]

    nextStyle['background-image'] = `url(${newAlbum})`
    // imgPicker.add(nowStyle['background-image'])
    
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
    setTimeout(async () => {
        switchAlbum(await fetchImgUrl(), getRandomElement(dir))
    }, getRandomIntRange(switchTime.lo, switchTime.hi) * 1000)

    postImgUrl(getFilenameFromUrl(removeUrlParenthesis(nowStyle['background-image'])))
    
}

async function fetchImgUrl() {
    const res = await fetch(`${baseUrl}/pickImg`, {
        method: 'GET',
        mode: 'cors',
    });
    if (res.ok) {
        const path = await res.text()
        console.log(`${baseUrl}${path}`);
        return `${baseUrl}${path}`;
    }
    return undefined;
}

async function postImgUrl(imgFilename: string) {
    const body = new URLSearchParams();
    body.append('filename', imgFilename)
    fetch(`${baseUrl}/collectImg`, {
        method: 'POST',
        mode: 'cors',
        body
    })
}

// preloadImgs(imgPicker.getImgUrlList())
onMounted(async () => {
    styleObj.value[using]['background-image'] = `url(${await fetchImgUrl()})`
    setTimeout(async () => {
        switchAlbum(await fetchImgUrl(), getRandomElement(dir))
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
