<template>
  <div>
    <el-breadcrumb separator=">" class="bread">
      <img src="../../assets/combinedShape.png" class="combinedShape">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>运单管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/logisticsCompany/companyAllBill'}">我的运单</el-breadcrumb-item>
      <el-breadcrumb-item>运单详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row class="el-row-header statePosition">
        <el-col class="sellerColor stateShow " :span="8"><i class="el-icon-information"></i> 物流当前状态：{{}}从list中取</el-col>
        <el-col :span="8">
          <el-button type="success" size="small" v-if="0" @click.native.prevent="sendConfirm">发货确认</el-button>
          <el-button type="success" size="small" v-if="0" @click.native.prevent="receiveConfirm">送达确认</el-button>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-card class="box-card mybox" style="width:100%">
            <div slot="header" class="clearfix el-row-header">
              <i class="el-icon-menu" style="margin-right: 10px"></i><span class="keynote">物流信息</span>
            </div>
            <div class="box-card mycard1">
              <el-row>
                <el-col :span="6" class="msgName keynote">运单号：{{logisticsDetail.orderNo}}</el-col>
                <!--<el-col :span="6" class="msgName">物流公司：{{logisticsDetail.logisticsEnterpriseName}}</el-col>-->
                <el-col :span="6" class="msgName">入库时间：{{}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="msgName">物流跟踪：</el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-card class="box-card mybox" style="width:100%">
            <div slot="header" class="clearfix el-row-header">
              <i class="el-icon-menu" style="margin-right: 10px"></i><span class="keynote">其他信息</span>
            </div>
            <div class="box-card mycard1">
              <el-row class="msgName keynote">发货信息：</el-row>
              <el-row class="cutoff">
                <el-col :span="6" class="msgName">运单号：{{logisticsDetail.wayBillNo}}</el-col>
                <el-col :span="6" class="msgName">发货仓储：{{logisticsDetail.senderRepoEnterpriseName}}</el-col>
                <el-col :span="6" class="msgName">货品仓单编号：{{logisticsDetail.senderRepoCertNo}}</el-col>
              </el-row>
              <el-row class="msgName keynote" style="margin-top: 10px">收货信息：</el-row>
              <el-row class="cutoff">
                <el-col :span="6" class="msgName">收货人：{{logisticsDetail.receiverEnterpriseName}}</el-col>
                <el-col :span="6" class="msgName">收货仓储：{{logisticsDetail.receiverRepoEnterpriseName}}</el-col>
              </el-row>
              <el-row class="msgName keynote" style="margin-top: 10px">货品信息：</el-row>
              <el-row>
                <el-col :span="6" class="msgName">货品名称：{{logisticsDetail.productName}}</el-col>
                <el-col :span="6" class="msgName">货品数量：{{logisticsDetail.productQuantity}}</el-col>
                <el-col :span="6" class="msgName">货品单价(元)：{{logisticsDetail.productPrice}}</el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>

</template>
<script>
  import store from '../../vuex/store'
  import constantData from '../../../../common/const'
  export default {
    name:'index',
    data () {
      return {
        logisticsDetail:{
            productPrice:''
        },
      }
    },
    methods:{
      sendConfirm () {

      },
      receiveConfirm () {

      }
    },
    mounted () {
//        请求物流详情接口　
      this.$http.get("/v1/waybill/wayBillDetail?orderNo="+store.state.checkId).then(function(res){
        console.log(res.body);
        this.logisticsDetail=res.body.data;
        this.logisticsDetail.productPrice=(this.logisticsDetail.productQuantity===''||this.logisticsDetail.productQuantity===0) ? '暂无':this.logisticsDetail.productValue/this.logisticsDetail.productQuantity;
      },function(err) {
        console.log(err);
      });
    }
  }
</script>
