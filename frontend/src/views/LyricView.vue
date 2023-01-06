<template>
    <div class="bg-frame">
        <div class="bg"></div>
    </div>
    <div class="lyric-container">
        <div v-for="(lyric, index) in props.lyrics" :key="index" 
            class="lyric" :class="lyricClass(index)"
            :style="lyricStyles[index]"
            :ref="(el) => {
                lyricRefs[index].value = el;
            }"
        >
            {{ lyric.text }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch, CSSProperties, withDefaults, nextTick } from 'vue';
import { Lyric } from '@/type/lyric';

interface LyricViewProps {
    lyrics: Lyric[];
    currentLyricIdx: number;
}

const props = withDefaults(defineProps<LyricViewProps>(), {
    lyrics: () => [{
        second: 0,
        text: '...',
    }],
    currentLyricIdx: 0,
});

const lyricOffset = {
    start: -3,
    base: -1,
    end: 8,
}

let lyricRefs = reactive(new Array(props.lyrics.length).fill(undefined).map(() => ref()));
let lyricStyles: CSSProperties[] = reactive(new Array(props.lyrics.length).fill(undefined).map(() => ({})));
const lyricMargin = {
    firstTop: 140,
    top: 50,
    bottom: 50,
};

function lyricClass(index) {
    const base = {
        current: index == props.currentLyricIdx,
        'blur-1': index == props.currentLyricIdx - 1 || index == props.currentLyricIdx + 1,
        'blur-2': index == props.currentLyricIdx - 2 || index == props.currentLyricIdx + 2,
        'blur-3': index <= props.currentLyricIdx - 3 || index >= props.currentLyricIdx + 3,
    }
    if (index < props.currentLyricIdx + lyricOffset.start || index >= props.currentLyricIdx + lyricOffset.end) {
        base['lyric-other'] = true;
    } else {
        base[`lyric-${index - props.currentLyricIdx}`] = true;
    }
    return base;
}


// 定下一个元素为基准元素，定好其距离屏幕顶部的位置
// 然后计算基准元素以上和以下的元素的位置.*from (.*)
// 当歌词在第 0 句时，基准元素是第 0 局
// 其他情况下基准元素都是 current.value - 1 句
function scrollLyric() {
    let { start, base, end } = lyricOffset;    

    // 在视野外，不需要计算高度
    if (props.currentLyricIdx + start - 1 >= 0) {
        delete lyricStyles[props.currentLyricIdx + start - 1].top;
    }
    if (props.currentLyricIdx + end < lyricStyles.length) {
        delete lyricStyles[props.currentLyricIdx + end].top;
    }
    
    if (props.currentLyricIdx === 0) {
        base = 0;
        lyricStyles[0].top = `${lyricMargin.firstTop}px`;
    } else {
        lyricStyles[props.currentLyricIdx + base].top = `${lyricMargin.top}px`;
    }
    
    const pxStrToNumber = (pxStr: string): number => {
        return parseInt(pxStr.slice(0, -2));
    }
    
    // 计算基准元素上方元素的高度
    for (let i = props.currentLyricIdx + base - 1; i >= 0 && i >= props.currentLyricIdx + start; --i) {
        const nextTop = pxStrToNumber(lyricStyles[i + 1].top as string);
        lyricStyles[i].top = `${nextTop - lyricMargin.bottom - lyricRefs[i].value.clientHeight}px`;
    }

    // 计算基准元素下方元素的高度
    for (let i = props.currentLyricIdx + base + 1; i < lyricStyles.length && i < props.currentLyricIdx + end; ++i) {
        const prevTop = pxStrToNumber(lyricStyles[i - 1].top as string);
        lyricStyles[i].top = `${prevTop + lyricMargin.bottom + lyricRefs[i - 1].value.clientHeight}px`;
    }
}

onMounted(() => {
    scrollLyric();
    watch(() => props.lyrics, (nowLyrics) => {
        // 如果歌词变多则需要增大 Ref 数组
        if (lyricRefs.length < nowLyrics.length) {
            lyricRefs = reactive(new Array(nowLyrics.length).fill(undefined).map(() => ref()));
        }
        lyricStyles = reactive(new Array(nowLyrics.length).fill(undefined).map(() => ({})));
        nextTick(() => scrollLyric());
    });
    watch(() => props.currentLyricIdx, scrollLyric);
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
    transform: scale(1.5);
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
$animation-second: 1s;
@for $i from -3 to 8 {
    .lyric-#{$i} {
        transition: top $animation-second var(--quick-easing) $animation-delay * $i,
                filter $animation-second var(--quick-easing) $animation-delay * $i, 
                color $animation-second var(--quick-easing) $animation-delay * $i;
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
