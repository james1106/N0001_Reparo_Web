<template>
  <div id="app">
    <img src="./assets/logo.png">
    <el-form label-position="left" label-width="70px" class="login-container">
      <el-form-item label="用户名" prop="account">
        <el-input v-model="userName"  type="text"  auto-complete="off" placeholder="用户名"></el-input>    <!--v-model传值-->
      </el-form-item>
      <el-form-item label="密码" prop="checkPass" >
        <el-input v-model="password"  type="password"  auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;margin-left: -70px;">
        <el-button type="primary" style="width: 350px;">登录</el-button>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Hello from '../../components/Hello'

  export default {
    name: 'app',
    components: {
      Hello
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
</style>
