<template>
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
        this.$http.get().then(function(res){
            /*获取入库管理列表*/
        },function(err){
            console.log(err);
        });
    }
  }
</script>
