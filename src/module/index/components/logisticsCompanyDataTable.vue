<template>
  <div id="logisticsCompanyDataTable">
    <el-row class="el-row-header" style="background-color: rgb(229,241,245)">
      <el-col :span="6" style="margin-left: 19px">运单编号</el-col>
      <el-col :span="6">物流状态</el-col>
      <el-col :span="6">物流信息</el-col>
      <el-col :span="4" style="text-align: center">操作</el-col>
    </el-row>
    <template v-for="(item,index) in showData">
      <div>
        <el-row class="dataTable">
          <!--<el-row class="el-row-header">
            <el-col :span="6" style="margin-left: 19px;">运单编号：{{item.waybillNo}}</el-col>
            <el-col :span="6">订单编号：{{item.orderNo}}</el-col>
            <el-col :span="8">收货人：{{item.receiverEnterpriseName}}</el-col>
          </el-row>-->
          <el-row class="el-row-content">
            <el-col :span="6" style="margin-left: 19px;">
              <!--<el-row>物流公司：{{item.logisticsCompanyEnterpriseName}}</el-row>
              <el-row>货品仓储：{{item.senderRepoEnterpriseName}}</el-row>-->
              <el-row>运单编号：{{item.waybillNo}}</el-row>
            </el-col>
            <el-col :span="6">
              <!--<el-row>货品名称：{{item.productName}}</el-row>
              <el-row>货品数量：{{item.productQuantity}}</el-row>-->
              <el-row>物流状态：{{item.waybillStatusCode | wayBillStatus}}</el-row>
            </el-col>
            <el-col :span="6">
                <el-row>货品名称：{{item.productName}}</el-row>
                <el-row>货品数量：{{item.productQuantity}}</el-row>
            </el-col>
            <el-col :span="4">
              <el-row style="text-align: center;" v-if="item.waybillStatusCode===constantData.SENDFORRESPONSE"><!--发货待响应-->
                <el-button size="mini" type="text" @click.native.prevent="sendConfirm(item.orderNo)">发货确认</el-button>
              </el-row>
              <el-row style="text-align: center;" v-if="item.waybillStatusCode===constantData.SENDED"><!--已发货-->
                <el-button size="mini" type="text" @click.native.prevent="receiveConfirm(item.orderNo)">收货确认</el-button>
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
    name: 'logisticsCompanyDataTable',
    props: ['logisticsCompanyList','status','pageSize'],
    data(){
      return{
        tableData:this.logisticsCompanyList,
        showData:[],
        accountsStatus:this.status,
        detailPath:''
      }
    },
    mounted(){/*初始值，后面请求数据就删掉，以免显示空列表*/
      console.log(this.logisticsCompanyList);

      this.getDataByStatus();
      this.getDataByPageNum(0);
    },
    watch:{
      logisticsCompanyList(curVal){
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
          case 'sendForResponse':/*发货待响应／发货待确认*/
            var res=[];
            for(var i=0;i<this.tableData.length;i++ ){
              var item = this.tableData[i];
              if(item.waybillStatusCode===constantData.SENDFORRESPONSE){
                res.push(item)
              }
            }
            this.tableData = res;break;
          case 'sended':/*已发货*/
            var res=[];
            for(var i=0;i<this.tableData.length;i++ ){
              var item = this.tableData[i];
              if(item.waybillStatusCode===constantData.SENDED){
                res.push(item)
              }
            }
            this.tableData = res;break;
          case 'received':/*已送达*/
            var res=[];
            for(var i=0;i<this.tableData.length;i++ ){
              var item = this.tableData[i];
              if(item.waybillStatusCode===constantData.RECEIVED){
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

        store.commit('setCheckId',orderNo);
        console.log(store.state.checkId);
        this.$router.push("/logisticsCompany/companyBillDetails");
      },
      sendConfirm(orderNo){
        store.commit('setCheckId',orderNo);
        this.$router.push('/logisticsCompany/sendConfirm');
      },
      receiveConfirm(orderNo){
        store.commit('setCheckId',orderNo);
        this.$router.push('/logisticsCompany/receiveConfirm');
      },

    }
  }
</script>

<style>
</style>
