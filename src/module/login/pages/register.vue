<template>
  <div id="register">
    <el-row>
      <img src="../assets/logo_login.png">
      <h3 style="color: #666666">注册</h3>
    </el-row>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="login-container">
      <el-form-item prop="userName">
        <el-input v-model="ruleForm.userName"  type="text"  auto-complete="off" placeholder="用户名，英文+数字不超过20位"></el-input>    <!--v-model传值-->
      </el-form-item>
      <el-form-item  prop="password" >
        <el-input v-model="ruleForm.password"  type="password"  auto-complete="off" placeholder="密码，6位以上20位以下"></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input v-model.number="ruleForm.phone"  placeholder="手机号"></el-input>    <!--v-model传值-->
      </el-form-item>
      <el-form-item prop="code">
        <el-row>
          <el-col :span="14"><el-input v-model.number="ruleForm.code"  placeholder="验证码"></el-input></el-col>
          <el-col :span="8"><el-button type="primary" class="nextButton codeButton">获取验证码</el-button></el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="nextButton" @click="nextStep('ruleForm')">下一步</el-button>
      </el-form-item>
    </el-form>
    <el-row style="text-align: center">
      <span class="registerStep">1 设置用户名 </span><span class="registerStep">2 完善个人信息 </span><span class="registerStep">3 注册成功</span>
    </el-row>
  </div>
</template>

<script>

  export default {
    name: 'register',
    data(){
      //校验密码长度
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(value.length < 6 || value.length > 20){
          callback(new Error('密码长度请在6-20位之间'));
        }else {
          callback();
        }
      };
      return{
        ruleForm: {
          userName: '',
          password: '',
          phone:'',
          code:''
        },
        rules: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },   //表单验证
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '手机号不能为空'},
            { type: 'number', message: '手机号必须为数字值'}
          ]
        },
      }
    },
    methods:{
      nextStep(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          this.$router.push('/registerDetail/'+ this.ruleForm.userName +'/pwd/'+ this.ruleForm.password+'/phone/' +  this.ruleForm.phone);
          } else {
            return false;
          }
        });
      }
//      (){
//      }
    }
  }
</script>

<style>
  /*.register-container {*/
    /*-webkit-border-radius: 5px;*/
    /*border-radius: 5px;*/
    /*-moz-border-radius: 5px;*/
    /*background-clip: padding-box;*/
    /*margin: 0 auto;*/
    /*width: 600px;*/
    /*padding: 35px 35px 15px 35px;*/
    /*background: #fff;*/
  /*}*/
  .codeButton{
    margin-left: 20px!important;
    margin-top: 0px!important;
    font-size: 13px!important;
    padding-left: 10px!important;
  }
  .el-form-item{margin-bottom: 18px!important;}
  .registerStep{
    margin: 0 20px;
    color: #CCCCCC;
    font-size: 13px;
  }
  </style>
