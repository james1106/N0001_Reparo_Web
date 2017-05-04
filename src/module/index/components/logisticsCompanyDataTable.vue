<template>
  <div id="logisticsCompanyDataTable">
    <el-row class="el-row-header" style="background-color: rgb(229,241,245)">
      <el-col :span="6" style="margin-left: 19px">物流信息</el-col>
      <el-col :span="6">货品信息</el-col>
      <el-col :span="6">物流状态</el-col>
      <el-col :span="4" style="text-align: center">操作</el-col>
    </el-row>
    <template v-if="tableData.length===0">
      <el-row style="text-align: center">
        <img :src="imgUrl.default_0" style="width: 200px;margin-top: 15px">
      </el-row>
      <el-row style="text-align: center;font-size: 18px;color: #959697">
        <span>暂无该状态的物流信息</span>
      </el-row>
    </template>
    <template v-else>
    <template v-for="(item,index) in showData">
      <div>
        <el-row class="dataTable">
          <el-row class="el-row-header">
            <el-col :span="6" style="margin-left: 19px;">运单编号：{{item.wayBillNo}}</el-col>
            <el-col :span="6">发货人：{{item.senderEnterpriseName}}</el-col>
            <el-col :span="8">收货人：{{item.receiverEnterpriseName}}</el-col>
          </el-row>
          <el-row class="el-row-content">
            <el-col :span="6" style="margin-left: 19px;">
              <el-row>收货仓储：{{item.receiverRepoEnterpriseName}}</el-row>
              <el-row>发货仓储：{{item.senderRepoEnterpriseName}}</el-row>
            </el-col>
            <el-col :span="6">
              <el-row>货品名称：{{item.productName}}</el-row>
              <el-row>货品数量：{{item.productQuantity}}</el-row>
            </el-col>
            <el-col :span="6">
              <el-row>{{item.waybillStatusCode | wayBillStatus}}</el-row>
            </el-col>
            <el-col :span="4">
              <el-row style="text-align: center;" v-if="item.waybillStatusCode===constantData.SENDFORRESPONSE"><!--发货待响应-->
                <el-button size="mini" type="text" @click.native.prevent="sendConfirm(item.orderNo)">确认发货</el-button>
              </el-row>
              <el-row style="text-align: center;" v-if="item.waybillStatusCode===constantData.SENDED"><!--已发货-->
                <el-button size="mini" type="text" @click.native.prevent="receiveConfirm(item.orderNo)">确认收货</el-button>
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
    </template>
  </div>
</template>

<script>
  import store from '../vuex/store'
  import constantData from '../../../common/const'
  import default_0 from  '../assets/default_0.png'
  export default {
    name: 'logisticsCompanyDataTable',
    props: ['logisticsCompanyList','status','pageSize'],
    data(){
      return{
        tableData:this.logisticsCompanyList,
        showData:[],
        accountsStatus:this.status,
        detailPath:'',
        imgUrl: {
          default_0:default_0
        }
      }
    },
    mounted(){/*初始值，后面请求数据就删掉，以免显示空列表*/
      console.log(this.logisticsCompanyList);
/*
      this.getDataByStatus();
      this.getDataByPageNum(0);*/
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
              if(item.waybillStatusCode===constantData.ARRIVED){
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
        this.$router.push("/logisticsCompany/companyBillDetails");
      },
      sendConfirm(orderNo){
        store.commit('setCheckIdOrder',orderNo);
        this.$router.push('/logisticsCompany/sendConfirm');
      },
      receiveConfirm(orderNo){
        store.commit('setCheckIdOrder',orderNo);
        this.$router.push('/logisticsCompany/receiveConfirm');
      },

    }
  }
</script>

<style>
</style>
