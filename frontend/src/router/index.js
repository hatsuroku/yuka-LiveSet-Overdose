import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AlbumView from '@/views/AlbumView.vue'
import UploadImg from '@/components/HomeView/UploadImg.vue'
import BulletinView from '@/views/BulletinView.vue'
import FuckVue from '@/views/FuckVue.vue'
import LyricControl from '@/views/LyricControl.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: HomeView,
    },
    {
      path: '/album',
      name: 'album',
      component: AlbumView,
    },
    {
      path: '/uploadImg',
      name: 'uploadImg',
      component: UploadImg,
    },
    {
      path: '/bulletin',
      name: 'bulletin',
      component: BulletinView,
    },
    {
      path: '/fuck',
      name: 'fuck',
      component: FuckVue,
    },
    {
      path: '/lyric',
      name: 'lyric',
      component: LyricControl,
    },
    {
      path: '/bulletin',
      name: 'bulletin',
      component: () => import('../views/BulletinView.vue'),
    },
  ],
})

export default router
