<template>
  <div class="box-card">
    <el-row class="row-black row-padding">
      <el-col :span="8">业务编号：{{item.orderId}}</el-col>
      <el-col :span="8">发起时间：{{item.timeStamp}}</el-col>
    </el-row>
    <el-row class="row-padding">
      <el-col :span="16">
        <el-row>
          <el-col :span="12">申请人：{{item.applicant}}</el-col>
          <el-col :span="12">运单号：{{item.trackingNum}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">物流公司：{{item.logistics}}</el-col>
          <el-col :span="12">货物价值：{{item.value}}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-button type="primary" @click="inResponse">同意入库</el-button>
      <el-button type="primary" @click="">拒绝</el-button>
    </el-row>
  </div>
</template>
<script>
  import Store from '../../vuex/store.js'

  export default {
    name:'index',
    mounted(){
      this.getDetails()
    },
    data () {
      return {
        item:{
          orderId:'20170403123456',
          timeStamp:'2017-04-43 10:29:11',
          applicant:'B企业',
          trackingNum:'11123435456',
          logistics:'',
          value:'20,000'
        }
      }
    },
    methods:{
        getDetails(){
          var param = {repoBusinessNo:Store.state.checkId}
          this.$http.get('/v1/repository/getRepoBusiHistoryList  ',param,{emulateJSON:true}).then((res) => {
            console.log(res.body);
            var code =  res.body.code;
            if(code != 0){
              return;
            }
            this.item = res.body.data
          },(err) => {
            console.log(err);
          })
        },
        inResponse(){
          var param = {repoBusinessNo:Store.state.checkId}
          this.$http.post('/v1/repository/incomeApplyResponse',param,{emulateJSON:true}).then((res) => {
            console.log(res.body);
            var code =  res.body.code;
            if(code != 0){
              return;
            }
          },(err) => {
            console.log(err);
          })
        }
    }
  }
</script>
