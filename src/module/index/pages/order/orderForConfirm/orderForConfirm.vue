<template>
    <el-table :data="orderForConfirm" stripe="" style="width:100%" class="orderForConfirm">
      <el-table-column prop="yewubianhao" label="业务编号" style="width:25%"></el-table-column>
      <el-table-column prop="yewuleixing" label="业务类型" style="width:25%"></el-table-column>
      <el-table-column prop="jiaoyiduishou" label="交易对手" style="width:25%"></el-table-column>
      <el-table-column prop="jine" label="金额" style="width:25%"></el-table-column>
      <el-table-column prop="caozuo" label="操作" style="width:25%">
        <template scope="scope"><router-link to="/orderForConfirm/orderConfirm">立即确认</router-link></template>
      </el-table-column>
    </el-table>
</template>
<script>
  export default {
    name:'index',
    data () {
      return {
        orderForConfirm:[
          {
            yewubianhao:"20170403123456",
            yewuleixing:"订单待确认",
            jiaoyiduishou:"A企业",
            jine:"20，000"
          },
          {
            yewubianhao:"20170403123456",
            yewuleixing:"订单待确认",
            jiaoyiduishou:"B企业",
            jine:"20，000"
          },
          {
            yewubianhao:"20170403123456",
            yewuleixing:"订单待确认",
            jiaoyiduishou:"A企业",
            jine:"20，000"
          },
          {
            yewubianhao:"20170403123456",
            yewuleixing:"订单待确认",
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
<style>
  .orderForConfirm th {background-color: #fff !important;}
  .orderForConfirm .cell {background-color: transparent !important;}
</style>
