// const  COMPANY_KEY = "company_type"
const  USER_KEY = "userInfo_type"

export  default {
  // fetchCompanyType() {
  //   return window.localStorage.getItem(COMPANY_KEY);
  // },
  // saveCompanyType(type){
  //   window.localStorage.setItem(COMPANY_KEY,type);
  // },
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
