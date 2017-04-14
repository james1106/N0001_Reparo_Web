<template>
  <div id="deliver" class="deliver">
    <div>
      <el-breadcrumb separator=">" class="bread">
        <img src="../../assets/combinedShape.png" class="combinedShape">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>物流管理</el-breadcrumb-item>
        <el-breadcrumb-item>发货</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card>
      <div>
        <span class="sellerStepTitle">1. 请确认订单详情</span>
      </div>
      <el-row class="dataTable">
        <el-row class="el-row-header">
          <el-col :span="6" style="margin-left: 19px">订单编号：2342132352</el-col>
          <el-col :span="6">发起时间：2017-04-01 10:00:00</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="msgName" style="margin-left: 19px">购买人：杭州趣链科技有限公司</el-col>
          <el-col :span="6" class="msgName">订单金额(元)：20,000</el-col>
          <el-col :span="6" class="msgName">付款方式：应收账款支付</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="msgName" style="margin-left: 19px">货品名称：卡纸</el-col>
          <el-col :span="6" class="msgName">货品数量(箱)：1000</el-col>
          <el-col :span="6" class="msgName">货品单价：20元／箱</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="msgName" style="margin-left: 19px">支付银行：中国农业银行</el-col>
          <el-col :span="8" class="msgName">付款账户：2142341234235235</el-col>
        </el-row>
      </el-row>
      <div>
        <span class="sellerStepTitle">2. 请确认发货信息</span>
      </div>
      <el-row class="dataTable">
        <el-row class="el-row-header">
          <el-col :span="6" style="margin-left: 19px">发货信息</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="msgName" style="margin-left: 19px">发货人：杭州趣链科技有限公司</el-col>
          <el-col :span="6" class="msgName">订单金额(元)：20,000</el-col>
          <el-col :span="6" class="msgName">付款方式：应收账款支付</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="msgName" style="margin-left: 19px">货品名称：卡纸</el-col>
          <el-col :span="6" class="msgName">货品数量(箱)：1000</el-col>
          <el-col :span="6" class="msgName">货品总价(元)：20,000</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="msgName" style="margin-left: 19px">货品所在仓储：A仓储公司</el-col>
          <el-col :span="8" class="msgName">货品的仓单编号：2142341234235235</el-col>
        </el-row>
      </el-row>
      <el-row class="dataTable">
        <el-row class="el-row-header">
          <el-col :span="6" style="margin-left: 19px">收货信息</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="msgName" style="margin-left: 19px">收货人：杭州趣链科技有限公司</el-col>
          <el-col :span="6" class="msgName">收货仓储：ABC仓储机构</el-col>
        </el-row>
      </el-row>
      <div>
        <span class="sellerStepTitle">3. 请填写物流信息</span>
      </div>
      <el-form :model="sendGoodForm" ref="sendGoodForm">
        <el-tabs v-model="activeName" type="card" @tab-click="">
        <el-tab-pane label="在线选择" name="first">
          <el-col :span="12">
            <el-form-item label="选择物流企业">
              <el-select v-model="sendGoodForm.online" placeholder="请选择物流企业" style="width:50%">
                <el-option label="123456（默认账户）" value="123456"></el-option>
                <el-option label="234567" value="234567"></el-option>
                <el-option label="345678" value="345678"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
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
      </el-form>
    </el-card>
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
