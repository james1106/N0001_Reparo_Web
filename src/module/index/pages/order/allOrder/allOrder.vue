<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="所有订单" name="first">
      <el-table :data="allOrder" stripe="" style="width:100%">
        <el-table-column prop="orderId" label="业务编号" style="width:25%"></el-table-column>
        <el-table-column prop="orderState" label="业务类型" style="width:25%"></el-table-column>
        <el-table-column prop="jiaoyiduishou" label="交易对手" style="width:25%"></el-table-column>
        <el-table-column prop="jine" label="金额" style="width:25%"></el-table-column>
        <el-table-column prop="caozuo" label="操作" style="width:25%">
          <template scope="scope"><router-link to="/allOrder/orderDetail">查看详情</router-link></template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="待确认" name="second">

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
        suoyou:[
          {
            yewubianhao:"20170403123456",
            yewuleixing:"应收承兑确认",
            jiaoyiduishou:"A企业",
            jine:"20，000"
          },
          {
            yewubianhao:"20170403123456",
            yewuleixing:"待确认",
            jiaoyiduishou:"B企业",
            jine:"20，000"
          },
          {
            yewubianhao:"20170403123456",
            yewuleixing:"等待发货",
            jiaoyiduishou:"A企业",
            jine:"20，000"
          },
          {
            yewubianhao:"20170403123456",
            yewuleixing:"等待发货",
            jiaoyiduishou:"C企业",
            jine:"20，000"
          },
        ]
      }
    },
    methods: {
      handleClick () {
        console.log("查看");
      }
    }
  }
</script>
