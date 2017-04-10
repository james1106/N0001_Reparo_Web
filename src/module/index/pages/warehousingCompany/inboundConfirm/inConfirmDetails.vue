<template>
  <div class="box-card">
    <span>发货申请单详情</span>
    <el-row class="row-black row-padding">
      <el-col :span="8">业务编号：{{item.orderId}}</el-col>
      <el-col :span="8">发起时间：{{item.timeStamp}}</el-col>
    </el-row>
    <el-row class="row-padding">
      <el-col :span="16">
        <el-row>
          <el-col :span="12">申请人：{{item.sender}}</el-col>
          <el-col :span="12">运单号：{{item.logisticNum}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">物流公司：{{item.logistics}}</el-col>
          <el-col :span="12">货物价值：{{item.value}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">仓库编号:<el-input></el-input></el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-button type="primary">入库确认</el-button><el-button type="primary">取消</el-button>
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
          logisticNum:'11124234324',
          storageNum:'ddd',
          logistics:'xx物流',
          value:'20,000'
        }
      }
    }
  }
</script>
