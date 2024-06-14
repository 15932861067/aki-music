import Vue from 'vue'
import VueRouter from 'vue-router'
import aki from '../views/aki'
import findmusic from '../components/sidebarContent/findmusic/aki_findmusic'
import collection from '../components/sidebarContent/collection/aki_collection'
import video from '../components/sidebarContent/video/aki_video'
import dayrecommend from '../components/sidebarContent/dayrecommend/aki_dayrecommend'
// 发现音乐的标签
import tuijian from '../components/sidebarContent/findmusic/tuijian/tuijian'
import songsheet from '../components/sidebarContent/findmusic/songsheet/songsheet'
import ranking from '../components/sidebarContent/findmusic/ranking/ranking'
import singer from '../components/sidebarContent/findmusic/singer/singer'

// 我的收藏
import c_ablum from '@/components/sidebarContent/collection/children/c_ablum.vue'
import c_video from '@/components/sidebarContent/collection/children/c_video.vue'
import c_singer from '@/components/sidebarContent/collection/children/c_singer.vue'
// 推荐视频
import revideo from '../components/sidebarContent/video/ReVideo/ReVideo'
import remv from '../components/sidebarContent/video/ReMv/ReMv'

// 视频相关
import VideoDetail from '../views/Videodetail/Videodetail'

// 各种详情页面
import songlistdetail from '../views/detail/songlistdetail/songlistdetail'
import singerdetail from '../views/detail/singerdetail/singerdetail'
// 视频相关的
import albumdetail from '../views/album/albumdetail'

// 搜索
import search from '../components/content/search/search'
import singers from '../components/content/search/children/singerres'
import mvs from '../components/content/search/children/mv'
import albumres from '../components/content/search/children/albumres'
import songers from '../components/content/search/children/songers'
import songlists from '../components/content/search/children/songlist'
import videos from '../components/content/search/children/video'

// 登录成功后的个人信息
import userDetail from '@/components/person/userDetail.vue'
// 听歌排行榜
import record from '@/components/person/children/record.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'aki',
    component: aki,
    children: [
      {
        path: '/',
        redirect: '/find-music'
      },
      {
        path: '/find-music',
        name: 'music',
        component: findmusic,
        children: [
          {
            path: '/find-music',
            redirect: '/find-music/tuijian'
          },
          {
            path: '/find-music/tuijian',
            name: 'tuijian',
            component: tuijian,
          },
          {
            path: '/find-music/songsheet',
            name: 'songsheet',
            component: songsheet
          },
          {
            path: '/find-music/ranking',
            name: 'rangking',
            component: ranking
          },
          {
            path: '/find-music/singer',
            name: 'singer',
            component: singer
          },
        ]
      },
      {
        path: '/collection',
        name: 'collection',
        component: collection,
        children: [
          {
            path: "/collection/album",
            name: 'ablum',
            component: c_ablum
          },
          {
            path: '/collection/singer',
            name: 'singer',
            component: c_singer
          },
          {
            path: '/collection/video',
            name: 'video',
            component: c_video
          }

        ]
      },
      {
        path: '/video',
        name: 'video',
        component: video,
        children: [
          {
            path: '/video',
            redirect: '/video/revideo',
            component: revideo
          },
          {
            path: '/video/revideo',
            name: 'revideo',
            component: revideo
          },
          {
            path: '/video/remv',
            name: 'remv',
            component: remv
          },

        ]
      },
      {
        path: '/dayrecommend',
        name: 'dayrecommend',
        component: dayrecommend
      },
      // 各种详情路由
      {
        path: '/songlistdetail/:id',
        name: 'songlistdetail',
        component: songlistdetail
      },
      {
        path: '/singerdetail/:id',
        name: 'singer',
        component: singerdetail
      },
      {
        path: '/albumdetail/:id',
        name: 'album',
        component: albumdetail
      },
      /* 视频详情 */
      {
        path: "/videolistdetail/:id/:type",
        name: "VideoDetail",
        component: VideoDetail,
      },
      // 搜索
      {
        path: '/searchdetail/:word',
        name: 'searchdetail',
        component: search,
        children: [
          {
            path: '/searchdetail/:word',
            redirect: "/searchdetail/songres/:word"
          },
          {
            path: "/searchdetail/songres/:word",
            name: 'songres',
            component: songers
          },
          {
            path: "/searchdetail/albumres/:word",
            name: 'albumres',
            component: albumres
          },
          {
            path: "/searchdetail/singerres/:word",
            name: 'singerres',
            component: singers
          },
          {
            path: "/searchdetail/songlistres/:word",
            name: 'songlistres',
            component: songlists
          },
          {
            path: "/searchdetail/mvres/:word",
            name: 'mvres',
            component: mvs
          },
          {
            path: "/searchdetail/videores/:word",
            name: 'videores',
            component: videos
          }
        ]

      },
      // 个人信息
      {
        path: "/userDetail/:uid",
        name: "userDetail",
        component: userDetail,
      },
      {
        path: '/userdetail/record/:uid',
        name: 'record',
        component: record,
      }

    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
