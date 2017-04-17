<template>
  <div id="receiptCompany">
  <el-tabs value="state.repoCompanyTab">
    <el-tab-pane label="所有仓单" name="all">
      <receipt-data-table :receiptList="receiptList" status="0" pageSize="10"></receipt-data-table>
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
    name:'receiptCompany',
    mounted () {
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
        receiptList:[{
          repoBusinessNo:'1111',
          productName:3,
          productQuantity:'343242',
          repoEnterpriseName:'ssds',
          repoCertStatus:'',
        },
          {
            repoBusinessNo:'1111',
            productName:3,
            productQuantity:'343242',
            repoEnterpriseName:'ssds',
            repoCertStatus:'',
          },
          {
            repoBusinessNo:'1111',
            productName:3,
            productQuantity:'343242',
            repoEnterpriseName:'ssds',
            repoCertStatus:'',
          }]
      };
    },
    methods: {
      getReceiptList(){
          this.$http.get("/v1/repository/getRepoCertInfoList").then(function(res){
            console.log(res.body);
            this.receiptList=res.body.data;
          },function(err){
            console.log(err);
          });
        }
    }
  }
</script>
