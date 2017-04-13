<template>
  <div id="list">
    <el-card>
    <el-tabs  v-bind:value="state.accountsStatus">
      <el-tab-pane label="所有应收账款" name="all">
        <accounts-table :accountInfo="orderList" status="all" pageSize="10"> </accounts-table>
      </el-tab-pane>
      <el-tab-pane label="待签发" name="signout" v-if="state.isBuyer === 'false'">
        <accounts-table :accountInfo="orderList" status="signout" pageSize="10"> </accounts-table>
      </el-tab-pane>
      <el-tab-pane label="承兑待签收" name="accept" >
        <accounts-table :accountInfo="orderList" status="accept" pageSize="10"> </accounts-table>
      </el-tab-pane>
      <el-tab-pane label="待兑付" name="cash" v-if="state.isBuyer === 'true'">
        <template>
          <el-row class="row-black row-padding">
            <el-col :span="5">货品信息</el-col>
            <el-col :span="5">账款信息</el-col>
            <el-col :span="5">收款人</el-col>
            <el-col :span="5">账款状态</el-col>
            <el-col :span="4">操作</el-col>
          </el-row>
          <el-row class="row-black row-padding">
            <el-col :span="24">应收账款编号：20170403123456</el-col>
          </el-row>
          <el-row class="row-padding">
            <el-col :span="5">
              <el-col :span="24">货品名称：卡片</el-col>
              <el-col :span="24">货品数量：1000箱</el-col>
            </el-col>
            <el-col :span="5">
              <el-col :span="24">账款金额：20000</el-col>
              <el-col :span="24">付款方式：应收款支付</el-col>
              <el-col :span="24">到期日：2017-11-03</el-col>
            </el-col>
            <el-col :span="5">
              <el-col :span="24">A企业</el-col>
            </el-col>
            <el-col :span="5">
              <el-col :span="24">承兑已签收</el-col>
            </el-col>
            <el-col :span="4">
              <el-col :span="24">
              <router-link to="/allAccounts/cash/cash">兑付账款</router-link>
            </el-col>
              <el-col :span="24">
                <router-link to="/allAccounts/cash/detail">查看详情</router-link>
              </el-col>
            </el-col>
          </el-row>
        </template>
      </el-tab-pane>
      <el-tab-pane label="承兑已签收" name="discount" v-if="state.isBuyer === 'false'">
        <template>
          <el-row class="row-black row-padding">
            <el-col :span="5">货品信息</el-col>
            <el-col :span="5">账款信息</el-col>
            <el-col :span="5">收款人</el-col>
            <el-col :span="5">账款状态</el-col>
            <el-col :span="4">操作</el-col>
          </el-row>
          <el-row class="row-black row-padding">
            <el-col :span="24">应收账款编号：20170403123456</el-col>
          </el-row>
          <el-row class="row-padding">
            <el-col :span="5">
              <el-col :span="24">货品名称：卡片</el-col>
              <el-col :span="24">货品数量：1000箱</el-col>
            </el-col>
            <el-col :span="5">
              <el-col :span="24">账款金额：20000</el-col>
              <el-col :span="24">付款方式：应收款支付</el-col>
              <el-col :span="24">到期日：2017-11-03</el-col>
            </el-col>
            <el-col :span="5">
              <el-col :span="24">A企业</el-col>
            </el-col>
            <el-col :span="5">
              <el-col :span="24">承兑已签收</el-col>
            </el-col>
            <el-col :span="4">
            <el-col :span="24">
                <router-link to="/allAccounts/discount/discount">贴现账款</router-link>
              </el-col>
              <el-col :span="24">
                <router-link to="/allAccounts/discount/detail">查看详情</router-link>
              </el-col>
            </el-col>
          </el-row>
        </template>
      </el-tab-pane>
      <el-tab-pane label="贴现待签收" name="other" v-if="state.isBuyer === 'false'" >
        <template>
          <el-row class="row-black row-padding">
            <el-col :span="5">货品信息</el-col>
            <el-col :span="5">账款信息</el-col>
            <el-col :span="5">收款人</el-col>
            <el-col :span="5">账款状态</el-col>
            <el-col :span="4">操作</el-col>
          </el-row>
          <el-row class="row-black row-padding">
            <el-col :span="24">应收账款编号：20170403123456</el-col>
          </el-row>
          <el-row class="row-padding">
            <el-col :span="5">
              <el-col :span="24">货品名称：卡片</el-col>
              <el-col :span="24">货品数量：1000箱</el-col>
            </el-col>
            <el-col :span="5">
              <el-col :span="24">账款金额：20000</el-col>
              <el-col :span="24">付款方式：应收款支付</el-col>
              <el-col :span="24">到期日：2017-11-03</el-col>
            </el-col>
            <el-col :span="5">
              <el-col :span="24">A企业</el-col>
            </el-col>
            <el-col :span="5">
              <el-col :span="24">承兑已签收</el-col>
            </el-col>
            <el-col :span="4">
              <el-col :span="24">
                <router-link to="/allAccounts/discount/detail">查看详情</router-link>
              </el-col>
            </el-col>
          </el-row>
        </template>
      </el-tab-pane>
    </el-tabs>
    </el-card>
  </div>
</template>
<script>
  import Store from '../../vuex/store.js'
  import AccountsTable from '../../components/accountsTable.vue'

  export default {
    name:'list',
    created: function () {

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
        accountsList:[],
        orderList:[
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'2'
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'2'
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'2'
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'2'
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'2'
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'2'
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'2'
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'2'
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'2'
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'2'
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'2'
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'2'
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'1'
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'1'
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'1'
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'1'
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'1'
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'1'
          },
          {
            receivableNo:'12345',
            productName:'卡片',
            productQuantity:'1000',
            isseAmt:'20000',
            dueDt:'2017-11-20',
            enterpriseName:'A企业',
            status:'1'
          }
        ],
        dataList:[
          {
            yewubianhao:"20170403123456",
            yewuleixing:"待承兑",
            jiaoyiduishou:"A企业",
            jine:"20，000"
          },
          {
            yewubianhao:"20170403123456",
            yewuleixing:"待承兑",
            jiaoyiduishou:"B企业",
            jine:"20，000"
          },
          {
            yewubianhao:"20170403123456",
            yewuleixing:"待承兑",
            jiaoyiduishou:"A企业",
            jine:"20，000"
          },
          {
            yewubianhao:"20170403123456",
            yewuleixing:"待承兑",
            jiaoyiduishou:"C企业",
            jine:"20，000"
          }
        ]
      }
    },
    methods:{
//       showDetail: function (handle) {
//         switch (handle){
//           case 'accept':  //承兑
//               break;
//           case 'accept':
//             break;
//           case 'accept':
//             break;
//           case 'accept':
//             break;
//           case 'detail':
//             break;
//         }
//       }
      //获取订单列表（主要是获取待签收列表）
      getOrderList(){
        this.$http.post('/v1/order/order_list/1',{emulateJSON:true}).then((res) => {
          console.log(res.body);
          var code =  res.body.code;
          var data =  res.body.data;
          if(code != 0){
//            this.dialogVisible = true;
//            this.msg = res.body.message;
            return;
          }
        },(err) => {
          console.log(err);
        })
      },
      //获取账单列表
      getAccountsList(){
        this.$http.post('/v1/order/order_list/1',{emulateJSON:true}).then((res) => {
          console.log(res.body);
          var code =  res.body.code;
          var data =  res.body.data;
          if(code != 0){
//            this.dialogVisible = true;
//            this.msg = res.body.message;
            return;
          }
        },(err) => {
          console.log(err);
        })
      },
    }
  }
</script>
