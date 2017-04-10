<template>
  <div class="launchOrder">
    <el-form ref="launchOrder" :model="launchOrder" :label-position="labelPosition">
      <el-card class="boxcard mybox">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">1. 请填写订单详情</span>
        </div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="供应商">
              <el-select v-model="launchOrder.payeeAccount" placeholder="请选择供应商">
                <el-option label="A企业" value="Aqiye"></el-option>
                <el-option label="B企业" value="Bqiye"></el-option>
                <el-option label="C企业" value="Cqiye"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货品名称">
              <el-input v-model="launchOrder.productName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货品单价">
              <el-input v-model="launchOrder.productPrice"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货品数量">
              <el-input v-model="launchOrder.productNum"></el-input>
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
            <el-form-item label="选择付款银行">
              <el-select v-model="launchOrder.payerBank" placeholder="请选择付款行">
                <el-option label="农业银行（默认）" value="农业银行"></el-option>
                <el-option label="工商银行" value="gongshang"></el-option>
                <el-option label="兴业银行" value="xingye"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="选择付款账户">
              <el-select v-model="launchOrder.payerBankAccount" placeholder="请选择付款账户">
                <el-option label="123456（默认账户）" value="123456"></el-option>
                <el-option label="234567" value="234567"></el-option>
                <el-option label="345678" value="345678"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收款方式">
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
          <el-col :span="12">
            <el-form-item label="选择申请入库的仓储">
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
        <el-button type="primary" @click.native.prevent="onSubmit">发起订单</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import store from '../../vuex/store'
  export default {
    name: 'index',
    data () {
      return {
        labelPosition: 'right',
        launchOrder: {
          payerAccount: store.state.commonData.payerAccount,
          payeeAccount: '',
          payerBank: '',
          payerBankAccount: '',
          orderId: '',
          payerRepo: '',
          payingMethod: '',
          productPrice: '',
          totalPrice:''
        },
      }
    },
    methods: {
      onSubmit () {
        console.log("已提交！");
        var temp = Object.assign({},this.launchOrder);/*深拷贝*/
        for (var item in temp){
            if((item=="productPrice")||(item=="productNum")){
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
        temp.totalPrice=temp.productPrice*temp.productNum;
        console.log(temp);
        this.$http.post("http://172.16.100.246/server_test/getData3.php", temp, {emulateJSON: true}).then(
          function (res) {
            console.log(res.body);
            store.commit('setCheckId', res.body.data.orderNo);
             console.log("now the state checkId is:" + store.state.checkId);
             this.$router.push('/allOrder/orderDetail');
          },
          function (err) {
            console.log(err);
          }
        );
      }
    },
    mounted () {
      var commonData = store.state.commonData;
      this.launchOrder.payerBank = commonData.payerBank;
      this.launchOrder.payerBankAccount = commonData.payerBankAccount;
      switch (commonData.payingMethod) {
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
</style>
