<template>
  <div id="repoCompany">
    <el-breadcrumb separator=">" class="bread">
      <svg class="icon combinedShape" aria-hidden="true">   <use xlink:href="#icon-locate"></use> </svg>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的仓储</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-tabs :value="state.repoCompanyTab">
        <el-tab-pane label="所有仓储" name="all">
          <repo-data-table :repoList="repoList" status="0" pageSize="10"></repo-data-table>
        </el-tab-pane>
        <el-tab-pane label="入库待响应" name="inResponse">
          <repo-data-table :repoList="repoList" status="1" pageSize="10"></repo-data-table>
        </el-tab-pane>
        <el-tab-pane label="待入库" name="inConfirm">
          <repo-data-table :repoList="repoList" status="2" pageSize="10"></repo-data-table>
        </el-tab-pane>
        <el-tab-pane label="已入库" name="3">
          <repo-data-table :repoList="repoList" status="3" pageSize="10"></repo-data-table>
        </el-tab-pane>
        <el-tab-pane label="待出库" name="outConfirm">
          <repo-data-table :repoList="repoList" status="5" pageSize="10"></repo-data-table>
        </el-tab-pane>
        <el-tab-pane label="已出库" name="6">
          <repo-data-table :repoList="repoList" status="6" pageSize="10"></repo-data-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
  import repoDataTable from '../../components/table/repoCompanyDataTable.vue'
  import Store from '../../vuex/store.js'

  export default {
    name:'repoCompany',
    mounted () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.getRepoList()
    },
    components:{
      repoDataTable
    },
    computed: {
      state () {
        return Store.state;
      },
      constantData () {
        return constantData;
      }
    },
    data () {
      return {
        repoList:[]
      };
    },
    methods: {
        getRepoList(){
          this.$http.get("../v1/repository/getRepoBusiList?role=3").then(function(res){
            if(res.body.code != 0){
              this.$message.error(res.body.message);
              return;
            }
            this.repoList=res.body.data;
          },function(err){
            console.log(err);
          });
        }
    }
  }
</script>
