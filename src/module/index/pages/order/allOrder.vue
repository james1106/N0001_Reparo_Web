<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="所有订单" name="first">
      <el-row class="el-row-header" style="background-color: rgb(229,241,245)">
        <el-col :span="6" style="margin-left: 20px">货品信息</el-col>
        <el-col :span="6">付款信息</el-col>
        <el-col :span="8">订单状态</el-col>
        <el-col :span="2">操作</el-col>
      </el-row>
      <template v-for="(item,index) in allOrder">
        <div>
          <el-row class="dataTable">
            <el-row class="el-row-header">
              <el-col :span="6" style="margin-left: 19px;">订单编号：{{item.orderNo}}</el-col>
              <el-col :span="6">创建时间：{{item.orderGenerateTime | timeTransfer}}</el-col>
              <el-col :span="8" v-if="state.isBuyer==='true'">卖家：{{item.payeeAddress}}</el-col>
              <el-col :span="8" v-else>买家：{{item.payerAddress}}</el-col>
              <el-col :span="2">操作</el-col>
            </el-row>
            <el-row class="el-row-content">
              <el-col :span="6" style="margin-left: 19px;">
                <el-row>货品名称：{{item.productName}}</el-row>
                <el-row>货品数量：{{item.productQuantity}}</el-row>
              </el-col>
              <el-col :span="6">
                <el-row>订单金额：{{item.productTotalPrice}}</el-row>
                <el-row>付款方式：{{item.payingMethod | payingMethod}}</el-row>
              </el-col>
              <el-col :span="2">
                <el-row>交易状态</el-row>
                <el-row>{{item.txState | transactionStatus}}</el-row>
              </el-col>
              <el-col :span="2">
                <el-row>账款状态</el-row>
                <el-row>{{item.receState | receStatus}}</el-row>
              </el-col>
              <el-col :span="2">
                <el-row>仓储状态</el-row>
                <el-row>{{item.repoCertState | repoStatus}}</el-row>
              </el-col>
              <el-col :span="2">
                <el-row>物流状态</el-row>
                <el-row>{{item.wayBillState | wayBillStatus}}</el-row>
              </el-col>
              <el-col :span="2">
                <el-button type="text" @click.native.prevent="checkDetail(item.orderNo)">查看详情</el-button>
                <el-button type="text" v-if="(state.isBuyer==='false')&&(item.txState===constantData.UNCONFIRMED)" @click.native.prevent="confirmOrder(item.orderNo)">确认订单</el-button>
                <el-button type="text" v-if="(state.isBuyer==='false')&&(item.receState===constantData.FORISSUE)" @click.native.prevent="signBill">签发</el-button>
                <el-button type="text" v-if="(state.isBuyer==='false')&&(item.receState===constantData.ACCEPTED)" @click.native.prevent="sendGood">发货</el-button>
                <el-button type="text" v-if="(state.isBuyer==='true')&&(item.receState===constantData.FORACCEPT)" @click.native.prevent="acceptBill">签收账款</el-button>
              </el-col>
            </el-row>
          </el-row>
        </div>
      </template>
    </el-tab-pane>
    <el-tab-pane label="待确认" name="second">
      <template v-for="(item,index) in allOrder" v-if="item.txState===constantData.UNCONFIRMED"><!--待确认 0-->
        <div class="box-card mycard">
          <el-row class="row-black row-padding">
            <el-col :span="8">订单编号：{{item.orderNo}}</el-col>
            <el-col :span="8">创建时间：{{item.orderGenerateTime | timeTransfer}}</el-col>
            <el-col :span="8" v-if="state.isBuyer==='true'">卖家：{{item.payeeAddress}}</el-col>
            <el-col :span="8" v-else>买家：{{item.payerAddress}}</el-col>
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
              <el-col :span="24">交易状态：{{item.txState | transactionStatus}}</el-col>
              <el-col :span="24">账款状态：{{item.receState | receStatus}}</el-col>
              <el-col :span="24">仓储状态：{{item.repoCertState | repoStatus}}</el-col>
              <el-col :span="24">物流状态：{{item.wayBillState | wayBillStatus}}</el-col>
            </el-col>
            <el-col :span="6">
              <el-button type="text" @click.native.prevent="checkDetail(item.orderNo)">查看详情</el-button>
              <el-button type="text" v-if="(state.isBuyer==='false')&&(item.txState===constantData.UNCONFIRMED)" @click.native.prevent="confirmOrder(item.orderNo)">确认订单</el-button>
              <el-button type="text" v-if="(state.isBuyer==='false')&&(item.receState===constantData.FORISSUE)" @click.native.prevent="signBill">签发</el-button>
              <el-button type="text" v-if="(state.isBuyer==='false')&&(item.receState===constantData.ACCEPTED)" @click.native.prevent="sendGood">发货</el-button>
              <el-button type="text" v-if="(state.isBuyer==='true')&&(item.receState===constantData.FORACCEPT)" @click.native.prevent="acceptBill">签收账款</el-button>
            </el-col>
          </el-row>
        </div>
      </template>
    </el-tab-pane>
    <el-tab-pane label="待发货" name="third">
      <template v-for="(item,index) in allOrder" v-if="item.receState===constantData.ACCEPTED"><!--承兑已签收4-->
        <div class="box-card mycard">
          <el-row class="row-black row-padding">
            <el-col :span="8">订单编号：{{item.orderNo}}</el-col>
            <el-col :span="8">创建时间：{{item.orderGenerateTime | timeTransfer}}</el-col>
            <el-col :span="8" v-if="state.isBuyer==='true'">卖家：{{item.payeeAddress}}</el-col>
            <el-col :span="8" v-else>买家：{{item.payerAddress}}</el-col>
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
              <el-col :span="24">交易状态：{{item.txState | transactionStatus}}</el-col>
              <el-col :span="24">账款状态：{{item.receState | receStatus}}</el-col>
              <el-col :span="24">仓储状态：{{item.repoCertState | repoStatus}}</el-col>
              <el-col :span="24">物流状态：{{item.wayBillState | wayBillStatus}}</el-col>
            </el-col>
            <el-col :span="6">
              <el-button type="text" @click.native.prevent="checkDetail(item.orderNo)">查看详情</el-button>
              <el-button type="text" v-if="(state.isBuyer==='false')&&(item.txState===constantData.UNCONFIRMED)" @click.native.prevent="confirmOrder(item.orderNo)">确认订单</el-button>
              <el-button type="text" v-if="(state.isBuyer==='false')&&(item.receState===constantData.FORISSUE)" @click.native.prevent="signBill">签发</el-button>
              <el-button type="text" v-if="(state.isBuyer==='false')&&(item.receState===constantData.ACCEPTED)" @click.native.prevent="sendGood">发货</el-button>
              <el-button type="text" v-if="(state.isBuyer==='true')&&(item.receState===constantData.FORACCEPT)" @click.native.prevent="acceptBill">签收账款</el-button>
            </el-col>
          </el-row>
        </div>
      </template>
    </el-tab-pane>
    <el-tab-pane label="待收货" name="fourth">
      <template v-for="(item,index) in allOrder" v-if="item.wayBillState===constantData.SENDED"><!--已发货1-->
        <div class="box-card mycard">
          <el-row class="row-black row-padding">
            <el-col :span="8">订单编号：{{item.orderNo}}</el-col>
            <el-col :span="8">创建时间：{{item.orderGenerateTime | timeTransfer}}</el-col>
            <el-col :span="8" v-if="state.isBuyer==='true'">卖家：{{item.payeeAddress}}</el-col>
            <el-col :span="8" v-else>买家：{{item.payerAddress}}</el-col>
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
              <el-col :span="24">交易状态：{{item.txState | transactionStatus}}</el-col>
              <el-col :span="24">账款状态：{{item.receState | receStatus}}</el-col>
              <el-col :span="24">仓储状态：{{item.repoCertState | repoStatus}}</el-col>
              <el-col :span="24">物流状态：{{item.wayBillState | wayBillStatus}}</el-col>
            </el-col>
            <el-col :span="6">
              <el-button type="text" @click.native.prevent="checkDetail(item.orderNo)">查看详情</el-button>
              <el-button type="text" v-if="(state.isBuyer==='false')&&(item.txState===constantData.UNCONFIRMED)" @click.native.prevent="confirmOrder(item.orderNo)">确认订单</el-button>
              <el-button type="text" v-if="(state.isBuyer==='false')&&(item.receState===constantData.FORISSUE)" @click.native.prevent="signBill">签发</el-button>
              <el-button type="text" v-if="(state.isBuyer==='false')&&(item.receState===constantData.ACCEPTED)" @click.native.prevent="sendGood">发货</el-button>
              <el-button type="text" v-if="(state.isBuyer==='true')&&(item.receState===constantData.FORACCEPT)" @click.native.prevent="acceptBill">签收账款</el-button>
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
  import '../../../../assets/css/style.css'
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
