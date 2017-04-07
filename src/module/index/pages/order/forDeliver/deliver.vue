<template>
  <div>
    <el-row>
      <el-col :span="4">订单当前状态：已发货</el-col>
      <el-col :span="4" style="float:right"><el-button type="primary">功能按键</el-button></el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card class="box-card" style="width:100%">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">订单详情</span>
          </div>
          <el-form ref="xiangqing" :model="xiangqing" labelWidth="80px">
            <el-row>
              <el-col :span="8"><el-form-item label="订单编号"><el-input v-model="xiangqing.dingdanbianhao"></el-input></el-form-item></el-col>
              <el-col :span="8" style="float: right"><el-form-item label="发起时间"><el-input v-model="xiangqing.faqishijian"></el-input></el-form-item></el-col>
            </el-row>
            <el-row>
              <el-col :span="8">购买人：B企业</el-col>
              <el-col :span="8" style="text-align: center">订单金额：20,000</el-col>
              <el-col :span="8" style="text-align: right">付款方式：应收账款支付</el-col>
            </el-row>
            <el-row>
              <el-col :span="8">货品名称：卡纸</el-col>
              <el-col :span="8" style="text-align: center">货品数量：1,000（箱）</el-col>
            </el-row>
            <el-row>
              <el-col :span="8">支付银行：中国农业银行</el-col>
              <el-col :span="8" style="text-align: center">付款账户：123456</el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card class="box-card" style="width:100%">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">物流信息</span>
          </div>
          <el-form ref="xiangqing" :model="xiangqing">
            <el-row>
              <el-col :span="12">运单号：1122334455</el-col>
              <el-col :span="12" style="text-align: right">下单时间：2017-04-03 14:11:20</el-col>
            </el-row>
            <el-row>
              <el-col :span="8">物流公司： ABC物流</el-col>
            </el-row>
            <el-row>
              <el-col :span="8">购买人：B企业</el-col>
              <el-col :span="8" style="text-align: center">订单金额：20,000</el-col>
              <el-col :span="8" style="text-align: right">付款方式：应收账款支付</el-col>
            </el-row>
            <el-row>
              <el-col :span="8">货品名称：卡纸</el-col>
              <el-col :span="8" style="text-align: center">货品数量：1,000（箱）</el-col>
            </el-row>
            <el-row>
              <el-col :span="8">支付银行：中国农业银行</el-col>
              <el-col :span="8" style="text-align: center">付款账户：123456</el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    name:'index',
    data () {
      return {
        xiangqing:{
          dingdanbianhao:'20170403123456',
          faqishijian:'2017-04-03 10:29:11'
        }
      }
    }
  }
</script>
<style>
  .el-row {
    margin-bottom: 20px;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
