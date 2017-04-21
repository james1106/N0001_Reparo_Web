<template>
  <div id="logisticsDataTable">
    <el-row class="el-row-header" style="background-color: rgb(229,241,245)">
      <el-col :span="6" style="margin-left: 19px">物流信息</el-col>
      <el-col :span="6">货品信息</el-col>
      <el-col :span="6">物流状态</el-col>
      <el-col :span="4" style="text-align: center">操作</el-col>
    </el-row>
    <template v-for="(item,index) in showData">
      <div>
        <el-row class="dataTable">
          <el-row class="el-row-header">
            <el-col :span="6" style="margin-left: 19px;">运单编号：{{item.wayBillNo | nullSituation}}</el-col>
            <el-col :span="6">订单编号：{{item.orderNo}}</el-col>
            <el-col :span="8">收货人：{{item.receiverEnterpriseName}}</el-col>
          </el-row>
          <el-row class="el-row-content">
            <el-col :span="6" style="margin-left: 19px;">
              <el-row>物流公司：{{item.logisticsEnterpriseName | nullSituation}}</el-row>
              <el-row>货品仓储：{{item.senderRepoEnterpriseName}}</el-row>
            </el-col>
            <el-col :span="6">
              <el-row>货品名称：{{item.productName}}</el-row>
              <el-row>货品数量：{{item.productQuantity}}</el-row>
            </el-col>
            <el-col :span="6">
              <el-row>{{item.waybillStatusCode | wayBillStatus}}</el-row>
            </el-col>
            <el-col :span="4">
              <el-row style="text-align: center;" v-if="item.waybillStatusCode===constantData.FORSEND"><!--待发货-->
                <el-button size="mini" type="text" @click.native.prevent="deliver(item.orderNo)">申请发货</el-button>
              </el-row>
              <el-row style="text-align: center;">
                <el-button size="small" style="height: 25px" @click.native.prevent="checkDetail(item.orderNo)">查看详情</el-button>
              </el-row>
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
    name: 'logisticsDataTable',
    props: ['logisticsList','status','pageSize'],
    data(){
      return{
        tableData:this.logisticsList,
        showData:[],
        accountsStatus:this.status,
        detailPath:''
      }
    },
    mounted(){/*初始值，后面请求数据就删掉，以免显示空列表*/
      console.log(this.logisticsList);

     /* this.getDataByStatus();
      this.getDataByPageNum(0);*/
    },
    watch:{
      logisticsList(curVal){
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
    },
    methods:{
      currentChange(val){
        this.getDataByPageNum(val - 1)
      },
      getDataByStatus(){/*筛选出各个Tab状态*/
        switch(this.status){
          case 'all':break;
          case 'forSend':/*待发货*/
            var res=[];
            for(var i=0;i<this.tableData.length;i++ ){
              var item = this.tableData[i];
              if(item.waybillStatusCode===constantData.FORSEND){
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
//        alert(this.tableData);

        store.commit('setCheckIdOrder',orderNo);
        console.log(store.state.checkIdOrder);
        this.$router.push("/logistics/wayBillDetails");
      },
      deliver(orderNo){
        store.commit('setCheckIdOrder',orderNo);
        this.$router.push('/logistics/deliver');
      }
    }
  }
</script>

<style>
</style>
