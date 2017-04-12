<template>
  <div>
    <el-card>
    <el-row style="margin:10px 0;float: right;z-index:999">
      <el-button type="primary" v-if="(state.isBuyer==='false')&&(orderDetail.txDetail.operationRecordList[orderDetail.txDetail.operationRecordList.length-1].state===constantData.UNCONFIRMED)" @click.native.prevent="confirmOrder(orderDetail.txDetail.orderId)">确认订单</el-button>
      <el-button type="primary" v-if="(state.isBuyer==='false')&&(orderDetail.txDetail.operationRecordList[orderDetail.txDetail.operationRecordList.length-1].state===constantData.CONFIRMED)" @click.native.prevent="signBill">签发应收账款</el-button>
      <el-button type="primary" v-if="(state.isBuyer==='false')&&(orderDetail.receOver.receLatestStatus===constantData.ACCEPTED)" @click.native.prevent="sendGood">发货</el-button>
      <el-button type="primary" v-if="(state.isBuyer==='true')&&(orderDetail.receOver.receLatestStatus===constantData.FORACCEPT)" @click.native.prevent="acceptBill">签收账款</el-button>
    </el-row>
    <el-row class="el-row-header statePosition">
      <el-col class="buyerColor stateShow"><i class="el-icon-information"></i> 入库待响应</el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-card class="box-card mybox" style="width:100%">

          <div slot="header" class="clearfix el-row-header">
            <span class="keynote">物流信息</span><el-button size="mini" type="text" class="detailButton">查看详情 ></el-button>
          </div>
          <div class="box-card mycard1" v-if="orderDetail.wayBillOver.wayBillLatestStatus===constantData.NOMESSAGE">
            暂无物流信息！
          </div>
          <div class="box-card mycard1" v-else-if="orderDetail.wayBillOver.wayBillLatestStatus===constantData.FORSEND">
            待发货！
          </div>
          <div class="box-card mycard1" v-else>
            <el-row>
              <el-col :span="8" class="msgName keynote">运单号：{{orderDetail.wayBillOver.wayBillNo}}</el-col>
              <el-col :span="8" class="msgName">下单时间：{{orderDetail.wayBillOver.wayBillGenerateTime | timeTransfer}}</el-col>
            </el-row>
            <el-row class="">
              <el-col :span="6" class="msgName">物流公司：{{orderDetail.wayBillOver.logisticCompany}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="8" class="msgName">
                物流当前状态：{{orderDetail.wayBillOver.wayBillLatestStatus | wayBillStatus}},（{{orderDetail.wayBillOver.wayBillUpdateTime | timeTransfer}}）
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card class="box-card mybox" style="width:100%">
          <div slot="header" class="clearfix el-row-header">
            <span class="keynote">仓储信息</span><el-button size="mini" type="text" class="detailButton">查看详情 ></el-button>
          </div>
          <div class="box-card mycard1" v-if="state.isBuyer==='true'"><!--区分买家和买家-->
            <div v-if="orderDetail.repoOver.repoLatestStatus===constantData.NOMESSAGE"><!--买家和卖家状态字段不同-->
              暂无仓储信息！
            </div>
            <div v-else>
            <el-row>
              <el-col :span="6" class="msgName keynote">仓储流水号：{{orderDetail.repoOver.repoSerialNo}}</el-col>
              <el-col :span="6" class="msgName">入库申请时间：{{orderDetail.repoOver.repoGenerateTime | timeTransfer}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="6" class="msgName">仓储公司：{{orderDetail.repoOver.payeeRepoCompany}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="6" class="msgName">最新仓储状态：{{orderDetail.repoOver.repoLatestStatus | repoStatus}},{{orderDetail.repoOver.receUpdateTime | timeTransfer}}</el-col>
            </el-row>
            </div>
          </div>
          <div class="box-card mycard1" v-if="state.isBuyer==='false'">
            <div v-if="orderDetail.repoOver.repoLatestStatus===constantData.NOMESSAGE">
              暂无仓储信息！
            </div>
            <div v-else>
            <el-row>
              <el-col :span="6" class="msgName keynote">仓储流水号：{{orderDetail.repoOver.repoSerialNo}}</el-col>
              <el-col :span="6" class="msgName">仓单编号：{{orderDetail.repoOver.repoCertNo}}</el-col>
              <el-col :span="6" class="msgName">出库申请时间：{{orderDetail.repoOver.repoGenerateTime | timeTransfer}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="6" class="msgName">仓储公司：{{orderDetail.repoOver.payerRepoCompany}}</el-col>
              <!--注意这里多了一个字段-->
              <el-col :span="6" class="msgName">持有人：{{orderDetail.repoOver.payerRepoCompany}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="8" class="msgName">最新仓储状态：{{orderDetail.repoOver.repoLatestStatus | repoStatus}},{{orderDetail.repoOver.receUpdateTime | timeTransfer}}</el-col>
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
              <span class="keynote">应收账款详情</span><el-button size="mini" type="text" class="detailButton">查看详情 ></el-button>
            </div>
            <div class="box-card mycard1" v-if="orderDetail.receOver.receLatestStatus===constantData.NOMESSAGE">
              暂无应收账款信息!
            </div>
            <div class="box-card mycrad1" v-else-if="orderDetail.receOver.receLatestStatus===constantData.FORISSUE">
              应收账款待签发!
            </div>
            <div class="box-card mycard1" v-else>
              <el-row>
                <el-col :span="6" class="msgName keynote">业务编号：{{orderDetail.receOver.receNo}}</el-col>
                <el-col :span="6" class="msgName">签发时间：{{orderDetail.receOver.receGenerateTime | timeTransfer}}</el-col>
                <el-col :span="6" class="msgName">到期日：{{orderDetail.receOver.dueDate}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="msgName">收款人：{{orderDetail.receOver.receivingSide}}</el-col>
                <el-col :span="6" class="msgName">付款人：{{orderDetail.receOver.payingSide}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="msgName">账款金额(元)：{{orderDetail.receOver.receAmount}}</el-col>
                <el-col :span="6" class="msgName">票面利息：{{orderDetail.receOver.coupon}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8" class="msgName">
                  最新应收账款状态：{{orderDetail.receOver.receLatestStatus | receStatus}},({{orderDetail.receOver.receUpdateTime | timeTransfer}})
                </el-col>
              </el-row>
              <el-button type="text" @click="receCollapse">展开</el-button>
              <el-row v-show="isReceCollapse">
                <template v-for="(item,index) in receHistory">
                  <el-col :span="24" :class="{colorBlue:index==(receHistory.length-1)}">{{item.updateStatus}}：{{item.updateTime}}</el-col>
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
          <span class="keynote">交易详情</span><el-button size="mini" type="text" class="detailButton">查看详情 ></el-button>
        </div>
        <div class="box-card mycard1">
          <el-row>
            <el-col :span="6" class="msgName keynote">买家信息：</el-col>
          </el-row>
          <el-row class="">
            <el-col :span="6" style="padding-left: 30px;" class="msgName" v-if="state.isBuyer==='true'">商家：{{orderDetail.txDetail.payeeCompanyName}}</el-col>
            <el-col :span="6" style="padding-left: 30px;" class="msgName" v-else>购买者：{{orderDetail.txDetail.payerCompanyName}}</el-col>
            <el-col :span="6" class="msgName">支付银行：{{orderDetail.txDetail.payerBank}}</el-col>
            <el-col :span="6" class="msgName">付款账户：{{orderDetail.txDetail.payerAccount}}</el-col>
            <el-col :span="6" class="msgName">付款方式：{{orderDetail.txDetail.payingMethod | payingMethod}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="msgName keynote">订单信息：</el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="msgName" style="padding-left: 30px;">订单编号：{{orderDetail.txDetail.orderId}}</el-col>
            <el-col :span="6" class="msgName">发起时间：{{orderDetail.txDetail.operationRecordList[0].operateTime | timeTransfer}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="msgName" style="padding-left: 30px;">货品名称：{{orderDetail.txDetail.productName}}</el-col>
            <el-col :span="6" class="msgName">货品数量：{{orderDetail.txDetail.productQuantity}}</el-col>
            <el-col :span="6" class="msgName">订单金额：{{orderDetail.txDetail.productTotalPrice}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="msgName">最新交易状态：{{orderDetail.txDetail.operationRecordList[orderDetail.txDetail.operationRecordList.length-1].state | transactionStatus}}</el-col>
          </el-row>
          <!--<el-row class="">-->
            <!--<el-col :span="8" v-if="(orderDetail.txDetail.orderState!==constantData.UNCONFIRMED)">交易确认：{{orderDetail.txDetail.orderConfirmTime | timeTransfer}}</el-col>-->
          <!--</el-row>-->
          <el-button type="text" @click="orderCollapse">展开</el-button>
          <div v-show="isOrderCollapse">
            <el-row class="">
              <el-col :span="8">交易发起：{{orderDetail.txDetail.orderGenerateTime | timeTransfer}}</el-col>
            </el-row>
            <el-row class="">
              <el-col :span="8" v-if="(orderDetail.txDetail.orderState!==constantData.UNCONFIRMED)">交易确认：{{orderDetail.txDetail.orderConfirmTime | timeTransfer}}</el-col>
            </el-row>
          </div>
        </div>

      </el-card>
    </el-col>
  </el-row>
    </el-card>
  </div>
</template>
<script>
  import store from '../../vuex/store.js'
  import constantData from '../../../../common/const'
  export default {
    name: 'index',
    data () {
      return {
        orderDetail: {
          txDetail: {
            operationRecordList:[
              {state:'',operateTime:''}
            ],
          },
          receOver: {},
          repoOver: {},
          wayBillOver: {}
        },
        receHistory:[
          {updateStatus:'state1',updateTime:'23:03:09'},
          {updateStatus:'state1',updateTime:'23:03:09'},
          {updateStatus:'state1',updateTime:'23:03:09'},
          {updateStatus:'state1',updateTime:'23:03:09'},
        ],
        isOrderCollapse:false,
        isReceCollapse:false,
      }
    },
    computed: {
      state () {
        return store.state;
      },
      constantData () {
          return constantData;
      }
    },
    methods: {
      confirmOrder (checkId) {
        console.log("确认订单！");
        store.commit('setCheckId',checkId);
        this.$router.push("/order/confirmOrder");
      },
      signBill () {
        console.log("签发应收账款");
      },
      sendGood () {
        console.log("发货");
      },
      acceptBill () {
        console.log("承兑签收");
      },
      orderCollapse () {
          console.log(this.isOrderCollapse);
          if(this.isOrderCollapse){
            this.isOrderCollapse=false;
          }
          else {
            this.isOrderCollapse=true;
            console.log("请求接口");
          }
      },
      receCollapse () {
        if(this.isReceCollapse){
          this.isReceCollapse=false;
        }
        else {
          this.isReceCollapse=true;
          console.log("请求接口");
        }
      }
    },
    mounted() {
      console.log("the state checkId is:" + store.state.checkId);
      this.$http.get("/v1/order/detail?orderNo=" + store.state.checkId).then(
        function (res) {
          // 处理成功的结果
          console.log(res.body);
          this.orderDetail = res.body.data;
        }, function (res) {
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

  .mycard1 {
    /*width: 90% !important;*/
    float: inherit !important;
    /*margin: 10px auto !important;*/
    /*background-color: rgba(242,242,242,1)*/
  }

  .mycard1 .el-row {
    margin-bottom: 0 !important;
  }

  .mycard1 .el-col {
    text-align: center;
    box-sizing: border-box;
    padding: 5px 0;
  }

  .mybox {
    margin: 0 auto !important;
    border: 1px solid rgb(138,176,200)!important;
    border-radius: 0px!important;
  }

  .mybox .el-card__header {
    padding: 0px!important;
  }

  /*.mycard11 .row-padding-bottom {*/
    /*box-sizing: border-box;*/
    /*padding-bottom: 10px;*/
  /*}*/
  .detailButton{
    float: right;
    line-height: 30px!important;
    padding-right: 5px!important;
    color: #666666!important;
  }
  .msgName{
    text-align: left!important;
    font-size: 14px;
    color: #666666;
  }
  .keynote{
    font-weight: bold;
  }
  .buyerColor{
    color: #0096D7;
  }
  .stateShow{
    margin-left: 10px;
    font-size: 14px;
  }
  .statePosition{
    border-bottom:none;
    margin-bottom: 20px;
  }
  .colorBlue {color:blue;}
</style>
