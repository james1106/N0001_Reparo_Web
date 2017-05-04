<template>
  <div class="seller_allRepo">
    <div>
      <el-breadcrumb separator=">" class="bread">
        <svg class="icon combinedShape" aria-hidden="true">   <use xlink:href="#icon-locate"></use> </svg>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>仓储管理</el-breadcrumb-item>
        <el-breadcrumb-item>出库管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="所有仓储" name="first">
          <repo-data-table :repoList="allRepoOut" status="all" pageSize="10"></repo-data-table>
        </el-tab-pane>
        <el-tab-pane label="待出库" name="second">
          <repo-data-table :repoList="allRepoOut" status="forOut" pageSize="10"></repo-data-table>
        </el-tab-pane>
        <el-tab-pane label="已出库" name="third">
          <repo-data-table :repoList="allRepoOut" status="alreadyOut" pageSize="10"></repo-data-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
  import store from '../../vuex/store'
  import repoDataTable from '../../components/repoDataTable.vue'
  export default {
    name:'repoOut',
    data () {
      return {
        activeName: 'first',
        allRepoOut:[],
      };
    },
    components:{
      repoDataTable
    },
    methods: {
      handleClick(tab, event){
        console.log(tab, event);
      },
      checkDetail(repoNo){
        store.commit('setCheckIdRepo',repoNo);
        this.$router.push('/warehousing/repoDetails');
      }
    },
    mounted () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.$http.get("../v1/repository/getRepoBusiList?role=2").then(function(res){
        /*获取出库管理列表*/
        if(res.body.code != 0){
          this.$message.error(res.body.message);
          return;
        }
        this.allRepoOut=res.body.data;
      },function(err){
        console.log(err);
      });
    }
  }
</script>
