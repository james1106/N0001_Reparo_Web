<template>
  <div>
    <div>
      <el-breadcrumb separator=">" class="bread">
        <svg class="icon combinedShape" aria-hidden="true">   <use xlink:href="#icon-locate"></use> </svg>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>卖出的订单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="所有订单" name="first">
          <order-table :orderList="allOrder" status="all" pageSize="10"></order-table>
        </el-tab-pane>
        <el-tab-pane label="待确认" name="second">
          <order-table :orderList="allOrder" status="forConfirm" pageSize="10"></order-table>
        </el-tab-pane>
        <el-tab-pane label="待付款" name="third">
          <order-table :orderList="allOrder" status="forPay" pageSize="10"></order-table>
        </el-tab-pane>
        <el-tab-pane label="待发货" name="fourth">
          <order-table :orderList="allOrder" status="forSend" pageSize="10"></order-table>
        </el-tab-pane>
        <el-tab-pane label="待收货" name="fifth">
          <order-table :orderList="allOrder" status="forReceive" pageSize="10"></order-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
  import store from '../../vuex/store.js'
  import constantData from '../../../../common/const'
  import '../../../../assets/css/style.css'
  import OrderTable from '../../components/orderDataTable.vue'
  export default {
    name: 'index',
    data () {
      return {
//          activeName:'first',
        allOrder: [{
          orderNo: "20170403123456",
          orderGenerateTime: '2017-04-03 10:29:11',
          payeeAccount: '',
          productName: '卡纸',
          totalPrice: '20,000',
          productNum: '1,000',
          payingMethod: '应收账款支付',
        }
        ]
      }
    },
    components: {
      OrderTable
    },
    computed: {
      state () {
        return store.state;
      },
      constantData () {
        return constantData;
      },
      activeName () {
        if (store.state.isBuyer === 'false') {/*防止变成买家tab也变掉*/
          return store.state.orderTab;
        }
        else {
          return "first";
        }
      }
    },
    methods: {
      handleClick () {
        console.log("查看");
      },
      checkDetail (orderNo) {
//          store.state.checkId=orderNo;
        store.commit('setCheckIdOrder', orderNo);
        console.log(store.state.checkIdOrder);
        this.$router.push("/order/orderDetail");
      },
      confirmOrder (orderNo) {
        console.log("确认订单！");
        store.commit('setCheckIdOrder', orderNo);
        this.$router.push("/order/confirmOrder");
      },
      signBill () {
        console.log("签发应收账款");
      },
      sendGood () {
        console.log("发货");
      },
      acceptBill () {
        console.log("签收账款");
      }
    },
    mounted () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      console.log(this.activeName);
      var tempRole;
      switch (store.state.isBuyer) {
        case "true":
          tempRole = 0;
          break;/*0表示买方*/
        case "false":
          tempRole = 1;
          break;
        default:
          break;
      }
      this.$http.get("../v1/order/order_list/" + tempRole).then(function (res) {
//        this.$http.get("http://localhost/server_test/getData1.php").then(function(res){
          console.log("获取到的所有订单: " + res.body.data.length);
          this.allOrder = res.body.data;
        },
        function (err) {
          console.log(err);
        }
      );
    },
  }
</script>
<style>
  .mycard {
    width: 90% !important;
    float: inherit !important;
    margin: 10px auto !important;
    background-color: rgba(242, 242, 242, 1)
  }

  .mycard .el-row {
    margin-bottom: 0 !important;
    display: -webkit-flex;
    flex-flow: row wrap;
    -webkit-flex-flow: row wrap;
    justify-content: flex-start;
    -webkit-justify-content: flex-start;
  }

  .mycard .el-col {
    text-align: center;
    box-sizing: border-box;
    padding: 5px 0;
  }

  .row-black {
    background-color: rgba(215, 215, 215, 1);
  }

  .row-padding {
    box-sizing: border-box;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .btn-vertical {
    margin-top: 10px;
  }
</style>
