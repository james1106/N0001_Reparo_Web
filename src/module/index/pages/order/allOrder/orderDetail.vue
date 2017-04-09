<template>
  <div>
    <el-row style="margin:10px 0">
      <el-col :span="12">订单当前状态：已发货</el-col>
      <el-col :span="12" style="float:right;text-align: right"><el-button type="primary">功能按键</el-button></el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
      <el-card class="box-card mybox" style="width:100%">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">订单详情</span>
        </div>
          <!--<el-row>
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
          </el-row>-->
        <div class="box-card mycard">
          <el-row class="row-black row-padding">
            <el-col :span="8">订单编号：{{orderDetail.orderId}}</el-col>
            <el-col :span="8" style="float:right">发起时间：{{orderDetail.timeStamp}}</el-col>
          </el-row>
          <el-row class="">
            <el-col :span="8">购买人</el-col>
            <el-col :span="8">订单金额</el-col>
            <el-col :span="8">付款方式</el-col>
          </el-row>
          <el-row class="">
            <el-col :span="8">货品名称</el-col>
            <el-col :span="8">货品数量</el-col>
          </el-row>
          <el-row class="row-padding-bottom">
            <el-col :span="8">支付银行</el-col>
            <el-col :span="8">付款数量</el-col>
          </el-row>
        </div>

      </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
      <el-card class="box-card mybox" style="width:100%">

        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">物流信息</span>
        </div>
        <div class="box-card mycard">
          <el-row class="row-black row-padding">
            <el-col :span="8">运单号：{{}}</el-col>
            <el-col :span="8" style="float:right">下单时间：{{}}</el-col>
          </el-row>
          <el-row class="">
            <el-col :span="8">物流公司</el-col>
          </el-row>
          <el-row>
            <el-col :span="8">物流状态</el-col>
          </el-row>
          <el-row>
            <el-col :span="8">已收货</el-col>
          </el-row>
          <el-row>
            <el-col :span="8">已发货</el-col>
          </el-row>
          <el-row style="border-bottom:1px solid #fff;margin-bottom: 10px;box-sizing: border-box;padding-bottom: 10px">
            <el-col :span="8">已收货</el-col>
          </el-row>
          <el-row class="">
            <el-col :span="8">发货人</el-col>
          </el-row>
          <el-row style="border-bottom:1px solid #fff;margin-bottom: 10px;box-sizing: border-box;padding-bottom: 10px">
            <el-col :span="8">货品名称</el-col>
            <el-col :span="8">货品数量</el-col>
            <el-col :span="8">货品价值</el-col>
          </el-row>
          <el-row class="row-padding-bottom">
            <el-col :span="8">收货人</el-col>
            <el-col :span="8">收货仓储</el-col>
          </el-row>
        </div>

      </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
      <el-card class="box-card mybox" style="width:100%">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">仓储信息</span>
        </div>
        <div class="box-card mycard">
          <el-row class="row-black row-padding">
            <el-col :span="8">仓储流水号：{{}}</el-col>
            <el-col :span="8" style="float:right">状态：{{}}</el-col>
          </el-row>
          <el-row class="">
            <el-col :span="8">仓储公司</el-col>
            <el-col :span="8">仓单编号</el-col>
          </el-row>
          <el-row>
            <el-col :span="8">仓储状态</el-col>
          </el-row>
          <el-row>
            <el-col :span="8">入库申请</el-col>
          </el-row>
          <el-row>
            <el-col :span="8">入库同意</el-col>
          </el-row>
          <el-row>
            <el-col :span="8">入库确认</el-col>
          </el-row>
          <el-row class="">
            <el-col :span="8">出库同意</el-col>
          </el-row>
          <el-row style="border-bottom:1px solid #fff;margin-bottom: 10px;box-sizing: border-box;padding-bottom: 10px">
            <el-col :span="8">出库确认</el-col>
          </el-row>
          <el-row class="">
            <el-col :span="8">持有人</el-col>
          </el-row>
          <el-row class="row-padding-bottom">
            <el-col :span="8">货品名称</el-col>
            <el-col :span="8">货品数量</el-col>
            <el-col :span="8">货品价值</el-col>
          </el-row>
        </div>

      </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import store from '../../../store.js'
  export default {
    name:'index',
    data () {
      return {
          orderDetail:{
              orderId:'',
              timeStamp:'',
          }
      }
    },
    mounted() {
      console.log("now the srtate is:"+store.state.checkId);
      this.$http.get("http://172.16.100.246/server_test/getData2.php?checkId="+store.state.checkId).then(
        function (res) {
          // 处理成功的结果
          console.log(res.body);
          this.orderDetail=res.body.object;
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
  .mybox {margin:0 !important;}
  .mybox .el-card__header{padding-top:5px;padding-bottom: 5px;}
  .mycard .row-padding-bottom {box-sizing:border-box;padding-bottom:10px;}
  .mycard .row-black {border-bottom:1px solid #fff;}
</style>
