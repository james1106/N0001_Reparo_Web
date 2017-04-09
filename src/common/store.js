const  STORAGE_KEY = "company_type"
export  default {
  fetchCompanyType() {
    return window.localStorage.getItem(STORAGE_KEY);
  },
  saveCompanyType(type){
    window.localStorage.setItem(STORAGE_KEY,type);
  }

}
