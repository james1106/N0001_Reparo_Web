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
        <el-card class="box-card" style="width: 100%">
          <div v-for="o in 4" class="text item">

          </div>
        </el-card>
      </div>
    </div>
    <div class="box">
      <span class="title">请填选择仓储机构</span>
      <el-card class="box-card" style="width: 100%">
        <div v-for="o in 4" class="text item">

        </div>
      </el-card>
    </div>

  </div>
</template>
<script>
  export default {
    name:'index',
    data () {
      return {}
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
