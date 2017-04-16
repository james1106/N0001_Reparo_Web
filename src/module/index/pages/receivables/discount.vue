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
                <el-col :span="6" class="msgName">账款金额（元）:{{detailInfo.detailVoList[0].isseAmt}}</el-col>
                <el-col :span="6" class="msgName">票面利息(%)：{{detailInfo.detailVoList[0].rate}}</el-col>
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
            <el-form-item label="请选择贴现银行" prop="bankOption">
              <el-select v-model="bankOption" placeholder="请选择开户行">
                <el-option :label="bankOption" :value="bankOption"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-button type="primary" @click.native.prevent="discount()">贴现确认</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import LocalStore from '../../../../common/store'
  import Store from '../../vuex/store'
  export default {
    name:'discount',
    created:function () {
      this.bankOption = LocalStore.fetchUserInfo().acctSvcrName
      this.getDetail()
    },
    data () {
      return {
        bankOption:'',
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
        detailInfo:{
          detailVoList:[{
            receivableNo:'',
            orderNo:'',
            isseDt:'',
            dueDt:'',
            pyeeEnterpriseName:'',
            pyerEnterpriseName:'',
            isseAmt:'',
            rate:''
          }
          ]
        }
      }
    },
    methods:{
      discount(){
        var discountParam = {
            receivableNo:this.detailInfo.detailVoList[0].receivableNo,       //应收款编号
            applicantAcctId:LocalStore.fetchUserInfo().acctIds,   //申请人(本人)账号
            replyerAcctId:'1',      //回复人账号
            discountApplyAmount:this.detailInfo.detailVoList[0].isseAmt //申请贴现金额
        }
        this.$http.post('/v1/receivable/discountApply',discountParam,{emulateJSON:true}).then((res) => {
          console.log(res.body);
          var code =  res.body.code;
          if(code != 0){
            return;
          }
          this.$router.push('/allAccounts/discount/detail')
        },(err) => {
          console.log(err);
        })
      },
      getDetail(){
        var detailParam = {
          receivableNo:Store.state.checkId,
          operatorAcctId:''
        }
        this.$http.post('/v1/receivable/receivableInfoWithSerial',detailParam,{emulateJSON:true}).then((res) => {
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
      }
    }
  }
</script>
