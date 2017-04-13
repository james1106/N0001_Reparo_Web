const  USER_KEY = "userInfo_type"

export  default {
  fetchUserInfo() {
    var res = JSON.parse(window.localStorage.getItem(USER_KEY) || '[]');
    if(res == '[]'){
      window.location.href = "index.html";
    }
    return res;
  },
  saveUserInfo(user){
    window.localStorage.setItem(USER_KEY,JSON.stringify(user));
  }
}
