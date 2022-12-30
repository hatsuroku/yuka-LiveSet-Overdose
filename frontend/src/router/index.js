import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/album',
      name: 'album',
      component: () => import('@/views/AlbumView.vue'),
    },
    {
      path: '/uploadImg',
      name: 'uploadImg',
      component: () => import('@/components/HomeView/UploadImg.vue'),
    },
    {
      path: '/bulletin',
      name: 'bulletin',
      component: () => import('@/views/BulletinView.vue'),
    },
    {
      path: '/fuck',
      name: 'fuck',
      component: () => import('@/views/FuckVue.vue'),
    },
    {
      path: '/lyric',
      name: 'lyric',
      component: () => import('@/views/LyricState.vue'),
    },
    {
      path: '/bulletin',
      name: 'bulletin',
      component: () => import('../views/BulletinView.vue'),
    },
  ],
})

export default router
