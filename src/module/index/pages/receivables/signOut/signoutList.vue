<template>
  <div id="signout">
    <el-table :data="data" stripe="" style="width:100%">
      <el-table-column prop="bianhao" label="订单编号" style="width:25%"></el-table-column>
      <el-table-column prop="shijian" label="创建时间" style="width:25%"></el-table-column>
      <el-table-column prop="zhuangtai" label="状态" style="width:25%"></el-table-column>
      <el-table-column prop="jine" label="金额" style="width:25%"></el-table-column>
      <el-table-column prop="caozuo" label="操作" style="width:25%">
        <template scope="scope"><router-link to="/signout/signout">查看详情</router-link></template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    name:'signout',
    data () {
      return {
        data:[
          {
            bianhao:"20170403123456",
            shijian:"2017-04-03 10:29:11",
            zhuangtai:"待签发",
            zhandan:"20，000",
            jine:"2000"
          },
          {
            bianhao:"20170403123456",
            shijian:"2017-04-03 10:29:11",
            zhuangtai:"待签发",
            zhandan:"20，000",
            jine:"2000"
          },
          {
            bianhao:"20170403123456",
            shijian:"2017-04-03 10:29:11",
            zhuangtai:"待签发",
            zhandan:"20，000",
            jine:"2000"
          },
          {
            bianhao:"20170403123456",
            shijian:"2017-04-03 10:29:11",
            zhuangtai:"待签发",
            zhandan:"20，000",
            jine:"2000"
          }
        ]
      }
    }
  }
</script>
