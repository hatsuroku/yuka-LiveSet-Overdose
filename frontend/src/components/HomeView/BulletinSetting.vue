<template>
  <div class="bulletin-setting">
    <a-page-header
        title="编辑告示牌"
        subtitle="共 0 行，最多支持 0 行"
        :show-back="false"
    >
      <template #extra>
        <a-button type="primary">更新</a-button>
      </template>
    </a-page-header>
    <a-textarea placeholder="Please enter something" allow-clear auto-size/>
    <div class="tips">
      <p>Tips: 可使用 JavaScript 模板语法构建插值。</p>
      <p>支持的模板有: `${歌单}`、`${待播曲目计数}`</p>
    </div>

  </div>
</template>

<script>
export default {
  name: "BulletinSetting",
  components: {},
};
</script>

<style scoped>
.update-button {
  margin-left: 10px;
}
</style>
