<template>
  <div>
    <el-breadcrumb separator=">" class="bread">
      <svg class="icon combinedShape" aria-hidden="true">   <use xlink:href="#icon-locate"></use> </svg>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>运单管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/logisticsCompany/companyAllBill'}">我的运单</el-breadcrumb-item>
      <el-breadcrumb-item>运单详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row class="el-row-header statePosition">
        <el-col class="sellerColor stateShow">
          <svg class="icon detailIcon" aria-hidden="true">   <use xlink:href="#icon-zhuangtai"></use> </svg>物流当前状态：{{logisticsDetail.waybillStatusCode | wayBillStatus}}
          &nbsp;<el-button  size="small" v-if="logisticsDetail.waybillStatusCode===constantData.SENDFORRESPONSE" @click.native.prevent="sendConfirm(logisticsDetail.orderNo)">发货确认</el-button>
          &nbsp;<el-button  size="small" v-if="logisticsDetail.waybillStatusCode===constantData.SENDED" @click.native.prevent="receiveConfirm(logisticsDetail.orderNo)">送达确认</el-button>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-card class="box-card mybox" style="width:100%">
            <div slot="header" class="clearfix el-row-header">
              <svg class="icon detailIcon" aria-hidden="true">   <use xlink:href="#icon-wl_H"></use> </svg>
              <span class="keynote">物流信息</span>
            </div>
            <div class="box-card mycard1 detailContent">
              <el-row>
                <el-col :span="6" class="msgName keynote">运单号：{{logisticsDetail.wayBillNo | nullSituation}}</el-col>
                <!--<el-col :span="6" class="msgName">物流公司：{{logisticsDetail.logisticsEnterpriseName}}</el-col>-->
                <el-col :span="6" class="msgName">发货申请时间：{{logisticsDetail.sendReqTime | timeTransfer | nullSituation}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="msgName">物流跟踪：</el-col>
              </el-row>

              <el-row class="collapseTop">
                <template v-for="(item,index) in logisticsDetail.operationRecordVo">
                  <el-row class="status-list" :class="{circleColor:index==(logisticsDetail.operationRecordVo.length-1)}">
                    <el-col :span="8" :class="{circleColor1:index==(logisticsDetail.operationRecordVo.length-1)}"><span>{{item.operateTime | timeTransfer}} {{item.state | wayBillStatus}}</span></el-col>
                  </el-row>
                </template>
              </el-row>

            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-card class="box-card mybox" style="width:100%">
            <div slot="header" class="clearfix el-row-header">
              <svg class="icon detailIcon" aria-hidden="true">   <use xlink:href="#icon-qita"></use> </svg>
              <span class="keynote">其他信息</span>
            </div>
            <div class="box-card mycard1 detailContent">
              <el-row class="msgName keynote">发货信息：</el-row>
              <el-row class="cutoff">
                <el-col :span="6" class="msgName">运单号：{{logisticsDetail.wayBillNo | nullSituation}}</el-col>
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
                <el-col :span="6" class="msgName">货品单价(元)：{{logisticsDetail.productPrice | numTransfer}}</el-col>
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
            productPrice:'',
          inRepoTime:'',
          sendReqTime:''
        },
      }
    },
    computed:{
        constantData () {
            return constantData;
        }
    },
    methods:{
      sendConfirm (checkId) {
          store.commit('setCheckIdOrder',checkId);
          this.$router.push("/logisticsCompany/sendConfirm");
      },
      receiveConfirm (checkId) {
          store.commit('setCheckIdOrder',checkId);
          this.$router.push("/logisticsCompany/receiveConfirm");
      }
    },
    mounted () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
//        请求物流详情接口　
      this.$http.get("../v1/waybill/wayBillDetail?orderNo="+store.state.checkIdOrder).then(function(res){
        if(res.body.code != 0){
          this.$message.error(res.body.message);
          return;
        }
        this.logisticsDetail=res.body.data;
        this.logisticsDetail.productPrice=(this.logisticsDetail.productQuantity===''||this.logisticsDetail.productQuantity===0) ? '暂无':this.logisticsDetail.productValue/this.logisticsDetail.productQuantity;
        this.logisticsDetail.sendReqTime='';
        for(var item in this.logisticsDetail.operationRecordVo){
            var temp=this.logisticsDetail.operationRecordVo[item];
          if(temp.state===constantData.SENDFORRESPONSE){/*筛选发货申请时间*/
            this.logisticsDetail.sendReqTime=temp.operateTime;
            break;
          }
        }
      },function(err) {
        console.log(err);
      });
    }
  }
</script>
