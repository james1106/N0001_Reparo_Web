<template>
  <div class="waybill">
    <el-breadcrumb separator=">" class="bread">
      <svg class="icon combinedShape" aria-hidden="true">   <use xlink:href="#icon-locate"></use> </svg>
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>物流管理</el-breadcrumb-item>
    <el-breadcrumb-item>我的物流</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="所有物流" name="first">
          <logistics-data-table :logisticsList="allWaybill" status="all" pageSize="10"></logistics-data-table>
        </el-tab-pane>
        <el-tab-pane label="待发货" name="second">
          <logistics-data-table :logisticsList="allWaybill" status="forSend" pageSize="10"></logistics-data-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
  import store from '../../vuex/store'
  import logisticsDataTable from '../../components/logisticsDataTable.vue'
  export default {
    name:'index',
    data () {
      return {
        allWaybill:[],
      };
    },
    computed:{
        activeName () {
            return store.state.logisticsTab;
        }
    },
    components:{
      logisticsDataTable
    },
    methods: {
      handleClick(tab, event){
        console.log(tab, event);
      },
    },
    mounted () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.$http.get("../v1/waybill/allWayBillDetail").then(function(res){
        /*获取企业物流列表*/
        console.log('获取物流列表：'+res.body);
        this.allWaybill=res.body.data.wayBillDetailVoList;
      },function(err){
        console.log(err);
      });
    }
  }
</script>
