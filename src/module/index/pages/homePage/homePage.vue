<template>
  <div>
    <el-row>
      <el-col :span="5" style="margin-right: 15px">
        <el-row><el-card style="height: 100px;">
          <img src="../../assets/group_1.png">
          <div style="margin-right: 30px;float: right;margin-top: 13px">
            <span style="font-size: 10px;">全部订单</span> <br>
            <span>1000</span>
          </div>
        </el-card></el-row>
        <el-row><el-card style="height: 100px;">
          <img src="../../assets/group_3.png">
          <div style="margin-right: 30px;float: right;margin-top: 13px">
            <span style="font-size: 10px;">全部订单</span> <br>
            <span>1000</span>
          </div>
        </el-card></el-row>
      </el-col>
      <el-col :span="5" style="margin-right: 15px">
        <el-row><el-card style="height: 100px;">
          <img src="../../assets/group_2.png">
          <div style="margin-right: 30px;float: right;margin-top: 13px">
            <span style="font-size: 10px;">全部订单</span> <br>
            <span>1000</span>
          </div>
        </el-card></el-row>
        <el-row><el-card style="height: 100px;">
          <img src="../../assets/group_4.png">
          <div style="margin-right: 30px;float: right;margin-top: 13px">
            <span style="font-size: 10px;">全部订单</span> <br>
            <span>1000</span>
          </div>
        </el-card></el-row>
      </el-col>
      <el-col :span="10" >
        <el-row >
          <el-card style="height: 210px">

          </el-card>
        </el-row>
      </el-col>
    </el-row>
    <el-card>
      <div slot="header" class="clearfix" style="height: 8px">
        <span>待办订单</span>
      </div>
      <el-row style="background-color: rgb(223,238,236);font-size: 14px;height: 40px;line-height: 40px;border-radius: 1%">
        <el-col :span="6" style="margin-left: 20px">货品信息</el-col>
        <el-col :span="6">付款信息</el-col>
        <el-col :span="8">订单状态</el-col>
        <el-col :span="2" style="text-align: center">操作</el-col>
      </el-row>
      <template v-for="(item,index) in showOrder">
        <div>
          <el-row style="border: 1px solid rgb(248,248,248);height: 120px;border-radius: 4px;padding: 10px 10px">
            <el-row style="background-color: rgb(248,248,248);color: rgb(102,102,102);font-size: 14px">
              <el-col :span="6">订单编号:{{item.orderNo}}</el-col>
              <el-col :span="6">创建时间:{{item.orderGenerateTime}}</el-col>
              <el-col :span="8">卖家:{{item.payeeAccount}}</el-col>
              <el-col :span="2"></el-col>
            </el-row>
            <el-row>
              <el-row style="font-size: 14px">
                <el-col :span="6">
                  <el-row>货品名称:{{item.productName}}</el-row>
                  <el-row>货品数量:{{item.productNum}}</el-row>
                </el-col>
                <el-col :span="6">
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
                <el-col :span="2">
                  <el-row>确认订单</el-row>
                  <el-row>{{item.wayBillState}}</el-row>
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
export default {
  name: 'app',
  data () {
    return {
//      msg: 'Welcome to Your Vue.js App'
      showOrder:[
        {
          "orderNo":"1111111122",
          "payeeAccount":"杭州趣链科技有限公司",
          "productName":"ka pian ",
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
          "productName":"ka pian ",
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
          "productName":"ka pian ",
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
          "productName":"ka pian ",
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
  .el-row{margin-bottom: 10px!important;}
  .el-card__body{padding-top: 12px!important;}
  .el-table th.is-leaf{
    border-bottom: 0px!important;
    background-color: transparent;
  }
  .el-table td{
    border-bottom: 0px!important;
    background-color: rgb(242,242,242);
    height: 55px!important;
  }
  .el-table__fixed-header-wrapper thead div, .el-table__header-wrapper thead div{
    background-color: rgb(201,201,201)!important;
    width: 100%;
  }
  /*.el-card__body{*/
    /*height: 90px;*/
  /*}*/
</style>
