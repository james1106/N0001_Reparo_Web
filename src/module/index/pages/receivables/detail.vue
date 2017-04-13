<template>
  <div id="detail" class="receiveDetails">
    <el-card>
      <el-row>
        <el-row class="el-row-header statePosition">
          <el-col class="buyerColor stateShow"><i class="el-icon-information"></i> 承兑待签收</el-col>
          <el-col class="dotipRow"><span class="doTip">卖家已签发应收账款，请您尽快</span><el-button size="small" style="border-color: rgb(0,150,215);color: rgb(0,150,215)">承兑确认</el-button></el-col>
        </el-row>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-card class="box-card mybox" style="width:100%">
            <div slot="header" class="clearfix el-row-header">
              <i class="el-icon-menu" style="margin-right: 10px"></i><span class="keynote">应收账款信息</span>
            </div>
            <div class="box-card mycard1">
              <el-row>
                <el-col :span="6" class="msgName keynote">应收账款编号：{{detailInfo.receivableNo}}</el-col>
                <el-col :span="6" class="msgName keynote">订单编号：{{detailInfo.orderNo}}</el-col>
                <el-col :span="6" class="msgName">发起时间：{{detailInfo.isseDt}}</el-col>
                <el-col :span="6" class="msgName">到期日：{{detailInfo.dueDt}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="msgName">收款人：{{detailInfo.orderNo}}</el-col>
                <el-col :span="6" class="msgName">付款人：{{detailInfo.orderNo}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="msgName">账款金额（元）：{{detailInfo.orderNo}}</el-col>
                <el-col :span="6" class="msgName">票面利息：{{detailInfo.orderNo}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="msgName">应收账款状态明细：{{detailInfo.orderNo}}</el-col>
                <el-col :span="24" class="stateShow" style="font-size: 12px;color: rgb(102,102,102)">
                  <label> 2017-04-03 10:00:00 承兑已签发</label>
                </el-col>
                <el-col :span="24" class="stateShow" style="font-size: 12px;color: rgb(102,102,102)">
                  <label>2017-04-03 11:00:00 承兑已签收</label>
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
              <i class="el-icon-menu" style="margin-right: 10px"></i><span class="keynote">其他信息</span>
            </div>
            <div class="box-card mycard1">
              <el-row class="msgName keynote">收款人信息：</el-row>
              <el-row>
                <el-col :span="6" class="msgName">收款人：{{detailInfo.pyeeEnterpriseName}}</el-col>
                <el-col :span="6" class="msgName">收款人账号：{{detailInfo.pyee}}</el-col>
                <el-col :span="6" class="msgName">收款人开户行：{{detailInfo.pyeeAcctSvcrName}}</el-col>
              </el-row>
              <el-row class="cutoff">
                <el-col :span="6" class="msgName">联系人：{{detailInfo.pyeeLinkMan}}</el-col>
                <el-col :span="6" class="msgName">联系方式：{{detailInfo.pyeePhone}}</el-col>
              </el-row>
              <el-row class="msgName keynote" style="margin-top: 10px">付款人信息：</el-row>
              <el-row>
                <el-col :span="6" class="msgName">付款人：{{detailInfo.pyerEnterpriseName}}</el-col>
                <el-col :span="6" class="msgName">付款人账号：{{detailInfo.pyer}}</el-col>
                <el-col :span="6" class="msgName">付款人开户行：{{detailInfo.pyerAcctSvcrName}}</el-col>
              </el-row>
              <el-row class="cutoff">
                <el-col :span="6" class="msgName">联系人：{{detailInfo.pyerLinkMan}}</el-col>
                <el-col :span="6" class="msgName">联系方式：{{detailInfo.pyerPhone}}</el-col>
              </el-row>
              <el-row class="msgName keynote" style="margin-top: 10px">附加信息：</el-row>
              <el-row>
                <el-col :span="6" class="msgName">合同编号：{{detailInfo.contractNo}}</el-col>
                <el-col :span="6" class="msgName">发票号：{{detailInfo.invoiceNo}}</el-col>
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

  </div>
</template>
<script>

  export default {
    name:'detail',
    created:function () {

    },
    data () {
      return {
        data:[
          {
            activeName2: "first",
            bianhao:"20170403123456",
            shoukuanfang:"A企业",
            fukuanfang:"B企业",
            zhandan:"20，000",
            lixi:"4%",
            data:"2018-01-30"
          }
        ],
        detailInfo:{
          receivableNo:'', //应收款编号
          orderNo:'',       //订单编号
          signer:'',//签发人账号
          accptr:'',//承兑人账号
          pyer:'',//付款人账号
          pyee:'',//收款人账号
          pyerEnterpriseName:'',//付款人企业名称
          pyeeEnterpriseName:'',//收款人企业名称
          pyerAcctSvcrName:'', //付款人开户行名称
          pyeeAcctSvcrName:'',//付款人开户行名称
          firstOwner:'',//本手持有人
          secondOwner:'',//下手持有人
          isseAmt:'',//票面金额
          cashedAmount:'',//已兑付金额
          status:'',//应收款上一状态
          lastStatus:'',//应收款下一状态
          isseDt:'',//签发日
          signInDt:'',//签收日
          dueDt:'', //到期日
          rate:'',//利率
          contractNo:'',//合同号
          invoiceNo:'',//发票号
          note:'', //备注
          discounted:'',//贴现标志
          discountInHandAmount:'',//贴现实际到手金额
          pyeeLinkMan:'',//收款人联系人
          pyerLinkMan:'',//付款人联系人
          pyeePhone:'',//收款人联系方式
          pyerPhone:''//付款人联系方式
        }
      }
    },
    methods:{
        getDetail(){
          this.$http.post('/v1/receivable/receivableInfo',{emulateJSON:true}).then((res) => {
            console.log(res.body);
            var code =  res.body.code;
            var data =  res.body.data;
            if(code != 0){
//            this.dialogVisible = true;
//            this.msg = res.body.message;
              return;
            }
            this.detailInfo = data;
          },(err) => {
            console.log(err);
          })
        },
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>
<style>
  /*.receiveDetails .el-button{*/
    /*!*float: left;*!*/
    /*width: 30%;*/
    /*border-radius: 4px;*/
    /*margin: 20px 0;*/
  /*}*/
</style>
