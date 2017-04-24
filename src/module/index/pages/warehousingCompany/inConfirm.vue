<template>
  <div id="inConfirm" class="box-card">
    <el-breadcrumb separator=">" class="bread">
      <svg class="icon combinedShape" aria-hidden="true">   <use xlink:href="#icon-locate"></use> </svg>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>仓储管理</el-breadcrumb-item>
      <el-breadcrumb-item>我的仓储</el-breadcrumb-item>
      <el-breadcrumb-item>入库确认</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row class="el-row-header statePosition">
        <el-col class="buyerColor stateShow"><svg class="icon detailIcon" aria-hidden="true">   <use xlink:href="#icon-zhuangtai"></use> </svg>
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
            <div class="box-card mycard1 detailContent">
              <el-row>
                <el-col :span="8" class="msgName">申请人：{{repoDetails.storeEnterpriseName}}</el-col>
                <el-col :span="8" class="msgName">运单号：{{repoDetails.waybillNo}}</el-col>
                <el-col :span="8" class="msgName">物流公司：{{repoDetails.logisticsEntepsName | nullSituation}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8" class="msgName">货品名称：{{repoDetails.productName}}</el-col>
                <el-col :span="8" class="msgName">货品数量：{{repoDetails.productQuantity}}（{{repoDetails.measureUnit}}）</el-col>
                <el-col :span="8" class="msgName">货物总额（元）：{{repoDetails.productTotalPrice}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form :model="param" :label-position="labelPosition" :rules="rules" ref="param">
                    <el-form-item label="仓单编号" prop="receiptNo">
                      <el-input v-model="param.receiptNo"></el-input>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-button type="primary" @click.native.prevent="inConfirm()">入库确认</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
  import Store from '../../vuex/store.js'

  export default {
    name:'inConfirm',

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
        },
        param:{
          receiptNo:''
        },
        rules: {
          receiptNo: [
            { required: true, message: '请输入仓单号', trigger: 'blur' },   //表单验证
          ]
        },
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
      inConfirm(){
        this.$http.put('/v1/repository/incomeConfirm?repoBusinessNo='+Store.state.checkIdRepo).then((res) => {
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
