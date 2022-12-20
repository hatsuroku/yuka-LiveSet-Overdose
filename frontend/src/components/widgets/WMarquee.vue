import WMarquee from '@/components/widgets/WMarquee.vue';
<template>
    <div ref="container" class="container">
        <div ref="text" class="text-no-wrap">
            <slot></slot>
        </div>
    </div>
</template>


<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import _ from 'lodash';

const container = ref();
const text = ref();
const textAnimation = ref<Animation | undefined>(undefined);

const animateText = () => {
    if (text.value.scrollWidth > container.value.clientWidth) {
        // console.log('animate');
        // console.log(text.value);

        // Unity 内置浏览器太老，连 ?. 操作符都不支持，我吐了
        // 顺带一提 Element.getAnimations() 也是不支持的
        // 在那里面 Element.getAnimations === undefined
        // 怀疑是 ES2015 以及之后的特性都不支持
        if (textAnimation.value) {
            textAnimation.value.cancel();
        }
        
        const animeMovingRatio = 0.8;
        const pxPerSec = 80;

        console.log(container.value.clientWidth * 1000 / pxPerSec);
        textAnimation.value = text.value.animate([
            { transform: `translateX(0)` },
            { transform: `translateX(0)`, offset: 1 - animeMovingRatio },
            { transform: `translateX(calc(-100% + ${container.value.clientWidth}px))`, offset: animeMovingRatio },
            { transform: `translateX(calc(-100% + ${container.value.clientWidth}px))` },
        ], {
            easing: 'linear',
            direction: 'normal',    // normal 是普通顺序，alternate 是动画完成后再倒放一次
            duration: text.value.scrollWidth * 1000 / pxPerSec,
            playbackRate: 1,
            iterations: Infinity,
        });
    }
};

onMounted(() => {
    // vue 无法 watch 原生事件，只能 watch vue 本身的数据
    // 所以利用原生的 ResizeObserver 监听大小变化事件
    const resizeObserver = new ResizeObserver(_.debounce((entries) => {
        animateText();
    }, 500));
    resizeObserver.observe(container.value);
    resizeObserver.observe(text.value);
});
</script>


<style scoped>
.container {
    overflow: hidden;
}

.text-no-wrap {
    white-space: nowrap;
    display: inline-block;
}
</style>