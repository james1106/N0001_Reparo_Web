import baobiao from './pages/dingdan/index.vue'
import huoquan from './pages/yufu/index.vue'
import shouye from './pages/cangchu/index.vue'
import yingshou from './pages/yingshou/index.vue'
import daichengdui from './pages/yingshou/daichengdui.vue'
import duifu from './pages/yingshou/duifu.vue'
import qianfa from './pages/yingshou/qianfa.vue'
import yingshoutiexian from './pages/yingshou/yingshoutiexian.vue'
import HomePage from './pages/homePage/homePage.vue'
import rukushenqing from './pages/cangchu/rukushenqing.vue'
import chukushenqing from './pages/cangchu/chukushenqing.vue'
import cangdanshenqing from './pages/cangchu/cangdanshenqing.vue'

export default [
  {
    path:'/',component:HomePage,
  },
  {
    path:'/dingdan',component:baobiao,
  },{
    path:'/yufu',component:huoquan,
  },{
    path:'/cangchu',component:shouye,
  },{
    path:'/yingshou',component:yingshou,
  },
  {path:'/daichengdui',component:daichengdui},
  {path:'/duifu',component:duifu},
  {path:'/qianfa',component:qianfa},
  {path:'/yingshoutiexian',component:yingshoutiexian},
  {
    path:'/cangchu',component:shouye,
  },
  {path:'/rukushenqing',component:rukushenqing},
  {path:'/chukushenqing',component:chukushenqing},
  {path:'/cangdanshenqing',component:cangdanshenqing},
]
