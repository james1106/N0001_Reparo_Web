<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="所有订单" name="first">
      <el-row class="mycard row-black row-padding">
        <el-col :span="6">货品信息</el-col>
        <el-col :span="6">付款信息</el-col>
        <el-col :span="6">订单状态</el-col>
        <el-col :span="6">操作</el-col>
      </el-row>
      <template v-for="(item,index) in allOrder">
        <div class="box-card mycard">
          <el-row class="row-black row-padding">
            <el-col :span="8">订单编号：{{item.orderNo}}</el-col>
            <el-col :span="8">创建时间：{{item.orderGenerateTime | timeTransfer}}</el-col>
            <el-col :span="8" v-if="state.isBuyer==='true'">卖家：{{item.payerCompanyName}}</el-col>
            <el-col :span="8" v-else>买家：{{item.payeeCompanyName}}</el-col>
          </el-row>
          <el-row style="border-top: 1px solid #fff">
            <el-col :span="6" style="border-right: 1px solid #fff">
              <el-col :span="24">货品名称：{{item.productName}}</el-col>
              <el-col :span="24">货品数量：{{item.productQuantity}}</el-col>
            </el-col>
            <el-col :span="6" style="border-right: 1px solid #fff">
              <el-col :span="24">订单金额：{{item.productTotalPrice}}</el-col>
              <el-col :span="24">付款方式：{{item.payingMethod | payingMethod}}</el-col>
            </el-col>
            <el-col :span="6" style="border-right: 1px solid #fff">
              <el-col :span="24">交易状态：{{item.transactionStatus | transactionStatus}}</el-col>
              <el-col :span="24">账款状态：{{item.receStatus | receStatus}}</el-col>
              <el-col :span="24">仓储状态：{{item.repoStatus | repoStatus}}</el-col>
              <el-col :span="24">物流状态：{{item.wayBillStatus | wayBillStatus}}</el-col>
            </el-col>
            <el-col :span="6">
                <el-button type="text" @click.native.prevent="checkDetail(item.orderNo)">查看详情</el-button>
                <el-button type="text" v-if="(state.isBuyer==='false')&&(item.transactionStatus===constantData.UNCONFIRMED)" @click.native.prevent="confirmOrder(item.orderNo)">确认订单</el-button>
                <el-button type="text" v-if="(state.isBuyer==='false')&&(item.transactionStatus===constantData.CONFIRMED)" @click.native.prevent="signBill">签发应收账款</el-button>
                <el-button type="text" v-if="(state.isBuyer==='false')&&(item.receStatus===constantData.ACCEPTED)" @click.native.prevent="sendGood">发货</el-button>
                <el-button type="text" v-if="(state.isBuyer==='true')&&(item.receStatus===constantData.FORACCEPT)" @click.native.prevent="acceptBill">签收账款</el-button>
            </el-col>
          </el-row>
        </div>
      </template>
    </el-tab-pane>
    <el-tab-pane label="待确认" name="second">
      <template v-for="(item,index) in allOrder" v-if="item.transactionStatus===constantData.UNCONFIRMED"><!--待确认 0-->
        <div class="box-card mycard">
          <el-row class="row-black row-padding">
            <el-col :span="8">订单编号：{{item.orderNo}}</el-col>
            <el-col :span="8">创建时间：{{item.orderGenerateTime | timeTransfer}}</el-col>
            <el-col :span="8" v-if="state.isBuyer==='true'">卖家：{{item.payerCompanyName}}</el-col>
            <el-col :span="8" v-else>买家：{{item.payeeCompanyName}}</el-col>
          </el-row>
          <el-row style="border-top: 1px solid #fff">
            <el-col :span="6" style="border-right: 1px solid #fff">
              <el-col :span="24">货品名称：{{item.productName}}</el-col>
              <el-col :span="24">货品数量：{{item.productQuantity}}</el-col>
            </el-col>
            <el-col :span="6" style="border-right: 1px solid #fff">
              <el-col :span="24">订单金额：{{item.productTotalPrice}}</el-col>
              <el-col :span="24">付款方式：{{item.payingMethod | payingMethod}}</el-col>
            </el-col>
            <el-col :span="6" style="border-right: 1px solid #fff">
              <el-col :span="24">交易状态：{{item.transactionStatus | transactionStatus}}</el-col>
              <el-col :span="24">账款状态：{{item.receStatus | receStatus}}</el-col>
              <el-col :span="24">仓储状态：{{item.repoStatus | repoStatus}}</el-col>
              <el-col :span="24">物流状态：{{item.wayBillStatus | wayBillStatus}}</el-col>
            </el-col>
            <el-col :span="6">
              <el-button type="text" @click.native.prevent="checkDetail(item.orderNo)">查看详情</el-button>
              <el-button type="text" v-if="(state.isBuyer==='false')&&(item.transactionStatus===constantData.UNCONFIRMED)" @click.native.prevent="confirmOrder(item.orderNo)">确认订单</el-button>
              <el-button type="text" v-if="(state.isBuyer==='false')&&(item.transactionStatus===constantData.CONFIRMED)" @click.native.prevent="signBill">签发应收账款</el-button>
              <el-button type="text" v-if="(state.isBuyer==='false')&&(item.receStatus===constantData.ACCEPTED)" @click.native.prevent="sendGood">发货</el-button>
              <el-button type="text" v-if="(state.isBuyer==='true')&&(item.receStatus===constantData.FORACCEPT)" @click.native.prevent="acceptBill">签收账款</el-button>
            </el-col>
          </el-row>
        </div>
      </template>
    </el-tab-pane>
    <el-tab-pane label="待付款" name="third">
      <template v-for="(item,index) in allOrder" v-if="(item.receStatus===constantData.FORACCEPT)||(item.transactionStatus===constantData.CONFIRMED)"><!--承兑待签收3 待签发0/订单已确认-->
        <div class="box-card mycard">
          <el-row class="row-black row-padding">
            <el-col :span="8">订单编号：{{item.orderNo}}</el-col>
            <el-col :span="8">创建时间：{{item.orderGenerateTime | timeTransfer}}</el-col>
            <el-col :span="8" v-if="state.isBuyer==='true'">卖家：{{item.payerCompanyName}}</el-col>
            <el-col :span="8" v-else>买家：{{item.payeeCompanyName}}</el-col>
          </el-row>
          <el-row style="border-top: 1px solid #fff">
            <el-col :span="6" style="border-right: 1px solid #fff">
              <el-col :span="24">货品名称：{{item.productName}}</el-col>
              <el-col :span="24">货品数量：{{item.productQuantity}}</el-col>
            </el-col>
            <el-col :span="6" style="border-right: 1px solid #fff">
              <el-col :span="24">订单金额：{{item.productTotalPrice}}</el-col>
              <el-col :span="24">付款方式：{{item.payingMethod | payingMethod}}</el-col>
            </el-col>
            <el-col :span="6" style="border-right: 1px solid #fff">
              <el-col :span="24">交易状态：{{item.transactionStatus | transactionStatus}}</el-col>
              <el-col :span="24">账款状态：{{item.receStatus | receStatus}}</el-col>
              <el-col :span="24">仓储状态：{{item.repoStatus | repoStatus}}</el-col>
              <el-col :span="24">物流状态：{{item.wayBillStatus | wayBillStatus}}</el-col>
            </el-col>
            <el-col :span="6">
              <el-button type="text" @click.native.prevent="checkDetail(item.orderNo)">查看详情</el-button>
              <el-button type="text" v-if="(state.isBuyer==='false')&&(item.transactionStatus===constantData.UNCONFIRMED)" @click.native.prevent="confirmOrder(item.orderNo)">确认订单</el-button>
              <el-button type="text" v-if="(state.isBuyer==='false')&&(item.transactionStatus===constantData.CONFIRMED)" @click.native.prevent="signBill">签发应收账款</el-button>
              <el-button type="text" v-if="(state.isBuyer==='false')&&(item.receStatus===constantData.ACCEPTED)" @click.native.prevent="sendGood">发货</el-button>
              <el-button type="text" v-if="(state.isBuyer==='true')&&(item.receStatus===constantData.FORACCEPT)" @click.native.prevent="acceptBill">签收账款</el-button>
            </el-col>
          </el-row>
        </div>
      </template>
    </el-tab-pane>
    <el-tab-pane label="待发货" name="fourth">
      <template v-for="(item,index) in allOrder" v-if="item.receStatus===constantData.ACCEPTED"><!--承兑已签收4-->
        <div class="box-card mycard">
          <el-row class="row-black row-padding">
            <el-col :span="8">订单编号：{{item.orderNo}}</el-col>
            <el-col :span="8">创建时间：{{item.orderGenerateTime | timeTransfer}}</el-col>
            <el-col :span="8" v-if="state.isBuyer==='true'">卖家：{{item.payerCompanyName}}</el-col>
            <el-col :span="8" v-else>买家：{{item.payeeCompanyName}}</el-col>
          </el-row>
          <el-row style="border-top: 1px solid #fff">
            <el-col :span="6" style="border-right: 1px solid #fff">
              <el-col :span="24">货品名称：{{item.productName}}</el-col>
              <el-col :span="24">货品数量：{{item.productQuantity}}</el-col>
            </el-col>
            <el-col :span="6" style="border-right: 1px solid #fff">
              <el-col :span="24">订单金额：{{item.productTotalPrice}}</el-col>
              <el-col :span="24">付款方式：{{item.payingMethod | payingMethod}}</el-col>
            </el-col>
            <el-col :span="6" style="border-right: 1px solid #fff">
              <el-col :span="24">交易状态：{{item.transactionStatus | transactionStatus}}</el-col>
              <el-col :span="24">账款状态：{{item.receStatus | receStatus}}</el-col>
              <el-col :span="24">仓储状态：{{item.repoStatus | repoStatus}}</el-col>
              <el-col :span="24">物流状态：{{item.wayBillStatus | wayBillStatus}}</el-col>
            </el-col>
            <el-col :span="6">
              <el-button type="text" @click.native.prevent="checkDetail(item.orderNo)">查看详情</el-button>
              <el-button type="text" v-if="(state.isBuyer==='false')&&(item.transactionStatus===constantData.UNCONFIRMED)" @click.native.prevent="confirmOrder(item.orderNo)">确认订单</el-button>
              <el-button type="text" v-if="(state.isBuyer==='false')&&(item.transactionStatus===constantData.CONFIRMED)" @click.native.prevent="signBill">签发应收账款</el-button>
              <el-button type="text" v-if="(state.isBuyer==='false')&&(item.receStatus===constantData.ACCEPTED)" @click.native.prevent="sendGood">发货</el-button>
              <el-button type="text" v-if="(state.isBuyer==='true')&&(item.receStatus===constantData.FORACCEPT)" @click.native.prevent="acceptBill">签收账款</el-button>
            </el-col>
          </el-row>
        </div>
      </template>
    </el-tab-pane>
    <el-tab-pane label="待收货" name="fifth">
      <template v-for="(item,index) in allOrder" v-if="item.wayBillStatus===constantData.SENDED"><!--已发货1-->
        <div class="box-card mycard">
          <el-row class="row-black row-padding">
            <el-col :span="8">订单编号：{{item.orderNo}}</el-col>
            <el-col :span="8">创建时间：{{item.orderGenerateTime | timeTransfer}}</el-col>
            <el-col :span="8" v-if="state.isBuyer==='true'">卖家：{{item.payerCompanyName}}</el-col>
            <el-col :span="8" v-else>买家：{{item.payeeCompanyName}}</el-col>
          </el-row>
          <el-row style="border-top: 1px solid #fff">
            <el-col :span="6" style="border-right: 1px solid #fff">
              <el-col :span="24">货品名称：{{item.productName}}</el-col>
              <el-col :span="24">货品数量：{{item.productQuantity}}</el-col>
            </el-col>
            <el-col :span="6" style="border-right: 1px solid #fff">
              <el-col :span="24">订单金额：{{item.productTotalPrice}}</el-col>
              <el-col :span="24">付款方式：{{item.payingMethod | payingMethod}}</el-col>
            </el-col>
            <el-col :span="6" style="border-right: 1px solid #fff">
              <el-col :span="24">交易状态：{{item.transactionStatus | transactionStatus}}</el-col>
              <el-col :span="24">账款状态：{{item.receStatus | receStatus}}</el-col>
              <el-col :span="24">仓储状态：{{item.repoStatus | repoStatus}}</el-col>
              <el-col :span="24">物流状态：{{item.wayBillStatus | wayBillStatus}}</el-col>
            </el-col>
            <el-col :span="6">
              <el-button type="text" @click.native.prevent="checkDetail(item.orderNo)">查看详情</el-button>
              <el-button type="text" v-if="(state.isBuyer==='false')&&(item.transactionStatus===constantData.UNCONFIRMED)" @click.native.prevent="confirmOrder(item.orderNo)">确认订单</el-button>
              <el-button type="text" v-if="(state.isBuyer==='false')&&(item.transactionStatus===constantData.CONFIRMED)" @click.native.prevent="signBill">签发应收账款</el-button>
              <el-button type="text" v-if="(state.isBuyer==='false')&&(item.receStatus===constantData.ACCEPTED)" @click.native.prevent="sendGood">发货</el-button>
              <el-button type="text" v-if="(state.isBuyer==='true')&&(item.receStatus===constantData.FORACCEPT)" @click.native.prevent="acceptBill">签收账款</el-button>
            </el-col>
          </el-row>
        </div>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import store from '../../vuex/store.js'
  import constantData from '../../../../common/const'
  export default {
    name:'index',
    data () {
      return {
//          activeName:'first',
        allOrder:[{
          orderNo: "20170403123456",
          orderGenerateTime: '2017-04-03 10:29:11',
          payeeAccount:'',
          productName: '卡纸',
          totalPrice: '20,000',
          productNum: '1,000',
          payingMethod: '应收账款支付',
        }
        ]
      }
    },
    computed: {
      state () {
          return store.state;
      },
      constantData () {
          return constantData;
      },
      activeName () {
        if(store.state.isBuyer==='false'){
          return store.state.orderTab;}
        else {
          return "first";
        }
      }
    },
    methods: {
      handleClick () {
        console.log("查看");
      },
      checkDetail (orderNo) {
//          store.state.checkId=orderNo;
        store.commit('setCheckId',orderNo);
          console.log(store.state.checkId);
          this.$router.push("/order/orderDetail");
      },
      confirmOrder (orderNo) {
          console.log("确认订单！");
          store.commit('setCheckId',orderNo);
          this.$router.push("/order/confirmOrder");
      },
      signBill () {
        console.log("签发应收账款");
      },
      sendGood () {
        console.log("发货");
      },
      acceptBill () {
        console.log("签收账款");
      }
    },
    mounted () {
      console.log(this.activeName);
      var tempRole;
      switch(store.state.isBuyer){
        case "true":tempRole=0;break;/*0表示买方*/
        case "false":tempRole=1;break;
        default:break;
      }
        this.$http.get("/v1/order/order_list/"+tempRole).then(function(res){
            console.log("获取到的所有订单: "+res.body);
            this.allOrder=res.body.data;
        },
        function(err){
            console.log(err);
        }
        );
    },
  }
</script>
<style>
  .mycard {width:90% !important;float:inherit !important;margin:10px auto !important;background-color: rgba(242,242,242,1)}
  .mycard .el-row {margin-bottom: 0 !important;display: -webkit-flex;
    flex-flow: row wrap;
    -webkit-flex-flow: row wrap;
    justify-content: flex-start;
    -webkit-justify-content: flex-start;}
  .mycard .el-col {text-align: center;box-sizing: border-box;padding:5px 0;}
  .row-black {background-color: rgba(215,215,215,1);}
  .row-padding {box-sizing: border-box;padding-top: 10px;padding-bottom: 10px;}
  .btn-vertical {margin-top: 10px;}
</style>
