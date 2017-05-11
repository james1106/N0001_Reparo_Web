<template>
  <div id="allReceipts"  >
    <el-breadcrumb separator=">" class="bread">
      <svg class="icon combinedShape" aria-hidden="true">   <use xlink:href="#icon-locate"></use> </svg>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>仓储管理</el-breadcrumb-item>
      <el-breadcrumb-item>我的仓单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="所有仓单" name="first">
        <receipt-data-table :receiptList="allReceipts" status="all" pageSize="10"></receipt-data-table>
      </el-tab-pane>
      <el-tab-pane label="可流转" name="second">
        <receipt-data-table :receiptList="allReceipts" status="canFlow" pageSize="10"></receipt-data-table>
      </el-tab-pane>
      <el-tab-pane label="冻结中" name="third">
        <receipt-data-table :receiptList="allReceipts" status="frozen" pageSize="10"></receipt-data-table>
      </el-tab-pane>
      <el-tab-pane label="已失效" name="fourth">
        <receipt-data-table :receiptList="allReceipts" status="disabled" pageSize="10"></receipt-data-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>
  </div>
</template>
<script>
  import store from '../../vuex/store'
  import receiptDataTable from '../../components/table/receiptDataTable.vue'

  export default {
    name:'allReceipts',
    data () {
      return {
        activeName: 'first',
        allReceipts:[],
      };
    },
    computed: {
      state () {
        return store.state;
      }
    },
    components:{
      receiptDataTable
    },
    methods: {
      handleClick(tab, event){
        console.log(tab, event);
      },
    },
    mounted () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.$http.get("../v1/repository/getRepoCertInfoList").then(function(res){
        /*获取所有仓单列表*/
        if(res.body.code != 0){
          this.$message.error(res.body.message);
          return;
        }
        this.allReceipts=res.body.data;
      },function(err){
        console.log(err);
      });
    }
  }
</script>
