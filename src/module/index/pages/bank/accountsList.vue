<template>
  <div id="list">
    <el-breadcrumb separator=">" class="bread">
      <svg class="icon combinedShape" aria-hidden="true"> 
        <use xlink:href="#icon-locate"></use>
         
      </svg>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>应收账款</el-breadcrumb-item>
      <el-breadcrumb-item>我的应收账款</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-tabs v-bind:value="$route.params.status">
        <el-tab-pane label="所有应收账款" name="all">
          <accounts-table :accountInfo="accountsList" status="0" pageSize="10"></accounts-table>
        </el-tab-pane>
        <el-tab-pane label="贴现待响应" name="discount">
          <accounts-table :accountInfo="accountsList" status="41" pageSize="10"></accounts-table>
        </el-tab-pane>
        <el-tab-pane label="待兑付" name="cash">
          <accounts-table :accountInfo="accountsList" status="46" pageSize="10"></accounts-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
  import AccountsTable from '../../components/table/bankAccountsTable.vue'
  import constantData from '../../../../common/const'
  import Store from '../../vuex/store'

  export default {
    name: 'list',
    mounted () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.getAccountsList()
    },
    components: {
      AccountsTable
    },
    computed: {
      state () {
        return Store.state;
      }
    },
    data () {
      return {
        accountsList: []
      }
    },
    methods: {
      //获取账单列表
      getAccountsList(){
        this.$http.post('../v1/receivable/receivableSimpleDetailList', {roleCode: '3'}, {emulateJSON: true}).then((res) => {
          var data = res.body.data;
          if (res.body.code != 0) {
            this.$message.error(res.body.message);
            return;
          }
          this.accountsList = data;
        }, (err) => {
          console.log(err);
        })
      }
    }
  }
</script>
