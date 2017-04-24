<template>
  <div id="inResponse" class="box-card">
    <el-breadcrumb separator=">" class="bread">
      <img src="../../assets/combinedShape.png" class="combinedShape">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>仓储管理</el-breadcrumb-item>
      <el-breadcrumb-item>我的仓储</el-breadcrumb-item>
      <el-breadcrumb-item>入库待响应</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row class="el-row-header statePosition">
        <el-col class="buyerColor stateShow"><i class="el-icon-information"></i>仓储当前状态：{{repoDetails.curRepoBusiStatus | repoStatus}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-card class="box-card mybox" style="width:100%">
            <div slot="header" class="clearfix el-row-header">
              <el-row>
                <el-col :span="8">业务编号：{{repoDetails.repoBusiNo}}</el-col>
                <el-col :span="8">发起时间：{{repoDetails.operationRecordVoList[0].operateTime | timeTransfer}}</el-col>
              </el-row>
            </div>
            <div class="box-card mycard1">
              <el-row>
                <el-col :span="8" class="msgName">申请人：{{repoDetails.storeEnterpriseName}}</el-col>
                <el-col :span="8" class="msgName">运单号：{{repoDetails.waybillNo | nullSituation}}</el-col>
                <el-col :span="8" class="msgName">物流公司：{{repoDetails.logisticsEntepsName | nullSituation}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8" class="msgName">货品名称：{{repoDetails.productName}}</el-col>
                <el-col :span="8" class="msgName">货品数量：{{repoDetails.productQuantity}}（{{repoDetails.measureUnit | nullSituation}}）</el-col>
                <el-col :span="8" class="msgName">货物总额（元）：{{repoDetails.productTotalPrice}}</el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-button type="primary" @click.native.prevent="inResponse()">同意入库</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
  import Store from '../../vuex/store.js'

  export default {
    name:'inResponse',
    mounted(){
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.getDetails()
    },
    data () {
      return {
        repoDetails:{
          repoBusiNo:'',
          curRepoBusiStatus:'',
          opgTimeOfCurStatus:'',
          repoEnterpriceName:'',
          repoCertNo:'',
          productName:'',
          productQuantity:'',
          measureUnit: '',
          productTotalPrice:'',
          logisticsEntepsName:'',
          waybillNo:'',
          operationRecordVoList: [{
            operateTime:''
          }]
        }
      }
    },
    methods:{
        getDetails(){
          this.$http.get('/v1/repository/getRepoBusiHistoryList?repoBusinessNo='+Store.state.checkIdRepo).then((res) => {
            console.log(res.body);
            var code =  res.body.code;
            if(code != 0){
              return;
            }
            this.repoDetails = res.body.data
          },(err) => {
            console.log(err);
          })
        },
        inResponse(){
          var param = {repoBusinessNo:Store.state.checkIdRepo}
          this.$http.post('/v1/repository/incomeApplyResponse',param,{emulateJSON:true}).then((res) => {
            console.log(res.body);
            var code =  res.body.code;
            if(code != 0){
              return;
            }
            this.$router.push('/warehousingCompany/repoDetails');
          },(err) => {
            console.log(err);
          })
        }
    }
  }
</script>
