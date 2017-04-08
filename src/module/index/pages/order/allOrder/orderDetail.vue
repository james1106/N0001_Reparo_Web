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
          <el-row>
            <el-col :span="8">订单编号：{{orderDetail.orderSequence}}</el-col>
            <el-col :span="8" style="float: right;text-align: right">发起时间：{{orderDetail.orderTime}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="8">购买人：{{orderDetail.purchaser}}</el-col>
            <el-col :span="8" style="text-align: center">订单金额：{{orderDetail.orderAmount}}</el-col>
            <el-col :span="8" style="text-align: right">付款方式：{{orderDetail.payMethod}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="8">货品名称：{{orderDetail.goodName}}</el-col>
            <el-col :span="8" style="text-align: center">货品数量：{{orderDetail.goodAmount}}（箱）</el-col>
          </el-row>
          <el-row>
            <el-col :span="8">支付银行：{{orderDetail.payBank}}</el-col>
            <el-col :span="8" style="text-align: center">付款账户：{{orderDetail.payAccount}}</el-col>
          </el-row>
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
          orderDetail:{
              orderSequence:'',
              orderTime:'',
              purchaser:'',
              orderAmount:'',
              payMethod:'',
              goodName:'',
              goodAmount:'',
              payBank:'',
              payAccount:'',
          }
      }
    },
    mounted() {
      this.$http.get("/api/getList").then(
        function (res) {
          // 处理成功的结果
          console.log(res.body);
          this.orderDetail=res.body;
        },function (res) {
          // 处理失败的结果
          console.log(res);
        }
      );
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
