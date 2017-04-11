<template>
  <div id="register">
    <el-row>
      <img src="../assets/logo_login.png">
      <h3 style="color: #666666">完善信息</h3>
    </el-row>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="login-container">
      <el-form-item prop="enterpriseName">
        <el-input v-model="ruleForm.enterpriseName"  type="text"  auto-complete="off" placeholder="企业名"></el-input>    <!--v-model传值-->
      </el-form-item>
      <el-form-item prop="acctSvcrName" >
        <el-input v-model="ruleForm.acctSvcrName"  type="text"  auto-complete="off" placeholder="开户行"></el-input>
      </el-form-item>
      <el-form-item prop="acctIds">
        <el-input v-model="ruleForm.acctIds"  placeholder="账号"></el-input>    <!--v-model传值-->
      </el-form-item>
      <el-form-item prop="roleCode" style="height: 20px;text-align: left">
        <el-radio-group v-model="ruleForm.roleCode">
          <el-radio name="roleCode" label="0">融资企业</el-radio>
          <el-radio name="roleCode" label="1">仓储公司</el-radio>
          <el-radio name="roleCode" label="2">物流公司</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-row class="agreeMsg"><span class="tip">点击注册表示你已阅读并同意<span style="color:rgb(57,202,166);">《xxx条款》</span></span></el-row>
      <el-form-item style="width:100%;">
        <el-button type="primary" class="nextButton" @click="register('ruleForm')">注册</el-button>
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
      return{
        ruleForm: {
          accountName: '',     //用户名
          password:'',         //密码
          enterpriseName:'',   //企业名称
          phone:'',            //手机号
          roleCode: 0,       //角色code
          securityCode:'1234', //验证码
          securityCodeId:1,    //验证码id
          certType:"id",       //证件类型
          certNo:'33028',      //证件号码
          acctIds:"1111",      //开户行账号
          svcrClass:'316',     //开户行别
          acctSvcrName:'',     //开户行
          acctIds:'',          //开户行账号
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
      register(formName) {
        this.ruleForm.accountName = this.$route.params.userName;
        this.ruleForm.password = this.$route.params.pwd;
        this.ruleForm.password = this.$route.params.phone;

        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('/v1/account/user',this.ruleForm,{emulateJSON:true}).then((res) => {
              console.log(res.body);
              var code =  res.body.code;
              if(code != 0){
                this.msg = res.body.message;
                return;
              }
              this.$router.push('/registerSuccess')
            },(err) => {
              console.log(err);
            })
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
