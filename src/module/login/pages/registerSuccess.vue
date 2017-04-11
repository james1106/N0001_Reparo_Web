<template>
  <div id="register">
    <el-row>
      <el-col :span="8"><img src="../assets/logo.png"></el-col>
      <el-col :span="8"><h1>注册业务</h1></el-col>
      <el-col :span="8"></el-col>
    </el-row>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="100px" class="register-container">
      <el-form-item label="用户名" prop="account">
        <el-input v-model="ruleForm.account"  type="text"  auto-complete="off" placeholder="用户名"></el-input>    <!--v-model传值-->
      </el-form-item>
      <el-form-item label="企业名称" prop="companyName">
        <el-input v-model="ruleForm.companyName"  type="text"  auto-complete="off" placeholder="用户名"></el-input>    <!--v-model传值-->
      </el-form-item>
      <el-form-item label="密码" prop="checkPass" >
        <el-input v-model="ruleForm.checkPass"  type="password"  auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="经办人手机号" prop="phone">
        <el-input v-model.number="ruleForm.phone"  placeholder="经办人手机号"></el-input>    <!--v-model传值-->
      </el-form-item>
      <el-form-item label="" prop="companyType">
        <el-radio-group v-model="ruleForm.companyType">
          <el-radio class="companyType" v-model="radio" label="0">融资企业</el-radio>
          <el-radio class="companyType" v-model="radio" label="1">仓储公司</el-radio>
          <el-radio class="companyType" v-model="radio" label="2">物流公司</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item style="width:100%;margin-left: -70px;">
        <el-button type="primary" style="width: 600px;" @click="submitForm('ruleForm')">Success</el-button>
      </el-form-item>
    </el-form>
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
          checkPass: '',
          companyType: '0',
          phone:'',
        },
        rules: {
          account: [
            { required: true, message: '请输入用户名', trigger: 'blur' },   //表单验证
          ],
          checkPass: [
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              //做注册操作
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style>
  .register-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 0 auto;
    width: 600px;
    padding: 35px 35px 15px 35px;
    background: #fff;
  }
  </style>
