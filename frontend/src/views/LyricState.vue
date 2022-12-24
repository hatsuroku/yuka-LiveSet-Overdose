<template>
    <LyricView :lyrics="lyrics" :currentLyricIdx="idx" />
</template>
<script setup lang="ts">
import LyricView from './LyricView.vue';
import { splitLyric } from '@/utils/lyricUtils';
import { wsBaseUrl } from '@/utils/netUtils';
import { ref, computed, onMounted } from 'vue';

const currentTime = ref(0);
const lrc = ref('[00:00.000]...');
const lyrics = computed(() => splitLyric(lrc.value));
const idx = computed(() => Math.max(0, lyrics.value.findLastIndex((lyric) => lyric.second <= currentTime.value)));


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

onMounted(() => {
    ws = new WebSocket(`${wsBaseUrl}?wstype=lyric`);
    ws.addEventListener('message', (event) => {
        console.log(`received ${JSON.stringify(event, null, 4)}`);
        // console.log(JSON.stringify(JSON.parse(event.data)));
        const msg: LyricViewMsg = JSON.parse(event.data as string);
        if (msg.type === 'lyric') {
            lrc.value = (msg.data as LyricData).lrc;
            currentTime.value = 0;
        } else {
            currentTime.value = (msg.data as TimeData).currentTime;
        }
    });
})


</script>
