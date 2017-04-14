<template>
  <div>
    <el-breadcrumb separator=">" class="bread">
      <img src="../../assets/combinedShape.png" class="combinedShape">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>物流管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/logistics/myWaybill'}">我的物流</el-breadcrumb-item>
      <el-breadcrumb-item>物流详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row class="el-row-header statePosition">
        <el-col class="sellerColor stateShow "><i class="el-icon-information"></i> 物流当前状态：已送达</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-card class="box-card mybox" style="width:100%">
            <div slot="header" class="clearfix el-row-header">
              <i class="el-icon-menu" style="margin-right: 10px"></i><span class="keynote">物流信息</span>
            </div>
            <div class="box-card mycard1">
              <el-row>
                <el-col :span="6" class="msgName keynote">运单号：</el-col>
                <el-col :span="6" class="msgName">物流公司：</el-col>
                <el-col :span="6" class="msgName">入库时间：</el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="msgName">物流跟踪：</el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-card class="box-card mybox" style="width:100%">
            <div slot="header" class="clearfix el-row-header">
              <i class="el-icon-menu" style="margin-right: 10px"></i><span class="keynote">其他信息</span>
            </div>
            <div class="box-card mycard1">
              <el-row class="msgName keynote">发货信息：</el-row>
              <el-row class="cutoff">
                <el-col :span="6" class="msgName">运单号：</el-col>
                <el-col :span="6" class="msgName">发货仓储：</el-col>
                <el-col :span="6" class="msgName">货品仓单编号：</el-col>
              </el-row>
              <el-row class="msgName keynote" style="margin-top: 10px">收货信息：</el-row>
              <el-row class="cutoff">
                <el-col :span="6" class="msgName">收货人：</el-col>
                <el-col :span="6" class="msgName">收货仓储：</el-col>
              </el-row>
              <el-row class="msgName keynote" style="margin-top: 10px">货品信息：</el-row>
              <el-row>
                <el-col :span="6" class="msgName">货品信息：</el-col>
                <el-col :span="6" class="msgName">货品数量(箱)：</el-col>
                <el-col :span="6" class="msgName">货品单价(元)：</el-col>
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
