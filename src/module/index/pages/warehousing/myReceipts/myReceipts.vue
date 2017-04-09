<template>
  <div id="index">
    <!--<div style="width: auto;height: auto;border: 1px solid #d1dbe5">-->
    <el-row>
      <span style="margin-left: 35px">我的仓单</span>
      <el-col :span="24">
        <el-card class="box-card card">
          <el-form ref="list" :model="list" labelWidth="80px">
            <el-row>
              <el-col :span="8"><el-form-item label="订单编号:"><span v-model="list.number">{{list.orderNumber}}</span></el-form-item></el-col>
              <el-col :span="8"><el-form-item label="创建时间:"><span v-model="list.time">{{list.time}}</span></el-form-item></el-col>
              <el-col :span="8"><el-form-item label="仓单编号:"><span v-model="list.state">{{list.receiptNumber}}</span></el-form-item></el-col>
            </el-row>
            <el-row>
              <el-col :span="8">货品名称：卡纸</el-col>
              <el-col :span="8">订单金额：20,000</el-col>
              <router-link to="/allWarehousing/details"><el-button>查看详情</el-button></router-link>
            </el-row>
            <el-row>
              <el-col :span="8">货品数量：1,000（箱）</el-col>
              <el-col :span="8">付款方式：应收账款支付</el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <!--</div>-->
  </div>
</template>
<script>
  export default {
    name:'index',
    data () {
      return {
        activeName: 'first',
        list:{
          orderNumber:'20170403123456',
          time:'2017-04-03 10:29:11',
          receiptNumber:'20170403123456'
        }
      }
    }
  }
</script>
