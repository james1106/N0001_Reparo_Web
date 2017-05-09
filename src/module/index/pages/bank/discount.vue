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
          <el-col class="dotipRow"><span class="doTip">提示:当前贴现利率{{rate}}%</span>&nbsp;<el-button size="small" @click="showReceDetail()">贴现确认</el-button></el-col>
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
      this.getDetail();
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
        showModal:false
      }
    },
    methods:{
      getDetail(){
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
        },(err) => {
          console.log(err);
        })
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
        var _this = this;
        this.$http.post("../v1/receivable/discountReply",params,{emulateJSON:true}).then(function(res){
          if(res.body.code != 0){
            this.$message.error(res.body.message);
            return;
          }
            _this.showModal = false;
          this.$router.push("/bank/detail");
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
