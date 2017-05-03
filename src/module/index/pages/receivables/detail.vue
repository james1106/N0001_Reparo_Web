<template>
  <div id="detail" class="receiveDetails"  >
    <el-breadcrumb separator=">" class="bread">
      <svg class="icon combinedShape" aria-hidden="true">   <use xlink:href="#icon-locate"></use> </svg>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>应收账款</el-breadcrumb-item>
      <el-breadcrumb-item>我的应收账款</el-breadcrumb-item>
      <el-breadcrumb-item>详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-row class="el-row-header statePosition">
          <el-col class="detail_title_color stateShow"><svg class="icon detailIcon" aria-hidden="true">   <use xlink:href="#icon-zhuangtai"></use> </svg>
            {{detailInfo.detailVoList[0].status | receStatus}}</el-col>
          <el-col class="dotipRow"><span class="doTip">{{currentStatusInfo.statusSubTitle}}</span>&nbsp;<el-button size="small" v-if="currentStatusInfo.isShowHandleBtn" @click="handle()">{{currentStatusInfo.btnTitle}}</el-button></el-col>
        </el-row>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-card class="box-card mybox" style="width:100%">
            <div slot="header" class="clearfix el-row-header">
              <svg class="icon detailIcon" aria-hidden="true">   <use xlink:href="#icon-yszk_hui"></use> </svg>
              <span class="keynote">应收账款信息</span>
            </div>
            <div class="box-card mycard1 detailContent">
              <el-row>
                <el-col :span="6" class="msgName keynote">应收账款编号：{{detailInfo.detailVoList[0].receivableNo}}</el-col>
                <el-col :span="6" class="msgName keynote">订单编号：{{detailInfo.detailVoList[0].orderNo}}</el-col>
                <el-col :span="6" class="msgName">发起时间：{{detailInfo.detailVoList[0].isseDt | timeTransfer}}</el-col>
                <el-col :span="6" class="msgName">到期日：{{detailInfo.detailVoList[0].dueDt | timeTransfer}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="msgName">收款人：{{detailInfo.detailVoList[0].pyeeEnterpriseName}}</el-col>
                <el-col :span="6" class="msgName">付款人：{{detailInfo.detailVoList[0].pyerEnterpriseName}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="msgName">账款金额（元）：{{detailInfo.detailVoList[0].isseAmt}}</el-col>
                <el-col :span="6" class="msgName">票面利息(%)：{{detailInfo.detailVoList[0].rate}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="msgName">应收账款状态明细:</el-col>
              </el-row>
                <el-row class="collapseTop">
                  <template v-for="(item,index) in detailInfo.serialVoList">
                    <el-row class="status-list" :class="{circleColor:index==(detailInfo.serialVoList.length-1)}">
                      <el-col :span="24" :class="{circleColor1:index==(detailInfo.serialVoList.length-1)}"><span>{{item.time | timeTransfer}} {{item.receivableStatus | receAction}}</span></el-col>
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
              <el-row class="msgName keynote">收款人信息：</el-row>
              <el-row>
                <el-col :span="6" class="msgName">收款人：{{detailInfo.detailVoList[0].pyeeEnterpriseName}}</el-col>
                <el-col :span="6" class="msgName">收款人账号：{{detailInfo.detailVoList[0].pyee}}</el-col>
                <el-col :span="6" class="msgName">收款人开户行：{{detailInfo.detailVoList[0].pyeeAcctSvcrName}}</el-col>
              </el-row>
              <el-row class="cutoff">
                <!--<el-col :span="6" class="msgName">联系人：{{detailInfo.detailVoList[0].pyeeLinkMan | nullSituation}}</el-col>-->
                <el-col :span="6" class="msgName">联系人：暂无</el-col>
                <el-col :span="6" class="msgName">联系方式：{{detailInfo.detailVoList[0].pyeeLinkPhone | nullSituation}}</el-col>
              </el-row>
              <el-row class="msgName keynote" style="margin-top: 10px">付款人信息：</el-row>
              <el-row>
                <el-col :span="6" class="msgName">付款人：{{detailInfo.detailVoList[0].pyerEnterpriseName}}</el-col>
                <el-col :span="6" class="msgName">付款人账号：{{detailInfo.detailVoList[0].pyer}}</el-col>
                <el-col :span="6" class="msgName">付款人开户行：{{detailInfo.detailVoList[0].pyerAcctSvcrName}}</el-col>
              </el-row>
              <el-row class="cutoff">
                <!--<el-col :span="6" class="msgName">联系人：{{detailInfo.detailVoList[0].pyerLinkMan | nullSituation}}</el-col>-->
                <el-col :span="6" class="msgName">联系人：暂无</el-col>
                <el-col :span="6" class="msgName">联系方式：{{detailInfo.detailVoList[0].pyerLinkPhone | nullSituation}}</el-col>
              </el-row>
              <el-row class="msgName keynote" style="margin-top: 10px">附加信息：</el-row>
              <el-row>
                <el-col :span="6" class="msgName">合同编号：{{detailInfo.detailVoList[0].contractNo | nullSituation}}</el-col>
                <el-col :span="6" class="msgName">发票号：{{detailInfo.detailVoList[0].invoiceNo | nullSituation}}</el-col>
                <el-col :span="6" class="msgName">物流企业：暂无</el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="msgName">运单编号：暂无</el-col>
                <el-col :span="6" class="msgName">仓储机构：暂无</el-col>
                <el-col :span="6" class="msgName">仓单编号：暂无</el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog title="提示" v-model="dialogVisible" size="tiny">
      <span>{{msg}}</span>
      <span slot="footer" class="dialog-footer">
       <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  import Store from '../../vuex/store'
  import constantData from '../../../../common/const'
  import LocalStore from '../../../../common/store'

  export default {
    name:'detail',
    mounted:function () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.getDetail();
    },
    computed:{
      state () {
        return Store.state;
      }
    },
    data () {
      return {
        currentStatusInfo:{
          statusSubTitle:'',
          btnTitle:'',
          isShowHandleBtn:false
        },
        detailInfo:{
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
        dialogVisible:false,
        msg:''
      }
    },
    methods:{
      getDetail(){
          var detailParam = {
            receivableNo:Store.state.checkIdRece,
            operatorAcctId:LocalStore.fetchUserInfo().acctIds
          }
          this.$http.post('../v1/receivable/receivableInfoWithSerial',detailParam,{emulateJSON:true}).then((res) => {
            console.log(res.body);
            var code =  res.body.code;
            var data =  res.body.data;
            if(code != 0){
              return;
            }
            //详情数据
            this.detailInfo = data;
            this.setStatusInfo(data);
          },(err) => {
            console.log(err);
          })
        },
      handle(){
        var status = this.detailInfo.detailVoList[0].status;
        var isBuyer = Store.state.isBuyer;

        if(isBuyer == 'true' && status == constantData.FORACCEPT){ //承兑
          this.accept();
        }else if(isBuyer == 'true' && status == constantData.ACCEPTED){//兑付
          this.cash();
        }else if(isBuyer == 'false' && status == constantData.ACCEPTED){//贴现
          //跳转
          this.$router.push("/allAccounts/detail/discount");
        }
      },
      accept(){
        var detailInfo = this.detailInfo.detailVoList[0];
        var acceptParam = {
          receivableNo:detailInfo.receivableNo, //应收款编号
          replyerAcctId:LocalStore.fetchUserInfo().acctIds,//回复人账号
          response:0       //回复意见 0.同意 1.拒绝
        }
        this.$http.post('../v1/receivable/accept',acceptParam,{emulateJSON:true}).then((res) => {
          console.log('承兑操作'+res.body);
          var code =  res.body.code;
          if(code != 0){
            return;
          }
          this.dialogVisible = true
          this.msg = "承兑成功"

          this.getDetail();
        },(err) => {
          console.log(err);
        })
      },
      cash(){
        var detailInfo = this.detailInfo.detailVoList[0];
        var cashParam = {
          receivableNo:detailInfo.receivableNo, //应收款编号
          cashedAmount:detailInfo.isseAmt,      //兑付金额
          response:0                            //回复意见 0.同意 1.拒绝
        }
        this.$http.post('../v1/receivable/cash',cashParam,{emulateJSON:true}).then((res) => {
          console.log(res.body);
          var code =  res.body.code;
          if(code != 0){
            return;
          }
          this.dialogVisible = true
          this.msg = "兑付成功"
          this.currentStatusInfo.isShowHandleBtn = false

          this.getDetail();
        },(err) => {
          console.log(err);
        })
      },
      /**
      *  左上角当前详情的信息设置
      **/
      setStatusInfo(data){
        var status = data.detailVoList[0].status;
        var isBuyer = Store.state.isBuyer;

        if(status == constantData.FINISH){ //已结清
          this.currentStatusInfo.statusSubTitle = '该笔应收帐款已结清'
          return
        }
        if(status == constantData.DISCOUNTED){ //贴现待签收
          this.currentStatusInfo.statusSubTitle = '贴现待签收'
          return
        }

        if(isBuyer == 'false'){
          this.currentStatusInfo.statusSubTitle = '等待对方买家操作'
        }else {
          this.currentStatusInfo.statusSubTitle = '等待对方卖家操作'
        }
        if(isBuyer == 'true' && status == constantData.FORACCEPT){
          this.currentStatusInfo.statusSubTitle = '卖家已签发,请您尽快承兑'
          this.currentStatusInfo.btnTitle = '承兑确认'
          this.currentStatusInfo.isShowHandleBtn = true
        }else if(isBuyer == 'true' && status == constantData.ACCEPTED){
          this.currentStatusInfo.statusSubTitle = '该笔应收帐款已承兑,您可以进行兑付'
          this.currentStatusInfo.btnTitle = '兑付确认'
          this.currentStatusInfo.isShowHandleBtn = true
        }else if(isBuyer == 'false' && status == constantData.ACCEPTED){
          this.currentStatusInfo.statusSubTitle = '买家已承兑,您可以进行贴现申请'
          this.currentStatusInfo.btnTitle = '贴现申请'
          this.currentStatusInfo.isShowHandleBtn = true
        }
      }
    }
  }
</script>
<style>
</style>
