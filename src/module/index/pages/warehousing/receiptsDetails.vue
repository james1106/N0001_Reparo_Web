<template>
  <div>
    <el-breadcrumb separator=">" class="bread">
      <svg class="icon combinedShape" aria-hidden="true">   <use xlink:href="#icon-locate"></use> </svg>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>仓储管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/warehousing/myReceipts' }">我的仓单</el-breadcrumb-item>
      <el-breadcrumb-item>仓单详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row class="el-row-header statePosition">
        <el-col class="buyerColor stateShow "><svg class="icon" aria-hidden="true">   <use xlink:href="#icon-zhuangtai"></use> </svg> 仓单当前状态：{{receiptsDetails.repoCertStatus | repoCertStatus}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-card class="box-card mybox" style="width:100%">
            <div slot="header" class="clearfix el-row-header">
              <svg class="icon detailIcon" aria-hidden="true">   <use xlink:href="#icon-cc_H"></use> </svg>
              <span class="keynote">仓单信息</span>
            </div>
            <div class="box-card mycard1 detailContent">
              <el-row>
                <el-col :span="6" class="msgName keynote">仓单编号：{{receiptsDetails.repoCertNo | nullSituation}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="msgName">保管人：{{receiptsDetails.storerName}}</el-col>
                <el-col :span="6" class="msgName">持有人：{{receiptsDetails.holderName}}</el-col>
                <el-col :span="6" class="msgName">保管仓储：{{receiptsDetails.repoEnterpriseName}}</el-col>
                <el-col :span="6" class="msgName">签发时间：{{receiptsDetails.repoCreateDate | timeTransfer}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="msgName">货品名称：{{receiptsDetails.productName}}</el-col>
                <el-col :span="6" class="msgName">货品数量：{{receiptsDetails.productQuantity}}{{receiptsDetails.measureUnit}}</el-col>
                <el-col :span="6" class="msgName">货品总额(元)：{{receiptsDetails.productTotalPrice}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8" class="msgName">仓单状态明细：</el-col>
              </el-row>

              <!--<el-row v-for="item in receiptsDetails.recordVos">
                <el-col :span="8" class="msgName">{{item.state | repoCertStatus}}：{{item.operateTime | timeTransfer}}</el-col>
              </el-row>-->

              <el-row class="collapseTop">
                <template v-for="(item,index) in receiptsDetails.recordVos">
                  <el-row class="status-list" :class="{circleBlue:index==(receiptsDetails.recordVos.length-1)}">
                    <el-col :span="8" :class="{colorBlue:index==(receiptsDetails.recordVos.length-1)}"><span>{{item.state | repoCertStatus}}：{{item.operateTime | timeTransfer}}</span></el-col>
                  </el-row>
                </template>
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
        receiptsDetails:''
      }
    },
    computed:{
        constantData () {
            return constantData;
        }
    },
    mounted () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
        this.$http.get("../v1/repository/getRepoCert?repoCertNo="+store.state.checkIdRepoCert).then(function(res){
//            请求仓单详情列表
          console.log(res.body);
          this.receiptsDetails=res.body.data;
        },function(err){
            console.log(err);
        });
    }
  }
</script>
