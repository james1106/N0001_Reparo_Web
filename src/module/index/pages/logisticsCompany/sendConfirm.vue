<template>
  <div class="sendConfirm">
    <div>
      <el-breadcrumb separator=">" class="bread">
        <svg class="icon combinedShape" aria-hidden="true">   <use xlink:href="#icon-locate"></use> </svg>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>运单管理</el-breadcrumb-item>
        <el-breadcrumb-item>发货确认</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card>
      <div>
        <span class="sellerStepTitle">发货申请单详情</span>
      </div>
      <el-row class="dataTable">
        <el-row class="el-row-header">
          <el-col :span="6" style="margin-left: 19px">运单编号：{{companyBillDetail.wayBillNo | nullSituation}}</el-col>
          <el-col :span="8">发起时间：{{companyBillDetail.wayBillCreateTime | timeTransfer | nullSituation}}</el-col><!--发货待响应的时间-->
        </el-row>
        <el-row>
          <el-col :span="6" class="msgName" style="margin-left: 19px">发货人：{{companyBillDetail.senderEnterpriseName}}</el-col>
          <el-col :span="6" class="msgName">收货人：{{companyBillDetail.receiverEnterpriseName}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="msgName" style="margin-left: 19px">货品名称：{{companyBillDetail.productName}}</el-col>
          <el-col :span="6" class="msgName">货品价值(元)：{{companyBillDetail.productValue | numTransfer}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="msgName" style="margin-left: 19px">物流公司：{{companyBillDetail.logisticsEnterpriseName}}</el-col>
        </el-row>
      </el-row>
      <el-row >
        <el-col :span="12" style="text-align: left;margin-top: 10px">
          <el-button class="agreeBtn" type="primary" @click="sendConfirm(companyBillDetail.orderNo)">确认</el-button>
        </el-col>
      </el-row>
    </el-card>
    <!--自定义弹框 暂不需要-->
  </div>
</template>
<script>
  import store from "../../vuex/store"
  import constantData from '../../../../common/const'
  export default {
    name: 'sendConfirm',
    data () {
      return {
        companyBillDetail: {
          txDetail: {},
          receDetail: {},
          repoDetail: {},
          wayBillDetail: {},
          wayBillCreateTime:''
        },
        confirmSend: {
          orderNo:'',
        },

      }
    },
    methods: {
      sendConfirm (checkId) {
        console.log("发货确认");
        this.confirmSend.orderNo=store.state.checkIdOrder;
        console.log(this.confirmSend);
        this.$http.post("../v1/waybill/confirmedWaybill",this.confirmSend,{emulateJSON:true}).then(
          function(res){
            if(res.body.code != 0){
              this.$message.error(res.body.message);
              return;
            }
          },
          function(err){console.log(err)}
        );
        store.commit('setCheckIdOrder',checkId);
        this.$router.push('/logisticsCompany/companyBillDetails');
      },
      cancelConfirm () {}
    },
    mounted () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.$http.get("../v1/waybill/wayBillDetail?orderNo="+store.state.checkIdOrder).then(
        function(res){
          if(res.body.code != 0){
            this.$message.error(res.body.message);
            return;
          }
          this.companyBillDetail=res.body.data;
          this.companyBillDetail.wayBillCreateTime='';
          for(var item in this.companyBillDetail.operationRecordVo){
            var temp=this.companyBillDetail.operationRecordVo[item];
            console.log(temp.state);
            if(temp.state===constantData.SENDFORRESPONSE){/*筛选发起（发货待响应）时间*/
              console.log(temp.state);
              this.companyBillDetail.wayBillCreateTime=temp.operateTime;
              break;
            }
          }
        },
        function(err){
          console.log(err);
        }
      );
    }
  }
</script>
<style>
</style>
