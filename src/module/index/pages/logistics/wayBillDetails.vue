<template>
  <div class="box-card">
    <span>运单详情</span>
    <el-row class="row-black row-padding">
      <el-col :span="8">运单编号：{{item.orderId}}</el-col>
      <el-col :span="8">发起时间：{{item.timeStamp}}</el-col>
    </el-row>
    <el-row class="row-padding">
      <el-col :span="16">
        <el-row>
          <el-col :span="12">发货人：{{item.sender}}</el-col>
          <el-col :span="12">收货人：{{item.receiver}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">货品：{{item.goods}}</el-col>
          <el-col :span="12">货物价值：{{item.value}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">发货日期：{{item.sendTime}}</el-col>
          <el-col :span="12">物流公司：{{item.logistics}}</el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    name:'index',
    data () {
      return {
        item:{
          orderId:'20170403123456',
          timeStamp:'2017-04-43 10:29:11',
          sender:'A企业',
          receiver:'B企业',
          goods:'卡纸',
          value:'20,000',
          sendTime:'2017-03-20',
          logistics:'ABC公司'
        }
      }
    }
  }
</script>
