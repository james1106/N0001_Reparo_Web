/*订单相关*/
import dingdan from './pages/dingdan/index.vue'
import suoyoudingdan_index from './pages/dingdan/suoyoudingdan/index.vue'
import suoyoudingdan from './pages/dingdan/suoyoudingdan/suoyoudingdan.vue'
import dingdanxiangqing from './pages/dingdan/suoyoudingdan/dingdanxiangqing.vue'
import faqidingdan from './pages/dingdan/faqidingdan.vue'
import daiquerendingdan_index from './pages/dingdan/daiquerendingdan/index.vue'
import daiquerendingdan from './pages/dingdan/daiquerendingdan/daiquerendingdan.vue'
import querendingdan from './pages/dingdan/daiquerendingdan/querendingdan.vue'
import daifahuo_index from './pages/dingdan/daifahuo/index.vue'
import daifahuo from './pages/dingdan/daifahuo/daifahuo.vue'
import fahuo from './pages/dingdan/daifahuo/fahuo.vue'
import daishouhuo from './pages/dingdan/daishouhuo.vue'


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
    path:'/dingdan',component:dingdan,
  },{
    path:'/suoyoudingdan',component:suoyoudingdan_index,
    children:[
      {path:'',component:suoyoudingdan},
      {path:'xiangqing',component:dingdanxiangqing},
    ]
  },{
    path:'/faqidingdan',component:faqidingdan,
  },{
    path:'/daiquerendingdan',component:daiquerendingdan_index,
    children:[
      {path:'',component:daiquerendingdan},
      {path:'queren',component:querendingdan},
    ]},
  {
    path:'/',component:HomePage,
  },
  {
    path:'/daifahuo',component:daifahuo_index,
    children:[
      {path:'',component:daifahuo},
      {path:'fahuo',component:fahuo},
    ]
  },{
    path:'/fahuo',component:fahuo,
  },{
    path:'/daishouhuo',component:daishouhuo,
  },

  {
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
