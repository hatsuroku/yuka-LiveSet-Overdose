<template>
    <a-layout-header class="header">
        <h1>Yuka Liveset Control Panel</h1>
    </a-layout-header>
    <a-layout-content class="content">
        <bulletin class="comp"></bulletin>
        <upload-img class="comp"></upload-img>
        <upload-song class="comp"></upload-song>
    </a-layout-content>
    <a-layout-footer class="flex_center">
        <FooterBar />
    </a-layout-footer>
</template>

<script setup>
import FooterBar from '@/components/HomeView/FooterBar.vue';
import UploadImg from '@/components/HomeView/UploadImg.vue';
import UploadSong from '@/components/HomeView/UploadSong.vue';
import Bulletin from '@/components/HomeView/BulletinEditor.vue';
</script>

<style lang="less" scoped>
.header {
    height: 100px;
    padding: 0 0 0 20px;
    background: rgb(var(--primary-6));
    color: white;
    font-weight: bolder;
    display: flex;
    flex-direction: column;
    justify-content: center;

    & > h1 {
        font-size: 2.5rem;
    }
}

.content {
    padding: 0 20px;
    display: flex;
    flex-wrap: wrap;
    & > :not(:last-child) {
        margin-right: 50px;
    }
}

.comp {
    width: 650px;
    min-width: 320px;
}

.container {
    margin: 14px 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
</style>
