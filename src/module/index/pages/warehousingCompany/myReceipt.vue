<template>
  <div id="receiptCompany">
    <el-breadcrumb separator=">" class="bread">
      <svg class="icon combinedShape" aria-hidden="true">   <use xlink:href="#icon-locate"></use> </svg>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的仓单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-tabs value="all">
        <el-tab-pane label="所有仓单" name="all">
          <receipt-data-table :receiptList="receiptList" status="0" pageSize="10"></receipt-data-table>
        </el-tab-pane>
        <el-tab-pane label="可流转" name="canFlow">
          <receipt-data-table :receiptList="receiptList" status="1" pageSize="10"></receipt-data-table>
        </el-tab-pane>
        <el-tab-pane label="冻结中" name="frozen">
          <receipt-data-table :receiptList="receiptList" status="2" pageSize="10"></receipt-data-table>
        </el-tab-pane>
        <el-tab-pane label="已失效" name="disabled">
          <receipt-data-table :receiptList="receiptList" status="3" pageSize="10"></receipt-data-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
  import receiptDataTable from '../../components/table/receiptCompanyDataTable.vue'
  import Store from '../../vuex/store.js'

  export default {
    name:'receiptCompany',
    mounted () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.getReceiptList()
    },
    components:{
      receiptDataTable
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
        activeName: 'first',
        receiptList:[]
      };
    },
    methods: {
      getReceiptList(){
          this.$http.get("../v1/repository/getRepoCertInfoList").then(function(res){
            if(res.body.code != 0){
              this.$message.error(res.body.message);
              return;
            }
            this.receiptList=res.body.data;
          },function(err){
            console.log(err);
          });
        }
    }
  }
</script>
