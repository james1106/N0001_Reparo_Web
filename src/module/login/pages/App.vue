<template>
  <div id="app">
    <img src="../assets/logo.png">
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="70px" class="login-container">
      <el-form-item label="用户名" prop="account">
        <el-input v-model="ruleForm2.account"  type="text"  auto-complete="off" placeholder="用户名"></el-input>    <!--v-model传值-->
      </el-form-item>
      <el-form-item label="密码" prop="checkPass" >
        <el-input v-model="ruleForm2.checkPass"  type="password"  auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;margin-left: -70px;">
        <el-button type="primary" style="width: 350px;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

//    export const requestLogin = params => { return res.post(`${base}/login`, params).then(res => res.data); };
  //  import Hello from '../../components/Hello'

  export default {
//    name: 'app',
//    components: {
//      Hello
//    }
    data(){
      return{
        logining:false,
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            { required: true, message: '请输入用户名', trigger: 'blur' },   //表单验证
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
      }
    },
    methods:{
      handleSubmit2(ev) {
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.logining = true;
//            var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
//            requestLogin(loginParams).then(data => {
//              this.logining = false;
//              let { msg, code, user } = data;
//              if (code !== 200) {
//                this.$message({
//                  message: msg,
//                  type: 'error'
//                });
//              }
//              else {
//                sessionStorage.setItem('user', JSON.stringify(user));
                  window.location.href='index.html';
//              }
//            });
          }
//          else {
//            console.log('error submit!!');
//            return false;
//          }
        });
      }
    }

  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 0 auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    /*border: 1px solid #eaeaea;*/
    /*box-shadow: 0 0 25px #cac6c6;*/
  }
  .el-form-item.is-required .el-form-item__label:before{
    content: initial !important;
  }
</style>
