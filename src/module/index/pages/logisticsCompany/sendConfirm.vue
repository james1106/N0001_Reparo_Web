<template>
  <div class="confirmSend">
    <div>
      <el-breadcrumb separator=">" class="bread">
        <img src="../../assets/combinedShape.png" class="combinedShape">
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
          <el-col :span="6">发起时间：{{companyBillDetail.wayBillCreateTime | timeTransfer | nullSituation}}</el-col><!--发货待响应的时间-->
        </el-row>
        <el-row>
          <el-col :span="6" class="msgName" style="margin-left: 19px">发货人：{{companyBillDetail.senderEnterpriseName}}</el-col>
          <el-col :span="6" class="msgName">收货人：{{companyBillDetail.receiverEnterpriseName}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="msgName" style="margin-left: 19px">货品名称：{{companyBillDetail.productName}}</el-col>
          <el-col :span="6" class="msgName">货品价值：{{companyBillDetail.productValue}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="msgName" style="margin-left: 19px">物流公司：{{companyBillDetail.logisticsEnterpriseName}}</el-col>
        </el-row>
      </el-row>
      <el-row class="confirmBtn">
        <el-col :span="12" style="text-align: left;margin-top: 10px">
          <el-button type="primary" @click="sendConfirm(companyBillDetail.orderNo)">确认</el-button>
          <el-button type="primary" @click="cancelConfirm">取消</el-button>
        </el-col>
      </el-row>
    </el-card>
    <!--自定义弹框 暂不需要-->
  </div>
</template>
<script>
  import store from "../../vuex/store"
  import '../../../../assets/css/style.css'
  import constantData from '../../../../common/const'
  export default {
    name: 'index',
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
        this.confirmSend.orderNo=store.state.checkId;
        console.log(this.confirmSend);
        this.$http.post("/v1/waybill/confirmedWaybill",this.confirmSend,{emulateJSON:true}).then(
          function(res){console.log(res.body);},
          function(err){console.log(err)}
        );
        store.commit('setCheckId',checkId);
        this.$router.push('/logisticsCompany/companyBillDetails');
      },
      cancelConfirm () {}
    },
    mounted () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.$http.get("/v1/waybill/wayBillDetail?orderNo="+store.state.checkId).then(
        function(res){
          console.log(res.body);
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
  .el-row {
    margin-bottom: 20px;
  }

  .el-row:last-child {
    margin-bottom: 0;
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .modal-mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(55,55,55,.6);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal-confirm{
    width: 600px;
    height: 320px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 4px;
  }
  .confirm-header{margin-left: 4%}
  .confirm-content{padding: 10px 15px;}
  @media only screen and (max-width: 640px) {
    .modal-confirm{
      width: 100%;
      margin: 0 20px;
      padding: 10px 20px;
    }
  }

  .modal-enter, .modal-leave {
    opacity: 0;
  }
  .modal-enter-active, .modal-leave-active {
    transition: all .3s ease;
  }
</style>
