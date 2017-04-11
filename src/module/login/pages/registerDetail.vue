<template>
  <div id="register">
    <el-row>
      <img src="../assets/logo_login.png">
      <h3 style="color: #666666">完善信息</h3>
    </el-row>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="login-container">
      <el-form-item prop="companyName">
        <el-input v-model="ruleForm.companyName"  type="text"  auto-complete="off" placeholder="企业名"></el-input>    <!--v-model传值-->
      </el-form-item>
      <el-form-item prop="bank" >
        <el-input v-model="ruleForm.bank"  type="text"  auto-complete="off" placeholder="开户行"></el-input>
      </el-form-item>
      <el-form-item prop="account">
        <el-input v-model="ruleForm.account"  placeholder="账号"></el-input>    <!--v-model传值-->
      </el-form-item>
      <el-form-item prop="companyType" style="height: 20px;text-align: left">
        <el-radio-group v-model="ruleForm.companyType">
          <el-radio class="companyType" v-model="radio" label="0">融资企业</el-radio>
          <el-radio class="companyType" v-model="radio" label="1">仓储公司</el-radio>
          <el-radio class="companyType" v-model="radio" label="2">物流公司</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-row class="agreeMsg"><span class="tip">点击注册表示你已阅读并同意<span style="color:rgb(57,202,166);">《xxx条款》</span></span></el-row>
      <el-form-item style="width:100%;">
        <el-button type="primary" class="nextButton" @click="submitForm('ruleForm')">注册</el-button>
      </el-form-item>
    </el-form>
    <el-row style="text-align: center">
      <span><router-link to="/register" class="back">返回上级</router-link></span>
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
          account: '',
          companyName:'',
          companyType: '0',
          bank:'',
        },
        rules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },   //表单验证
          ],
          companyName: [
            { required: true, message: '请输入企业名', trigger: 'blur' },
          ],
          bank: [
            { required: true, message: '请输入开户行', trigger: 'blur' },
          ]
        },
      }
    },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              //做注册操作
            this.$router.push('/registerSuccess')
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style>
  .el-radio__label{
    font-size: 10px!important;
    padding-left: 5px!important;
  }
  .back{
    color: #666666;
    font-size: 13px;
    text-decoration: none;
  }
  .tip{
    font-size: 12px;
    color: #999999;
  }
  .agreeMsg{
    text-align: left;
    margin-bottom: 20px;
  }
  .companyType{
    color: #999999!important;
  }
  .el-radio__inner{
    width: 15px!important;
    height: 15px!important;
  }
  .el-radio__inner:hover{
    border-color:rgb(56,202,166)!important;
  }
  .el-radio__input.is-checked .el-radio__inner{
    border-color:rgb(56,202,166)!important;
    background:rgb(56,202,166)!important;
  }
  /*.el-radio__label{*/
    /*font-size: 12px!important;*/
    /*padding-left: 8px!important;*/
  /*}*/
  </style>
