<template>
    <div class="bulletin-container">
        <div class="bulletin-text">
            <template v-for="t in getParagraphs" :key="t">
                <!-- {{t}}<br /> -->
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
import { computed, ref } from 'vue';
import WMarquee from '@/components/widgets/WMarquee.vue';

const props = defineProps<{
    text: string
}>();
const txt = ref('歌单！\n今天是长濑有花专场！\n\n' +
                '以心電信\n- ORANGE RANGE\n\n' +
                '你妈的吃屎\n- 傻逼浏览器用什么内核也不好好写出来全绿的特性你他妈居然不支持你还好意思做浏览器吗真的建议你赶紧倒闭算了\n\n' +
                '若者のすべて\n- フジファブリック\n\n' +
                'みずいろのきみ\n- 長瀬有花');
const getParagraphs = computed(() => txt.value.split('\n'))

// console.log(props);
// console.log(txt);
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