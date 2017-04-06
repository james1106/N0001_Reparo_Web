import baobiao from './pages/baobiao/index.vue'
import huoquan from './pages/huoquan/index.vue'
import shouye from './pages/shouye/index.vue'
import yingshou from './pages/yingshou/index.vue'
  import chengdui from './pages/yingshou/chengdui.vue'
  import qianfa from './pages/yingshou/qianfa.vue'
  import tiexian from './pages/yingshou/tiexian.vue'
  import duifu from './pages/yingshou/duifu.vue'
  import zhuanrang from './pages/yingshou/zhuanrang.vue'
  import xinxi from './pages/yingshou/xinxi.vue'
export default [
  {
    path:'/baobiao',component:baobiao,
  },{
    path:'/huoquan',component:huoquan,
  },{
    path:'/shouye',component:shouye,
  },{
    path:'/yingshou',component:yingshou,
    children:[
      {path:'',component:chengdui},
      {path:'chengdui',component:chengdui},
      {path:'qianfa',component:qianfa},
      {path:'tiexian',component:tiexian},
      {path:'duifu',component:duifu},
      {path:'zhuanrang',component:zhuanrang},
      {path:'xinxi',component:xinxi},
    ]
  },{
    path:'/shouye',component:shouye,
  }
]
