<template>
  <div class="launchOrder">
    <div>
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>买入的订单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form ref="launchOrder" :model="launchOrder" :label-position="labelPosition" :rules="creationRules">
      <el-card class="boxcard">
        <div>    <!--slot="header" class="clearfix"-->
          <span class="buyerStepTitle">1. 请填写订单详情</span>
        </div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="供应商" prop="payeeCompanyName">
              <el-select v-model="launchOrder.payeeCompanyName" placeholder="请选择供应商">
                <el-option label="企业1ocqic" value="企业1i194k0"></el-option>
                <el-option label="B企业" value="Bqiye"></el-option>
                <el-option label="C企业" value="Cqiye"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货品名称" prop="productName">
              <el-input class="clearfix" v-model="launchOrder.productName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货品单价" prop="productUnitPrice">
              <el-input v-model="launchOrder.productUnitPrice"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货品数量" prop="productQuantity">
              <el-input v-model="launchOrder.productQuantity"></el-input>
            </el-form-item>
          </el-col>
          <!--<el-col :span="12">
            <el-form-item label="订单金额">
              <el-input v-model="launchOrder.totalPrice"></el-input>
            </el-form-item>
          </el-col>-->
        </el-row>
        <div>
          <span class="buyerStepTitle">2. 请填写付款信息</span>
        </div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="选择付款银行" prop="payerBank">
              <el-select v-model="launchOrder.payerBank" placeholder="请选择付款行">
                <el-option label="浙商银行（默认）" value="浙商银行"></el-option>
                <el-option label="工商银行" value="gongshang"></el-option>
                <el-option label="兴业银行" value="xingye"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="选择付款账户" prop="payerAccount">
              <el-select v-model="launchOrder.payerAccount" placeholder="请选择付款账户">
                <el-option label="111111111（默认账户）" :value="UserInfo.acctIds"></el-option>
                <el-option label="234567" value="234567"></el-option>
                <el-option label="345678" value="345678"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收款方式" prop="payingMethod">
              <el-checkbox v-model="launchOrder.payingMethod" class="defaultMsg">应收账款支付</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <div>
          <span class="buyerStepTitle">3. 请选择货品入库仓储</span>
        </div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="选择申请入库的仓储" prop="payerRepo">
              <el-select v-model="launchOrder.payerRepo" placeholder="请选择入库仓储">
                <el-option label="仓储36hru64" value="仓储1m7o4k0"></el-option>
                <el-option label="B企业" value="Bqiye"></el-option>
                <el-option label="C企业" value="Cqiye"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-button type="primary" @click.native.prevent="onSubmit('launchOrder')">发起订单</el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-form>
  </div>
</template>
<script>
  import store from '../../vuex/store'
  import Store from '../../../../common/store'
  export default {
    name: 'index',
    data () {
        var validatePass= (rule,value,callback)=>{
            if(value=='') {
                callback(new Error("请输入货品单价"));
            }
            else if(!/^(\+)?\d+(\.\d+)?$/.test(value)){
              callback(new Error("请输入正确货品单价"));
            }
            else {
                callback();
            }
        };
        var validatePass1= (rule,value,callback)=>{
            if(value==''){
                callback(new Error("请输入货品数量"));
            }
            else if(!/^(\+)?\d+$/.test(value)){
                callback(new Error("请输入正确货品数量"));
            }
            else {
                callback();
            }
          };
      return {
        labelPosition: 'right',
        launchOrder: {
          payeeCompanyName: '',
          productName:'',
          productUnitPrice:'',
          productQuantity:'',
          payerBank: '',
          payerAccount: '',
          payingMethod: '',
          payerRepo: '',
        },
        creationRules: {
          payeeCompanyName:[
            {required:true, message:'请选择供应商'},
          ],
          productName:[
            {required:true, message:'请输入货品名称', trigger:'blur'}
          ],
          productUnitPrice:[
            {required:true, message:'请输入货品单价', trigger:'blur'},
            {validator:validatePass, trigger:'blur'}
          ],
          productQuantity:[
            {required:true, message:'请输入货品数量', trigger:'blur'},
            {validator:validatePass1,trigger:'blur'}
          ],
          payerRepo:[
            {required:true, message:'请选择入库仓储', },
          ]
        }
      }
    },
    computed:{
      UserInfo () {
          return Store.fetchUserInfo();
      }
    },
    methods: {
      onSubmit (formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return false;
          }
          else {
            console.log("已提交！");
            var temp = Object.assign({},this.launchOrder);/*深拷贝*/
            for (var item in temp){
              if((item=="productUnitPrice")||(item=="productQuantity")){
                temp[item]=parseInt(temp[item]);
              }
              if(item=="payingMethod"){
                switch (temp[item]) {
                  case true:temp[item]=0;break;
                  case false:temp[item]=1;break;
                  default:break;
                }
              }
            }
            temp.productTotalPrice=temp.productUnitPrice*temp.productQuantity;
            temp.payerBankClss=Store.fetchUserInfo().svcrClass;//应该都从localStorage里面取
            console.log(temp);
            this.$http.post("/v1/order/creation", temp, {emulateJSON: true}).then(
              function (res) {
                console.log(res.body);
                store.commit('setCheckId', res.body.data);
                console.log("now the state checkId is:" + store.state.checkId);
                this.$router.push('/order/orderDetail');
              },
              function (err) {
                console.log(err);
              }
            );
          }
        });//validate

      }//submit
    },
    mounted () {
      var userInfo = Store.fetchUserInfo();
      this.launchOrder.payerBank = userInfo.acctSvcrName;
      this.launchOrder.payerAccount = userInfo.acctIds;
      console.log(userInfo);
      switch (0) {
        case 0:
          this.launchOrder.payingMethod = true;
          break;//应收账款方式
        case 1:
          this.launchOrder.payingMethod = false;
          break;//现金方式
        default:
          break;
      }
    }
  }
</script>
<style>
  .launchOrder .mybox {
    margin-bottom: 20px !important;
  }

  .launchOrder .el-form-item__label {
    width: 30% !important;
  }

  .launchOrder .el-select .el-input {
    width: 100% !important;
    margin: 0px 0.2%!important;
  }

  .launchOrder .el-select, .el-input {
    width: 65% !important;
    margin: 0px 2%!important;
  }

  .launchOrder .el-button {
    float: left;
    width: 30%;
    border-radius: 4px;
    margin: 20px 0;
  }
  .el-form-item__error {left:33% !important;top: 20%!important;}
  .buyerStepTitle{
    color:rgb(0,150,215);
    line-height: 50px;
    font-size: 14px;
  }
  .el-form-item__content{
    border:1px solid #EEEEEE;
    /*line-height: 41px!important;*/
    /*padding: 5px 10px;*/
  }
  .el-input__inner{
    width: 100% !important;
    height: 30px!important;
    border-color: #CCCCCC!important;
    border-radius: 2px!important;
  }
  .el-form-item__label{
    line-height: normal!important;
    background-color: #F7F7F7;
    border-right: 1px solid #EEEEEE;
    font-size: 12px!important;
  }
  .el-input{
    /*margin: 0 20px!important;*/
    /*margin: 0px 2%!important;*/
  }
  .el-col-12{
    height:40px;
  }
  .el-checkbox__input{
    margin-left: 10px;
  }
</style>
