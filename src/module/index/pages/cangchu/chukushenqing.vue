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
          <el-card class="box-card" style="width: 100%">
            <div v-for="o in 4" class="text item">

            </div>
          </el-card>
        </div>
      </div>
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
