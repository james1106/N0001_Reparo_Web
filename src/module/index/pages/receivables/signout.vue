<template>
  <div id="signout">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>应收账款</el-breadcrumb-item>
      <el-breadcrumb-item>签发</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row>
      <el-row class="row-black row-padding">
        <el-col :span="16">订单编号：20170403123456</el-col>
        <el-col :span="8">发起时间：2017-04-03 10:29:11</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">购买人：B企业</el-col>
        <el-col :span="8">订单金额：20,000</el-col>
        <el-col :span="8">付款方式：应收账款支付</el-col>
      </el-row>
      <el-row >
        <el-col :span="6">货品名称：卡纸</el-col>
        <el-col :span="6">货品数量：1,000（箱)</el-col>
        <el-col :span="6">仓储机构： A仓储机构</el-col>
        <el-col :span="6">仓单编号： 010123456</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">支付银行：中国农业银行</el-col>
        <el-col :span="12">付款账户：123456</el-col>
      </el-row>
    </el-row>

    <el-form :label-position="top" :model="signoutInfo" label-width="200px" style="width:60%">
      <el-form-item label="应收账款编号">
        <el-col :span="18">
          <el-label v-model="signoutInfo.accountNo">{{signoutInfo.accountNo}}</el-label>
        </el-col>
      </el-form-item>
      <el-form-item label="账款金额">
        <el-col :span="18">
          <el-label v-model="signoutInfo.isseAmt">1111</el-label>
        </el-col>
      </el-form-item>
      <el-form-item label="账款到期日">
        <el-col :span="18">
          <el-date-picker
            v-model="signoutInfo.dueDt"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions0">
          </el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="带息利率(%)">
        <el-col :span="18">
          <el-input v-model="signoutInfo.rate"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="付款人名称">
        <el-col :span="18">
          <el-label v-model="signoutInfo.pyee">B企业</el-label>
        </el-col>
      </el-form-item>
      <el-form-item label="收款人名称">
        <el-col :span="18">
          <el-label v-model="signoutInfo.pyee">A企业</el-label>
        </el-col>
      </el-form-item>
      <el-form-item label="付款人开户行">
        <el-col :span="18">
          <el-label v-model="signoutInfo.pyee">农业银行</el-label>
        </el-col>
      </el-form-item>
      <el-form-item label="收款人开户行">
        <el-select v-model="signoutInfo.pyee" name="农业银行" placeholder="请选择开户行">
          <el-option label="农业银行（默认）" value="农业银行"></el-option>
          <el-option label="工商银行" value="工商银行"></el-option>
          <el-option label="兴业银行" value="兴业银行"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="付款人账户">
        <el-col :span="18">
          <el-label v-model="signoutInfo.pyer">123456</el-label>
        </el-col>
      </el-form-item>
      <el-form-item label="收款人账户">
        <el-select v-model="signoutInfo.pyee" name="1" placeholder="请选择开户账号">
          <el-option label="1234567(默认)" value="1"></el-option>
          <el-option label="2222222" value="2"></el-option>
          <el-option label="3444444" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="合同编号">
        <el-col :span="18">
          <el-input v-model="signoutInfo.invoiceNo"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="发票号">
        <el-col :span="18">
          <el-input v-model="signoutInfo.invoiceNo"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认签发</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
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
