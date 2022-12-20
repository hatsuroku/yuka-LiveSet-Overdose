<template>
    <div class="bulletin-container">
        <div class="bulletin-text">
            <template v-for="(t, index) in getParagraphs" :key="index">
                <w-marquee>{{t}}&nbsp;</w-marquee>
            </template>
        </div>
        <div class="bulletin-bg-frame">
            <div class="bulletin-bg">
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import WMarquee from '@/components/widgets/WMarquee.vue';

const txt = ref('');

const getParagraphs = computed(() => txt.value.split('\n'));

let ws: WebSocket;

onMounted(() => {
    ws = new WebSocket('ws://localhost:3000?wstype=bulletin');
    ws.addEventListener('message', (event) => {
        // event.data 是一个 Blob，需要转成 string
        // 这傻逼 Unity 内置浏览器似乎不支持 Promise 和 async/await，操了
        // 没法用 await event.data.text()，只能想办法换点别的解决方法了
        console.log(`received ${JSON.stringify(event, null, 4)}`);
        // 可以用 FileReader 进行同步的转换
        let reader = new FileReader();
        reader.onload = (event) => {
            // 读取之后进行操作的代码区域
            // reader.result 指读取到的内容
            console.log(reader.result);
            txt.value = reader.result as string;
        }
        reader.readAsText(event.data);
    })
})

onUnmounted(() => {
    ws.close();
})
</script>


<style scoped lang="less">
.full-size() {
    height: 100%;
    width: 100%;
}

.absolute-full-size() {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
}

.absolute-top-left() {
    position: absolute;
    left: 0;
    top: 0;
}

.bulletin {
    &-container {
        .full-size();
        position: relative;
    }
    &-bg-frame {
        .full-size();
        .absolute-top-left();
        background-color: black;
        overflow: hidden;
        z-index: 1000;
    }

    &-bg {
        .absolute-full-size();
        background-image: url(/yuka.png);
        background-size: contain;
        filter: brightness(0.6) blur(40px);
        transform: scale(1.2);
    }

    &-text {
        .full-size();
        font-family: 'Noto Sans', 'Source Han Sans', 'Source Han Sans CN';
        font-size: 40px;
        color: white;
        line-height: 1.2;
        font-weight: 900;
        padding: 40px 44px;
        // margin-left: 44px;
        text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
        position: relative;
        z-index: 2000;
        overflow: hidden;
    }
}

p {
    margin: 0.2em 0;
}
</style>