<template>
  <div>
    <el-table :data="suoyou" stripe="" style="width:100%">
      <el-table-column prop="yewubianhao" label="业务编号" style="width:25%"></el-table-column>
      <el-table-column prop="yewuleixing" label="业务类型" style="width:25%"></el-table-column>
      <el-table-column prop="jiaoyiduishou" label="交易对手" style="width:25%"></el-table-column>
      <el-table-column prop="jine" label="金额" style="width:25%"></el-table-column>
      <el-table-column prop="caozuo" label="操作" style="width:25%">
        <template scope="scope"><router-link to="/forDeliver/deliver">立即发货</router-link></template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    name:'index',
    data () {
      return {
        suoyou:[
          {
            yewubianhao:"20170403123456",
            yewuleixing:"订单待发货",
            jiaoyiduishou:"A企业",
            jine:"20，000"
          },
          {
            yewubianhao:"20170403123456",
            yewuleixing:"订单待发货",
            jiaoyiduishou:"B企业",
            jine:"20，000"
          },
          {
            yewubianhao:"20170403123456",
            yewuleixing:"订单待发货",
            jiaoyiduishou:"A企业",
            jine:"20，000"
          },
          {
            yewubianhao:"20170403123456",
            yewuleixing:"订单待发货",
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
