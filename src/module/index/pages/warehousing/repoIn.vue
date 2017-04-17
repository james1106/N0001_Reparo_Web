<template>
  <div>
    <el-breadcrumb separator=">" class="bread">
      <img src="../../assets/combinedShape.png" class="combinedShape">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>仓储管理</el-breadcrumb-item>
      <el-breadcrumb-item>入库管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="所有仓储" name="first">
          <repo-data-table :repoList="allRepoIn" status="all" pageSize="10"></repo-data-table>
        </el-tab-pane>
        <el-tab-pane label="入库待响应" name="second">
          <repo-data-table :repoList="allRepoIn" status="inForResponse" pageSize="10"></repo-data-table>
        </el-tab-pane>
        <el-tab-pane label="待入库" name="third">
          <repo-data-table :repoList="allRepoIn" status="forIn" pageSize="10"></repo-data-table>
        </el-tab-pane>
        <el-tab-pane label="已入库" name="fourth">
          <repo-data-table :repoList="allRepoIn" status="alreadyIn" pageSize="10"></repo-data-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
  import store from '../../vuex/store'
  import repoDataTable from '../../components/repoDataTable.vue'
  export default {
    name:'index',
    data () {
      return {
        activeName: 'first',
        allRepoIn:[{aaa:1},{aaa:2},{aaa:3},{aaa:3},{aaa:3}],
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
        store.commit('setCheckId',repoNo);
        this.$router.push('/warehousing/repoDetails');
      }
    },
    mounted () {
        this.$http.get("/v1/repository/getRepoBusiList?role=1").then(function(res){
            /*获取入库管理列表*/
            console.log(res.body);
            this.allRepoIn=res.body.data;
        },function(err){
            console.log(err);
        });
    }
  }
</script>
