<template>
  <div id="accountTable">
    <el-row class="el-row-header" style="background-color: rgb(229,241,245)">
      <el-col :span="7" style="margin-left: 20px">货品信息</el-col>
      <el-col :span="6">付款信息</el-col>
      <el-col :span="8">订单状态</el-col>
      <el-col :span="2">操作</el-col>
    </el-row>
    <template v-if="tableData.length===0">
      <el-row style="text-align: center">
        <img :src="imgUrl.default_0" style="width: 200px;margin-top: 15px">
      </el-row>
      <el-row style="text-align: center;font-size: 18px;color: #959697">
        <span>暂无该状态的应收账款</span>
      </el-row>
    </template>

    <template v-else>
    <template v-for="item in showData">
      <el-row class="dataTable">
        <el-row class="el-row-header">
          <el-col :span="24" style="margin-left: 19px;">应收帐款编号：{{item.receivableNo}}</el-col>
        </el-row>
        <el-row class="el-row-content">
          <el-col :span="5" style="margin-left: 19px;">
            <el-col :span="24">货品名称：{{item.productName}}</el-col>
            <el-col :span="24">货品数量：{{item.productQuantity}}</el-col>
          </el-col>
          <el-col :span="5">
            <el-col :span="24">账款金额：{{item.isseAmt}}</el-col>
            <el-col :span="24">付款方式：应收账款支付</el-col>
            <el-col :span="24">到期日：{{item.dueDt | timeTransfer}}</el-col>
          </el-col>
          <el-col :span="5">
            <el-col :span="24">{{item.enterpriseName | nullSituation}}</el-col>
          </el-col>
          <el-col :span="5">
            <el-col :span="24">{{item.status | receStatus}}</el-col>
          </el-col>
          <el-col :span="2">
            <el-col :span="24">
              <el-button size="mini" type="text" class="buyerColor" v-if="item.status===constantData.CONFIRMED" @click.native.prevent="signout(item.orderNo)">签发订单</el-button>
              <el-button size="mini" type="text" class="buyerColor" v-if="(isBuyer==='true')&&(item.status===constantData.FORACCEPT)" @click.native.prevent="confirmAccept(item.receivableNo)">承兑确认</el-button>
              <el-button size="mini" type="text" class="buyerColor" v-if="(isBuyer==='true')&&(item.status===constantData.ACCEPTED)" @click.native.prevent="confirmCash(item.receivableNo)">兑付确认</el-button>
              <el-button size="mini" type="text" class="buyerColor" v-if="(isBuyer==='false')&&(item.status===constantData.ACCEPTED)" @click.native.prevent="confirmDiscount(item.receivableNo)">贴现账款</el-button>
            </el-col>
            <el-col :span="24" style="margin-left: -9px">
              <!--.native是子组件绑定原生事件而不是父控件响应子组件的方法 -->
              <el-button size="small" type="default" @click.native.prevent="showDetail(item.receivableNo,item.orderNo,item.status)">查看详情</el-button>
            </el-col>
          </el-col>
        </el-row>
      </el-row>
    </template>
    <el-pagination
      layout="total,prev, pager, next,jumper"
      @current-change="currentChange"
      :total="tableData.length">
    </el-pagination>
    </template>
  </div>
</template>

<script>
  import constantData from '../../../common/const'
  import Store from '../vuex/store.js'
  import default_0 from  '../assets/default_0.png'

  export default {
    name: 'accountTable',
    props: ['accountInfo','status','pageSize','isBuyer'],
    data(){
        return{
          tableData:this.accountInfo,
          showData:[],
          accountsStatus:this.status,
          imgUrl: {
            default_0:default_0
          }
        }
    },
    computed: {
      state () {
        return Store.state;
      },
      constantData () {
        return constantData;
      },
    },
    watch:{
      accountInfo(curVal){
        this.tableData = curVal
        this.getDataByStatus()
        this.getDataByPageNum(0)
      }
    },
    methods:{
      currentChange(val){
        this.getDataByPageNum(val - 1)
      },
      getDataByStatus(){
          if(this.accountsStatus == 0){
              return
          }
          var res = []
          for(var i=0;i<this.tableData.length;i++ ){
            var item = this.tableData[i];
            if(item.status == this.accountsStatus){
              res.push(item)
            }else if(item.transactionStatus == 2){
              var orderInfo = {
                receivableNo:'暂未生成',
                orderNo:item.orderNo,
                productName:item.productName,
                productQuantity:item.productQuantity,
                isseAmt:item.productTotalPrice,
                dueDt:'暂无',
                enterpriseName:item.payerCompanyName,
                status:2,
              }
              res.push(orderInfo)
            }
          }
          this.tableData = res
      },
      getDataByPageNum(pageNum){
          if((pageNum + 1) * this.pageSize > this.tableData.length){
            this.showData = this.tableData.slice(pageNum * this.pageSize);
          }else {
            this.showData = this.tableData.slice(pageNum * this.pageSize,(pageNum + 1)*this.pageSize);
          }
      },
      showDetail(receivableNo,orderNo,status){
        if(status == constantData.CONFIRMED){
          Store.commit('setCheckIdOrder',orderNo);
          this.$router.push("/order/orderDetail");
        }else{
          Store.commit('setCheckIdRece',receivableNo);
          this.$router.push("/allAccounts/detail/detail");
        }
      },
      signout(orderNo){
        Store.commit('setCheckIdOrder',orderNo);
        this.$router.push("/allAccounts/signout/signout");
      },
      confirmAccept(receivableNo){
        Store.commit('setCheckIdRece',receivableNo);
        this.$router.push("/allAccounts/accept/accept");
      },
      confirmCash(receivableNo){
        Store.commit('setCheckIdRece',receivableNo);
        this.$router.push("/allAccounts/cash/cash");
      },
      confirmDiscount(receivableNo){
        Store.commit('setCheckIdRece',receivableNo);
        this.$router.push("/allAccounts/discount/discount");
      }
    }
  }
</script>

<style>
</style>
