<template>
    <LyricView :lyrics="revisedLyrics" :currentLyricIdx="idx" :bgSrc="bgSrc" />
</template>
<script setup lang="ts">
import LyricView from './LyricView.vue';
import { splitLyric } from '@/utils/lyricUtils';
import { wsBaseUrl, fetchImgUrl, returnImgUrl, getFilenameFromUrl } from '@/utils/netUtils';
import {ref, computed, onMounted, onUnmounted} from 'vue';

const currentTime = ref(0);
const lrc = ref('[00:00.000]...');
const lyrics = computed(() => splitLyric(lrc.value));
const revisedLyrics = computed(() => lyrics.value.map(o => {
    const ret = Object.assign({}, o);
    ret.second = Math.max(0, o.second - 0.5);
    return ret;
}));
let bgSrc = ref();

const idx = computed(() => {
    // HINT:
    // 是的，findLastIndex 是一个很新的 API
    // 我猜这傻逼浏览器并没有实现，所以我得自己写了
    // 如果有更新写法可以改成这样的：
    // return Math.max(0, (revisedLyrics.value as any).findLastIndex((lyric) => lyric.second <= currentTime.value));
    let ret = 0;
    for (let i = 0; i <= revisedLyrics.value.length; ++i) {
        if (i === revisedLyrics.value.length) {
            ret = i - 1;
            break;
        }
        const lyric = revisedLyrics.value[i];
        if (lyric.second > currentTime.value) {
            ret = Math.max(0, i - 1);
            break;
        }
    }
    return ret;
});


type MsgType = 'lyric' | 'currentTime';

interface LyricViewMsg {
    type: MsgType;
    data: LyricData | TimeData;
}

interface TimeData {
    currentTime: number;
}

interface LyricData {
    name: string;
    lrc: string;
}

let ws: WebSocket;

function unwrapCssUrl(cssUrl) {
    return cssUrl.slice(5, -2);
}

onMounted(() => {
    ws = new WebSocket(`${wsBaseUrl}?wstype=lyric`);
    ws.addEventListener('message', async (event) => {
        // console.log(`received ${JSON.stringify(event, null, 4)}`);
        // console.log(JSON.stringify(JSON.parse(event.data)));
        const msg: LyricViewMsg = JSON.parse(event.data as string);
        if (msg.type === 'lyric') {
            lrc.value = (msg.data as LyricData).lrc;
            currentTime.value = 0;
            if (bgSrc.value) {
                await returnImgUrl(getFilenameFromUrl(unwrapCssUrl(bgSrc.value)));
            }
            bgSrc.value = `url("${await fetchImgUrl()}")`
        } else {
            currentTime.value = (msg.data as TimeData).currentTime;
        }
    });
});

function returnImgBeforeClose(event) {
    if (bgSrc.value) {
        returnImgUrl(getFilenameFromUrl(unwrapCssUrl(bgSrc.value)));
    }
}
onUnmounted(() => {
    window.addEventListener('unload', returnImgBeforeClose)
});


</script>
