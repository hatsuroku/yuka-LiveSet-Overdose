<template>
    <div>
        <h1>歌曲播放器</h1>
        <a-button @click="refreshSongs">刷新歌曲列表</a-button>
        <a-list
            :max-height="480"
            :hoverable="true"
        >
            <a-list-item v-for="(song, index) of songs" :key="index">
                {{song.name}}
                <template #actions>
                    <icon-plus-circle class="action" @click="setSong(song)" />
                </template>
            </a-list-item>
        </a-list>
        <audio
            controls
            preload="auto"
            ref="au"
        >
            <p>抱歉，你的浏览器已经老到连 HTML 5 都不支持了，赶紧换个浏览器吧</p>
        </audio>
    </div>
</template>
<script setup lang="ts">
import { httpBaseUrl, wsBaseUrl } from '@/utils/netUtils';
import { ref, reactive, onMounted, onUnmounted } from 'vue';

const au = ref();
let ws: WebSocket;

interface SongInfo {
    name: string;
    src: string;
    hasLyric: boolean;
}

const songs: SongInfo[] = reactive([]);

type MsgType = 'lyric' | 'currentTime';

interface PlayerMsg {
    type: MsgType,
    data: SongData | TimeData;
}

interface SongData {
    name: string;
    hasLyric: boolean;
}

interface TimeData {
    currentTime: number;
}

function setSong(song: SongInfo) {
    console.log(song.src);
    au.value.src = song.src;
    const msg: PlayerMsg = {
        type: 'lyric',
        data: {
            name: song.name,
            hasLyric: true,
        }
    }
    ws.send(JSON.stringify(msg));
}

async function refreshSongs() {
    const res = await fetch(`${httpBaseUrl}/getSongs`, {
        method: 'GET',
        mode: 'cors',
    });
    if (res.ok) {
        type SongData = {
            songsWithLyric: {
                name: string,
                audioPath: string;
            }[],
            songsWithoutLyric: {
                name: string,
                audioPath: string,
            }[]
        };
        const data: SongData = await res.json();
        songs.splice(0);
        data.songsWithLyric.forEach(({name, audioPath}) => {
            songs.push({
                name,
                src: `${httpBaseUrl}${audioPath}`,
                hasLyric: true,
            });
        });
        data.songsWithoutLyric.forEach(({name, audioPath}) => {
            songs.push({
                name,
                src: `${httpBaseUrl}${audioPath}`,
                hasLyric: false,
            });
        });
    }
}

onMounted(() => {
    refreshSongs();
    ws = new WebSocket(`${wsBaseUrl}?wstype=song-player`);

    setInterval(() => {
        if (ws.readyState !== WebSocket.OPEN || au.value.paused) {
            return;
        }
        const msg: PlayerMsg = {
            type: 'currentTime',
            data: {
                currentTime: au.value.currentTime,
            }
        }
        ws.send(JSON.stringify(msg));
    }, 100);
});

onUnmounted(() => {
    ws.close();
})

</script>
<style scoped>
.action {
    font-size: 20px;
}
</style>