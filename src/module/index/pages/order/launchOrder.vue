<template>
  <div class="launchOrder">
    <el-form ref="launchOrder" :model="launchOrder" label-width="200px" style="width:60%">
      <el-form-item label="供应商">
        <el-select v-model="launchOrder.payeeAccount" placeholder="请选择供应商">
          <el-option label="A企业" value="Aqiye"></el-option>
          <el-option label="B企业" value="Bqiye"></el-option>
          <el-option label="C企业" value="Cqiye"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="货品名称">
        <el-input v-model="launchOrder.productName"></el-input>
      </el-form-item>
      <el-form-item label="货品数量">
        <el-input v-model="launchOrder.productNum"></el-input>
      </el-form-item>
      <el-form-item label="货品单价">
        <el-input v-model="launchOrder.productPrice"></el-input>
      </el-form-item>
      <el-form-item label="订单金额">
        <el-input v-model="launchOrder.totalPrice"></el-input>
      </el-form-item>
      <el-form-item label="入库">
        <el-input v-model="launchOrder.ruku"></el-input>
      </el-form-item>
      <el-form-item label="选择付款银行">
        <el-select v-model="launchOrder.payerBank" placeholder="请选择付款行">
          <el-option label="农业银行（默认）" value="nongye"></el-option>
          <el-option label="工商银行" value="gongshang"></el-option>
          <el-option label="兴业银行" value="xingye"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择付款账户">
        <el-select v-model="launchOrder.payerBankAccount" placeholder="请选择付款账户">
          <el-option label="123456（默认账户）" value="123456"></el-option>
          <el-option label="234567" value="234567"></el-option>
          <el-option label="345678" value="345678"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收款方式">
        <el-checkbox v-model="launchOrder.payingMethod">应收账款支付</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import store from '../../store'
  export default {
    name: 'index',
    data () {
      return {
        launchOrder: {
          payeeAccount: '',
          payerBank: '',
          payerBankAccount: '',
          orderId: ''
        },
      }
    },
    methods: {
      onSubmit () {
        console.log(this.launchOrder.payeeAccount);
        this.$http.get("http://172.16.100.246/server_test/getData3.php").then(
          function (res) {
            console.log(res.body.object);
            store.commit('setCheckId', res.body.object.orderId);
            console.log("now the srtate is:" + store.state.checkId);
            this.$router.push('/allOrder/orderDetail');
          },
          function (err) {
            console.log(err);
          }
        );
        console.log("已提交！");
      }
    }
  }
</script>
<style>
  .launchOrder .el-select {
    width: 100%;
  }

  .launchOrder .el-button {
    float: right;
  }
</style>
