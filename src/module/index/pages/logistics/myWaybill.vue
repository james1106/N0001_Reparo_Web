<template>
  <div class="waybill">
    <el-breadcrumb separator=">" class="bread">
    <img src="../../assets/combinedShape.png" class="combinedShape">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>物流管理</el-breadcrumb-item>
    <el-breadcrumb-item>我的物流</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="所有物流" name="first">
          <el-row class="el-row-header" style="background-color: rgb(229,241,245)">
            <el-col :span="6" style="margin-left: 19px">物流信息</el-col>
            <el-col :span="6">货品信息</el-col>
            <el-col :span="6">物流状态</el-col>
            <el-col :span="4" style="text-align: center">操作</el-col>
          </el-row>
          <template v-for="(item,index) in allRepoOut">
            <div>
              <el-row class="dataTable">
                <el-row class="el-row-header">
                  <el-col :span="6" style="margin-left: 19px;">运单编号：{{item.orderNo}}</el-col>
                  <el-col :span="6">订单编号：{{item.orderGenerateTime | timeTransfer}}</el-col>
                  <el-col :span="8">买家：{{item.orderGenerateTime | timeTransfer}}</el-col>
                </el-row>
                <el-row class="el-row-content">
                  <el-col :span="6" style="margin-left: 19px;">
                    <el-row>物流公司：{{item.productName}}</el-row>
                    <el-row>货品仓储：{{item.productQuantity}}</el-row>
                  </el-col>
                  <el-col :span="6">
                    <el-row>货品名称：{{item.productTotalPrice}}</el-row>
                    <el-row>货品数量：{{item.productTotalPrice}}</el-row>
                  </el-col>
                  <el-col :span="6">
                    已发货
                  </el-col>
                  <el-col :span="4">
                    <el-row style="text-align: center;">
                      <el-button size="mini" type="text" @click.native.prevent="deliver">申请发货</el-button>
                    </el-row>
                    <el-row style="text-align: center;">
                      <el-button size="small" style="height: 25px" @click.native.prevent="checkDetail('1')">查看详情</el-button>
                    </el-row>
                  </el-col>
                </el-row>
              </el-row>
            </div>
          </template>
        </el-tab-pane>
        <el-tab-pane label="待发货" name="second">待发货</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
  import store from '../../vuex/store'
  export default {
    name:'index',
    data () {
      return {
        activeName: 'first',
        allRepoOut:[{},{},{}],
      };
    },
    methods: {
      handleClick(tab, event){
        console.log(tab, event);
      },
      checkDetail(repoNo){
        store.commit('setCheckId',repoNo);
        this.$router.push('/logistics/wayBillDetails');
      },
      deliver(){
        this.$router.push('/logistics/deliver');
      }
    },
    mounted () {
      this.$http.get().then(function(res){
        /*获取入库管理列表*/
      },function(err){
        console.log(err);
      });
    }
  }
</script>
