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
            <el-col :span="8">创建时间：{{item.orderGenerateTime}}</el-col>
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
              <el-col :span="24">交易状态：{{item.txState}}</el-col>
              <el-col :span="24">账款状态：{{item.receState}}</el-col>
              <el-col :span="24">仓储状态：{{item.repoCertState}}</el-col>
              <el-col :span="24">物流状态：{{item.wayBillState}}</el-col>
            </el-col>
            <el-col :span="6">
                <el-button type="text" @click.native.prevent="checkDetail(item.orderNo)">查看详情</el-button>
                <el-button type="text" v-if="(state.changeRole==='pyee')&&(item.txState==='待确认')" @click.native.prevent="confirmOrder">确认订单</el-button>
                <el-button type="text" v-if="(state.changeRole==='pyee')&&(item.receState==='待签发')" @click.native.prevent="signBill">签发</el-button>
                <el-button type="text" v-if="(state.changeRole==='pyee')&&(item.receState==='承兑已签收')" @click.native.prevent="sendGood">发货</el-button>
                <el-button type="text" v-if="(state.changeRole==='pyer')&&(item.receState==='承兑待签收')" @click.native.prevent="acceptBill">签收账款</el-button>
            </el-col>
          </el-row>
        </div>
      </template>
    </el-tab-pane>
    <el-tab-pane label="待确认" name="second">
      <template v-for="(item,index) in allOrder" v-if="item.txState==='待确认'">
        <div class="box-card mycard">
          <el-row class="row-black row-padding">
            <el-col :span="8">订单编号：{{item.orderNo}}</el-col>
            <el-col :span="8">创建时间：{{item.orderGenerateTime}}</el-col>
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
              <el-col :span="24">交易状态：{{item.txState}}</el-col>
              <el-col :span="24">账款状态：{{item.receState}}</el-col>
              <el-col :span="24">仓储状态：{{item.repoCertState}}</el-col>
              <el-col :span="24">物流状态：{{item.wayBillState}}</el-col>
            </el-col>
            <el-col :span="6">
              <el-button type="text" @click.native.prevent="checkDetail(item.orderNo)">查看详情</el-button>
              <el-button type="text" v-if="(state.changeRole==='pyee')&&(item.txState==='待确认')" @click.native.prevent="confirmOrder">确认订单</el-button>
              <el-button type="text" v-if="(state.changeRole==='pyee')&&(item.receState==='待签发')" @click.native.prevent="signBill">签发</el-button>
              <el-button type="text" v-if="(state.changeRole==='pyee')&&(item.receState==='承兑已签收')" @click.native.prevent="sendGood">发货</el-button>
              <el-button type="text" v-if="(state.changeRole==='pyer')&&(item.receState==='承兑待签收')" @click.native.prevent="acceptBill">签收账款</el-button>
            </el-col>
          </el-row>
        </div>
      </template>
    </el-tab-pane>
    <el-tab-pane label="待付款" name="third">
      <template v-for="(item,index) in allOrder" v-if="(item.receState==='承兑待签收')||(item.receState==='待签发')">
        <div class="box-card mycard">
          <el-row class="row-black row-padding">
            <el-col :span="8">订单编号：{{item.orderNo}}</el-col>
            <el-col :span="8">创建时间：{{item.orderGenerateTime}}</el-col>
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
              <el-col :span="24">交易状态：{{item.txState}}</el-col>
              <el-col :span="24">账款状态：{{item.receState}}</el-col>
              <el-col :span="24">仓储状态：{{item.repoCertState}}</el-col>
              <el-col :span="24">物流状态：{{item.wayBillState}}</el-col>
            </el-col>
            <el-col :span="6">
              <el-button type="text" @click.native.prevent="checkDetail(item.orderNo)">查看详情</el-button>
              <el-button type="text" v-if="(state.changeRole==='pyee')&&(item.txState==='待确认')" @click.native.prevent="confirmOrder">确认订单</el-button>
              <el-button type="text" v-if="(state.changeRole==='pyee')&&(item.receState==='待签发')" @click.native.prevent="signBill">签发</el-button>
              <el-button type="text" v-if="(state.changeRole==='pyee')&&(item.receState==='承兑已签收')" @click.native.prevent="sendGood">发货</el-button>
              <el-button type="text" v-if="(state.changeRole==='pyer')&&(item.receState==='承兑待签收')" @click.native.prevent="acceptBill">签收账款</el-button>
            </el-col>
          </el-row>
        </div>
      </template>
    </el-tab-pane>
    <el-tab-pane label="待发货" name="fourth">
      <template v-for="(item,index) in allOrder" v-if="item.receState==='承兑已签收'">
        <div class="box-card mycard">
          <el-row class="row-black row-padding">
            <el-col :span="8">订单编号：{{item.orderNo}}</el-col>
            <el-col :span="8">创建时间：{{item.orderGenerateTime}}</el-col>
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
              <el-col :span="24">交易状态：{{item.txState}}</el-col>
              <el-col :span="24">账款状态：{{item.receState}}</el-col>
              <el-col :span="24">仓储状态：{{item.repoCertState}}</el-col>
              <el-col :span="24">物流状态：{{item.wayBillState}}</el-col>
            </el-col>
            <el-col :span="6">
              <el-button type="text" @click.native.prevent="checkDetail(item.orderNo)">查看详情</el-button>
              <el-button type="text" v-if="(state.changeRole==='pyee')&&(item.txState==='待确认')" @click.native.prevent="confirmOrder">确认订单</el-button>
              <el-button type="text" v-if="(state.changeRole==='pyee')&&(item.receState==='待签发')" @click.native.prevent="signBill">签发</el-button>
              <el-button type="text" v-if="(state.changeRole==='pyee')&&(item.receState==='承兑已签收')" @click.native.prevent="sendGood">发货</el-button>
              <el-button type="text" v-if="(state.changeRole==='pyer')&&(item.receState==='承兑待签收')" @click.native.prevent="acceptBill">签收账款</el-button>
            </el-col>
          </el-row>
        </div>
      </template>
    </el-tab-pane>
    <el-tab-pane label="待收货" name="fifth">
      <template v-for="(item,index) in allOrder" v-if="item.wayBillState==='已发货'">
        <div class="box-card mycard">
          <el-row class="row-black row-padding">
            <el-col :span="8">订单编号：{{item.orderNo}}</el-col>
            <el-col :span="8">创建时间：{{item.orderGenerateTime}}</el-col>
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
              <el-col :span="24">交易状态：{{item.txState}}</el-col>
              <el-col :span="24">账款状态：{{item.receState}}</el-col>
              <el-col :span="24">仓储状态：{{item.repoCertState}}</el-col>
              <el-col :span="24">物流状态：{{item.wayBillState}}</el-col>
            </el-col>
            <el-col :span="6">
              <el-button type="text" @click.native.prevent="checkDetail(item.orderNo)">查看详情</el-button>
              <el-button type="text" v-if="(state.changeRole==='pyee')&&(item.txState==='待确认')" @click.native.prevent="confirmOrder">确认订单</el-button>
              <el-button type="text" v-if="(state.changeRole==='pyee')&&(item.receState==='待签发')" @click.native.prevent="signBill">签发</el-button>
              <el-button type="text" v-if="(state.changeRole==='pyee')&&(item.receState==='承兑已签收')" @click.native.prevent="sendGood">发货</el-button>
              <el-button type="text" v-if="(state.changeRole==='pyer')&&(item.receState==='承兑待签收')" @click.native.prevent="acceptBill">签收账款</el-button>
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
        console.log("签收账款");
      }
    },
    mounted () {
        this.$http.get("http://172.16.100.246/server_test/getData1.php").then(function(res){
            console.log("获取到的所有订单: "+res.body);
            this.allOrder=res.body.data;
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
