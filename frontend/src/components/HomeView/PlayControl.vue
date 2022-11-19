<template>
  <div class="play-control">
    <a-page-header
      title="播放控制"
      subtitle="共 4 个曲目，当前播放第 1 个"
      :show-back="false"
    >
    </a-page-header>
    <a-list>
      <template #header>播放列表</template>
      <a-list-item>Beijing Bytedance Technology Co., Ltd.</a-list-item>
      <a-list-item>Bytedance Technology Co., Ltd.</a-list-item>
      <a-list-item>Beijing Toutiao Technology Co., Ltd.</a-list-item>
      <a-list-item>Beijing Volcengine Technology Co., Ltd.</a-list-item>
    </a-list>
    <p>⥤ {{ nowPlayingName || '暂未播放' }}</p>
    <div class="flex_center no_select">
      <a-slider :default-value="50" :style="{ width: '100%' }" />
      <p class="timer">{{ nowPlayingTime }}</p>
    </div>
    <a-button type="primary" @click="playButtonHandler">{{ isPlaying ? '暂停' : '播放' }}</a-button>
    <div class="blank" />
    <a-button type="primary" @click="playButtonHandler">安可</a-button>
  </div>
</template>

<script>
export default {
  name: 'PlayControl',
  components: {},
  data() {
    return {
      nowPlayingName: 'Beijing Bytedance Technology Co., Ltd.',
      nowPlayingTime: '1:15',
      isPlaying: false,
    }
  },

  mounted() {},

  methods: {
    playButtonHandler() {
      this.isPlaying = !this.isPlaying
    },
  }
}
</script>

<style scoped>
.play-control {
  margin: 30px;
}

.timer {
  white-space: nowrap;
  margin-left: 20px;
  font-feature-settings: 'tnum';
}
</style>
