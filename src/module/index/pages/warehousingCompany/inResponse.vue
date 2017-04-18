<template>
  <div class="box-card">
    <el-row class="row-black row-padding">
      <el-col :span="8">业务编号：{{item.repoBusiNo}}</el-col>
      <el-col :span="8">发起时间：{{item.operationRecordVoList[0].operateTime | timeTransfer}}</el-col>
    </el-row>
    <el-row class="row-padding">
      <el-col :span="16">
        <el-row>
          <el-col :span="12">申请人：{{item.storeEnterpriseName}}</el-col>
          <el-col :span="12">运单号：{{item.repoCertNo | nullSituation}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">物流公司：{{item.logisticsEntepsName | nullSituation}}</el-col>
          <el-col :span="12">货物价值：{{item.productTotalPrice}}</el-col>
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
        }
      }
    },
    methods:{
        getDetails(){
          this.$http.get('/v1/repository/getRepoBusiHistoryList?repoBusinessNo='+Store.state.checkId).then((res) => {
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
