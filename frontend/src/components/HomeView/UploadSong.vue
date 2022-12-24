<template>
    <div>
        <div>
            <h1>上传歌曲和歌词</h1>
        </div>
        <a-upload
            list-type="text"
            action="http://localhost:3000/uploadSong"
            v-model="fileList"
            :auto-upload="false"
            ref="uploadRef"
            multiple
        >
            <template #upload-button>
                <a-space>
                    <a-button>select file</a-button>
                    <a-button type="primary" @click="submit">start upload</a-button>
                </a-space>
            </template>
        </a-upload>
    </div>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { FileItem } from '@arco-design/web-vue';

const uploadRef = ref();

const fileList: FileItem[] = reactive([]);

const submit = (e) => {
    e.stopPropagation();
    uploadRef.value.submit();
}

</script>

<style scoped>
</style>
