<template>
    <div class="bg-frame">
        <div class="bg"></div>
    </div>
    <div class="lyric-container">
        <div v-for="(lyric, index) in segments" :key="index" 
            class="lyric" :class="lyricClass(index)"
            :ref="(el) => {
                segmentRefs[index] = el;
            }"
        >
            {{ lyric }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';

const lyricsText = '大げさな街の明かりが\n' +
                    '生き急ぐ夜を浮かべる\n' +
                    'さざめく雑踏の中で\n' +
                    'ろうそくは灯る\n' +
                    '忘れないように\n' +
                    '忘れないように\n' +
                    '忘れないように\n' +
                    '生き急ぐ夜を浮かべる\n' +
                    'さざめく雑踏の中で\n' +
                    'ろうそくは灯る\n' +
                    '忘れないように\n' +
                    '忘れないように\n' +
                    '忘れないように\n';


const lyricOffset = {
    start: -3,
    base: -1,
    end: 10,
}
const currentIdx = ref(0);
const lyricRef = ref(lyricsText);
const segments = computed(() => lyricRef.value.split('\n'));
const segmentRefs = computed(() => new Array(segments.value.length).fill(ref()));
const lyricMargin = {
    firstTop: 140,
    top: 50,
    bottom: 25,
};

function lyricClass(index) {
    const base = {
        current: index == currentIdx.value,
        'blur-1': index == currentIdx.value - 1 || index == currentIdx.value + 1,
        'blur-2': index == currentIdx.value - 2 || index == currentIdx.value + 2,
        'blur-3': index <= currentIdx.value - 3 || index >= currentIdx.value + 3,
    }
    if (index < currentIdx.value + lyricOffset.start || index >= currentIdx.value + lyricOffset.end) {
        base['lyric-other'] = true;
    } else {
        base[`lyric-${index - currentIdx.value}`] = true;
    }
    return base;
}


function scrollLyric() {
    let { start, base, end } = lyricOffset;
    if (currentIdx.value + start - 1 >= 0) {
        segmentRefs.value[currentIdx.value + start - 1].setAttribute('style', '');
    }
    if (currentIdx.value + end < segmentRefs.value.length) {
        segmentRefs.value[currentIdx.value + end].setAttribute('style', '');
    }
    
    if (currentIdx.value == 0) {
        base = 0;
        segmentRefs.value[currentIdx.value].setAttribute('style', `top: ${lyricMargin.firstTop}px`);
    } else {
        segmentRefs.value[currentIdx.value + base].setAttribute('style', `top: ${lyricMargin.top}px`);
    }
    

    const pxStrToNumber = (pxStr: string): number => {
        return parseInt(pxStr.slice(5, -2));
    }
    
    for (let i = currentIdx.value + base - 1; i >= 0 && i >= currentIdx.value + start; --i) {
        const nextTop = pxStrToNumber(segmentRefs.value[i + 1].getAttribute('style'));
        segmentRefs.value[i].setAttribute('style', `top: ${nextTop - lyricMargin.bottom - segmentRefs.value[i].clientHeight}px`);
        // console.log(i, segmentRefs.value[i].getAttribute('style'));
    }

    for (let i = currentIdx.value + base + 1; i < segmentRefs.value.length && i < currentIdx.value + end; ++i) {
        const prevTop = pxStrToNumber(segmentRefs.value[i - 1].getAttribute('style'));
        // console.log(i, prevTop, lyricMargin.bottom, segmentRefs.value[i - 1].clientHeight);
        segmentRefs.value[i].setAttribute('style', `top: ${prevTop + lyricMargin.bottom + segmentRefs.value[i - 1].clientHeight}px`);
        // console.log(i, segmentRefs.value[i].getAttribute('style'));
    }
}

onMounted(() => {
    scrollLyric();
    setInterval(() => {
        currentIdx.value = (currentIdx.value + 1) % segments.value.length;
        scrollLyric();
    }, 1000);
});


</script>

<style scoped lang="scss">
.bg-frame {
    overflow: hidden;
    height: 100vh;
    width: 100%;
}

.bg {
    background-image: url("/yuka.png");
    height: 100%;
    width: 100%;
    filter: brightness(0.6) blur(100px);
    transform: scale(1.2);
}

div {
    color: white;
    font-size: 50px;
    line-height: 1.3;
    font-family: 'Noto Sans', 'Noto Sans', 'Source Han Sans', 'Source Han Sans CN', '思源黑体';
    font-weight: bolder;
}

$lyric-top-margin: 50px;
$lyric-x-margin: 50px;
$lyric-bottom-margin: 25px;
.lyric {
    position: absolute;
    margin: 0 $lyric-x-margin $lyric-bottom-margin;
}

.first-lyric {
    margin-top: $lyric-top-margin;
}

$animation-delay: 0.03s;
@for $i from -3 to 10 {
    .lyric-#{$i} {
        transition: top 1s var(--quick-easing) $animation-delay * $i,
                filter 1s var(--quick-easing) $animation-delay * $i, 
                color 1s var(--quick-easing) $animation-delay * $i;
    }
}

.lyric-other {
    opacity: 0;
}

.lyric-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
}

$base-blur: 4px;
$base-opcacity: 0.5;
@for $i from 1 to 4 {
    .blur-#{$i} {
        filter: blur($base-blur + ($i - 1));
        color: rgba(255, 255, 255, 0.5 - (($i - 1) * 0.15));
    }
}
.current {
    color: white;
}

</style>
