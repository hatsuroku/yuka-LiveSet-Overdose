<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, Ref, StyleValue } from 'vue'
import { getRandomIntRange, getRandomElement } from '../utils/randomUtils'
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
    lo: 1.5,
    hi: 3,
    // lo: 5,
    // hi: 60,
}
const dir: Direction[] = ['top', 'bottom', 'left', 'right']

let using = 1

const removeUrlParenthesis = (str: string) => str.slice(4, -1)

function switchAlbum(newAlbum, fromDirection: Direction) {

    

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
    
    nextClass.push(`${fromDirection}-album`)
    nextClass.push('upper')

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
        body,
        keepalive: true
    })
}

function postImgBeforeClose(event) {
    postImgUrl(getFilenameFromUrl(removeUrlParenthesis(styleObj.value[using]['background-image'])))
}

// preloadImgs(imgPicker.getImgUrlList())
onMounted(async () => {
    window.addEventListener('unload', postImgBeforeClose)
    styleObj.value[using]['background-image'] = `url(${await fetchImgUrl()})`
    setTimeout(async () => {
        switchAlbum(await fetchImgUrl(), getRandomElement(dir))
    }, getRandomIntRange(switchTime.lo, switchTime.hi) * 1000)
})
onUnmounted(() => {
    window.addEventListener('unload', postImgBeforeClose)
})



</script>

<template>
    <div class="outer-container">
        <div class="album" :class="classObj[0]" :style="styleObj[0]"></div>
        <div class="album" :class="classObj[1]" :style="styleObj[1]"></div>
    </div>
</template>

<style scoped lang="scss">
.outer-container {
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

@mixin come-from-dir-with-animation($dir, $top, $left) {
    @keyframes from-#{$dir} {
        0% {
            top: $top;
            left: $left;
        }
        100% {
            top: 0;
            left: 0;
        }
    }
    .#{$dir}-album {
        animation: 1s cubic-bezier(.48, 0, 0, 1.01) from-#{$dir};
    }
}

@include come-from-dir-with-animation(top, calc(-100%), 0);
@include come-from-dir-with-animation(right, 0, calc(100%));
@include come-from-dir-with-animation(bottom, calc(100%), 0);
@include come-from-dir-with-animation(left, 0, calc(-100%));

.upper {
    z-index: 1000;
}

.lower {
    z-index: 100;
}

</style>
