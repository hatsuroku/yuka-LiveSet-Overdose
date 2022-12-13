<template>
  <div class="title">
    <a-menu
      mode="horizontal"
      :default-selected-keys="['1']"
      @menu-item-click="switchMenu"
    >
      <a-menu-item key="1">主页</a-menu-item>
      <a-menu-item key="2">歌单管理</a-menu-item>
      <a-menu-item key="3">设置</a-menu-item>
      <a-menu-item key="4">上传专辑封面</a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: "TitleBar",
  components: {},

  methods: {
    switchMenu(e) {
      this.$emit("tabChanged", e);
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
}
</style>
