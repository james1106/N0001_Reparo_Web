<template>
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

</template>
<script>
  import store from '../../vuex/store'
  import repoDataTable from '../../components/repoDataTable.vue'
  export default {
    name:'index',
    data () {
      return {
        activeName: 'first',
        allRepoOut:[{aaa:1},{aaa:2},{aaa:3},{aaa:3},{aaa:3}],
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
      this.$http.get().then(function(res){
        /*获取出库管理列表*/
      },function(err){
        console.log(err);
      });
    }
  }
</script>
