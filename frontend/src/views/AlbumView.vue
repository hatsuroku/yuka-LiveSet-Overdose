<script setup lang="ts">
import { ref, reactive, onMounted, Ref } from 'vue'

type Direction = 'top' | 'bottom' | 'left' | 'right'
const classObj: Ref<string[][]> = ref([
    reactive([]),
    reactive([]),
])

let using = 1

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function switchAlbum(newAlbumUrl, fromDirection: Direction) {
    let nowClass, nextClass
    nowClass = classObj.value[using]
    using = (using + 1) % classObj.value.length
    nextClass = classObj.value[using]
    
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
    const dir: Direction[] = ['top', 'bottom', 'left', 'right']
    setInterval(() => {
        switchAlbum(0, dir[getRandomInt(dir.length)])
    }, 2000)
})
</script>

<template>
    <div class="outer-container">
        <div class="album" :class="classObj[0]" style="background-image: url('http://127.0.0.1:8080/miku.jpg');"></div>
        <div class="album" :class="classObj[1]" style="background-image: url('http://127.0.0.1:8080/talk.webp')"></div>
    </div>
</template>

<style scoped>
.outer-container {
    margin: 100px;
    height: 600px;
    width: 600px;
    overflow: hidden;
    position: relative;
}

.album {
    position: absolute;
    background: blanchedalmond;
    height: 600px;
    width: 600px;
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
    top: -600px;
    background: lightblue;
}

.right-album {
    left: 600px;
    top: 0;
    background: pink;
}

.bottom-album {
    left: 0;
    top: 600px;
    background: lightyellow;
}

.left-album {
    left: -600px;
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
