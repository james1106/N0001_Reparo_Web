<template>
  <div>
    <el-breadcrumb separator=">" class="bread">
      <img src="../../assets/combinedShape.png" class="combinedShape">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="6" style="margin-right: 15px">
        <el-row><el-card class="showCard">
          <img src="../../assets/dd.png" style="float: left">
          <div class="showMesg">
            <span class="showName">全部订单</span> <br>
            <span class="showNum">1000</span>
          </div>
        </el-card></el-row>
        <el-row><el-card class="showCard">
          <img src="../../assets/wl.png" style="float: left">
          <div class="showMesg">
            <span class="showName">全部订单</span> <br>
            <span class="showNum">1000</span>
          </div>
        </el-card></el-row>
      </el-col>
      <el-col :span="6" style="margin-right: 15px">
        <el-row><el-card class="showCard">
          <img src="../../assets/yszk.png" style="float: left">
          <div class="showMesg">
            <span class="showName">全部订单</span> <br>
            <span class="showNum">1000</span>
          </div>
        </el-card></el-row>
        <el-row><el-card class="showCard">
          <img src="../../assets/cc.png" style="float: left">
          <div class="showMesg">
            <span class="showName">全部订单</span> <br>
            <span class="showNum">1000</span>
          </div>
        </el-card></el-row>
      </el-col>
      <el-col :span="11">
        <el-row >
          <el-card style="height: 170px;width: 100%;">

          </el-card>
        </el-row>
      </el-col>
    </el-row>
    <el-card>
      <div slot="header" class="clearfix" style="height: 8px">
        <span :class="[{buyerTitle:$route.params.isBuyer==='true',sellerTitle:$route.params.isBuyer==='false'}]">待办订单</span>
      </div>
      <el-row class="el-row-header" style="background-color: rgb(229,241,245)">
        <el-col :span="6" style="margin-left: 20px">货品信息</el-col>
        <el-col :span="6">付款信息</el-col>
        <el-col :span="8">订单状态</el-col>
        <el-col :span="2">操作</el-col>
      </el-row>
      <template v-for="(item,index) in showOrder">
        <div>
          <el-row class="dataTable">
            <el-row class="el-row-header">
              <el-col :span="6" style="margin-left: 19px;" >订单编号:{{item.orderNo}}</el-col>
              <el-col :span="6">创建时间:{{item.orderGenerateTime}}</el-col>
              <el-col :span="8">卖家:{{item.payeeAccount}}</el-col>
              <el-col :span="2"></el-col>
            </el-row>
            <el-row>
              <el-row class="el-row-content">
                <el-col :span="6" style="margin-left: 19px;">
                  <el-row>货品名称:{{item.productName}}</el-row>
                  <el-row>货品数量:{{item.productNum}}</el-row>
                </el-col>
                <el-col :span="6">
                  <!--:class="content-row"-->
                  <el-row>订单金额(元):{{item.totalPrice}}</el-row>
                  <el-row>付款方式:{{item.payingMethod}}</el-row>
                </el-col>
                <el-col :span="2">
                  <el-row>交易状态</el-row>
                  <el-row>{{item.txState}}</el-row>
                </el-col>
                <el-col :span="2">
                  <el-row>账款状态</el-row>
                  <el-row>{{item.receState}}</el-row>
                </el-col>
                <el-col :span="2">
                  <el-row>仓储状态</el-row>
                  <el-row>{{item.repoCertState}}</el-row>
                </el-col>
                <el-col :span="2">
                  <el-row>物流状态</el-row>
                  <el-row>{{item.wayBillState}}</el-row>
                </el-col>
                <el-col :span="2" style="line-height: 10px">
                  <el-row style="text-align: center;"><el-button size="mini" type="text"  style="color: rgb(57,202,166);height: 22px">确认订单</el-button></el-row>
                  <el-row style="text-align: center;"><el-button size="mini" style="height: 25px">查看详情</el-button></el-row>
                </el-col>
              </el-row>
            </el-row>
          </el-row>
        </div>
      </template>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  import '../../../../assets/css/style.css'

export default {
  name: 'app',
  mounted: function (){
    this.$nextTick(function () {

    });
  },
  created:function () {

  },
  data () {
    return {
      showOrder:[
        {
          "orderNo":"1111111122",
          "payeeAccount":"杭州趣链科技有限公司",
          "productName":"卡片",
          "productNum":"1000",
          "productPrice":"10000",
          "totalPrice":"100000",
          "payingMethod":"应收账款",
          "orderGenerateTime":"2017-04-01 17:00",
          "txState":"xxx",
          "repoCertState":"xxx",
          "wayBillState":"xx",
          "receState":"xxx"
        },
        {
          "orderNo":"1111111122",
          "payeeAccount":"杭州趣链科技有限公司",
          "productName":"卡片",
          "productNum":"1000",
          "productPrice":"10000",
          "totalPrice":"100000",
          "payingMethod":"应收账款",
          "orderGenerateTime":"2017-04-01 17:00",
          "txState":"xxx",
          "repoCertState":"xxx",
          "wayBillState":"xx",
          "receState":"xxx"
        },
        {
          "orderNo":"1111111122",
          "payeeAccount":"杭州趣链科技有限公司",
          "productName":"卡片",
          "productNum":"1000",
          "productPrice":"10000",
          "totalPrice":"100000",
          "payingMethod":"应收账款",
          "orderGenerateTime":"2017-04-01 17:00",
          "txState":"xxx",
          "repoCertState":"xxx",
          "wayBillState":"xx",
          "receState":"xxx"
        },
        {
          "orderNo":"1111111122",
          "payeeAccount":"杭州趣链科技有限公司",
          "productName":"卡片",
          "productNum":"1000",
          "productPrice":"10000",
          "totalPrice":"100000",
          "payingMethod":"应收账款",
          "orderGenerateTime":"2017-04-01 17:00",
          "txState":"xxx",
          "repoCertState":"xxx",
          "wayBillState":"xx",
          "receState":"xxx"
        }
      ]
    }
  }
}
</script>

<style>

</style>
