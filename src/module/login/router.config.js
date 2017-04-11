import LoginPage from './pages/login.vue'
import PwdRetrievalPage from './pages/passwordRetrieval.vue'
import RegisterPage from './pages/register.vue'
import RegisterDetailPage from './pages/registerDetail.vue'
import RegisterSuccessPage from './pages/registerSuccess.vue'


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
    path:'/registerDetail/:userName/pwd/:pwd/phone/:phone',component:RegisterDetailPage,
  },
  {
    path:'/registerSuccess',component:RegisterSuccessPage,
  }
]
