<template>
  <div>
    <div>
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>仓储管理</el-breadcrumb-item>
        <el-breadcrumb-item>入库申请</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <span class="title">请确认订单详情</span>
      <div>
        <el-row>
          <el-col :span="24">
            <el-card class="box-card" style="width:100%">
              <!--<div slot="header" class="clearfix">-->
                <!--<span style="line-height: 36px;">订单详情</span>-->
              <!--</div>-->
              <el-form ref="dingdan" :model="dingdan" labelWidth="80px">
                <el-row>
                  <el-col :span="8"><el-form-item label="订单编号"><el-input v-model="dingdan.dingdanbianhao"></el-input></el-form-item></el-col>
                  <el-col :span="8" style="float: right"><el-form-item label="发起时间"><el-input v-model="dingdan.faqishijian"></el-input></el-form-item></el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">购买人：B企业</el-col>
                  <el-col :span="8" style="text-align: center">订单金额：20,000</el-col>
                  <el-col :span="8" style="text-align: right">付款方式：应收账款支付</el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">货品名称：卡纸</el-col>
                  <el-col :span="8" style="text-align: center">货品数量：1,000（箱）</el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">支付银行：中国农业银行</el-col>
                  <el-col :span="8" style="text-align: center">付款账户：123456</el-col>
                </el-row>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="box">
      <span class="title">请填选择仓储机构</span>
      <el-card class="box-card" style="width: 100%">
        <el-form ref="dingdan" :model="dingdan" labelWidth="80px">
          <el-row>
            <el-col :span="8"><el-form-item label="入库信息"></el-form-item></el-col>
            <!--<el-col :span="8" style="float: right"><el-form-item label="发起时间"><el-input v-model="dingdan.faqishijian"></el-input></el-form-item></el-col>-->
          </el-row>
          <el-row>
            <el-col :span="8">货主：B企业</el-col>
          </el-row>
          <el-row>
            <el-col :span="8">货品名称：卡片</el-col>
            <el-col :span="8" style="text-align: center">货品数量：1,000（箱）</el-col>
            <el-col :span="8" style="text-align: right">货品价值：20,000</el-col>
          </el-row>
          <el-row>
            <el-col :span="8">物流企业：暂无</el-col>
            <el-col :span="8" style="text-align: center">物流运单号：暂无</el-col>
          </el-row>
          <el-row>
            <el-col :span="8">选择存储仓储：
              <el-select v-model="value" placeholder="ABC仓储">
              <el-option
                v-for="item in options"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" style="float: right;width: auto"><el-button>申请入库</el-button></el-col>
          </el-row>
        </el-form>
      </el-card>
    </div>

  </div>
</template>
<script>
  export default {
    name:'index',
    data () {
      return {
        dingdan:{
          dingdanbianhao:'20170403123456',
          faqishijian:'2017-04-03 10:29:11'
        },
        options: [{
          value: '选项1',
          label: 'A仓储'
        }, {
          value: '选项2',
          label: 'B仓储'
        }, {
          value: '选项3',
          label: 'C仓储'
        }],
        value: ''
      }
    }
  }
</script>
<style>
  .box{
    margin-top: 20px;
  }
  .title{
    margin-left: 17px;
    font-size: 14px;
  }

</style>
