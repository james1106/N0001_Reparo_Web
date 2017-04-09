<template>
  <div class="box-card">
    <span>出库确认</span>
    <el-row class="row-black row-padding">
      <el-col :span="8">仓单号：{{item.receiptNum}}</el-col>
      <el-col :span="8">发起时间：{{item.timeStamp}}</el-col>
    </el-row>
    <el-row class="row-padding">
      <el-col :span="16">
        <el-row>
          <el-col :span="12">入库凭证号：{{item.voucherNum}}</el-col>
          <el-col :span="12">运单号：{{item.trackingNum}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">保管人：{{item.custodian}}</el-col>
          <el-col :span="12">存货人：{{item.bailor}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">仓储物名称：{{item.goods}}</el-col>
          <el-col :span="12">仓储物场所：{{item.place}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">单位：{{item.unit}}</el-col>
          <el-col :span="12">数量：{{item.goodsNum}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">备注：{{item.remarks}}</el-col>
          <el-col :span="12">货物价值：{{item.value}}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-button type="primary">同意</el-button><el-button type="primary">拒绝</el-button>
    </el-row>
  </div>
</template>
<script>
  export default {
    name:'index',
    data () {
      return {
        item:{
          receiptNum: '2014343241241',
          timeStamp: '21314234123',
          voucherNum: '1129893840',
          trackingNum: '1112332423',
          custodian: 'B企业',
          bailor: 'A公司',
          goods: '卡纸',
          place:'仓库A03',
          unit:'箱',
          goodsNum:'10，000',
          remarks:'无',
          value:'20,000'
        }
      }
    }
  }
</script>
