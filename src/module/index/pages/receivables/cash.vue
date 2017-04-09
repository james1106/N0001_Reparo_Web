<template>
  <div>
  <el-table :data="dataList" stripe="" style="width:100%">
      <el-table-column prop="yewubianhao" label="业务编号" style="width:25%"></el-table-column>
      <el-table-column prop="yewuleixing" label="业务类型" style="width:25%"></el-table-column>
      <el-table-column prop="jiaoyiduishou" label="交易对手" style="width:25%"></el-table-column>
      <el-table-column prop="jine" label="金额" style="width:25%"></el-table-column>
      <el-table-column prop="caozuo" label="操作" style="width:25%">
        <template scope="scope"><el-button @click="handleClick" type="text">立即收货</el-button></template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    name:'duifu',
    created: function () {
      this.$http.get('/api/getList').then((data) => {
          console.log(data);
      },(err) => {
        console.log(err);
      })
    },
    data () {
      return {
        dataList:[
          {
            yewubianhao:"20170403123456",
            yewuleixing:"待承兑",
            jiaoyiduishou:"A企业",
            jine:"20，000"
          },
          {
            yewubianhao:"20170403123456",
            yewuleixing:"待承兑",
            jiaoyiduishou:"B企业",
            jine:"20，000"
          },
          {
            yewubianhao:"20170403123456",
            yewuleixing:"待承兑",
            jiaoyiduishou:"A企业",
            jine:"20，000"
          },
          {
            yewubianhao:"20170403123456",
            yewuleixing:"待承兑",
            jiaoyiduishou:"C企业",
            jine:"20，000"
          }
        ]
      }
    },
    methods:{
       handleClick () {
        console.log("查看");
      }
    }
  }
</script>
