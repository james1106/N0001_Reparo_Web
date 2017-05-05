<template>
  <div id="list">
    <el-breadcrumb separator=">" class="bread">
      <svg class="icon combinedShape" aria-hidden="true">   <use xlink:href="#icon-locate"></use> </svg>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>应收账款</el-breadcrumb-item>
      <el-breadcrumb-item>我的应收账款</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
    <el-tabs  v-bind:value="state.accountsStatus">
      <el-tab-pane label="所有应收账款" name="all">
        <accounts-table :accountInfo="accountsList" status="0" pageSize="10"> </accounts-table>
      </el-tab-pane>
      <el-tab-pane label="贴现待确认" name="accept" >
        <accounts-table :accountInfo="accountsList" status="21" pageSize="10"> </accounts-table>
      </el-tab-pane>
      <el-tab-pane label="待兑付" name="cash" >
        <accounts-table :accountInfo="accountsList" status="21" pageSize="10"> </accounts-table>
      </el-tab-pane>
    </el-tabs>
    </el-card>
  </div>
</template>
<script>
  import AccountsTable from '../../components/bankAccountsTable.vue'
  import constantData from '../../../../common/const'
  import Store from '../../vuex/store'

  export default {
    name:'list',
    mounted () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.getAccountsList()
    },
    components:{
      AccountsTable
    },
    computed: {
      state () {
        return Store.state;
      }
    },
    data () {
      return {
        accountsList:[{
          receNo:'123213123',
          date:'2017-04-03 10:29:11',
          amount:'10000',
          holder:'欧欧欧',
          accepter:'铭铭铭',
          date1:'2017-04-03',
          status:'贴现待确认'
        }
        ]
      }
    },
    methods:{
      //获取账单列表
      getAccountsList(){
//        this.$http.post('../v1/receivable/receivableSimpleDetailList',{roleCode:'3'},{emulateJSON:true}).then((res) => {
//          var data =  res.body.data;
//          if(res.body.code != 0){
//            this.$message.error(res.body.message);
//            return;
//          }
//          this.accountsList = data;
//        },(err) => {
//          console.log(err);
//        })
      }
    }
  }
</script>
