<template>
  <div id="register">
    <el-row>
      <img src="../assets/logo_login.png">
      <h3 style="color: #666666">注册成功</h3>
    </el-row>
    <el-form label-position="left" label-width="100px" class="login-container">
      <el-row style="margin: 40px auto;">
        <svg class="icon" aria-hidden="true" style="width: 90px;height: 90px"> 
          <use xlink:href="#icon-success"></use>
           
        </svg>
      </el-row>
      <el-row style="margin: 20px auto">
        <el-button type="primary" class="successButton" @click="toHomePage()">进入后台</el-button>
      </el-row>
      <el-row style="margin: 20px auto">
        <span><a href="" class="back" @click="deleteCookie()">返回登录</a></span>
      </el-row>
    </el-form>
    <el-row style="text-align: center">
      <span class="registerStep highlight">1 设置用户名 </span><span class="registerStep highlight">2 完善个人信息 </span><span
      class="registerStep highlight">3 注册成功</span>
    </el-row>
  </div>
</template>
<script>

  export default {
    name: 'register',
    data(){
      return {}
    },
    methods: {
      toHomePage(){
        window.location.href = 'main.html';
      },
      deleteCookie(){
        function delete_cookie(name) {
          document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'; //删除cookie，必须显示声明path
        }

        delete_cookie("token");
        this.$router.push("/");
      }
    }
  }
</script>
