import { reactive, onMounted, CSSProperties } from 'vue';
<template>
    <div class="con">
        <audio
            ref="au"
            controls
            src="/kodoku.mp3"
            preload="auto"
        >
            <p>哈哈你放不了歌</p>
        </audio>
    </div>
</template>


<script setup lang="ts">
import { ref, watch, computed, reactive, onMounted, CSSProperties  } from 'vue';

const au = ref();

onMounted(() => {
    setInterval(() => {
        console.log(au.value.currentTime);
    }, 500);
})


</script>


<style scoped>
.con {
    height: 100vh;
    width: 100%;
    background-color: lightblue;
    font-size: 30px;
    line-height: 1.5;
    padding: 50px 0 0 50px;
    position: absolute;
}

.tran {
    position: absolute;
    transition: top 1s var(--quick-easing);
}

audio {
    width: 100%;
    display: block;
}
</style>