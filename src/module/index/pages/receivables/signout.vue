<template>
  <div id="signout" class="signout">
    <el-card>
      <div>    <!--slot="header" class="clearfix"-->
        <span class="buyerStepTitle">1. 请填写订单详情</span>
      </div>
      <el-row class="dataTable">
        <el-row class="el-row-header">
          <el-col :span="6" style="margin-left: 19px;">订单编号：{{orderDetail.txDetail.orderId}}</el-col>
          <el-col :span="6">发起时间：{{orderDetail.txDetail.operationRecordVoList[0].operateTime | timeTransfer}}</el-col>
        </el-row>
        <el-row class="el-row-content" >
          <el-row class="el-row-content">
            <el-col :span="6" style="margin-left: 19px;">购买人：{{orderDetail.txDetail.payerAccount}}</el-col>
            <el-col :span="6">订单金额：{{orderDetail.txDetail.productTotalPrice}}</el-col>
            <el-col :span="6">付款方式：应收账款支付</el-col>
          </el-row>
          <el-row class="el-row-content">
            <el-col :span="6"  style="margin-left: 19px;">货品名称：{{orderDetail.txDetail.productName}}</el-col>
            <el-col :span="6" >货品数量：{{orderDetail.txDetail.productQuantity}}</el-col>
            <el-col :span="6">仓储机构：{{orderDetail.txDetail.payerRepo}}</el-col>
            <el-col :span="4">仓单编号：{{orderDetail.txDetail.payeeRepoCertNo}}</el-col>
          </el-row>
          <el-row class="el-row-content">
            <el-col :span="6" style="margin-left: 19px;">支付银行：{{orderDetail.txDetail.payerBank}}</el-col>
            <el-col :span="6">付款账户：{{orderDetail.txDetail.payerAccount}}</el-col>
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
            <el-label class="defaultMsg" v-model="signoutInfo.isseAmt">{{signoutInfo.isseAmt}}</el-label>
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
                <el-option :label="signoutInfo.pyeeBank" :value="signoutInfo.pyeeBank"></el-option>
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
              <el-option :label="signoutInfo.pyee" :value="signoutInfo.pyee"></el-option>
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
  import LocalStore from '../../../../common/store'
  import constantData from '../../../../common/const'

  export default {
    name:'signout',
    mounted:function () {
      var userInfo = LocalStore.fetchUserInfo();
      this.signoutInfo.pyeeBank = userInfo.acctSvcrName
      this.signoutInfo.pyee = userInfo.acctIds
      this.getOrderDetail()
    },
    data () {
      return {
        orderDetail:{
          txDetail:{
            orderId:'',
            payerAccount:'',
            productTotalPrice:'',
            productName:'',
            productQuantity:'',
            payerRepo:'',
            payeeRepoCertNo:'',
            payerBank:'',
            payerAccount:'',
            operationRecordVoList:[{}]
          }
        },
        signoutInfo:{
          isseAmt:'',    //票面金额
          dueDt:'',      //到期日
          rate:'',       //带息利率
          contractNo:'', //合同编号
          invoiceNo:'',   //发票号
          pyerName:'',   //付款人名称
          pyeeName:'',   //收款人名称
          pyerBank:'',   //付款人开户行
          pyeeBank:'',    //收款人开户行
          pyer:'',       //付款人账号
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
            { required: true, message: '请输入带息利率', trigger: 'blur' }
          ],
          pyeeBank: [
            { required: true, message: '请选择开户行', trigger: 'blur' }
          ],
          pyee:[
            { required: true, message: '请选择账户', trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      signout(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var data = new Date(this.signoutInfo.dueDt);
            var signParam = {
              orderNo:this.orderDetail.txDetail.orderId,
              pyer:this.signoutInfo.pyer,
              pyee:this.signoutInfo.pyee,
              isseAmt:this.signoutInfo.isseAmt,
              dueDt:data.getTime(),
              rate:this.signoutInfo.rate,
              contractNo:this.signoutInfo.contractNo,
              invoiceNo:this.signoutInfo.invoiceNo
            };
            this.$http.post('/v1/receivable/sign',signParam,{emulateJSON:true}).then((res) => {
              console.log(res.body.data);
              var code =  res.body.code;
              if(code != 0){
                return;
              }
              //跳到详情
              Store.commit('setCheckId',res.body.data);
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
              console.log(res.body.data);
              this.orderDetail = res.body.data;
              //将订单详情的值赋予签发表单
              this.signoutInfo.isseAmt = this.orderDetail.txDetail.productTotalPrice;
              this.signoutInfo.pyeeName = this.orderDetail.txDetail.payeeCompanyName;
              this.signoutInfo.pyer = this.orderDetail.txDetail.payerAccount;
              this.signoutInfo.pyerName = this.orderDetail.txDetail.payerCompanyName;
              this.signoutInfo.pyerBank = this.orderDetail.txDetail.payerBank;
            }, function (res) {
              console.log(res);
            }
          );
      }
    }
  }
</script>
