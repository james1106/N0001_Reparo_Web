<template>
  <div id="detail" class="receiveDetails"  >
    <el-breadcrumb separator=">" class="bread">
      <svg class="icon combinedShape" aria-hidden="true">   <use xlink:href="#icon-locate"></use> </svg>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>应收账款</el-breadcrumb-item>
      <el-breadcrumb-item>我的应收账款</el-breadcrumb-item>
      <el-breadcrumb-item>贴现确认</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-row class="el-row-header statePosition">
          <el-col class="detail_title_color stateShow"><svg class="icon detailIcon" aria-hidden="true">   <use xlink:href="#icon-zhuangtai"></use> </svg>
            账款状态:贴现待响应</el-col>
          <el-col class="dotipRow"><span class="doTip">提示:当前贴现利率</span>&nbsp;<el-button size="small" @click="discountConfirm()">贴现确认</el-button></el-col>
        </el-row>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-card class="box-card mybox" style="width:100%">
            <div slot="header" class="clearfix el-row-header">
              <svg class="icon detailIcon" aria-hidden="true">   <use xlink:href="#icon-yszk_hui"></use> </svg>
              <span class="keynote">应收账款基本信息</span>
            </div>
            <div class="box-card mycard1 detailContent">
              <el-row>
                <el-col :span="8" class="msgName keynote">应收账款编号：</el-col>
                <el-col :span="8" class="msgName">发起时间：</el-col>
                <el-col :span="8" class="msgName">到期日：</el-col>
              </el-row>
              <el-row>
                <el-col :span="8" class="msgName">收款人：</el-col>
                <el-col :span="8" class="msgName">付款人：</el-col>
              </el-row>
              <el-row>
                <el-col :span="8" class="msgName">账款金额（元）：</el-col>
                <el-col :span="8" class="msgName">票面利息(%)：</el-col>
              </el-row>
              <el-row>
                <el-col :span="8" class="msgName">应收账款状态明细:</el-col>
              </el-row>
                <el-row class="collapseTop">
                  <!--<template v-for="(item,index) in detailInfo.serialVoList">-->
                    <!--<el-row class="status-list" :class="{circleColor:index==(detailInfo.serialVoList.length-1)}">-->
                      <!--<el-col :span="24" :class="{circleColor1:index==(detailInfo.serialVoList.length-1)}"><span>{{item.time | timeTransfer}} {{item.receivableStatus | receAction}}</span></el-col>-->
                    <!--</el-row>-->
                  <!--</template>-->
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
              <span class="keynote">应收账款详细信息</span>
            </div>
            <div class="box-card mycard1 detailContent">
              <el-row class="msgName keynote">收款人信息：</el-row>
              <el-row>
                <el-col :span="8" class="msgName">收款方：</el-col>
                <el-col :span="8" class="msgName">收款人账号：</el-col>
                <el-col :span="8" class="msgName">收款人开户行：</el-col>
              </el-row>
              <el-row class="cutoff">
                <el-col :span="8" class="msgName">联系人：暂无</el-col>
                <el-col :span="8" class="msgName">联系方式：</el-col>
              </el-row>
              <el-row class="msgName keynote" style="margin-top: 10px">付款人信息：</el-row>
              <el-row>
                <el-col :span="8" class="msgName">付款方：</el-col>
                <el-col :span="8" class="msgName">付款人账号：</el-col>
                <el-col :span="8" class="msgName">付款人开户行：</el-col>
              </el-row>
              <el-row class="cutoff">
                <el-col :span="8" class="msgName">联系人：暂无</el-col>
                <el-col :span="8" class="msgName">联系方式：</el-col>
              </el-row>
              <el-row class="msgName keynote" style="margin-top: 10px">签发人信息：</el-row>
              <el-row>
                <el-col :span="8" class="msgName">签发人：</el-col>
                <el-col :span="8" class="msgName">签发人账号：</el-col>
                <el-col :span="8" class="msgName">签发人开户行：</el-col>
              </el-row>
              <el-row class="cutoff">
                <el-col :span="8" class="msgName">联系人：暂无</el-col>
                <el-col :span="8" class="msgName">联系方式：</el-col>
              </el-row>
            </div>
          </el-card>
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
                <el-col :span="8" class="msgName keynote">物流公司：</el-col>
                <el-col :span="8" class="msgName">运单编号：</el-col>
              </el-row>
              <el-row>
                <el-col :span="8" class="msgName">
                  物流当前状态：
                </el-col>
                <el-col :span="6" class="collapseBtn"><i class="el-icon-caret-bottom" @click="wayBillCollapse" :class="{rotate:isWayBillCollapse, rotate1:!isWayBillCollapse}"></i></el-col>
              </el-row>
              <el-row v-show="isWayBillCollapse" class="collapseTop">
                <!--<template v-for="(item,index) in wayBillHistory.operationRecordVo">-->
                  <!--<el-row class="status-list" :class="{circleColor:index==(wayBillHistory.operationRecordVo.length-1)}">-->
                    <!--<el-col :span="8" :class="{circleColor1:index==(wayBillHistory.operationRecordVo.length-1)}"><span>{{item.operateTime | timeTransfer}} {{item.state | wayBillStatus}}</span></el-col>-->
                  <!--</el-row>-->
                <!--</template>-->
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-card class="box-card mybox" style="width:100%">
            <div slot="header" class="clearfix el-row-header" >
              <svg class="icon detailIcon" aria-hidden="true">   <use xlink:href="#icon-cc_H"></use> </svg>
              <span class="keynote">仓储信息</span>
            </div>
            <div class="box-card mycard1 detailContent">
              <div>
                <el-row>
                  <el-col :span="8" class="msgName keynote">出库仓储公司：</el-col>
                  <el-col :span="8" class="msgName">出库仓单编号：</el-col>
                </el-row>
                <el-row>
                  <el-col :span="8" class="msgName keynote">入库仓储公司：</el-col>
                  <el-col :span="8" class="msgName">入库仓单编号：</el-col>
                </el-row>
                <el-row>
                  <el-col :span="8" class="msgName">最新仓储状态：</el-col>
                  <el-col :span="6" class="collapseBtn"><i class="el-icon-caret-bottom" @click="buyeeRepoCollapse" :class="{rotate:isBuyeeRepoCollapse, rotate1:!isBuyeeRepoCollapse}"></i></el-col>
                </el-row>
                <el-row v-show="isBuyeeRepoCollapse" class="collapseTop">
                  <!--<template v-for="(item,index) in buyeeRepoHistory">-->
                    <!--<el-row class="status-list" :class="{circleColor:index==(buyeeRepoHistory.length-1)}">-->
                      <!--<el-col :span="8" :class="{circleColor1:index==(buyeeRepoHistory.length-1)}"><span>{{item.operateTime | timeTransfer}} {{item.state | repoStatus}}</span></el-col>-->
                    <!--</el-row>-->
                  <!--</template>-->
                </el-row>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-card class="box-card mybox" style="width:100%">
            <div slot="header" class="clearfix el-row-header">
              <svg class="icon detailIcon" aria-hidden="true">   <use xlink:href="#icon-order_H"></use> </svg>
              <span class="keynote">订单详情</span>
            </div>
            <div class="box-card mycard1 detailContent">
              <el-row>
                <el-col :span="8" class="msgName keynote">订单编号：</el-col>
              </el-row>
              <el-row>
                <el-col :span="8" class="msgName">商家：</el-col>
                <el-col :span="8" class="msgName">买家：</el-col>
              </el-row>
              <el-row>
                <el-col :span="8" class="msgName">付款方式：应收账款支付</el-col>
                <el-col :span="8" class="msgName">订单金额：</el-col>
                <el-col :span="8" class="msgName">货品单价：</el-col>
              </el-row>
              <el-row>
                <el-col :span="8" class="msgName">货品名称：</el-col>
                <el-col :span="8" class="msgName">货品数量：</el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="msgName">最新交易状态：</el-col>
                <el-col :span="6" class="collapseBtn"><i class="el-icon-caret-bottom" @click="orderCollapse" :class="{rotate:isOrderCollapse, rotate1:!isOrderCollapse}"></i></el-col>
              </el-row>
              <el-row v-show="isOrderCollapse" class="collapseTop">
                <!--<template v-for="(item,index) in orderDetail.txDetail.operationRecordVoList">-->
                  <!--<el-row class="status-list" :class="{circleColor:index==(orderDetail.txDetail.operationRecordVoList.length-1)}">-->
                    <!--<el-col :span="8" :class="{circleColor1:index==(orderDetail.txDetail.operationRecordVoList.length-1)}"><span>{{item.operateTime | timeTransfer}} {{item.state | transactionStatus}}</span></el-col>-->
                  <!--</el-row>-->
                <!--</template>-->
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
  import Store from '../../vuex/store'
  import LocalStore from '../../../../common/store'

  export default {
    name:'detail',
    mounted:function () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    computed:{
      state () {
        return Store.state;
      }
    },
    data () {
      return {
        detailInfo:{
        }
      }
    },
    methods:{
      getDetail(){
//          var detailParam = {
//            receivableNo:Store.state.checkIdRece,
//            operatorAcctId:LocalStore.fetchUserInfo().acctIds
//          }
//          this.$http.post('../v1/receivable/receivableInfoWithSerial',detailParam,{emulateJSON:true}).then((res) => {
//            var data =  res.body.data;
//            if(res.body.code != 0){
//              this.$message.error(res.body.message);
//              return;
//            }
//            //详情数据
//            this.detailInfo = data;
//            this.setStatusInfo(data);
//          },(err) => {
//            console.log(err);
//          })
        },
      discountConfirm(){

      }
    }
  }
</script>
<style>
</style>
