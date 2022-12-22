<template>
    <div class="bg-frame">
        <div class="bg"></div>
    </div>
    <div class="lyric-container">
        <div v-for="(lyric, index) in segments" :key="index" 
            class="lyric" :class="lyricClass(index)"
            :style="segmentStyles[index]"
            :ref="(el) => {
                segmentRefs[index].value = el;
            }"
        >
            {{ lyric }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, reactive, watch, Ref, CSSProperties } from 'vue';

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
const segmentRefs = ref(new Array(segments.value.length).fill(undefined).map(() => ref()));
const segmentStyles: Ref<CSSProperties[]> = ref(new Array(segments.value.length).fill(undefined).map(() => reactive({})));
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


// 定下一个元素为基准元素，定好其距离屏幕顶部的位置
// 然后计算基准元素以上和以下的元素的位置
// 当歌词在第 0 句时，基准元素是第 0 局
// 其他情况下基准元素都是 current.value - 1 句
function scrollLyric() {
    let { start, base, end } = lyricOffset;    

    // 在视野外，不需要计算高度
    if (currentIdx.value + start - 1 >= 0) {
        delete segmentStyles.value[currentIdx.value + start - 1].top;
    }
    if (currentIdx.value + end < segmentStyles.value.length) {
        delete segmentStyles.value[currentIdx.value + end].top;
    }
    
    if (currentIdx.value == 0) {
        base = 0;
        segmentStyles.value[currentIdx.value].top = `${lyricMargin.firstTop}px`;
    } else {
        segmentStyles.value[currentIdx.value + base].top = `${lyricMargin.top}px`;
    }
    
    const pxStrToNumber = (pxStr: string): number => {
        return parseInt(pxStr.slice(0, -2));
    }
    
    // 计算基准元素上方元素的高度
    for (let i = currentIdx.value + base - 1; i >= 0 && i >= currentIdx.value + start; --i) {
        const nextTop = pxStrToNumber(segmentStyles.value[i + 1].top as string);
        segmentStyles.value[i].top = `${nextTop - lyricMargin.bottom - segmentRefs.value[i].value.clientHeight}px`;
    }

    // 计算基准元素下方元素的高度
    for (let i = currentIdx.value + base + 1; i < segmentStyles.value.length && i < currentIdx.value + end; ++i) {
        const prevTop = pxStrToNumber(segmentStyles.value[i - 1].top as string);
        segmentStyles.value[i].top = `${prevTop + lyricMargin.bottom + segmentRefs.value[i - 1].value.clientHeight}px`;
    }
}

onMounted(() => {
    watch(segments, (nowSegments) => {
        // 如果歌词变多则需要增大 Ref 数组
        if (segmentRefs.value.length < nowSegments.length) {
            segmentRefs.value = new Array(nowSegments.length).fill(undefined).map(() => ref());
        }
        segmentStyles.value = new Array(nowSegments.length).fill(undefined).map(() => reactive({}));
    });

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
