<template>
  <div id="accept" class="receiveDetails">
    <el-card>
      <el-row>
        <el-row class="el-row-header statePosition">
          <el-col class="buyerColor stateShow"><svg class="icon detailIcon" aria-hidden="true">   <use xlink:href="#icon-zhuangtai"></use> </svg>
            已承兑待签收</el-col>
          <el-col class="dotipRow"><span class="doTip">卖家已签发应收账款，请您尽快</span><el-button size="small" style="border-color: rgb(0,150,215);color: rgb(0,150,215)" @click="accept()">承兑确认</el-button></el-col>
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
                <el-col :span="6" class="msgName">发起时间：{{detailInfo.detailVoList[0].isseDt}}</el-col>
                <el-col :span="6" class="msgName">到期日：{{detailInfo.detailVoList[0].dueDt}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="msgName">收款人：{{detailInfo.detailVoList[0].pyeeEnterpriseName}}</el-col>
                <el-col :span="6" class="msgName">付款人：{{detailInfo.detailVoList[0].pyerEnterpriseName}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="msgName">账款金额（元）：{{detailInfo.detailVoList[0].isseAmt}}</el-col>
                <el-col :span="6" class="msgName">票面利息(%)：{{detailInfo.detailVoList[0].rate}}</el-col>
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
import userInfo from '../../../../common/store'
  export default {
    name:'signout',
    /*created:function () {
      this.getDetail();
    },*/
    mounted () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.getDetail();

    },
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
      accept(){
        var acceptParam = {
            receivableNo:this.detailInfo.detailVoList[0].receivableNo, //应收款编号
            replyerAcctId:userInfo.fetchUserInfo().acctIds,//回复人账号
            response:0       //回复意见 0.同意 1.拒绝
        }

        this.$http.post('../v1/receivable/accept',acceptParam,{emulateJSON:true}).then((res) => {
          console.log(res.body);
          var code = res.body.code
          if(code != 0){
            return;
          }
          this.$router.push('/allAccounts/accept/detail')
        },(err) => {
          console.log(err);
        })
      },
      getDetail(){
        var receivableNo = Store.state.checkIdRece;
        this.$http.post('../v1/receivable/receivableInfoWithSerial',{receivableNo:receivableNo,operatorAcctId:''},{emulateJSON:true}).then((res) => {
          console.log(res.body);
          var code =  res.body.code;
          var data =  res.body.data;
          if(code != 0){
            return;
          }
          this.detailInfo = data;
        },(err) => {
          console.log(err);
        })
      }
    },
  }
</script>
