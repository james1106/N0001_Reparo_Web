<template>
  <div id="repoDataTable">
    <el-row class="el-row-header" style="background-color: rgb(229,241,245)">
      <el-col :span="4" style="margin-left: 19px">货品信息</el-col>
      <el-col :span="4">所在仓储</el-col>
      <el-col :span="4">仓储状态</el-col>
      <el-col :span="4">仓单编号</el-col>
      <el-col :span="4">仓单状态</el-col>
      <el-col :span="2">操作</el-col>
    </el-row>
    <template v-for="(item,index) in showData">
      <div>
        <el-row class="dataTable">
          <el-row class="el-row-header">
            <el-col :span="8" style="margin-left: 19px;">仓储业务编号：{{item.orderNo}}</el-col>
            <el-col :span="8">订单编号：{{item.orderGenerateTime | timeTransfer}}</el-col>
          </el-row>
          <el-row class="el-row-content">
            <el-col :span="4" style="margin-left: 19px;">
              <el-row>货品名称：{{item.productName}}</el-row>
              <el-row>货品数量：{{item.productQuantity}}</el-row>
            </el-col>
            <el-col :span="4">
              <el-row>ABC仓储：{{item.productTotalPrice}}</el-row>
            </el-col>
            <el-col :span="4">
              <el-row>待入库</el-row>
            </el-col>
            <el-col :span="4">
              <el-row>暂无</el-row>
            </el-col>
            <el-col :span="4">
              <el-row>暂无</el-row>
            </el-col>
            <el-col :span="3">
              <el-button type="primary" size="small" @click.native.prevent="checkDetail()">查看详情</el-button>
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
    name: 'repoDataTable',
    props: ['repoList','status','pageSize'],
    data(){
      return{
        tableData:this.repoList,
        showData:[],
        accountsStatus:this.status,
        detailPath:''
      }
    },
    mounted(){/*初始值，后面请求数据就删掉，以免显示空列表*/
      console.log(this.repoList);

      this.getDataByStatus();
      this.getDataByPageNum(0);
    },
    watch:{
      repoList(curVal){
          console.log(curVal);
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
          case 'inForResponse':
            var res=[];
            for(var i=0;i<this.tableData.length;i++ ){
              var item = this.tableData[i];
              if(item.transactionStatus===constantData.UNCONFIRMED){
                res.push(item)
              }
            }
            this.tableData = res;break;
          case 'forIn':
            var res=[];
            for(var i=0;i<this.tableData.length;i++ ){
              var item = this.tableData[i];
              if((item.receStatus===constantData.FORACCEPT)||(item.transactionStatus===constantData.CONFIRMED)){
                res.push(item)
              }
            }
            this.tableData = res;break;
          case 'alreadyIn':
            var res=[];
            for(var i=0;i<this.tableData.length;i++ ){
              var item = this.tableData[i];
              if(item.receStatus===constantData.ACCEPTED){
                res.push(item)
              }
            }
            this.tableData = res;break;
          case 'forOut':
            var res=[];
            for(var i=0;i<this.tableData.length;i++ ){
              var item = this.tableData[i];
              if(item.wayBillStatus===constantData.SENDED){
                res.push(item)
              }
            }
            this.tableData = res;break;
            case 'alreadyOut':
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

      checkDetail () {
//        alert(this.tableData);

//        store.commit('setCheckId',orderNo);
        console.log(store.state.checkId);
        this.$router.push("/warehousing/repoDetails");
      },
    }
  }
</script>

<style>
</style>
