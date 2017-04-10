<template>
  <div>
    <div>
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>仓储管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/warehousing/allWarehousing' }">我的仓储</el-breadcrumb-item>
        <el-breadcrumb-item>仓储详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div>
        <h4>仓储当前状态：已入库</h4>
      </div>
      <span>仓储信息</span>
      <div style="width: auto;height: auto">
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
                  <el-col :span="8">仓单编号：123456789</el-col>
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
                  <el-col :span="8">状态明细：</el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">入库同意： 2017-01-03 18:00:00</el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">入库确认： 2017-02-04 18:00:00</el-col>
                </el-row>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
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
