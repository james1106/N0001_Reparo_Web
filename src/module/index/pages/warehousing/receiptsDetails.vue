<template>
  <div>
    <el-breadcrumb separator=">" class="bread">
      <img src="../../assets/combinedShape.png" class="combinedShape">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>仓储管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/warehousing/myReceipts' }">我的仓单</el-breadcrumb-item>
      <el-breadcrumb-item>仓单详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row class="el-row-header statePosition">
        <el-col class="buyerColor stateShow "><i class="el-icon-information"></i> 仓单当前状态</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-card class="box-card mybox" style="width:100%">
            <div slot="header" class="clearfix el-row-header">
              <i class="el-icon-menu" style="margin-right: 10px"></i><span class="keynote">仓单信息</span>
            </div>
            <div class="box-card mycard1">
              <el-row>
                <el-col :span="6" class="msgName keynote">仓单编号：</el-col>
                <el-col :span="6" class="msgName">仓储业务编号：</el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="msgName">保管人：</el-col>
                <el-col :span="6" class="msgName">持有人：</el-col>
                <el-col :span="6" class="msgName">保管仓储：</el-col>
                <el-col :span="6" class="msgName">签发时间：</el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="msgName">货品名称：</el-col>
                <el-col :span="6" class="msgName">货品数量：</el-col>
                <el-col :span="6" class="msgName">货品总额(元)：</el-col>
              </el-row>
              <el-row>
                <el-col :span="8" class="msgName">仓单状态明细：</el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
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
