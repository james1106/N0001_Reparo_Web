<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="所有订单" name="first">
      <!--<el-table :data="allOrder" stripe="" style="width:100%">
        <el-table-column prop="orderId" label="业务编号" style="width:25%"></el-table-column>
        <el-table-column prop="orderState" label="业务类型" style="width:25%"></el-table-column>
        <el-table-column prop="opponentParty" label="交易对手" style="width:25%"></el-table-column>
        <el-table-column prop="totalPrice" label="金额" style="width:25%"></el-table-column>
        <el-table-column prop="operation" label="操作" style="width:25%">
          <template scope="scope"><router-link to="/allOrder/orderDetail">查看详情</router-link></template>
        </el-table-column>
      </el-table>-->
      <template v-for="(item,index) in allOrder">
        <div class="box-card mycard">
          <el-row class="row-black row-padding">
            <el-col :span="8">订单编号：{{item.orderId}}</el-col>
            <el-col :span="8">创建时间：{{item.timeStamp}}</el-col>
            <el-col :span="8">状态：{{item.orderState}}</el-col>
          </el-row>
          <el-row class="row-padding">
            <el-col :span="16">
              <el-row>
                <el-col :span="12">货品名称：{{item.productName}}</el-col>
                <el-col :span="12">订单金额：{{item.totalPrice}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="12">货品数量：{{item.productNum}}</el-col>
                <el-col :span="12">付款方式：{{item.payingMethod}}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8" class="btn-vertical" @click.native.prevent="checkDetail(item.orderId)"><el-button type="primary">查看详情</el-button></el-col>
          </el-row>
        </div>
      </template>
    </el-tab-pane>
    <el-tab-pane label="待确认" name="second">
      <template v-for="(item,index) in allOrder" v-if="item.orderState==='待确认'">
        <div class="box-card mycard">
          <el-row class="row-black row-padding">
            <el-col :span="8">订单编号：{{item.orderId}}</el-col>
            <el-col :span="8">创建时间：{{item.timeStamp}}</el-col>
            <el-col :span="8">状态：{{item.orderState}}</el-col>
          </el-row>
          <el-row class="row-padding">
            <el-col :span="16">
              <el-row>
                <el-col :span="12">货品名称：{{item.productName}}</el-col>
                <el-col :span="12">订单金额：{{item.totalPrice}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="12">货品数量：{{item.productNum}}</el-col>
                <el-col :span="12">付款方式：{{item.payingMethod}}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8" class="btn-vertical"><el-button type="primary">查看详情</el-button></el-col>
          </el-row>
        </div>
      </template>
    </el-tab-pane>
    <el-tab-pane label="待发货" name="third">
      <template v-for="(item,index) in allOrder" v-if="item.orderState==='待发货'">
        <div class="box-card mycard">
          <el-row class="row-black row-padding">
            <el-col :span="8">订单编号：{{item.orderId}}</el-col>
            <el-col :span="8">创建时间：{{item.timeStamp}}</el-col>
            <el-col :span="8">状态：{{item.orderState}}</el-col>
          </el-row>
          <el-row class="row-padding">
            <el-col :span="16">
              <el-row>
                <el-col :span="12">货品名称：{{item.productName}}</el-col>
                <el-col :span="12">订单金额：{{item.totalPrice}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="12">货品数量：{{item.productNum}}</el-col>
                <el-col :span="12">付款方式：{{item.payingMethod}}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8" class="btn-vertical"><el-button type="primary">查看详情</el-button></el-col>
          </el-row>
        </div>
      </template>
    </el-tab-pane>
    <el-tab-pane label="待收货" name="fourth">
      <template v-for="(item,index) in allOrder" v-if="item.orderState==='待收货'">
        <div class="box-card mycard">
          <el-row class="row-black row-padding">
            <el-col :span="8">订单编号：{{item.orderId}}</el-col>
            <el-col :span="8">创建时间：{{item.timeStamp}}</el-col>
            <el-col :span="8">状态：{{item.orderState}}</el-col>
          </el-row>
          <el-row class="row-padding">
            <el-col :span="16">
              <el-row>
                <el-col :span="12">货品名称：{{item.productName}}</el-col>
                <el-col :span="12">订单金额：{{item.totalPrice}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="12">货品数量：{{item.productNum}}</el-col>
                <el-col :span="12">付款方式：{{item.payingMethod}}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8" class="btn-vertical"><el-button type="primary">查看详情</el-button></el-col>
          </el-row>
        </div>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import store from '../../../store.js'
  export default {
    name:'index',
    data () {
      return {
          activeName:"first",
        allOrder:[{
          orderId: "20170403123456",
          timeStamp: '2017-04-03 10:29:11',
          orderState: '待确认',
          productName: '卡纸',
          totalPrice: '20,000',
          productNum: '1,000',
          payingMethod: '应收账款支付'
        }
        ]
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
  .mycard .el-col {text-align: center;}
  .row-black {background-color: rgba(215,215,215,1);}
  .row-padding {box-sizing: border-box;padding-top: 10px;padding-bottom: 10px;}
  .btn-vertical {margin-top: 10px;}
</style>
