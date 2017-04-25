<template>
  <div class="launchOrder">
    <div>
      <el-breadcrumb separator=">" class="bread">
        <svg class="icon combinedShape" aria-hidden="true">   <use xlink:href="#icon-locate"></use> </svg>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>买入的订单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form ref="launchOrder" :model="launchOrder" :label-position="top" :rules="creationRules">
      <el-card class="boxcard">
        <div>    <!--slot="header" class="clearfix"-->
          <span class="buyerStepTitle">1. 请填写订单详情</span>
        </div>
       <el-card>
        <el-row>
          <el-col :span="8">
            <el-form-item label="供应商" prop="payeeCompanyName">
              <el-select v-model="launchOrder.payeeCompanyName">
                <template v-for="item in supplyList">
                  <el-option :label="item" :value="item"></el-option>
                </template>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="货品名称" prop="productName">
              <el-input class="clearfix" v-model="launchOrder.productName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="货品单价(元)" prop="productUnitPrice">
              <el-input v-model="launchOrder.productUnitPrice"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="货品数量" prop="productQuantity">
              <el-input v-model="launchOrder.productQuantity"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="订单金额（元）">
              <!--<el-input v-model="launchOrder.totalPrice" :disabled="true" :value="launchOrder.productUnitPrice*launchOrder.productQuantity">{{launchOrder.productUnitPrice*launchOrder.productQuantity}}</el-input>-->
              <div class="el-input">{{launchOrder.productUnitPrice*launchOrder.productQuantity}}</div>
            </el-form-item>
          </el-col>
        </el-row>
       </el-card>

        <div>
          <span class="buyerStepTitle">2. 请填写付款信息</span>
        </div>
       <el-card>
        <el-row>
          <el-col :span="8">
            <el-form-item label="选择付款银行" prop="payerBank">
              <el-select v-model="launchOrder.payerBank">
                <el-option :label="launchOrder.payerBank" :value="launchOrder.payerBank"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="选择付款账户" prop="payerAccount">
              <el-select v-model="launchOrder.payerAccount">
                <el-option :label="launchOrder.payerAccount" :value="launchOrder.payerAccount"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row>
          <el-col :span="8">
            <el-form-item label="收款方式" prop="payingMethod">
              <el-checkbox v-model="launchOrder.payingMethod" class="defaultMsg">应收账款支付</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
       </el-card>
        <div>
          <span class="buyerStepTitle">3. 请选择货品入库仓储</span>
        </div>
       <el-card>
        <el-row>
          <el-col :span="8">
            <el-form-item label="选择申请入库的仓储" prop="payerRepo">
              <el-select v-model="launchOrder.payerRepo">
                <template v-for="item in repoList">
                  <el-option :label="item" :value="item"></el-option>
                </template>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
       </el-card>
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
            else if(!/^(\+)?\d+(\.\d{1,2})?$/.test(value)){
              callback(new Error("请输入正确货品单价，最高精确到小数点后两位"));
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
            {required:true, message:'请输入货品名称', }
          ],
          productUnitPrice:[
            {required:true, message:'请输入货品单价', },
            {validator:validatePass, trigger:'blur'}
          ],
          productQuantity:[
            {required:true, message:'请输入货品数量',},
            {validator:validatePass1,trigger:'blur'}
          ],
          payerBank:[
            {required:true, message:'请输入付款行', }
          ],
          payerAccount:[
            {required:true, message:'请输入付款账户', }
          ],
          payingMethod:[
            {required:true, message:'请输入收款方式', }
          ],
          payerRepo:[
            {required:true, message:'请选择入库仓储', },
          ]
        },
        supplyList:'',
        repoList:''
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
            this.$http.post("../v1/order/creation", temp, {emulateJSON: true}).then(
              function (res) {
                console.log(res.body);
                store.commit('setCheckIdOrder', res.body.data.orderNo);
                console.log("now the state checkIdOrder is:" + store.state.checkIdOrder);
                this.$router.push('/order/orderDetail');
              },
              function (err) {
                console.log(err);
              }
            );
          }
        });//validate

      },//submit
    },
    mounted () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
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
      //获取所有融资企业名（后台数据应该去掉自己的企业名）
      this.$http.get("../v1/account/allEnterpriseName?roleCode=0").then(function(res){
        this.supplyList=res.body.data;
        this.launchOrder.payeeCompanyName=this.supplyList[0];
        console.log("the supply list: "+res.body.data);
      },function(err){
        console.log(err)
      });
      //获取所有仓储公司名
      this.$http.get("../v1/account/allEnterpriseName?roleCode=2").then(function(res){
        this.repoList=res.body.data;
        this.launchOrder.payerRepo=this.repoList[0];
        console.log("the repo list: "+res.body.data);
      },function(err){
        console.log(err)
      });
    }
  }
</script>
<style>
  .launchOrder .mybox {
    margin-bottom: 20px !important;
  }

  .launchOrder .el-form-item__label {
    width: 30% !important;
    float: none;
  }

  .launchOrder .el-select .el-input {
    width: 100% !important;
    margin: 0px 0.2%!important;
  }

  .launchOrder .el-select, .el-input {
    width: 90% !important;
    margin: 0px 2%!important;
  }

  .launchOrder .el-button {
    float: left;
    width: 30%;
    border-radius: 4px;
    margin: 20px 0;
  }
  .el-form-item__error {left:33% !important;top: 20%!important;}

  .el-input__inner{
    width: 100% !important;
    height: 30px!important;
    border-color: #CCCCCC!important;
    border-radius: 2px!important;
  }
  .el-form-item__label{
    /*line-height: normal!important;*/
    /*background-color: #F7F7F7;*/
    /*border-right: 1px solid #EEEEEE;*/
    font-size: 12px!important;
  }
  .el-col-12{
    height:40px;
  }
  .el-checkbox__input{
    margin-left: 10px;
  }
  .launchOrder .el-row{
    height: 70px!important;
  }
  .launchOrder .el-card{
    border: 1px solid rgb(238,238,238)!important;
    padding-bottom: 10px!important;
  }
  .launchOrder .el-card__body{
    padding-bottom: 0px!important;
  }
</style>
