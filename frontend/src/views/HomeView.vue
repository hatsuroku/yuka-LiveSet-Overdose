<template>
  <div class="home">
    <a-layout-header>
      <TitleBar @tabChanged="switchTab"/>
    </a-layout-header>
    <a-layout-content class="container">
      <template v-if="activeTab === '1'">
        <div>
          <BulletinSetting class="bulletin-setting" />
        </div>
      </template>
      <template v-if="activeTab === '2'">歌单管理</template>
      <template v-if="activeTab === '3'">设置</template>
    </a-layout-content>
    <a-layout-footer class="flex_center">
      <FooterBar />
    </a-layout-footer>
  </div>
</template>

<script>
import TitleBar from "@/components/HomeView/TitleBar.vue";
import FooterBar from "@/components/HomeView/FooterBar.vue";
import BulletinSetting from "@/components/HomeView/BulletinSetting.vue";
export default {
  name: "HomeView",
  components: {BulletinSetting, TitleBar, FooterBar },
  data() {
    return {
      activeTab: "1",
    };
  },

  mounted() {},

  methods: {
    switchTab(e) {
      this.activeTab = e;
    },
  },
};
</script>

<style scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.container {
  padding: 14px 20px;
}

.bulletin-setting {
  width: 100%;
}

@media screen {

}
</style>
