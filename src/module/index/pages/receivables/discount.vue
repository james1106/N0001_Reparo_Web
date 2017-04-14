<template>
  <div id="discount" class="discount">
    <el-breadcrumb separator=">" class="bread">
      <img src="../../assets/combinedShape.png" class="combinedShape">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>应收账款</el-breadcrumb-item>
      <el-breadcrumb-item>我的应收账款</el-breadcrumb-item>
      <el-breadcrumb-item>贴现</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <span class="sellerStepTtle">1. 请确认账款信息</span>
      </div>
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
      <div>
        <span class="sellerStepTtle">2. 请选择贴现银行</span>
      </div>
      <el-row>
        <el-form ref="discount" :model="discountParam" :label-position="labelPosition" :rules="discountRules">
          <el-col :span="12">
            <el-form-item label="请选择贴现银行" prop="discountBank">
              <el-select v-model="discountParam.discountBank" placeholder="请选择开户行">
                <el-option label="农业银行（默认）" value="4"></el-option>
                <el-option label="工商银行" value="5"></el-option>
                <el-option label="兴业银行" value="6"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-button type="primary" @click.native.prevent="onSubmit('launchOrder')">贴现确认</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>


<script>
  export default {
    name:'discount',
    data () {
      return {
        data:[
          {
            bianhao:"20170403123456",
            shoukuanfang:"A企业",
            fukuanfang:"B企业",
            zhandan:"20，000",
            lixi:"4%",
            data:"2018-01-30"
          }
        ],
        discountParam:{
          receivableNo:'',       //应收款编号
          applicantAcctId:'',    //申请人账号
          replyerAcctId:'',      //回复人账号
          discountApplyAmount:'' //申请贴现金额
        },
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
      accept(){
        this.$http.post('/v1/receivable/discountApply',this.acceptParam,{emulateJSON:true}).then((data) => {
          console.log(data);


        },(err) => {
          console.log(err);
        })
      }
    }
  }
</script>
