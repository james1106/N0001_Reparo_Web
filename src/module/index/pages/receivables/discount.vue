<template>
  <div id="discount" class="discount">
    <el-breadcrumb separator=">" class="bread">
      <svg class="icon combinedShape" aria-hidden="true">   <use xlink:href="#icon-locate"></use> </svg>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>应收账款</el-breadcrumb-item>
      <el-breadcrumb-item>我的应收账款</el-breadcrumb-item>
      <el-breadcrumb-item>贴现申请</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <span class="sellerStepTitle"><span class="sellerCircle">1</span>请确认账款信息</span>
      </div>
      <el-row>
        <el-col :span="24">
          <el-card class="box-card mybox" style="width:100%">
            <div slot="header" class="clearfix el-row-header">
              <svg class="icon detailIcon" aria-hidden="true"> <use xlink:href="#icon-yszk_hui"></use> </svg><span class="keynote">应收账款信息</span>
            </div>
            <div class="box-card mycard1 detailContent">
              <el-row>
                <el-col :span="8" class="msgName keynote">应收账款编号：{{detailInfo.detailVoList[0].receivableNo}}</el-col>
                <el-col :span="8" class="msgName">发起时间：{{detailInfo.detailVoList[0].isseDt | timeTransfer}}</el-col>
                <el-col :span="8" class="msgName">到期日：{{detailInfo.detailVoList[0].dueDt | timeTransfer}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8" class="msgName keynote">订单编号：{{detailInfo.detailVoList[0].orderNo}}</el-col>
                <el-col :span="8" class="msgName">收款人：{{detailInfo.detailVoList[0].pyeeEnterpriseName}}</el-col>
                <el-col :span="8" class="msgName">付款人：{{detailInfo.detailVoList[0].pyerEnterpriseName}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8" class="msgName">账款金额（元）:{{detailInfo.detailVoList[0].isseAmt}}</el-col>
                <el-col :span="8" class="msgName">票面利息(%)：{{detailInfo.detailVoList[0].rate}}</el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div>
        <span class="sellerStepTitle"><span class="sellerCircle">2</span>请选择贴现银行</span>
      </div>
      <el-row>
        <el-form ref="discount" :model="bankOption" :rules="discountRules">
          <el-col :span="12">
            <el-form-item label="请选择贴现银行" prop="bankOption">
              <el-select v-model="bankIndex" placeholder="请选择开户行">
                <template v-for="(item,index) in bankOption.enterpriseNameList">
                  <el-option :label="item" :value="index"></el-option>
                </template>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <span>该银行贴现利息:{{bankOption.rateList[bankIndex] | nullSituation}} %</span>
            &nbsp;<span>实际贴现金额:{{amount}}元</span>
          </el-col>
        </el-form>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-button type="primary" @click.native.prevent="discount()">贴现申请</el-button>
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
    mounted:function () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.getDetail();
    },
    computed:{
      amount(){
          var rate = this.bankOption.rateList[this.bankIndex];
          var amount = this.detailInfo.detailVoList[0].isseAmt * (1 - rate/100);
          return amount;
      }
    },
    data () {
      return {
        bankIndex:0,
        bankOption:{
          enterpriseNameList:[],
          rateList:[],
          acctIdList:[]
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
            replyerAcctId:this.bankOption.acctIdList[this.bankIndex],      //回复人账号
            discountApplyAmount:this.detailInfo.detailVoList[0].isseAmt, //申请贴现金额
            discountedRate:this.bankOption.rateList[this.bankIndex]
        }
        this.$http.post('../v1/receivable/discountApply',discountParam,{emulateJSON:true}).then((res) => {
          if(res.body.code != 0){
            this.$message.error(res.body.message);
            return;
          }
          this.$router.push('/allAccounts/discount/detail')
        },(err) => {
          console.log(err);
        })
      },
      getDetail(){
        var detailParam = {
          receivableNo:Store.state.checkIdRece,
          operatorAcctId:''
        }
        this.$http.post('../v1/receivable/receivableInfoWithSerial',detailParam,{emulateJSON:true}).then((res) => {
          console.log(res.body);
          var data =  res.body.data;
          if(res.body.code != 0){
            this.$message.error(res.body.message);
            return;
          }
          //详情数据
          this.getBankList();
          this.detailInfo = data;
          this.setStatusInfo(data);
        },(err) => {
          console.log(err);
        })
      },
      getBankList(){
        this.$http.get('../v1/account/allFinancialEnterpriseNameAndRate').then((res) => {
          var data =  res.body.data;
          if(res.body.code != 0){
            this.$message.error(res.body.message);
            return;
          }
          this.bankOption = data;
        },(err) => {
          console.log(err);
        })
      }
    }
  }
</script>
