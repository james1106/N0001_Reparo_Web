import LoginPage from './pages/login.vue'
import PwdRetrievalPage from './pages/passwordRetrieval.vue'
import RegisterPage from './pages/register.vue'
import RegisterDetailPage from './pages/registerDetail.vue'

export default [
  {
    path:'/',component:LoginPage,
  },
  {
    path:'/register',component:RegisterPage,
  },
  {
    path:'/pwdRetrieval',component:PwdRetrievalPage,
  },
  {
    path:'/registerDetail',component:RegisterDetailPage,
  }
]
