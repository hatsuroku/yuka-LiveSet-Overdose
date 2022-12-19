<template>
    <div>
        <h1>编辑告示牌</h1>
        <a-space direction="vertical">
            <a-textarea
                auto-size
                allow-clear
                placeholder="公告只有前七行能完整展示"
                class="bulletin-input"
                v-model="bulletinRef"
            >
            </a-textarea>
            <a-button @click="submitBulletin">修改</a-button>
        </a-space>
    </div>

</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';

let bulletinText = '';
const bulletinRef = ref(bulletinText);

function submitBulletin() {
    console.log(bulletinRef.value);
    ws.send(bulletinRef.value);
}

let ws: WebSocket;

onMounted(() => {
    ws = new WebSocket('ws://localhost:3000?wstype=bulletin-editor');
})

onUnmounted(() => {
    ws.close();
})

</script>

<style scoped>
.bulletin-input {
    min-height: 100px;
}
</style>