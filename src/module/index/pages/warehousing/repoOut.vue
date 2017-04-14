<template>
  <el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="所有仓储" name="first">
        <el-row class="el-row-header" style="background-color: rgb(229,241,245)">
          <el-col :span="4" style="margin-left: 19px">货品信息</el-col>
          <el-col :span="4">所在仓储</el-col>
          <el-col :span="4">仓储状态</el-col>
          <el-col :span="4">仓单编号</el-col>
          <el-col :span="4">仓单状态</el-col>
          <el-col :span="2">操作</el-col>
        </el-row>
        <template v-for="(item,index) in allRepoOut">
          <div>
            <el-row class="dataTable">
              <el-row class="el-row-header">
                <el-col :span="8" style="margin-left: 19px;">仓储业务编号：{{item.orderNo}}</el-col>
                <el-col :span="8">订单编号：{{item.orderGenerateTime | timeTransfer}}</el-col>
              </el-row>
              <el-row class="el-row-content">
                <el-col :span="4" style="margin-left: 19px;">
                  <el-row>货品名称：{{item.productName}}</el-row>
                  <el-row>货品数量：{{item.productQuantity}}</el-row>
                </el-col>
                <el-col :span="4">
                  <el-row>ABC仓储：{{item.productTotalPrice}}</el-row>
                </el-col>
                <el-col :span="4">
                  <el-row>待入库</el-row>
                </el-col>
                <el-col :span="4">
                  <el-row>暂无</el-row>
                </el-col>
                <el-col :span="4">
                  <el-row>暂无</el-row>
                </el-col>
                <el-col :span="3">
                  <el-button type="primary" size="small" @click.native.prevent="checkDetail('1')">查看详情</el-button>
                </el-col>
              </el-row>
            </el-row>
          </div>
        </template>
      </el-tab-pane>
      <el-tab-pane label="待入库" name="second">待入库</el-tab-pane>
      <el-tab-pane label="已入库" name="third">已入库</el-tab-pane>
    </el-tabs>
  </el-card>

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
        this.$router.push('/warehousing/repoDetails');
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
