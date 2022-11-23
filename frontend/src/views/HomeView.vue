<template>
  <div class="home">
    <a-layout-header>
      <TitleBar @tabChanged="switchTab" />
    </a-layout-header>
    <a-layout-content class="container">
      <template v-if="activeTab === '1'">
        <BulletinSetting class="bulletin-setting" />
        <PlayControl class="play-control" />
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
import TitleBar from '@/components/HomeView/TitleBar.vue'
import FooterBar from '@/components/HomeView/FooterBar.vue'
import BulletinSetting from '@/components/HomeView/BulletinSetting.vue'
import PlayControl from '@/components/HomeView/PlayControl.vue'

export default {
  name: 'HomeView',
  components: { PlayControl, BulletinSetting, TitleBar, FooterBar },
  data() {
    return {
      activeTab: '1',
    }
  },

  mounted() {
    // this.creatSocket()
  },

  methods: {
    switchTab(e) {
      this.activeTab = e
    },

    creatSocket() {
      this.socket.subscribe('msg', (data) => {
        console.log(data)
      })

      this.socket.on('open', () => {
        console.log('success')
      })
    },
  },
}
</script>

<style scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.container {
  margin: 14px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.bulletin-setting {
  width: 100%;
  min-width: 350px;
  max-width: 640px;
}

.play-control {
  width: 100%;
  min-width: 350px;
  max-width: 640px;
}

/*@media screen and (min-width:680px){*/
/*  .bulletin-setting {*/
/*    width: 640px;*/
/*  }*/
/*}*/
</style>
