<template>
  <div id="register">
    <el-row>
      <img src="../assets/logo_login.png">
      <h3 style="color: #666666">完善信息</h3>
    </el-row>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px"
             class="login-container" v-loading="loading" element-loading-text="正在玩命注册...">
      <el-form-item prop="enterpriseName">
        <el-input v-model="ruleForm.enterpriseName" type="text" auto-complete="off" placeholder="企业名"></el-input>
        <!--v-model传值-->
      </el-form-item>
      <el-form-item prop="acctSvcrName">
        <el-input v-model="ruleForm.acctSvcrName" type="text" auto-complete="off" placeholder="开户行"></el-input>
      </el-form-item>
      <el-form-item prop="acctIds">
        <el-input v-model.number="ruleForm.acctIds" placeholder="账号"></el-input>    <!--v-model传值-->
      </el-form-item>
      <el-form-item prop="roleCode" style="text-align: left">
        <el-radio-group v-model="ruleForm.roleCode" size="small">
          <el-radio-button name="roleCode" label="0">融资企业</el-radio-button>
          <el-radio-button name="roleCode" label="2">仓储公司</el-radio-button>
          <el-radio-button name="roleCode" label="1">物流公司</el-radio-button>
          <el-radio-button name="roleCode" label="3">金融机构</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-row class="agreeMsg"><span class="tip">点击注册表示你已阅读并同意<span style="color:rgb(57,202,166);">《xxx条款》</span></span>
      </el-row>
      <el-form-item style="width:100%;">
        <el-button type="primary" class="nextButton" id="registerBtn" @click="register('ruleForm')">注册</el-button>
      </el-form-item>
    </el-form>
    <el-row style="text-align: center">
      <span class="registerStep highlight">1 设置用户名 </span><span class="registerStep highlight">2 完善个人信息 </span><span
      class="registerStep">3 注册成功</span>
    </el-row>
  </div>
</template>

<script>
  import Store from "../../../common/store.js"

  export default {
    name: 'register',
    data(){
      return {
        dialogVisible: false,
        msg: '',
        loading: false,
        ruleForm: {
          accountName: '',     //用户名
          password: '',         //密码
          enterpriseName: '',   //企业名称
          phone: '111',         //手机号
          roleCode: "0",         //角色code
          securityCode: '1234', //验证码
          securityCodeId: 1,    //验证码id
          certType: "id",       //证件类型
          certNo: '33028',      //证件号码
          acctIds: "",      //开户行账号
          svcrClass: '316',     //开户行别
          acctSvcrName: '',     //开户行
          acctSvcr: '1',         //开户行号
        },
        rules: {
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'},   //表单验证
            {type: 'number', message: '账号必须为数字值'},
          ],
          companyName: [
            {required: true, message: '请输入企业名', trigger: 'blur'},
          ],
          bank: [
            {required: true, message: '请输入开户行', trigger: 'blur'},
          ]
        },
      }
    },
    methods: {
      register(formName) {
        this.ruleForm.accountName = this.$route.params.userName;
        this.ruleForm.password = this.$route.params.pwd;
        this.ruleForm.phone = this.$route.params.phone;

        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.$http.post('../v1/account/user', this.ruleForm, {emulateJSON: true}).then((res) => {
              this.loading = false;
              var data = res.body.data;
              if (res.body.code != 0) {
                this.$message.error(res.body.message);
                return;
              }
              Store.saveUserInfo(data);
              this.$router.push('/registerSuccess')
            }, (err) => {
              this.loading = false;
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
