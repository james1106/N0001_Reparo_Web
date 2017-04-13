<template>
  <div id="signout" class="signout">
    <el-card>
      <div>    <!--slot="header" class="clearfix"-->
        <span class="buyerStepTitle">1. 请填写订单详情</span>
      </div>
      <el-row class="dataTable">
        <el-row class="el-row-header">
          <el-col :span="6" style="margin-left: 19px;">订单编号：20170403123456</el-col>
          <el-col :span="6">发起时间：2017-04-03 10:29:11</el-col>
        </el-row>
        <el-row class="el-row-content" >
          <el-row class="el-row-content">
            <el-col :span="6" style="margin-left: 19px;">购买人：B企业</el-col>
            <el-col :span="6">订单金额：20,000</el-col>
            <el-col :span="6">付款方式：应收账款支付</el-col>
          </el-row>
          <el-row class="el-row-content">
            <el-col :span="6"  style="margin-left: 19px;">货品名称：卡纸</el-col>
            <el-col :span="6" >货品数量：1,000（箱)</el-col>
            <el-col :span="6">仓储机构：A仓储机构</el-col>
            <el-col :span="4">仓单编号：010123456</el-col>
          </el-row>
          <el-row class="el-row-content">
            <el-col :span="6" style="margin-left: 19px;">支付银行：中国农业银行</el-col>
            <el-col :span="6">付款账户：123456</el-col>
          </el-row>
        </el-row>
      </el-row>
      <div>
        <span class="buyerStepTitle">2. 请填写应收账款信息</span>
      </div>
      <el-form :label-position="labelPosition" :model="signoutInfo">
        <el-row>
        <el-col :span="12">
          <el-form-item label="应收账款编号" prop="accountNo">
            <el-label class="clearfix defaultMsg" v-model="signoutInfo.accountNo">{{signoutInfo.accountNo}}</el-label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="账款金额" prop="isseAmt">
            <el-input class="clearfix" v-model="signoutInfo.isseAmt">{{signoutInfo.isseAmt}}</el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="账款到期日" prop="dueDt">
            <el-date-picker
              v-model="signoutInfo.dueDt"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions0">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="带息利率(%)" prop="rate">
            <el-input v-model="signoutInfo.rate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="付款人名称" prop="pyee">
            <el-label v-model="signoutInfo.pyee" class="defaultMsg">杭州好牛信息科技有限公司</el-label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收款人名称" prop="pyee">
            <el-label v-model="signoutInfo.pyee" class="defaultMsg">杭州趣链科技有限公司</el-label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="付款人开户行" prop="pyee">
            <el-label v-model="signoutInfo.pyee" class="defaultMsg">农业银行</el-label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收款人开户行" prop="pyee">
            <el-select v-model="signoutInfo.pyee" name="农业银行" placeholder="请选择开户行">
              <el-option label="农业银行（默认）" value="农业银行"></el-option>
              <el-option label="工商银行" value="工商银行"></el-option>
              <el-option label="兴业银行" value="兴业银行"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="付款人账户" prop="pyer">
            <el-label v-model="signoutInfo.pyer" class="defaultMsg">123456</el-label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收款人账户" prop="pyee">
            <el-select v-model="signoutInfo.pyee" name="1" placeholder="请选择开户账号">
              <el-option label="1234567(默认)" value="1"></el-option>
              <el-option label="2222222" value="2"></el-option>
              <el-option label="3444444" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同编号" prop="invoiceNo">
            <el-input v-model="signoutInfo.invoiceNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发票号" prop="invoiceNo">
            <el-input v-model="signoutInfo.invoiceNo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-form>
      <el-row>
        <el-col :span="12">
          <el-button type="primary" @click="onSubmit">确认签发</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
  import '../../../../assets/css/style.css'
  export default {
    name:'signout',
    data () {
      return {
        signoutInfo:{
          accountNo:'1234567',  //应收账款编号
          orderNo:'',    //订单编号
          pyer:'',       //付款人账号
          pyee:'',       //收款人账号
          isseAmt:'',    //票面金额
          dueDt:'',      //到期日
          rate:'',       //带息利率
          contractNo:'', //合同编号
          invoiceNo:''   //发票号
        },
        options: [{
          value: '选项1',
          label: '农业银行（默认）'
        }, {
          value: '选项2',
          label: '工商银行'
        }, {
          value: '选项3',
          label: '兴业银行'
        }]
      }
    }
  }
</script>
