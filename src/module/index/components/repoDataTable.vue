<template>
  <div id="repoDataTable"   >
    <el-row class="el-row-header" style="background-color: rgb(229,241,245)">
      <el-col :span="4" style="margin-left: 19px">货品信息</el-col>
      <el-col :span="4">所在仓储</el-col>
      <el-col :span="4">仓储状态</el-col>
      <el-col :span="4">仓单编号</el-col>
      <el-col :span="4">仓单状态</el-col>
      <el-col :span="2">操作</el-col>
    </el-row>
    <template v-if="tableData.length===0">
      <el-row style="text-align: center">
        <img :src="imgUrl.default_0" style="width: 200px;margin-top: 15px">
      </el-row>
      <el-row style="text-align: center;font-size: 18px;color: #959697">
        <span>暂无该状态的仓储信息</span>
      </el-row>
    </template>
    <template v-else>
      <template v-for="(item,index) in showData">
        <div>
          <el-row class="dataTable">
            <el-row class="el-row-header">
              <el-col :span="8" style="margin-left: 19px;">仓储业务编号：{{item.repoBusiNo | nullSituation}}</el-col>
              <el-col :span="8">订单编号：{{item.orderNo | nullSituation}}</el-col>
            </el-row>
            <el-row class="el-row-content">
              <el-col :span="4" style="margin-left: 19px;">
                <el-row>货品名称：{{item.productName}}</el-row>
                <el-row>货品数量：{{item.productQuantity}}</el-row>
              </el-col>
              <el-col :span="4">
                <el-row>{{item.repoEnterpriceName}}</el-row><!--所在仓储-->
              </el-col>
              <el-col :span="4">
                <el-row>{{item.curRepoBusiStatus | repoStatus}}</el-row><!--仓储状态-->
              </el-col>
              <el-col :span="4">
                <el-row v-if="item.repoCertNo===''">暂无</el-row><!--仓单编号-->
                <el-row v-else>{{item.repoCertNo}}</el-row><!--仓单编号-->
              </el-col>
              <el-col :span="4">
                <el-row>{{item.repoCertStatus | repoCertStatus | nullSituation}}</el-row><!--仓单状态-->
              </el-col>
              <el-col :span="3">
                <el-button size="small" @click.native.prevent="checkDetail(item.repoBusiNo)">查看详情</el-button>
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
  import store from '../vuex/store'
  import constantData from '../../../common/const'
  import default_0 from  '../assets/default_0.png'

  export default {
    name: 'repoDataTable',
    props: ['repoList','status','pageSize'],
    data(){
      return{
        tableData:this.repoList,
        showData:[],
        accountsStatus:this.status,
        detailPath:'',
        imgUrl: {
          default_0:default_0
        }
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
      pageSize1 () {
        return this.pageSize;
      }
    },
    methods:{
      currentChange(val){
        this.getDataByPageNum(val - 1)
      },
      getDataByStatus(){/*筛选出各个Tab状态*/
        switch(this.status){
          case 'all':break;
          case 'inForResponse':/*入库待响应*/
            var res=[];
            for(var i=0;i<this.tableData.length;i++ ){
              var item = this.tableData[i];
              if(item.curRepoBusiStatus===constantData.INFORRESPONSE){
                res.push(item)
              }
            }
            this.tableData = res;break;
          case 'forIn':/*待入库*/
            var res=[];
            for(var i=0;i<this.tableData.length;i++ ){
              var item = this.tableData[i];
              if(item.curRepoBusiStatus===constantData.FORIN){
                res.push(item)
              }
            }
            this.tableData = res;break;
          case 'alreadyIn':/*已入库*/
            var res=[];
            for(var i=0;i<this.tableData.length;i++ ){
              var item = this.tableData[i];
              if(item.curRepoBusiStatus===constantData.ALREADYIN){
                res.push(item)
              }
            }
            this.tableData = res;break;
          case 'forOut':/*待出库*/
            var res=[];
            for(var i=0;i<this.tableData.length;i++ ){
              var item = this.tableData[i];
              if(item.curRepoBusiStatus===constantData.FOROUT){
                res.push(item)
              }
            }
            this.tableData = res;break;
            case 'alreadyOut':/*已出库*/
            var res=[];
            for(var i=0;i<this.tableData.length;i++ ){
              var item = this.tableData[i];
              if(item.curRepoBusiStatus===constantData.ALREADYOUT){
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

      checkDetail (checkId) {
//        alert(this.tableData);

        store.commit('setCheckIdRepo',checkId);
        console.log(store.state.checkIdRepo);
        this.$router.push("/warehousing/repoDetails");
      },
    }
  }
</script>
