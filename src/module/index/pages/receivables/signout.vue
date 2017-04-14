<template>
  <div id="signout" class="signout">
    <el-card>
      <div>    <!--slot="header" class="clearfix"-->
        <span class="buyerStepTitle">1. 请填写订单详情</span>
      </div>
      <el-row class="dataTable">
        <el-row class="el-row-header">
          <el-col :span="6" style="margin-left: 19px;">订单编号：{{orderDetail.orderNo}}</el-col>
          <el-col :span="6">发起时间：{{orderDetail.orderGenerateTime}}</el-col>
        </el-row>
        <el-row class="el-row-content" >
          <el-row class="el-row-content">
            <el-col :span="6" style="margin-left: 19px;">购买人：{{orderDetail.oppositeAccount}}</el-col>
            <el-col :span="6">订单金额：{{orderDetail.totalPrice}}</el-col>
            <el-col :span="6">付款方式：应收账款支付</el-col>
          </el-row>
          <el-row class="el-row-content">
            <el-col :span="6"  style="margin-left: 19px;">货品名称：{{orderDetail.productName}}</el-col>
            <el-col :span="6" >货品数量：{{orderDetail.productNum}}</el-col>
            <el-col :span="6">仓储机构：{{orderDetail.payerRepoCompany}}</el-col>
            <el-col :span="4">仓单编号：{{orderDetail.repoCertNo}}</el-col>
          </el-row>
          <el-row class="el-row-content">
            <el-col :span="6" style="margin-left: 19px;">支付银行：{{orderDetail.payerBank}}</el-col>
            <el-col :span="6">付款账户：{{orderDetail.payerBankAccount}}</el-col>
          </el-row>
        </el-row>
      </el-row>
      <div>
        <span class="buyerStepTitle">2. 请填写应收账款信息</span>
      </div>
      <el-form :label-position="labelPosition" :model="signoutInfo" :rules="signoutRules" ref="signoutInfo">
        <el-row>
        <el-col :span="12">
          <el-form-item label="应收账款编号" prop="accountNo">
            <el-label class="clearfix defaultMsg" v-model="signoutInfo.isseAmt">这个要去掉</el-label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="账款金额" prop="isseAmt">
            <el-label class="clearfix" v-model="signoutInfo.isseAmt">{{signoutInfo.isseAmt}}</el-label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="账款到期日" prop="dueDt">
            <el-date-picker
              v-model="signoutInfo.dueDt"
              type="date"
              placeholder=""
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
          <el-form-item label="付款人名称" prop="pyerName">
            <el-label v-model="signoutInfo.pyerName" class="defaultMsg">{{signoutInfo.pyerName}}</el-label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收款人名称" prop="pyeeName">
            <el-label v-model="signoutInfo.pyeeName" class="defaultMsg">{{signoutInfo.pyeeName}}</el-label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="付款人开户行" prop="pyerBank">
            <el-label v-model="signoutInfo.pyerBank" class="defaultMsg">{{signoutInfo.pyerBank}}</el-label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收款人开户行" prop="pyeeBank">
            <el-select v-model="signoutInfo.pyeeBank" name="农业银行" placeholder="">
              <el-option label="农业银行（默认）" value="农业银行"></el-option>
              <el-option label="工商银行" value="工商银行"></el-option>
              <el-option label="兴业银行" value="兴业银行"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="付款人账户" prop="pyer">
            <el-label v-model="signoutInfo.pyer" class="defaultMsg">{{signoutInfo.pyer}}</el-label>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收款人账户" prop="pyee">
            <el-select v-model="signoutInfo.pyee" name="1" placeholder="">
              <el-option label="1234567(默认)" value="1"></el-option>
              <el-option label="2222222" value="2"></el-option>
              <el-option label="3444444" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同编号" prop="invoiceNo">
            <el-input v-model="signoutInfo.contractNo"></el-input>
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
          <el-button type="primary" @click="signout('signoutInfo')">确认签发</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
  import '../../../../assets/css/style.css'
  import Store from '../../vuex/store'

  export default {
    name:'signout',
    created:function () {
      this.getOrderDetail()
    },
    data () {
      return {
        orderDetail:{},
        signoutInfo:{
          isseAmt:'',    //票面金额
          dueDt:'',      //到期日
          rate:'',       //带息利率
          contractNo:'', //合同编号
          invoiceNo:'',   //发票号

          pyerName:'杭州好牛信息科技有限公司',   //付款人名称
          pyeeName:'杭州趣链科技有限公司',   //收款人名称
          pyerBank:'农业银行',   //付款人开户行
          pyeeBank:'',    //收款人开户行
          pyer:'123456',       //付款人账号
          pyee:''       //收款人账号
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
        }],
        signoutRules:{
          dueDt: [
            { type: 'date',required: true, message: '请选择账款到期日', trigger: 'blur' }
          ],
          rate: [
            { required: true, message: '请输入带息利率', trigger: 'change' }
          ],
          pyeeBank: [
            { required: true, message: '请选择开户行', trigger: 'change' }
          ],
          pyee:[
            { required: true, message: '请选择账户', trigger: 'change' }
          ]
        }
      }
    },
    methods:{
      signout(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var signParam = {
              orderNo:this.orderDetail.orderNo,
              pyer:this.signoutInfo.pyer,
              pyee:this.signoutInfo.pyee,
              isseAmt:this.signoutInfo.isseAmt,
              dueDt:this.signoutInfo.dueDt,//要转时间戳
              rate:this.signoutInfo.rate,
              contractNo:this.signoutInfo.contractNo,
              invoiceNo:this.signoutInfo.invoiceNo
            };
            this.$http.post('/v1/receivable/sign',signParam,{emulateJSON:true}).then((res) => {
              console.log(res.body);
              var code =  res.body.code;
              if(code != 0){
                return;
              }
              //跳到详情
              this.$router.push('/allAccounts/signout/detail')
            },(err) => {
              console.log(err);
            })
          } else {
            return false;
          }
        },(err) => {
          console.log(err);
        })
      },
      getOrderDetail(){
          console.log("the state checkId is:" + Store.state.checkId);
          this.$http.get("/v1/order/detail?orderNo=" + Store.state.checkId).then(
            function (res) {
              console.log(res.body);
              this.orderDetail = res.body.data;

              //将订单详情的值赋予签发表单
              this.signoutInfo.isseAmt = this.orderDetail.receAmount;
              this.signoutInfo.pyee = this.orderDetail.receivingSide;
              this.signoutInfo.pyer = this.orderDetail.payerBankAccount;
              this.signoutInfo.pyerName = this.orderDetail.payingSide;
              this.signoutInfo.pyerBank = this.orderDetail.payerBank;
            }, function (res) {
              console.log(res);
            }
          );
      }
    }
  }
</script>
