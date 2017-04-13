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
          <el-col :span="24">{{item.status}}</el-col>
        </el-col>
        <el-col :span="4">
          <el-col :span="24">
            <router-link to="/allAccounts/signout/signout">签发账款</router-link>
          </el-col>
          <el-col :span="24">
            <router-link to="/allAccounts/accounts/detail">查看详情</router-link>
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
  export default {
    name: 'accountTable',
    mounted: function (){
      this.$nextTick(function () {
        this.getDataByStatus()
        this.getDataByPageNum(0)
      });
    },
    props: ['accountInfo','status','pageSize'],
    data(){
        return{
          tableData:this.accountInfo,
          showData:[],
          accountsStatus:this.status,
          detailPath:''
        }
    },
    methods:{
      currentChange(val){
        this.getDataByPageNum(val - 1)
      },
      turnStatus(){
          switch (this.accountsStatus){
            case 'all':

                return '1'
              break;
            case 'accept':
                return '2'
              break;
            case 'discount':
                return '3'
              break;
            case 'cash':
                return '4'
              break;
            case 'signout':
                return '5'
              break;
            case 'other':
                return '6'
              break;
            default:
                return "1"
          }
      },
      getDataByStatus(){
          var resStatus = this.turnStatus()
          if(resStatus == '1'){
              return
          }
          var res = []
          for(var i=0;i<this.tableData.length;i++ ){
            var item = this.tableData[i];
            if(item.status == resStatus){
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
      }
    }
  }
</script>

<style>
</style>
