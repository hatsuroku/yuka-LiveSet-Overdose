<template>
  <div class="bulletin-setting">
    <a-page-header
      title="编辑告示牌"
      subtitle="共 6 行，最多可以显示 6 行"
      :show-back="false"
    >
      <template #extra>
        <a-button type="primary" :disabled="!connected">更新</a-button>
      </template>
    </a-page-header>
    <a-textarea
      placeholder="正在连接后端服务...请稍候"
      allow-clear
      auto-size
      :disabled="!connected"
      :model-value="text"
    />
    <div class="tips">
      <p>Tips: 可使用 JavaScript 模板语法构建插值。</p>
      <p>支持的模板有: ${歌单}、${待播曲目计数}</p>
    </div>
  </div>
</template>

<script>
import common from '@/common'

export default {
  name: 'BulletinSetting',
  components: {},
  data() {
    return {
      uuid: '',
      connected: false,
      text: '',
    }
  },

  mounted() {
    this.uuid = common.genUUID()

    this.$socket.emit('pd_ModuleReady', {
      name: this.$options.name,
      uuid: this.uuid,
    })

    this.sockets.subscribe('pd_Message', (data) => {
      if (data) {
        this.connected = true
        this.text = data.bulletinSettingText
      }
    })
  },

  methods: {},
}
</script>

<style scoped>
.bulletin-setting {
  margin: 30px;
}
</style>
