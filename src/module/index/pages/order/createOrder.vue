<template>
  <div class="launchOrder">
    <el-form ref="launchOrder" :model="launchOrder" :label-position="labelPosition" :rules="creationRules">
      <el-card class="boxcard mybox">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">1. 请填写订单详情</span>
        </div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="供应商" prop="payeeCompanyName">
              <el-select v-model="launchOrder.payeeCompanyName" placeholder="请选择供应商">
                <el-option label="李四集团" value="李四集团"></el-option>
                <el-option label="B企业" value="Bqiye"></el-option>
                <el-option label="C企业" value="Cqiye"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货品名称" prop="productName">
              <el-input v-model="launchOrder.productName"></el-input>
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
      </el-card>
      <el-card class="boxcard mybox">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">2. 请填写付款信息</span>
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
              <el-checkbox v-model="launchOrder.payingMethod">应收账款支付</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="boxcard mybox">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">3. 请选择货品入库仓储</span>
        </div>
        <el-row>
          <el-col :span="15">
            <el-form-item label="选择申请入库的仓储" prop="payerRepo">
              <el-select v-model="launchOrder.payerRepo" placeholder="请选择入库仓储">
                <el-option label="A企业" value="Aqiye"></el-option>
                <el-option label="B企业" value="Bqiye"></el-option>
                <el-option label="C企业" value="Cqiye"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="onSubmit('launchOrder')">发起订单</el-button>
      </el-form-item>
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
  }

  .launchOrder .el-select, .el-input {
    width: 70% !important;
  }

  .launchOrder .el-button {
    float: right;
  }
  .el-form-item__error {left:30% !important;}
</style>
