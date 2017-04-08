<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="所有订单" name="first">
      <el-table :data="allOrder" stripe="" style="width:100%">
        <el-table-column prop="orderId" label="业务编号" style="width:25%"></el-table-column>
        <el-table-column prop="orderState" label="业务类型" style="width:25%"></el-table-column>
        <el-table-column prop="opponentParty" label="交易对手" style="width:25%"></el-table-column>
        <el-table-column prop="totalPrice" label="金额" style="width:25%"></el-table-column>
        <el-table-column prop="operation" label="操作" style="width:25%">
          <template scope="scope"><router-link to="/allOrder/orderDetail">查看详情</router-link></template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="待确认" name="second">
      <el-table :data="orderForConfirm" stripe="" style="width:100%">
        <el-table-column prop="orderId" label="业务编号" style="width:25%"></el-table-column>
        <el-table-column prop="orderState" label="业务类型" style="width:25%"></el-table-column>
        <el-table-column prop="opponentParty" label="交易对手" style="width:25%"></el-table-column>
        <el-table-column prop="totalPrice" label="金额" style="width:25%"></el-table-column>
        <el-table-column prop="operation" label="操作" style="width:25%">
          <template scope="scope"><router-link to="/allOrder/orderDetail"></router-link></template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="待发货" name="third">待发货</el-tab-pane>
    <el-tab-pane label="待收货" name="fourth">待收货</el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    name:'index',
    data () {
      return {
          activeName:"first",
        allOrder:[
          {
            orderId:"20170403123456",
            orderState:"应收承兑确认",
            opponentParty:"A企业",
            totalPrice:"20，000"
          }
        ]
      }
    },
    methods: {
      handleClick () {
        console.log("查看");
      }
    },
    mounted () {
        this.$http.get("/api/allOrder").then(function(res){
            console.log("获取到的所有订单: "+res.body);
            this.allOrder=res.body;
        },
        function(err){
            console.log(err);
        }
        );
    }
  }
</script>
