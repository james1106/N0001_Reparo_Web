<template>
  <div id="accountTable">
    <el-row class="el-row-header" style="background-color: rgb(229,241,245)">
      <el-col :span="5" style="margin-left: 20px">货品信息</el-col>
      <el-col :span="5">账款信息</el-col>
      <el-col :span="5" v-if="isBuyer==='true'">收款人</el-col>
      <el-col :span="5" v-else>付款人</el-col>
      <el-col :span="5">账款状态</el-col>
      <el-col :span="2">操作</el-col>
    </el-row>
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
            <el-col :span="24">到期日：{{item.dueDt}}</el-col>
          </el-col>
          <el-col :span="5">
            <el-col :span="24">{{item.enterpriseName}}</el-col>
          </el-col>
          <el-col :span="5">
            <el-col :span="24">{{item.status | receStatus}}</el-col>
          </el-col>
          <el-col :span="2">
            <el-col :span="24">
              <el-button size="mini" type="text" class="buyerColor" v-if="(isBuyer==='true')&&(item.status===constantData.FORACCEPT)" @click.native.prevent="confirmAccept(item.receivableNo)">承兑确认</el-button>
              <el-button size="mini" type="text" class="buyerColor" v-if="(isBuyer==='true')&&(item.status===constantData.ACCEPTED)" @click.native.prevent="confirmCash(item.receivableNo)">兑付确认</el-button>
              <el-button size="mini" type="text" class="buyerColor" v-if="(isBuyer==='false')&&(item.status===constantData.ACCEPTED)" @click.native.prevent="confirmDiscount(item.receivableNo)">贴现账款</el-button>
            </el-col>
            <el-col :span="24" style="margin-left: -9px">
              <el-button size="small" @click.native.prevent="showDetail(item.receivableNo)">查看详情</el-button>
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

  </div>
</template>

<script>
  import constantData from '../../../common/const'
  import Store from '../vuex/store.js'

  export default {
    name: 'accountTable',
    computed: {
      constantData () {
        return constantData;
      },
    },
    props: ['accountInfo','status','pageSize','isBuyer'],
    data(){
        return{
          tableData:this.accountInfo,
          showData:[],
          accountsStatus:this.status,
        }
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
                if(this.accountsStatus == 2){
                  var orderInfo = {
                    receivableNo:'暂未生成',
                    productName:item.productName,
                    productQuantity:item.productNum,
                    isseAmt:item.totalPrice,
                    dueDt:'暂无',
                    enterpriseName:item.payeeAccount,
                    status:2,
                  }
                  res.push(orderInfo)
                }else {
                  res.push(item)
                }
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
      showDetail(receivableNo){
        Store.commit('setCheckId',receivableNo);
        this.$router.push("/allAccounts/detail/detail");
      },
      confirmAccept(receivableNo){
        Store.commit('setCheckId',receivableNo);
        this.$router.push("/allAccounts/accept/accept");
      },
      confirmCash(receivableNo){
        Store.commit('setCheckId',receivableNo);
        this.$router.push("/allAccounts/cash/cash");
      },
      confirmDiscount(receivableNo){
        Store.commit('setCheckId',receivableNo);
        this.$router.push("/allAccounts/discount/discount");
      }
    }
  }
</script>

<style>
</style>
