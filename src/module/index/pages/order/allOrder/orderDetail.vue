<template>
  <div>
    <el-row style="margin:10px 0;float: right;z-index:999">
      <el-button type="primary" v-if="(state.changeRole==='pyee')&&(orderDetail.orderStatus.transactionStatus==='待确认')" @click.native="confirmOrder">确认订单</el-button>
      <el-button type="primary" v-if="(state.changeRole==='pyee')&&(orderDetail.orderStatus.billStatus==='待签发')" @click.native="signBill">签发</el-button>
      <el-button type="primary" v-if="(state.changeRole==='pyee')&&(orderDetail.orderStatus.billStatus==='承兑已签收')" @click.native="sendGood">发货</el-button>
      <el-button type="primary" v-if="(state.changeRole==='pyer')&&(orderDetail.orderStatus.billStatus==='承兑待签收')" @click.native.prevent="acceptBill">承兑签收</el-button>
    </el-row>
    <el-row>
      <el-col :span="24">
      <el-card class="box-card mybox" style="width:100%">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">交易详情</span>
        </div>
        <div class="box-card mycard1">
          <el-row class="row-black row-padding">
            <el-col :span="8">订单编号：{{orderDetail.orderNo}}</el-col>
            <el-col :span="8" style="float:right">发起时间：{{orderDetail.orderGenerateTime}}</el-col>
          </el-row>
          <el-row class="">
            <el-col :span="8">商家：{{orderDetail.pyeeAddress}}</el-col>
            <el-col :span="8">订单金额：{{orderDetail.orderTotalPrice}}</el-col>
            <el-col :span="8">付款方式：{{orderDetail.collectionMethod}}</el-col>
          </el-row>
          <el-row class="">
            <el-col :span="8">货品名称：{{orderDetail.productName}}</el-col>
            <el-col :span="8">货品数量：{{orderDetail.productQuantity}}</el-col>
          </el-row>
          <el-row class="" style="border-bottom: 1px solid #fff">
            <el-col :span="8">支付银行：{{orderDetail.pyerBank}}</el-col>
            <el-col :span="8">付款账户：{{orderDetail.pyerAccount}}</el-col>
          </el-row>
          <el-row class="">
            <el-col :span="8">交易状态</el-col>
          </el-row>
          <el-row class="">
            <el-col :span="8">交易发起：{{orderDetail.orderGenerateTime}}</el-col>
          </el-row>
          <el-row class="">
            <el-col :span="8">交易确认：{{orderDetail.orderConfirmTime}}</el-col>
          </el-row>
        </div>

      </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
      <el-card class="box-card mybox" style="width:100%">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">应收账款详情</span>
        </div>
        <div class="box-card mycard1">
          <el-row class="row-black row-padding">
            <el-col :span="8">业务编号：{{orderDetail.orderNo}}</el-col>
            <el-col :span="8" style="float:right">签发时间：{{orderDetail.isseDt}}</el-col>
          </el-row>
          <el-row class="">
            <el-col :span="8">收款方：{{orderDetail.pyee}}</el-col>
            <el-col :span="8">付款方：{{orderDetail.pyer}}</el-col>
            <el-col :span="8">账款金额：{{orderDetail.isseAmt}}</el-col>
          </el-row>
          <el-row class="">
            <el-col :span="8">票面利息：{{orderDetail.rate}}</el-col>
            <el-col :span="8">到期日：{{orderDetail.dueDt}}</el-col>
          </el-row>
          <el-row class="">
            <el-col :span="8">应收账款最新状态：{{orderDetail.orderStatus.billStatus}},(最新状态产生的时间)</el-col>
          </el-row>
          <el-row class="">
            <el-col :span="8" style="float:right"><el-button type="primary">查看账款详情</el-button></el-col>
          </el-row>
        </div>

      </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
      <el-card class="box-card mybox" style="width:100%">

        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">物流信息</span>
        </div>
        <div class="box-card mycard1">
          <el-row class="row-black row-padding">
            <el-col :span="8">运单号：{{orderDetail.wayBillNo}}</el-col>
            <el-col :span="8" style="float:right">下单时间：{{orderDetail.consignDate}}</el-col>
          </el-row>
          <el-row class="">
            <el-col :span="8">物流公司：{{orderDetail.logistics}}</el-col>
            <el-col :span="8">物流当前状态：{{orderDetail.orderStatus.wayBillStatus}},（当前状态产生时间）</el-col>
          </el-row>
          <el-row class="">
            <el-col :span="8" style="float:right"><el-button type="primary">查看物流详情</el-button></el-col>
          </el-row>
        </div>

      </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
      <el-card class="box-card mybox" style="width:100%">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">仓储信息</span>
        </div>
        <div class="box-card mycard1">
          <el-row class="row-black row-padding">
            <el-col :span="8">仓储流水号：{{orderDetail.storageNo}}</el-col>
            <el-col :span="8" style="float:right">入库申请时间：{{orderDetail.operateTime}}</el-col>
          </el-row>
          <el-row class="">
            <el-col :span="8">仓储公司：{{orderDetail.storageCompanyNo}}</el-col>
            <el-col :span="8">仓单编号：{{orderDetail.wareHouseRcptNo}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="8">仓储状态：{{orderDetail.orderStatus.storageStatus}},当前状态生成时间</el-col>
          </el-row>
          <el-row class="">
            <el-col :span="8" style="float:right"><el-button type="primary">查看仓储详情</el-button></el-col>
          </el-row>
        </div>

      </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import store from '../../../vuex/store.js'
  export default {
    name:'index',
    data () {
      return {
          orderDetail:{
              orderId:'',
              timeStamp:'',
            orderStatus:{
                  billStatus:''
            }
          }
      }
    },
    computed: {
      state () {
        return store.state;
      }
    },
    methods: {
      confirmOrder () {
        console.log("确认订单！");
      },
      signBill () {
        console.log("签发应收账款");
      },
      sendGood () {
        console.log("发货");
      },
      acceptBill () {
        console.log("承兑签收");
      }
    },
    mounted() {
      console.log("now the srtate is:"+store.state.checkId);
      this.$http.get("http://172.16.100.246/server_test/getData2.php?checkId="+store.state.checkId).then(
        function (res) {
          // 处理成功的结果
          console.log(res.body);
          this.orderDetail=res.body.object;
        },function (res) {
          // 处理失败的结果
          console.log(res);
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
  .mycard1 {width:90% !important;float:inherit !important;margin:10px auto !important;}
  .mycard1 .el-row {margin-bottom: 0 !important;}
  .mycard1 .el-col {text-align: center;box-sizing: border-box;padding:5px 0;}
  .mybox {margin:0 !important;}
  .mybox .el-card__header{padding-top:5px;padding-bottom: 5px;}
  .mycard11 .row-padding-bottom {box-sizing:border-box;padding-bottom:10px;}
  .mycard11 .row-black {border-bottom:1px solid #fff;}
</style>
