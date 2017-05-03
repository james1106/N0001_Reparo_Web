<template>
  <div id="outConfirm" class="box-card outConfirm">
    <el-breadcrumb separator=">" class="bread">
      <svg class="icon combinedShape" aria-hidden="true">   <use xlink:href="#icon-locate"></use> </svg>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>仓储管理</el-breadcrumb-item>
      <el-breadcrumb-item>我的仓储</el-breadcrumb-item>
      <el-breadcrumb-item>出库确认</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row class="el-row-header statePosition">
        <el-col class="sellerColor stateShow"><svg class="icon" aria-hidden="true">   <use xlink:href="#icon-zhuangtai"></use> </svg>
          仓储当前状态：{{repoDetails.curRepoBusiStatus | repoStatus}}</el-col>
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
                <el-col :span="8" class="msgName">仓单号：{{repoDetails.repoCertNo | nullSituation}}</el-col>
                <el-col :span="8" class="msgName">运单号：{{repoDetails.waybillNo | nullSituation}}</el-col>
                <el-col :span="8" class="msgName">持有人：{{repoDetails.repoEnterpriceName}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8" class="msgName">货品名称：{{repoDetails.productName}}</el-col>
                <el-col :span="8" class="msgName">货品数量：{{repoDetails.productQuantity}} {{repoDetails.measureUnit}}</el-col>
                <el-col :span="8" class="msgName">货物总额（元）：{{repoDetails.productTotalPrice}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8" class="msgName">物流公司：{{repoDetails.logisticsEntepsName | nullSituation}}</el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-button class="agreeBtn" type="primary" @click.native.prevent="outConfirm()">出库确认</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
  import Store from '../../vuex/store.js'
  export default {
    name:'outConfirm',
    mounted(){
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.getDetails();
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
        this.$http.get('../v1/repository/getRepoBusiHistoryList?repoBusinessNo='+Store.state.checkIdRepo).then((res) => {
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
      outConfirm(){
        this.$http.put('../v1/repository/outcomeConfirm?repoBusinessNo='+Store.state.checkIdRepo).then((res) => {
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
