<template>
  <div id="list">
    <el-breadcrumb separator=">" class="bread">
      <img src="../../assets/combinedShape.png" class="combinedShape">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>应收账款</el-breadcrumb-item>
      <el-breadcrumb-item>我的应收账款</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
    <el-tabs  v-bind:value="state.accountsStatus">
      <el-tab-pane label="所有应收账款" name="all">
        <accounts-table :accountInfo="dataList" status="0" pageSize="10" :isBuyer="state.isBuyer"> </accounts-table>
      </el-tab-pane>
      <el-tab-pane label="待签发" name="signout" v-if="state.isBuyer === 'false'">

        <!--<accounts-table :accountInfo="orderList" status="41" pageSize="10" > </accounts-table>-->

      </el-tab-pane>
      <el-tab-pane label="承兑待签收" name="accept" >
        <accounts-table :accountInfo="dataList" status="21" pageSize="10" :isBuyer="state.isBuyer"> </accounts-table>
      </el-tab-pane>
      <el-tab-pane label="待兑付" name="cash" v-if="state.isBuyer === 'true'">
        <accounts-table :accountInfo="dataList" status="26" pageSize="10" :isBuyer="state.isBuyer"> </accounts-table>
      </el-tab-pane>
      <el-tab-pane label="承兑已签收" name="discount" v-if="state.isBuyer === 'false'">
        <accounts-table :accountInfo="dataList" status="26" pageSize="10" :isBuyer="state.isBuyer"> </accounts-table>
      </el-tab-pane>
      <el-tab-pane label="贴现待签收" name="other" v-if="state.isBuyer === 'false'" >
        <accounts-table :accountInfo="dataList" status="41" pageSize="10" :isBuyer="state.isBuyer"> </accounts-table>
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
    created: function () {
      this.getSignoutOrderList()
      this.getAccountsList()
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
        orderList:[],
        dataList:[
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:21
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:26
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:26
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'26'
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'26'
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'26'
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'26'
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'26'
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'41'
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'41'
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'41'
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'41'
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'41'
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'41'
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'41'
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'41'
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'41'
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'41'
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'41'
          }
        ]
      }
    },
    methods:{
      //获取订单列表（主要是获取待签收列表）
      getSignoutOrderList(){
        var role = this.getRole();
        this.$http.get('/v1/order/order_list/'+role,{emulateJSON:true}).then((res) => {
          console.log(res.body);
          var code =  res.body.code;
          var data =  res.body.data;
          if(code != 0){
            return;
          }
          for(var i=0;i<data.length;i++){
              var item = data[i]
;             if(item.status == constantData.FORISSUE){
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
        this.$http.post('/v1/receivable/receivableSimpleDeatilList',{roleCode:role},{emulateJSON:true}).then((res) => {
          console.log(res.body);
          var code =  res.body.code;
          var data =  res.body.data;
          if(code != 0){
            return;
          }
          this.dataList = data;
        },(err) => {
            this.dataList = [
                {
                  receivableNo:'12345',
                  productName:'卡片',
                  productQuantity:'1000',
                  isseAmt:'20000',
                  dueDt:'2017-11-20',
                  enterpriseName:'A企业',
                  status:21
                }
             ];
          console.log(err);
        })
      },
      getRole(){
          if(Store.state.isBuyer){
              return 0
          }else{
              return 1
          }
      }
    }
  }
</script>
