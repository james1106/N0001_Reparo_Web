<template>
  <div class="faqidingdan">
    <el-form ref="faqidingdan" :model="faqidingdan" label-width="200px">
      <el-form-item label="供应商">
        <el-select v-model="faqidingdan.gongyingshang" placeholder="请选择供应商">
          <el-option label="A企业" value="Aqiye"></el-option>
          <el-option label="B企业" value="Bqiye"></el-option>
          <el-option label="C企业" value="Cqiye"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="货品名称">
        <el-input v-model="faqidingdan.huopingming"></el-input>
      </el-form-item>
      <el-form-item label="货品数量">
        <el-input v-model="faqidingdan.huopingshu"></el-input>
      </el-form-item>
      <el-form-item label="订单金额">
        <el-input v-model="faqidingdan.jine"></el-input>
      </el-form-item>
      <el-form-item label="选择付款银行">
        <el-select v-model="faqidingdan.fukuanhang" placeholder="请选择付款行">
          <el-option label="农业银行（默认）" value="nongye"></el-option>
          <el-option label="工商银行" value="gongshang"></el-option>
          <el-option label="兴业银行" value="xingye"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择付款账户">
        <el-select v-model="faqidingdan.fukuanzhanghu" placeholder="请选择付款账户">
          <el-option label="123456（默认账户）" value="123456"></el-option>
          <el-option label="234567" value="234567"></el-option>
          <el-option label="345678" value="345678"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收款方式">
        <el-checkbox v-model="faqidingdan.fangshi">应收账款支付</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name:'index',
    data () {
      return {
          faqidingdan:{
              gongyingshang:'',
              fukuanhang:'',
              fukuanzhanghu:'',
          },
      }
    },
    methods:{
        onSubmit () {
            console.log("已提交！");
          this.$router.push('/daiquerendingdan');
   }
    }
  }
</script>
