<template>
  <div>
    <div>
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>仓储管理</el-breadcrumb-item>
        <el-breadcrumb-item>出库申请</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <div class="box">
        <span class="title">请确认仓储信息</span>
        <div>
          <el-row>
            <el-col :span="24">
              <el-card class="box-card" style="width:100%">
                <el-form ref="warehousing" :model="warehousing" labelWidth="80px">
                  <el-row>
                    <el-col :span="8"><el-form-item label="仓储流水号"><el-input style="width: auto" v-model="warehousing.serialNumber"></el-input></el-form-item></el-col>
                    <el-col :span="8"><el-form-item label="发起时间"><el-input style="width: auto" v-model="warehousing.state"></el-input></el-form-item></el-col>
                    <el-col :span="8"><el-form-item label="订单编号"><el-input style="width: auto" v-model="warehousing.storageTime"></el-input></el-form-item></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">持有人：B企业</el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">货品名称：卡片</el-col>
                    <el-col :span="8" style="text-align: center">货品数量：1,000（箱）</el-col>
                    <el-col :span="8" style="text-align: right">货品价值：20,000</el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">物流企业：A物流</el-col>
                    <el-col :span="8" style="text-align: center">物流运单号：123456</el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">选择存储仓储：ABC存储机构</el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8" style="float: right;width: auto"><el-button>申请仓单</el-button></el-col>
                  </el-row>
                </el-form>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'index',
    data () {
      return {
        warehousing:{
          serialNumber:'20170403123456',
          state:'已入库',
          storageTime:'2017-08-01'
        }
      }
    }
  }
</script>
<style>
  .el-form-item__label{
    width:auto!important;
  }
</style>
