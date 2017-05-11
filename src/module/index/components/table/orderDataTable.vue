<template>
  <div id="orderDataTable"  >
    <el-row class="el-row-header" style="background-color: rgb(229,241,245)">
      <el-col :span="6" style="margin-left: 20px">货品信息</el-col>
      <el-col :span="6">付款信息</el-col>
      <el-col :span="8">订单状态</el-col>
      <el-col :span="2">操作</el-col>
    </el-row>
    <template v-if="tableData.length===0">
      <el-row style="text-align: center">
        <img :src="imgUrl.default_0" style="width: 200px;margin-top: 15px">
      </el-row>
      <el-row style="text-align: center;font-size: 18px;color: #959697">
        <span>暂无该状态的订单</span>
      </el-row>
    </template>

    <template v-else>
    <template v-for="(item,index) in showData">
      <div>
        <el-row class="dataTable">
          <el-row class="el-row-header">
            <el-col :span="6" style="margin-left: 19px;">订单编号：{{item.orderNo}}</el-col>
            <el-col :span="6">创建时间：{{item.orderGenerateTime | timeTransfer}}</el-col>
            <el-col :span="8" v-if="state.isBuyer==='true'">卖家：{{item.payeeCompanyName}}</el-col>
            <el-col :span="8" v-else>买家：{{item.payerCompanyName}}</el-col>
            <el-col :span="2">操作</el-col>
          </el-row>
          <el-row class="el-row-content">
            <el-col :span="6" style="margin-left: 19px;">
              <el-row>货品名称：{{item.productName}}</el-row>
              <el-row>货品数量：{{item.productQuantity}}</el-row>
            </el-col>
            <el-col :span="6">
              <el-row>订单金额(元)：{{item.productTotalPrice | numTransfer}}</el-row>
              <el-row>付款方式：{{item.payingMethod | payingMethod}}</el-row>
            </el-col>
            <el-col :span="2">
              <el-row>交易状态</el-row>
              <el-row>{{item.transactionStatus | transactionStatus}}</el-row>
            </el-col>
            <el-col :span="2">
              <el-row>账款状态</el-row>
              <el-row v-if="(item.transactionStatus>=constantData.CONFIRMED)&&(item.receStatus===constantData.NOMESSAGE)">{{constantData.CONFIRMED | receStatus}}
              </el-row>
              <el-row v-else>{{item.receStatus | receStatus}}</el-row>
            </el-col>
            <el-col :span="2">
              <el-row>仓储状态</el-row>
              <el-row>{{item.repoStatus | repoStatus}}</el-row>
            </el-col>
            <el-col :span="2">
              <el-row>物流状态</el-row>
              <el-row v-if="(item.receStatus>=constantData.ACCEPTED)&&(item.wayBillStatus===constantData.NOMESSAGE)">{{constantData.FORSEND | wayBillStatus}}
              </el-row>
              <el-row v-else>{{item.wayBillStatus | wayBillStatus}}</el-row>
            </el-col>
            <el-col :span="2">
              <el-col :span="24" >
                <el-button size="mini" type="text"
                           v-if="(state.isBuyer==='false')&&(item.transactionStatus===constantData.UNCONFIRMED)"
                           @click.native.prevent="confirmOrder(item.orderNo)">确认订单
                </el-button>
                <el-button size="mini" type="text"
                           v-if="(state.isBuyer==='false')&&(item.transactionStatus===constantData.CONFIRMED)&&(item.receStatus===constantData.NOMESSAGE)" @click.native.prevent="signBill(item.orderNo)">签发账款
                </el-button>
                <el-button size="mini" type="text"
                           v-if="(state.isBuyer==='false')&&(item.receStatus===constantData.ACCEPTED)&&(item.wayBillStatus===constantData.FORSEND)"
                           @click.native.prevent="sendGood(item.orderNo)">发货
                </el-button>
                <el-button size="mini" type="text"
                           v-if="(state.isBuyer==='true')&&(item.receStatus===constantData.FORACCEPT)"
                           @click.native.prevent="acceptBill(item.orderNo)">签收账款
                </el-button>
              </el-col>
              <el-col :span="24">
                <el-button size="small" style="text-align: center; margin-left: -9px"
                           @click.native.prevent="checkDetail(item.orderNo)">查看详情</el-button>
              </el-col>
            </el-col>
          </el-row>
        </el-row>
      </div>
    </template>
    <el-pagination
      layout="total,prev, pager, next,jumper"
      @current-change="currentChange"
      :total="tableData.length" :page-size="pageSize1">
    </el-pagination>
    </template>
  </div>
</template>

<script>
  import store from '../../vuex/store'
  import constantData from '../../../../common/const'
  import default_0 from  '../../assets/default_0.png'

  export default {
    name: 'orderDataTable',
    props: ['orderList', 'status', 'pageSize'],
    data(){
      return {
        tableData: this.orderList,
        showData: [],
        accountsStatus: this.status,
        detailPath: '',
        imgUrl: {
          default_0:default_0
        }
      }
    },
    watch: {
      orderList(curVal){
        this.tableData = curVal;
        this.getDataByStatus();
        this.getDataByPageNum(0);
      }
    },
    computed: {
      state () {
        return store.state;
      },
      constantData () {
        return constantData;
      },
      pageSize1 () {
        return this.pageSize;
      }
    },
    methods: {
      currentChange(val){
        this.getDataByPageNum(val - 1)
      },
      getDataByStatus(){/*筛选出各个Tab状态*/
        switch (this.status) {
          case 'all':
            break;
          case 'forConfirm':
            var res = [];
            for (var i = 0; i < this.tableData.length; i++) {
              var item = this.tableData[i];
              if (item.transactionStatus === constantData.UNCONFIRMED) {
                res.push(item)
              }
            }
            this.tableData = res;
            break;
          case 'forPay':
            var res = [];
            for (var i = 0; i < this.tableData.length; i++) {
              var item = this.tableData[i];
              if ((item.receStatus === constantData.FORACCEPT) || (item.transactionStatus === constantData.CONFIRMED)) {
                res.push(item)
              }
            }
            this.tableData = res;
            break;
          case 'forSend':
            var res = [];
            for (var i = 0; i < this.tableData.length; i++) {
              var item = this.tableData[i];
              if (item.receStatus === constantData.ACCEPTED) {
                res.push(item)
              }
            }
            this.tableData = res;
            break;
          case 'forReceive':
            var res = [];
            for (var i = 0; i < this.tableData.length; i++) {
              var item = this.tableData[i];
              if (item.wayBillStatus === constantData.SENDED) {
                res.push(item)
              }
            }
            this.tableData = res;
            break;
          default:
            break;
        }
      },
      getDataByPageNum(pageNum){
        if ((pageNum + 1) * this.pageSize > this.tableData.length) {
          this.showData = this.tableData.slice(pageNum * this.pageSize);
        } else {
          this.showData = this.tableData.slice(pageNum * this.pageSize, (pageNum + 1) * this.pageSize);
        }
      },

      checkDetail (orderNo) {
        store.commit('setCheckIdOrder', orderNo);
        console.log(store.state.checkIdOrder);
        this.$router.push("/order/orderDetail");
      },
      confirmOrder (orderNo) {
        console.log("确认订单！");
        store.commit('setCheckIdOrder', orderNo);
        this.$router.push("/order/confirmOrder");
      },
      signBill (checkId) {
        console.log("签发应收账款");//签发用的是orderId
        store.commit('setCheckIdOrder', checkId);
        this.$router.push("/allAccounts/signout/signout");
      },
      sendGood (checkId) {
        console.log("发货");
        store.commit('setCheckIdOrder', checkId);
        this.$router.push("/logistics/deliver");
      },
      acceptBill (checkId) {
        console.log("签收账款");
        this.$http.get("../v1/order/detail?orderNo=" + checkId).then(function (res) {//通过订单编号获取应收账款编号，再到签收页面
          if(res.body.code != 0){
            this.$message.error(res.body.message);
            return;
          }
          store.commit("setCheckIdRece", res.body.data.receOver.receNo);
          this.$router.push("/allAccounts/accept/accept");
        }, function (err) {
          console.log(err);
        });
      }
    }
  }
</script>
