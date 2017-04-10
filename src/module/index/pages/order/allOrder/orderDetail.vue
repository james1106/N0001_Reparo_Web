<template>
  <div>
    <el-row style="margin:10px 0;float: right;z-index:999">
      <el-button type="primary" v-if="(state.changeRole==='pyee')&&(orderDetail.txDetail.transactionLatestStatus===0)"
                 @click.native="confirmOrder">确认订单
      </el-button>
      <el-button type="primary" v-if="(state.changeRole==='pyee')&&(orderDetail.receDetail.receLatestStatus===0)"
                 @click.native="signBill">签发
      </el-button>
      <el-button type="primary" v-if="(state.changeRole==='pyee')&&(orderDetail.receDetail.receLatestStatus===4)"
                 @click.native="sendGood">发货
      </el-button>
      <el-button type="primary" v-if="(state.changeRole==='pyer')&&(orderDetail.receDetail.receLatestStatus===3)"
                 @click.native.prevent="acceptBill">签收账款
      </el-button>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card class="box-card mybox" style="width:100%">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">交易详情</span>
          </div>
          <div class="box-card mycard1">
            <el-row class="row-black row-padding">
              <el-col :span="8">订单编号：{{orderDetail.txDetail.orderNo}}</el-col>
              <el-col :span="8" style="float:right">发起时间：{{orderDetail.txDetail.orderGenerateTime}}</el-col>
            </el-row>
            <el-row class="">
              <el-col :span="8">对方：{{orderDetail.txDetail.oppositeAccount}}</el-col>
              <el-col :span="8">订单金额：{{orderDetail.txDetail.totalPrice}}</el-col>
              <el-col :span="8">付款方式：{{orderDetail.txDetail.payingMethod}}</el-col>
            </el-row>
            <el-row class="">
              <el-col :span="8">货品名称：{{orderDetail.txDetail.productName}}</el-col>
              <el-col :span="8">货品数量：{{orderDetail.txDetail.productNum}}</el-col>
            </el-row>
            <el-row class="" style="border-bottom: 1px solid #fff">
              <el-col :span="8">支付银行：{{orderDetail.txDetail.payerBank}}</el-col>
              <el-col :span="8">付款账户：{{orderDetail.txDetail.payerBankAccount}}</el-col>
            </el-row>
            <el-row class="">
              <el-col :span="8">交易状态</el-col>
            </el-row>
            <el-row class="">
              <el-col :span="8">交易发起：{{orderDetail.txDetail.orderGenerateTime}}</el-col>
            </el-row>
            <el-row class="">
              <el-col :span="8">交易确认：{{orderDetail.txDetail.orderConfirmTime}}</el-col>
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
              <el-col :span="8">业务编号：{{orderDetail.receDetail.receNo}}</el-col>
              <el-col :span="8" style="float:right">签发时间：{{orderDetail.receDetail.receGenerateTime}}</el-col>
            </el-row>
            <el-row class="">
              <el-col :span="8">收款方：{{orderDetail.receDetail.receivingSide}}</el-col>
              <el-col :span="8">付款方：{{orderDetail.receDetail.payingSide}}</el-col>
              <el-col :span="8">账款金额：{{orderDetail.receDetail.receAmount}}</el-col>
            </el-row>
            <el-row class="">
              <el-col :span="8">票面利息：{{orderDetail.receDetail.coupon}}</el-col>
              <el-col :span="8">到期日：{{orderDetail.receDetail.dueDate}}</el-col>
            </el-row>
            <el-row class="">
              <el-col :span="8">
                应收账款最新状态：{{orderDetail.receDetail.receLatestStatus}},({{orderDetail.receDetail.receUpdateTime}})
              </el-col>
            </el-row>
            <el-row class="">
              <el-col :span="8" style="float:right">
                <el-button type="primary">查看账款详情</el-button>
              </el-col>
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
              <el-col :span="8">运单号：{{orderDetail.wayBillDetail.wayBillNo}}</el-col>
              <el-col :span="8" style="float:right">下单时间：{{orderDetail.wayBillDetail.wayBillGenerateTime}}</el-col>
            </el-row>
            <el-row class="">
              <el-col :span="8">物流公司：{{orderDetail.wayBillDetail.logisticCompany}}</el-col>
              <el-col :span="8">
                物流当前状态：{{orderDetail.wayBillDetail.wayBillLatestStatus}},（{{orderDetail.wayBillDetail.wayBillUpdateTime}}）
              </el-col>
            </el-row>
            <el-row class="">
              <el-col :span="8" style="float:right">
                <el-button type="primary">查看物流详情</el-button>
              </el-col>
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
              <el-col :span="8">仓储流水号：{{orderDetail.repoDetail.repoSerialNo}}</el-col>
              <el-col :span="8" style="float:right">入库申请时间：{{orderDetail.repoDetail.repoGenerateTime}}</el-col>
            </el-row>
            <el-row class="">
              <el-col :span="8">仓储公司：{{orderDetail.repoDetail.payerRepoCompany}}</el-col>
              <el-col :span="8">仓单编号：{{orderDetail.repoDetail.repoCertNo}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="8">仓储状态：{{orderDetail.repoDetail.repoLatestStatus}},{{orderDetail.repoDetail.receUpdateTime}}</el-col>
            </el-row>
            <el-row class="">
              <el-col :span="8" style="float:right">
                <el-button type="primary">查看仓储详情</el-button>
              </el-col>
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
    name: 'index',
    data () {
      return {
        orderDetail: {
          txDetail: {},
          receDetail: {},
          repoDetail: {},
          wayBillDetail: {}
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
      console.log("the state checkId is:" + store.state.checkId);
      this.$http.get("http://172.16.100.246/server_test/getData2.php?checkId=" + store.state.checkId).then(
        function (res) {
          // 处理成功的结果
          console.log(res.body);
          this.orderDetail = res.body.data;
        }, function (res) {
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

  .mycard1 {
    width: 90% !important;
    float: inherit !important;
    margin: 10px auto !important;
  }

  .mycard1 .el-row {
    margin-bottom: 0 !important;
  }

  .mycard1 .el-col {
    text-align: center;
    box-sizing: border-box;
    padding: 5px 0;
  }

  .mybox {
    margin: 0 !important;
  }

  .mybox .el-card__header {
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .mycard11 .row-padding-bottom {
    box-sizing: border-box;
    padding-bottom: 10px;
  }

  .mycard11 .row-black {
    border-bottom: 1px solid #fff;
  }
</style>
