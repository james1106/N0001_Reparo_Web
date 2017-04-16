<template>
  <div id="repoCompany">
  <el-tabs :value="state.repoCompanyTab">
    <el-tab-pane label="所有仓单" name="all">
      <receipt-data-table :receiptList="receiptList" status="0" pageSize="10"></receipt-data-table>
    </el-tab-pane>
    <el-tab-pane label="待确认" name="inResponse">
      <receipt-data-table :receiptList="receiptList" status="1" pageSize="10"></receipt-data-table>
    </el-tab-pane>
    <el-tab-pane label="可质押" name="inResponse">
     <receipt-data-table :receiptList="receiptList" status="1" pageSize="10"></receipt-data-table>
    </el-tab-pane>
    <el-tab-pane label="已失效" name="inConfirm">
     <receipt-data-table :receiptList="receiptList" status="2" pageSize="10"></receipt-data-table>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>
<script>
  import receiptDataTable from '../../components/receiptCompanyDataTable.vue'
  import Store from '../../vuex/store.js'

  export default {
    name:'repoCompany',
    mounted () {
      this.getRepoList()
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
        receiptList:[{
          repoBusiNo:'1111',
          status:3,
          repoCertNo:'343242',
          repoCertStatus:'ssds'
        },
          {
            repoBusiNo:'1111',
            status:2,
            repoCertNo:'343242',
            repoCertStatus:'ssds'
          },
          {
            repoBusiNo:'1111',
            status:1,
            repoCertNo:'343242',
            repoCertStatus:'ssds'
          },
          {
            repoBusiNo:'1111',
            status:1,
            repoCertNo:'343242',
            repoCertStatus:'ssds'
          }]
      };
    },
    methods: {
        getRepoList(){
          this.$http.get("/v1/repository/getRepoBusiList?role=2").then(function(res){
            console.log(res.body);
            this.repoList=res.body.data;
          },function(err){
            console.log(err);
          });
        }
    }
  }
</script>
