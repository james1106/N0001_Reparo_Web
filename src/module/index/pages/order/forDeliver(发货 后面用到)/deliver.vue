<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card class="box-card mybox" style="width:100%">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">1. 请确认订单详情</span>
          </div>
          <div class="box-card mycard1">
            <el-row class="row-black row-padding" style="border-bottom: 1px solid #fff">
              <el-col :span="8">订单编号：{{sendGood.orderNo}}</el-col>
              <el-col :span="8" style="float:right">发起时间：{{sendGood.orderGenerateTime}}</el-col>
            </el-row>
            <el-row class="">
              <el-col :span="8">商家：{{sendGood.pyeeAddress}}</el-col>
              <el-col :span="8">订单金额：{{sendGood.orderTotalPrice}}</el-col>
              <el-col :span="8">付款方式：{{sendGood.collectionMethod}}</el-col>
            </el-row>
            <el-row class="">
              <el-col :span="8">货品名称：{{sendGood.productName}}</el-col>
              <el-col :span="8">货品数量：{{sendGood.productQuantity}}</el-col>
            </el-row>
            <el-row class="" style="border-bottom: 1px solid #fff">
              <el-col :span="8">支付银行：{{sendGood.pyerBank}}</el-col>
              <el-col :span="8">付款账户：{{sendGood.pyerAccount}}</el-col>
            </el-row>
          </div>

        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card class="box-card mybox" style="width:100%">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">2. 请确认发货信息</span>
          </div>
          <div class="box-card mycard1">
            <el-row class="row-black row-padding" style="border-bottom: 1px solid #fff">
              <el-col :span="8">发货信息</el-col>
            </el-row>
            <el-row class="">
              <el-col :span="8">发货人</el-col>
            </el-row>
            <el-row class="">
              <el-col :span="8">货品名称：{{sendGood.productName}}</el-col>
              <el-col :span="8">货品数量：{{sendGood.productQuantity}}</el-col>
              <el-col :span="8">货品价值：{{sendGood.productQuantity}}</el-col>
            </el-row>
            <el-row class="" style="border-bottom: 1px solid #fff">
              <el-col :span="8">货品所在仓储：{{sendGood.pyerBank}}</el-col>
              <el-col :span="8">货品的仓单编号：{{sendGood.pyerAccount}}</el-col>
            </el-row>
          </div>
          <div class="box-card mycard1">
            <el-row class="row-black row-padding" style="border-bottom: 1px solid #fff">
              <el-col :span="8">收货信息</el-col>
            </el-row>
            <el-row class="">
              <el-col :span="8">收货人</el-col>
              <el-col :span="8">收货仓储</el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form :model="sendGoodForm" ref="sendGoodForm">
        <el-card class="box-card mybox" style="width:100%">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">3. 请填写物流信息</span>
          </div>
          <el-tabs v-model="activeName" type="card" @tab-click="">
            <el-tab-pane label="在线选择" name="first">
              <el-form-item label="选择物流企业">
                <el-select v-model="sendGoodForm.online" placeholder="请选择物流企业" style="width:50%">
                  <el-option label="123456（默认账户）" value="123456"></el-option>
                  <el-option label="234567" value="234567"></el-option>
                  <el-option label="345678" value="345678"></el-option>
                </el-select>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="自己联系" name="second">
              <el-col :span="12">
                <el-form-item label="填写物流企业"><el-input v-model="sendGoodForm.logistics"></el-input></el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="填写运单号"><el-input v-model="sendGoodForm.No"></el-input></el-form-item>
              </el-col>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'index',
    data () {
      return {
        sendGood: {
          dingdanbianhao: '20170403123456',
          faqishijian: '2017-04-03 10:29:11'
        },
        sendGoodForm: {
            online:''
        },
        activeName: "first"
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
