<template>
  <div id="accountTable">
    <el-row class="row-black row-padding">
      <el-col :span="5">货品信息</el-col>
      <el-col :span="5">账款信息</el-col>
      <el-col :span="5">收款人</el-col>
      <el-col :span="5">账款状态</el-col>
      <el-col :span="4">操作</el-col>
    </el-row>
    <template v-for="item in showData">
      <el-row class="row-black row-padding">
        <el-col :span="24">应收帐款编号：{{item.receivableNo}}</el-col>
      </el-row>
      <el-row class="row-padding">
        <el-col :span="5">
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
        <el-col :span="4">
          <el-col :span="24">
            <el-button type="text" v-if="(isBuyer==='true')&&(item.status===constantData.FORACCEPT)" @click.native.prevent="confirmAccept(item.receivableNo)">承兑确认</el-button>
            <el-button type="text" v-if="(isBuyer==='true')&&(item.status===constantData.ACCEPTED)" @click.native.prevent="confirmCash(item.receivableNo)">兑付确认</el-button>
            <el-button type="text" v-if="(isBuyer==='false')&&(item.status===constantData.ACCEPTED)" @click.native.prevent="confirmDiscount(item.receivableNo)">贴现账款</el-button>
          </el-col>
          <el-col :span="24">
            <el-button type="text" @click.native.prevent="showDetail(item.receivableNo)">查看详情</el-button>
          </el-col>
        </el-col>
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

  export default {
    name: 'accountTable',
    computed: {
      constantData () {
        return constantData;
      },
    },
    mounted: function (){
      this.$nextTick(function () {
        this.getDataByStatus()
        this.getDataByPageNum(0)
      });
    },
    props: ['accountInfo','status','pageSize','isBuyer'],
    data(){
        return{
          tableData:this.accountInfo,
          showData:[],
          accountsStatus:this.status,
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
      showDetail(no){

      },
      confirmAccept(no){

      },
      confirmCash(no){

      },
      confirmDiscount(no){

      }
    }
  }
</script>

<style>
</style>
