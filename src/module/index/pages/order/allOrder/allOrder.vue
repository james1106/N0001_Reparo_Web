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
            <el-col :span="8">订单编号：{{item.orderId}}</el-col>
            <el-col :span="8">创建时间：{{item.timeStamp}}</el-col>
            <el-col :span="8">卖家：{{item.payeeAccount}}</el-col>
          </el-row>
          <el-row class="">
            <el-col :span="6" style="border-right: 1px solid #fff">
              <el-col :span="24">货品名称：{{item.productName}}</el-col>
              <el-col :span="24">货品数量：{{item.productNum}}</el-col>
            </el-col>
            <el-col :span="6" style="border-right: 1px solid #fff">
              <el-col :span="24">订单金额：{{item.totalPrice}}</el-col>
              <el-col :span="24">付款方式：{{item.payingMethod}}</el-col>
            </el-col>
            <el-col :span="6" style="border-right: 1px solid #fff">
              <el-col :span="24">交易状态：{{item.orderState.transactionState}}</el-col>
              <el-col :span="24">账款状态：{{item.orderState.billState}}</el-col>
              <el-col :span="24">仓储状态：{{item.orderState.storageState}}</el-col>
              <el-col :span="24">物流状态：{{item.orderState.logisticState}}</el-col>
            </el-col>
            <el-col :span="6">
                <el-button type="text" @click.native.prevent="checkDetail(item.orderId)">查看详情</el-button>
                <el-button type="text" v-if="(state.changeRole==='pyee')&&(item.orderState.transactionState==='待确认')" @click.native.prevent="confirmOrder">确认订单</el-button>
                <el-button type="text" v-if="(state.changeRole==='pyee')&&(item.orderState.billState==='待签发')" @click.native.prevent="signBill">签发</el-button>
                <el-button type="text" v-if="(state.changeRole==='pyee')&&(item.orderState.billState==='承兑已签收')" @click.native.prevent="sendGood">发货</el-button>
                <el-button type="text" v-if="(state.changeRole==='pyer')&&(item.orderState.billState==='承兑待签收')" @click.native.prevent="acceptBill">承兑签收</el-button>
            </el-col>
          </el-row>
        </div>
      </template>
    </el-tab-pane>
    <el-tab-pane label="待确认" name="second">
      <template v-for="(item,index) in allOrder" v-if="item.orderState.transactionState==='待确认'">
        <div class="box-card mycard">
          <el-row class="row-black row-padding">
            <el-col :span="8">订单编号：{{item.orderId}}</el-col>
            <el-col :span="8">创建时间：{{item.timeStamp}}</el-col>
            <el-col :span="8">卖家：{{item.payeeAccount}}</el-col>
          </el-row>
          <el-row class="">
            <el-col :span="6" style="border-right: 1px solid #fff">
              <el-col :span="24">货品名称：{{item.productName}}</el-col>
              <el-col :span="24">货品数量：{{item.productNum}}</el-col>
            </el-col>
            <el-col :span="6" style="border-right: 1px solid #fff">
              <el-col :span="24">订单金额：{{item.totalPrice}}</el-col>
              <el-col :span="24">付款方式：{{item.payingMethod}}</el-col>
            </el-col>
            <el-col :span="6" style="border-right: 1px solid #fff">
              <el-col :span="24">交易状态：{{item.orderState.transactionState}}</el-col>
              <el-col :span="24">账款状态：{{item.orderState.billState}}</el-col>
              <el-col :span="24">仓储状态：{{item.orderState.storageState}}</el-col>
              <el-col :span="24">物流状态：{{item.orderState.logisticState}}</el-col>
            </el-col>
            <el-col :span="6">
              <el-button type="text" @click.native.prevent="checkDetail(item.orderId)">查看详情</el-button>
              <el-button type="text" v-if="(state.changeRole==='pyee')&&(item.orderState.transactionState==='待确认')" @click.native.prevent="confirmOrder">确认订单</el-button>
              <el-button type="text" v-if="(state.changeRole==='pyee')&&(item.orderState.billState==='待签发')" @click.native.prevent="signBill">签发</el-button>
              <el-button type="text" v-if="(state.changeRole==='pyee')&&(item.orderState.billState==='承兑已签收')" @click.native.prevent="sendGood">发货</el-button>
              <el-button type="text" v-if="(state.changeRole==='pyer')&&(item.orderState.billState==='承兑待签收')" @click.native.prevent="acceptBill">承兑签收</el-button>
            </el-col>
          </el-row>
        </div>
      </template>
    </el-tab-pane>
    <el-tab-pane label="待付款" name="third">
      <template v-for="(item,index) in allOrder" v-if="(item.orderState.billState==='承兑待签收')||(item.orderState.billState==='待签发')">
        <div class="box-card mycard">
          <el-row class="row-black row-padding">
            <el-col :span="8">订单编号：{{item.orderId}}</el-col>
            <el-col :span="8">创建时间：{{item.timeStamp}}</el-col>
            <el-col :span="8">卖家：{{item.payeeAccount}}</el-col>
          </el-row>
          <el-row class="">
            <el-col :span="6" style="border-right: 1px solid #fff">
              <el-col :span="24">货品名称：{{item.productName}}</el-col>
              <el-col :span="24">货品数量：{{item.productNum}}</el-col>
            </el-col>
            <el-col :span="6" style="border-right: 1px solid #fff">
              <el-col :span="24">订单金额：{{item.totalPrice}}</el-col>
              <el-col :span="24">付款方式：{{item.payingMethod}}</el-col>
            </el-col>
            <el-col :span="6" style="border-right: 1px solid #fff">
              <el-col :span="24">交易状态：{{item.orderState.transactionState}}</el-col>
              <el-col :span="24">账款状态：{{item.orderState.billState}}</el-col>
              <el-col :span="24">仓储状态：{{item.orderState.storageState}}</el-col>
              <el-col :span="24">物流状态：{{item.orderState.logisticState}}</el-col>
            </el-col>
            <el-col :span="6">
              <el-button type="text" @click.native.prevent="checkDetail(item.orderId)">查看详情</el-button>
              <el-button type="text" v-if="(state.changeRole==='pyee')&&(item.orderState.transactionState==='待确认')" @click.native.prevent="confirmOrder">确认订单</el-button>
              <el-button type="text" v-if="(state.changeRole==='pyee')&&(item.orderState.billState==='待签发')" @click.native.prevent="signBill">签发</el-button>
              <el-button type="text" v-if="(state.changeRole==='pyee')&&(item.orderState.billState==='承兑已签收')" @click.native.prevent="sendGood">发货</el-button>
              <el-button type="text" v-if="(state.changeRole==='pyer')&&(item.orderState.billState==='承兑待签收')" @click.native.prevent="acceptBill">承兑签收</el-button>
            </el-col>
          </el-row>
        </div>
      </template>
    </el-tab-pane>
    <el-tab-pane label="待发货" name="fourth">
      <template v-for="(item,index) in allOrder" v-if="item.orderState.billState==='承兑已签收'">
        <div class="box-card mycard">
          <el-row class="row-black row-padding">
            <el-col :span="8">订单编号：{{item.orderId}}</el-col>
            <el-col :span="8">创建时间：{{item.timeStamp}}</el-col>
            <el-col :span="8">卖家：{{item.payeeAccount}}</el-col>
          </el-row>
          <el-row class="">
            <el-col :span="6" style="border-right: 1px solid #fff">
              <el-col :span="24">货品名称：{{item.productName}}</el-col>
              <el-col :span="24">货品数量：{{item.productNum}}</el-col>
            </el-col>
            <el-col :span="6" style="border-right: 1px solid #fff">
              <el-col :span="24">订单金额：{{item.totalPrice}}</el-col>
              <el-col :span="24">付款方式：{{item.payingMethod}}</el-col>
            </el-col>
            <el-col :span="6" style="border-right: 1px solid #fff">
              <el-col :span="24">交易状态：{{item.orderState.transactionState}}</el-col>
              <el-col :span="24">账款状态：{{item.orderState.billState}}</el-col>
              <el-col :span="24">仓储状态：{{item.orderState.storageState}}</el-col>
              <el-col :span="24">物流状态：{{item.orderState.logisticState}}</el-col>
            </el-col>
            <el-col :span="6">
              <el-button type="text" @click.native.prevent="checkDetail(item.orderId)">查看详情</el-button>
              <el-button type="text" v-if="(state.changeRole==='pyee')&&(item.orderState.transactionState==='待确认')" @click.native.prevent="confirmOrder">确认订单</el-button>
              <el-button type="text" v-if="(state.changeRole==='pyee')&&(item.orderState.billState==='待签发')" @click.native.prevent="signBill">签发</el-button>
              <el-button type="text" v-if="(state.changeRole==='pyee')&&(item.orderState.billState==='承兑已签收')" @click.native.prevent="sendGood">发货</el-button>
              <el-button type="text" v-if="(state.changeRole==='pyer')&&(item.orderState.billState==='承兑待签收')" @click.native.prevent="acceptBill">承兑签收</el-button>
            </el-col>
          </el-row>
        </div>
      </template>
    </el-tab-pane>
    <el-tab-pane label="待收货" name="fifth">
      <template v-for="(item,index) in allOrder" v-if="item.orderState.logisticState==='已发货'">
        <div class="box-card mycard">
          <el-row class="row-black row-padding">
            <el-col :span="8">订单编号：{{item.orderId}}</el-col>
            <el-col :span="8">创建时间：{{item.timeStamp}}</el-col>
            <el-col :span="8">卖家：{{item.payeeAccount}}</el-col>
          </el-row>
          <el-row class="">
            <el-col :span="6" style="border-right: 1px solid #fff">
              <el-col :span="24">货品名称：{{item.productName}}</el-col>
              <el-col :span="24">货品数量：{{item.productNum}}</el-col>
            </el-col>
            <el-col :span="6" style="border-right: 1px solid #fff">
              <el-col :span="24">订单金额：{{item.totalPrice}}</el-col>
              <el-col :span="24">付款方式：{{item.payingMethod}}</el-col>
            </el-col>
            <el-col :span="6" style="border-right: 1px solid #fff">
              <el-col :span="24">交易状态：{{item.orderState.transactionState}}</el-col>
              <el-col :span="24">账款状态：{{item.orderState.billState}}</el-col>
              <el-col :span="24">仓储状态：{{item.orderState.storageState}}</el-col>
              <el-col :span="24">物流状态：{{item.orderState.logisticState}}</el-col>
            </el-col>
            <el-col :span="6">
              <el-button type="text" @click.native.prevent="checkDetail(item.orderId)">查看详情</el-button>
              <el-button type="text" v-if="(state.changeRole==='pyee')&&(item.orderState.transactionState==='待确认')" @click.native.prevent="confirmOrder">确认订单</el-button>
              <el-button type="text" v-if="(state.changeRole==='pyee')&&(item.orderState.billState==='待签发')" @click.native.prevent="signBill">签发</el-button>
              <el-button type="text" v-if="(state.changeRole==='pyee')&&(item.orderState.billState==='承兑已签收')" @click.native.prevent="sendGood">发货</el-button>
              <el-button type="text" v-if="(state.changeRole==='pyer')&&(item.orderState.billState==='承兑待签收')" @click.native.prevent="acceptBill">承兑签收</el-button>
            </el-col>
          </el-row>
        </div>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import store from '../../../vuex/store.js'
  export default {
    name:'index',
    data () {
      return {
          activeName:"first",
        allOrder:[{
          orderId: "20170403123456",
          timeStamp: '2017-04-03 10:29:11',
          payeeAccount:'',
          productName: '卡纸',
          totalPrice: '20,000',
          productNum: '1,000',
          payingMethod: '应收账款支付',
          orderState:{
              transactionState:'',
              billState:'',
              storageState:'',
              logisticState:'',
          }
        }
        ]
      }
    },
    computed: {
      state () {
          return store.state;
      }
    },
    methods: {
      handleClick () {
        console.log("查看");
      },
      checkDetail (orderId) {
//          store.state.checkId=orderId;
        store.commit('setCheckId',orderId);
          console.log(store.state.checkId);
          this.$router.push("allOrder/orderDetail");
      },
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
    mounted () {
        this.$http.get("http://172.16.100.246/server_test/getData1.php").then(function(res){
            console.log("获取到的所有订单: "+res.body);
            this.allOrder=res.body.object;
        },
        function(err){
            console.log(err);
        }
        );
    }
  }
</script>
<style>
  .mycard {width:90% !important;float:inherit !important;margin:10px auto !important;}
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
