<template>
  <div id="orderDataTable">
    <el-row class="el-row-header" style="background-color: rgb(229,241,245)">
      <el-col :span="6" style="margin-left: 20px">货品信息</el-col>
      <el-col :span="6">付款信息</el-col>
      <el-col :span="8">订单状态</el-col>
      <el-col :span="2">操作</el-col>
    </el-row>
    <template v-for="(item,index) in showData">
      <div>
        <el-row class="dataTable">
          <el-row class="el-row-header">
            <el-col :span="6" style="margin-left: 19px;">订单编号：{{item.orderNo}}</el-col>
            <el-col :span="6">创建时间：{{item.orderGenerateTime | timeTransfer}}</el-col>
            <el-col :span="8" v-if="state.isBuyer==='true'">卖家：{{item.payeeAddress}}</el-col>
            <el-col :span="8" v-else>买家：{{item.payerAddress}}</el-col>
            <el-col :span="2">操作</el-col>
          </el-row>
          <el-row class="el-row-content">
            <el-col :span="6" style="margin-left: 19px;">
              <el-row>货品名称：{{item.productName}}</el-row>
              <el-row>货品数量：{{item.productQuantity}}</el-row>
            </el-col>
            <el-col :span="6">
              <el-row>订单金额：{{item.productTotalPrice}}</el-row>
              <el-row>付款方式：{{item.payingMethod | payingMethod}}</el-row>
            </el-col>
            <el-col :span="2">
              <el-row>交易状态</el-row>
              <el-row>{{item.txState | transactionStatus}}</el-row>
            </el-col>
            <el-col :span="2">
              <el-row>账款状态</el-row>
              <el-row>{{item.receState | receStatus}}</el-row>
            </el-col>
            <el-col :span="2">
              <el-row>仓储状态</el-row>
              <el-row>{{item.repoCertState | repoStatus}}</el-row>
            </el-col>
            <el-col :span="2">
              <el-row>物流状态</el-row>
              <el-row>{{item.wayBillState | wayBillStatus}}</el-row>
            </el-col>
            <el-col :span="2">
              <el-button type="text" @click.native.prevent="checkDetail(item.orderNo)">查看详情</el-button>
              <el-button type="text" v-if="(state.isBuyer==='false')&&(item.txState===constantData.UNCONFIRMED)" @click.native.prevent="confirmOrder(item.orderNo)">确认订单</el-button>
              <el-button type="text" v-if="(state.isBuyer==='false')&&(item.receState===constantData.FORISSUE)" @click.native.prevent="signBill">签发</el-button>
              <el-button type="text" v-if="(state.isBuyer==='false')&&(item.receState===constantData.ACCEPTED)" @click.native.prevent="sendGood">发货</el-button>
              <el-button type="text" v-if="(state.isBuyer==='true')&&(item.receState===constantData.FORACCEPT)" @click.native.prevent="acceptBill">签收账款</el-button>
            </el-col>
          </el-row>
        </el-row>
      </div>
    </template>
    <el-pagination
      layout="total,prev, pager, next,jumper"
      @current-change="currentChange"
      :total="tableData.length">
    </el-pagination>

  </div>
</template>

<script>
  import store from '../vuex/store'
  import constantData from '../../../common/const'
  import '../../../assets/css/style.css'
  export default {
    name: 'orderDataTable',
    props: ['orderList','status','pageSize'],
    data(){
      return{
        tableData:this.orderList,
        showData:[],
        accountsStatus:this.status,
        detailPath:''
      }
    },
    watch:{
      orderList(curVal){
        this.tableData=curVal;
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
      activeName () {
        if(store.state.isBuyer==='false'){
          return store.state.orderTab;}
        else {
          return "first";
        }
      }
    },
    methods:{
      currentChange(val){
        this.getDataByPageNum(val - 1)
      },
      getDataByStatus(){/*筛选出各个Tab状态*/
          switch(this.status){
            case 'all':break;
            case 'forConfirm':
              var res=[];
              for(var i=0;i<this.tableData.length;i++ ){
                var item = this.tableData[i];
                if(item.transactionStatus===constantData.UNCONFIRMED){
                  res.push(item)
                }
              }
              this.tableData = res;break;
            case 'forPay':
              var res=[];
              for(var i=0;i<this.tableData.length;i++ ){
                var item = this.tableData[i];
                if((item.receStatus===constantData.FORACCEPT)||(item.transactionStatus===constantData.CONFIRMED)){
                  res.push(item)
                }
              }
              this.tableData = res;break;
            case 'forSend':
              var res=[];
              for(var i=0;i<this.tableData.length;i++ ){
                var item = this.tableData[i];
                if(item.receStatus===constantData.ACCEPTED){
                  res.push(item)
                }
              }
              this.tableData = res;break;
            case 'forReceive':
              var res=[];
              for(var i=0;i<this.tableData.length;i++ ){
                var item = this.tableData[i];
                if(item.wayBillStatus===constantData.SENDED){
                  res.push(item)
                }
              }
              this.tableData = res;break;
            default:break;
          }
      },
      getDataByPageNum(pageNum){
        if((pageNum + 1) * this.pageSize > this.tableData.length){
          this.showData = this.tableData.slice(pageNum * this.pageSize);
        }else {
          this.showData = this.tableData.slice(pageNum * this.pageSize,(pageNum + 1)*this.pageSize);
        }
      },

      checkDetail (orderNo) {
        store.commit('setCheckId',orderNo);
        console.log(store.state.checkId);
        this.$router.push("/order/orderDetail");
      },
      confirmOrder (orderNo) {
        console.log("确认订单！");
        store.commit('setCheckId',orderNo);
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
    }
  }
</script>

<style>
</style>
