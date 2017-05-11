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
            账款状态:{{receDetail.detailVoList[0].status | receStatus}}</el-col>
          <el-col class="dotipRow"><span class="doTip">提示:当前贴现利率{{rate}}%</span>&nbsp;<el-button size="small" v-if="receDetail.detailVoList[0].status === 41" @click="showReceDetail()">贴现确认</el-button></el-col>
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
                <el-col :span="8" class="msgName keynote">应收账款编号：{{receDetail.detailVoList[0].receivableNo}}</el-col>
                <el-col :span="8" class="msgName">发起时间：{{receDetail.detailVoList[0].isseDt | timeTransfer}}</el-col>
                <el-col :span="8" class="msgName">到期日：{{receDetail.detailVoList[0].dueDt | timeTransfer}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8" class="msgName">收款人：{{receDetail.detailVoList[0].pyeeEnterpriseName}}</el-col>
                <el-col :span="8" class="msgName">付款人：{{receDetail.detailVoList[0].pyerEnterpriseName}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8" class="msgName">账款金额（元）：{{receDetail.detailVoList[0].isseAmt}}</el-col>
                <el-col :span="8" class="msgName">票面利息(%)：{{receDetail.detailVoList[0].rate}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8" class="msgName">
                  最新应收账款状态：{{receDetail.detailVoList[0].status | receStatus}}
                </el-col>
                <el-col :span="6" class="collapseBtn"><i class="el-icon-caret-bottom" @click="handleHistoryList('rece')" :class="{rotate:isReceCollapse, rotate1:!isReceCollapse}"></i></el-col>
              </el-row>
                <el-row class="collapseTop" v-show="isReceCollapse">
                  <template v-for="(item,index) in receDetail.serialVoList">
                    <el-row class="status-list" :class="{circleColor:index==(receDetail.serialVoList.length-1)}">
                      <el-col :span="24" :class="{circleColor1:index==(receDetail.serialVoList.length-1)}"><span>{{item.time | timeTransfer}} {{item.receivableStatus | receAction}}</span></el-col>
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
              <span class="keynote">应收账款详细信息</span>
            </div>
            <div class="box-card mycard1 detailContent">
              <el-row class="msgName keynote">收款人信息：</el-row>
              <el-row>
                <el-col :span="8" class="msgName">收款方：{{receDetail.detailVoList[0].pyeeEnterpriseName}}</el-col>
                <el-col :span="8" class="msgName">收款人账号：{{receDetail.detailVoList[0].pyee}}</el-col>
                <el-col :span="8" class="msgName">收款人开户行：{{receDetail.detailVoList[0].pyeeAcctSvcrName}}</el-col>
              </el-row>
              <el-row class="cutoff">
                <el-col :span="8" class="msgName">联系人：暂无</el-col>
                <el-col :span="8" class="msgName">联系方式：{{receDetail.detailVoList[0].pyeeLinkPhone | nullSituation}}</el-col>
              </el-row>
              <el-row class="msgName keynote" style="margin-top: 10px">付款人信息：</el-row>
              <el-row>
                <el-col :span="8" class="msgName">付款方：{{receDetail.detailVoList[0].pyerEnterpriseName}}</el-col>
                <el-col :span="8" class="msgName">付款人账号：{{receDetail.detailVoList[0].pyer}}</el-col>
                <el-col :span="8" class="msgName">付款人开户行：{{receDetail.detailVoList[0].pyerAcctSvcrName}}</el-col>
              </el-row>
              <el-row class="cutoff">
                <el-col :span="8" class="msgName">联系人：暂无</el-col>
                <el-col :span="8" class="msgName">联系方式：{{receDetail.detailVoList[0].pyerLinkPhone | nullSituation}}</el-col>
              </el-row>
              <el-row class="msgName keynote" style="margin-top: 10px">签发人信息：</el-row>
              <el-row>
                <el-col :span="8" class="msgName">签发人：{{receDetail.detailVoList[0].pyeeEnterpriseName}}</el-col>
                <el-col :span="8" class="msgName">签发人账号：{{receDetail.detailVoList[0].pyee}}</el-col>
                <el-col :span="8" class="msgName">签发人开户行：{{receDetail.detailVoList[0].pyeeAcctSvcrName}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8" class="msgName">联系人：暂无</el-col>
                <el-col :span="8" class="msgName">联系方式：{{receDetail.detailVoList[0].pyeeLinkPhone | nullSituation}}</el-col>
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
                <el-col :span="8" class="msgName keynote">物流公司：{{wayBill.logisticsEnterpriseName}}</el-col>
                <el-col :span="8" class="msgName">运单编号：{{orderDetail.wayBillOver.wayBillNo}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8" class="msgName">
                  物流当前状态：{{orderDetail.wayBillOver.wayBillLatestStatus | wayBillStatus}}
                </el-col>
                <el-col :span="6" class="collapseBtn"><i class="el-icon-caret-bottom" @click="handleHistoryList('logistics')" :class="{rotate:isWayBillCollapse, rotate1:!isWayBillCollapse}"></i></el-col>
              </el-row>
              <el-row v-show="isWayBillCollapse" class="collapseTop">
                <template v-for="(item,index) in wayBill.operationRecordVo">
                  <el-row class="status-list" :class="{circleColor:index==(wayBill.operationRecordVo.length-1)}">
                    <el-col :span="8" :class="{circleColor1:index==(wayBill.operationRecordVo.length-1)}"><span>{{item.operateTime | timeTransfer}} {{item.state | wayBillStatus}}</span></el-col>
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
            <div slot="header" class="clearfix el-row-header" >
              <svg class="icon detailIcon" aria-hidden="true">   <use xlink:href="#icon-cc_H"></use> </svg>
              <span class="keynote">仓储信息</span>
            </div>
            <div class="box-card mycard1 detailContent">
              <div>
                <el-row>
                  <el-col :span="8" class="msgName keynote">出库仓储公司：{{orderDetail.txDetail.payeeRepo}}</el-col>
                  <el-col :span="8" class="msgName">出库仓单编号：{{orderDetail.repoOver.payeeRepoCertNo}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="8" class="msgName keynote">入库仓储公司：{{orderDetail.txDetail.payerRepo}}</el-col>
                  <el-col :span="8" class="msgName">入库仓单编号：{{orderDetail.repoOver.payerRepoCertNo}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="8" class="msgName">出库最新仓储状态：{{orderDetail.repoOver.payeeRepoBusiState | repoStatus}}</el-col>
                  <el-col :span="8" class="msgName">入库最新仓储状态：{{orderDetail.repoOver.payerRepoBusiState | repoStatus}}</el-col>
                  <el-col :span="6" class="collapseBtn"><i class="el-icon-caret-bottom" @click="handleHistoryList('repo')" :class="{rotate:isRepoCollapse, rotate1:!isRepoCollapse}"></i></el-col>
                </el-row>
                <el-row v-show="isRepoCollapse" class="collapseTop">
                  <el-col :span="8">
                    <template v-for="(item,index) in outerRepoHistory">
                      <el-row class="status-list" :class="{circleColor:index==(outerRepoHistory.length-1)}">
                        <el-col :span="24" :class="{circleColor1:index==(outerRepoHistory.length-1)}"><span>{{item.operateTime | timeTransfer}} {{item.state | repoStatus}}</span></el-col>
                      </el-row>
                    </template>
                  </el-col>
                  <el-col :span="8">
                    <template v-for="(item,index) in innerRepoHistory">
                      <el-row class="status-list" :class="{circleColor:index==(innerRepoHistory.length-1)}">
                        <el-col :span="24" :class="{circleColor1:index==(innerRepoHistory.length-1)}"><span>{{item.operateTime | timeTransfer}} {{item.state | repoStatus}}</span></el-col>
                      </el-row>
                    </template>
                  </el-col>

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
                <el-col :span="8" class="msgName keynote">订单编号：{{orderDetail.txDetail.orderId}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8" class="msgName">商家：{{orderDetail.txDetail.payeeCompanyName}}</el-col>
                <el-col :span="8" class="msgName">买家：{{orderDetail.txDetail.payerCompanyName}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8" class="msgName">付款方式：应收账款支付</el-col>
                <el-col :span="8" class="msgName">订单金额：{{orderDetail.txDetail.productTotalPrice}}</el-col>
                <el-col :span="8" class="msgName">货品单价：{{orderDetail.txDetail.productUnitPrice}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8" class="msgName">货品名称：{{orderDetail.txDetail.productName}}</el-col>
                <el-col :span="8" class="msgName">货品数量：{{orderDetail.txDetail.productQuantity}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="msgName">最新交易状态：{{orderDetail.txDetail.operationRecordVoList[orderDetail.txDetail.operationRecordVoList.length-1].state | transactionStatus}}</el-col>
                <el-col :span="6" class="collapseBtn"><i class="el-icon-caret-bottom" @click="handleHistoryList('order')" :class="{rotate:isOrderCollapse, rotate1:!isOrderCollapse}"></i></el-col>
              </el-row>
              <el-row v-show="isOrderCollapse" class="collapseTop">
                <template v-for="(item,index) in orderDetail.txDetail.operationRecordVoList">
                  <el-row class="status-list" :class="{circleColor:index==(orderDetail.txDetail.operationRecordVoList.length-1)}">
                    <el-col :span="8" :class="{circleColor1:index==(orderDetail.txDetail.operationRecordVoList.length-1)}"><span>{{item.operateTime | timeTransfer}} {{item.state | transactionStatus}}</span></el-col>
                  </el-row>
                </template>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <!--自定义弹框-->
    <transition name="modal">
      <div class="modal-mask" v-show="showModal">
        <div class="modal-confirm rece_modal">
          <el-row class="el-row-header">
            <span class="confirm-header sellerColor">确认贴现</span><i class="el-icon-close closeBtn" @click="close" style="cursor: pointer"></i>
          </el-row>
          <div class="confirm-content">
            <el-form>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="应收账款编号">
                    <el-label>{{receDetail.detailVoList[0].receivableNo}}</el-label>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="实际贴现金额">
                    <el-label>{{amount}}元</el-label>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="签发人">
                    <el-label>{{receDetail.detailVoList[0].pyeeEnterpriseName}}</el-label>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="承兑人">
                    <el-label>{{receDetail.detailVoList[0].pyerEnterpriseName}}</el-label>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="账款金额">
                    <el-label>{{receDetail.detailVoList[0].isseAmt}}元</el-label>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="到期日">
                    <el-label>{{receDetail.detailVoList[0].dueDt | timeTransfer}}</el-label>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="票面利息">
                    <el-label>{{receDetail.detailVoList[0].rate}}%</el-label>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="贴现利息">
                    <el-label>{{rate}}%</el-label>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <el-row>
            <el-col :span="24">
              <el-row>
                <el-button size="small" type="primary" @click="discountConfirm">确认贴现并打款</el-button>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </div>
    </transition>
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
      var userInfo = LocalStore.fetchUserInfo();
      this.rate = userInfo.rate;
      this.getDetail(false);
    },
    computed:{
      state () {
        return Store.state;
      },
      amount(){
        var amount = this.receDetail.detailVoList[0].isseAmt * (1 - this.rate/100);
        return amount;
      }
    },
    data () {
      return {
        rate:'',
        orderDetail: {
          txDetail: {
            operationRecordVoList:[
              {state:'',operateTime:''}
            ],
          },
          receOver: {},
          repoOver: {},
          wayBillOver: {}
        },
        receDetail:{
          detailVoList:[{
            receivableNo:'',
            orderNo:'',
            isseDt:'',
            dueDt:'',
            pyeeEnterpriseName:'',
            pyerEnterpriseName:'',
            isseAmt:'',
            rate:'',
            pyee:'',
            pyeeAcctSvcrName:'',
            pyeeLinkman:'',
            pyeePhone:'',
            pyer:'',
            pyerAcctSvcrName:'',
            pyerLinkMan:'',
            pyerPhone:'',
            contractNo:'',
            invoiceNo:''
          }
          ],
          serialVoList: [{
          }]
        },
        innerRepoHistory:[],//入库仓储历史
        outerRepoHistory:[],//出库仓储历史
        wayBill:{},
        isOrderCollapse:false,
        isReceCollapse:false,
        isWayBillCollapse:false,
        isRepoCollapse:false,
        showModal:false
      }
    },
    methods:{
      getDetail(isRefresh){
        this.rate = LocalStore.fetchUserInfo().rate;
        var detailParam = {
          receivableNo:Store.state.checkIdRece,
          operatorAcctId:LocalStore.fetchUserInfo().acctIds
        }
        //获取应收账款详情
        this.$http.post('../v1/receivable/receivableInfoWithSerial',detailParam,{emulateJSON:true}).then((res) => {
          var data =  res.body.data;
          if(res.body.code != 0){
            this.$message.error(res.body.message);
            return;
          }
          //详情数据
          this.receDetail = data;

          //获取订单详情
          if(!isRefresh){
            this.getOrderInfo(this.receDetail.detailVoList[0].orderNo);
          }
        },(err) => {
          console.log(err);
        })
      },
      getOrderInfo(orderId){
        this.$http.get("../v1/order/detail?orderNo=" + orderId).then(
          function (res) {
            // 处理成功的结果
            if(res.body.code != 0){
              this.$message.error(res.body.message);
              return;
            }
            this.orderDetail = res.body.data;

//          根据仓储业务编号查询仓储详情
            if(this.orderDetail.repoOver.payerRepoBusinessNo!==''){
              this.$http.get("../v1/repository/getRepoBusiHistoryList?repoBusinessNo="+this.orderDetail.repoOver.payerRepoBusinessNo).then(function(res){
                if(res.body.code != 0){
                  this.$message.error(res.body.message);
                  return;
                }
                this.innerRepoHistory=res.body.data.operationRecordVoList;
              },function (err) {
                console.log(err);
              });
            }
            if(this.orderDetail.repoOver.payeeRepoBusinessNo!==''){
              this.$http.get("../v1/repository/getRepoBusiHistoryList?repoBusinessNo="+this.orderDetail.repoOver.payeeRepoBusinessNo).then(function(res){
                if(res.body.code != 0){
                  this.$message.error(res.body.message);
                  return;
                }
                this.outerRepoHistory=res.body.data.operationRecordVoList;
              },function (err) {
                console.log(err);
              });
            }
//          根据订单号查询运单详情
            if(this.orderDetail.wayBillOver.wayBillLatestStatus>0){
              this.$http.get("../v1/waybill/wayBillDetail?orderNo="+this.orderDetail.txDetail.orderId).then(function(res){
                if(res.body.code != 0){
                  this.$message.error(res.body.message);
                  return;
                }
                this.wayBill=res.body.data;
              },function(err){
                console.log(err);
              });
            }
          }, function (res) {
            // 处理失败的结果
            console.log(res);
          }
        );
      },
      handleHistoryList(item){
        switch (item){
          case 'rece':
            this.isOrderCollapse = false;
            this.isReceCollapse = !this.isReceCollapse;
            this.isWayBillCollapse = false;
            this.isRepoCollapse = false;
            break;
          case 'order':
            this.isOrderCollapse = !this.isOrderCollapse;
            this.isReceCollapse = false;
            this.isWayBillCollapse = false;
            this.isRepoCollapse = false;
            break;
          case 'repo':
            this.isOrderCollapse = false;
            this.isReceCollapse = false;
            this.isWayBillCollapse = false;
            this.isRepoCollapse = !this.isRepoCollapse;
            break;
          case 'logistics':
            this.isOrderCollapse = false;
            this.isReceCollapse = false;
            this.isWayBillCollapse = !this.isWayBillCollapse;
            this.isRepoCollapse = false;
            break;
        }
      },
      showReceDetail(){
        this.showModal = true;
      },
      close(){
        this.showModal = false;
      },
      discountConfirm(){
        var params = {
          receivableNo:this.receDetail.detailVoList[0].receivableNo,
          replyerAcctId:LocalStore.fetchUserInfo().acctIds,
          response:0,
          discountInHandAmount:this.amount,
          discountRate:this.rate,
          isseAmt:this.receDetail.detailVoList[0].isseAmt
        }
        this.showModal = false;
        this.$http.post("../v1/receivable/discountReply",params,{emulateJSON:true}).then(function(res){
          if(res.body.code != 0){
            this.$message.error(res.body.message);
            return;
          }
          this.$message.success('已贴现确认！');
          this.getDetail(true);
        },
        function (res) {
          // 处理失败的结果
          console.log(res);
        });
      }
    }
  }
</script>
<style>
  .rece_modal{
    height: 235px!important;
  }
</style>
