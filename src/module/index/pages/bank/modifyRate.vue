<template>
  <div id="modifyRate" class="modifyRate">
    <el-breadcrumb separator=">" class="bread">
      <svg class="icon combinedShape" aria-hidden="true">   <use xlink:href="#icon-locate"></use> </svg>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>应收账款</el-breadcrumb-item>
      <el-breadcrumb-item>我的应收账款</el-breadcrumb-item>
      <el-breadcrumb-item>利率修改</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form :model="modifyInfo" :rules="modifyRules" ref="modifyInfo">
        <el-row>
          <el-col :span="6">
            <el-form-item label="当前贴现利率(%)" prop="discountRate" >
              <el-input :disabled="modifyState" v-model="modifyInfo.discountRate"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-top: 38px">
            <el-button type="text" @click="change()">修改</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-col :span="6">
          <el-button type="primary" @click="modify('modifyInfo')">确认</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
  import Store from '../../vuex/store'
  import constantData from '../../../../common/const'
  import LocalStore from '../../../../common/store'

  export default {
    name:'modifyRate',
//    获取当前利率
//    created: function () {
//      var userInfo = LocalStore.fetchUserInfo();
//      this.modifyInfo.discountRate = userInfo.roleCode;
//    },
    mounted:function () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    data () {
      var validatePass = (rule,value,callback)=>{
        var reg = /^\d+(?:\.\d{1,2})?$/;
        console.log(value);
        if(!reg.test(value)){
          callback(new Error("请输入正确贴现金额,保留小数点后两位"));
        }else if(value>100){
          callback(new Error("请输入正确贴现金额"));
        }else{
          callback();
        }
      };
      return {
        modifyState:true,    //表单不可编辑状态
        modifyInfo:{
          discountRate:"1"
        },
        modifyRules:{
          discountRate:[
            {required: true, message: '请输入贴现利率', trigger: 'blur'},
//            {type: 'number', message: '请输入正确的贴现利率',min:'0',max:'100'},
            {validator:validatePass, trigger:'blur'}
          ]
        }
      }
    },
    methods:{
      change(){
        if(this.modifyState){
          this.modifyState=false;
        }
      },
      modify(formName){
        this.$refs[formName].validate((valid) => {
          if (valid && !this.modifyState) {
            var modifyParam = this.modifyInfo;
            console.log(modifyParam);
            this.modifyState=true;
            this.$message.success("修改成功");
//            this.$http.post('../v1/receivable/sign',modifyParam,{emulateJSON:true}).then((res) => {
//              if(res.body.code != 0){
//                this.$message.error(res.body.message);
//                return;
//              }
//              this.modifyState=true;
//              this.$message.success("修改成功");
//            },(err) => {
//              console.log(err);
//            })
          } else {
            return false;
          }
        },(err) => {
          console.log(err);
        })
      }
    }
  }
</script>
<style>
  .modifyRate .el-form-item__error{
    top:100%!important;
    left:2%!important;
  }
  /*.modifyRate .el-button--primary:focus{*/
    /*background-color:rgb(57,202,166)!important ;*/
    /*border-color: rgb(57,202,166)!important;*/
  /*}*/
</style>
