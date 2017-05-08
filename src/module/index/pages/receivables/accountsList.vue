<template>
  <div id="list"  >
    <el-breadcrumb separator=">" class="bread">
      <svg class="icon combinedShape" aria-hidden="true">   <use xlink:href="#icon-locate"></use> </svg>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>应收账款</el-breadcrumb-item>
      <el-breadcrumb-item>我的应收账款</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
    <el-tabs  v-bind:value="state.accountsStatus">
      <el-tab-pane label="所有应收账款" name="all">
        <accounts-table :accountInfo="accountsList" status="0" pageSize="10" :isBuyer="state.isBuyer"> </accounts-table>
      </el-tab-pane>
      <el-tab-pane label="待签发" name="signout" v-if="state.isBuyer === 'false'">
        <accounts-table :accountInfo="orderList" status="2" pageSize="10" > </accounts-table>
      </el-tab-pane>
      <el-tab-pane label="承兑待签收" name="accept" >
        <accounts-table :accountInfo="accountsList" status="21" pageSize="10" :isBuyer="state.isBuyer"> </accounts-table>
      </el-tab-pane>
      <el-tab-pane label="待兑付" name="cash" v-if="state.isBuyer === 'true'">
        <accounts-table :accountInfo="accountsList" status="26" pageSize="10" :isBuyer="state.isBuyer"> </accounts-table>
      </el-tab-pane>
      <el-tab-pane label="承兑已签收" name="discount" v-if="state.isBuyer === 'false'">
        <accounts-table :accountInfo="accountsList" status="26" pageSize="10" :isBuyer="state.isBuyer"> </accounts-table>
      </el-tab-pane>
      <el-tab-pane label="贴现待签收" name="other" v-if="state.isBuyer === 'false'" >
        <accounts-table :accountInfo="accountsList" status="41" pageSize="10" :isBuyer="state.isBuyer"> </accounts-table>
      </el-tab-pane>
    </el-tabs>
    </el-card>
  </div>
</template>
<script>
  import Store from '../../vuex/store.js'
  import AccountsTable from '../../components/accountsTable.vue'
  import constantData from '../../../../common/const'

  export default {
    name:'list',
    mounted () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      if(Store.state.isBuyer == 'false'){
        this.getSignoutOrderList()
      }
      this.getAccountsList()
    },
    created: function () {

      /*if(Store.state.isBuyer == 'false'){
        this.getSignoutOrderList()
      }
      this.getAccountsList()*/
    },
    components:{
      AccountsTable
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
        accountsList:[],
        orderList:[]
      }
    },
    methods:{
      //获取订单列表（主要是获取待签收列表）
      getSignoutOrderList(){
        this.$http.get('../v1/order/order_list/1',{emulateJSON:true}).then((res) => {
          var data =  res.body.data;
          if(res.body.code != 0){
            this.$message.error(res.body.message);
            return;
          }
          for(var i=0;i<data.length;i++){
              var item = data[i]
;             if(item.receStatus == constantData.FORSIGNOUT){
                this.orderList.push(item);
            }
          }
        },(err) => {
          console.log(err);
        })
      },
      //获取账单列表
      getAccountsList(){
        var role = this.getRole();
        this.$http.post('../v1/receivable/receivableSimpleDetailList',{roleCode:role},{emulateJSON:true}).then((res) => {
          var data =  res.body.data;
          if(res.body.code != 0){
            this.$message.error(res.body.message);
            return;
          }
          this.accountsList = data;
        },(err) => {
          console.log(err);
        })
      },
      getRole(){
          if(Store.state.isBuyer == 'true'){
              return 0
          }else{
              return 1
          }
      }
    }
  }
</script>
