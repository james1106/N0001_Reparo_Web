<template>
  <div id="repoDataTable">
    <el-row class="el-row-header" style="background-color: rgb(229,241,245)">
      <el-col :span="4" style="margin-left: 19px">业务编号</el-col>
      <el-col :span="4">持有人</el-col>
      <el-col :span="4">仓储状态</el-col>
      <el-col :span="4">仓单编号</el-col>
      <el-col :span="4">仓单状态</el-col>
      <el-col :span="2">操作</el-col>
    </el-row>
    <template v-for="(item,index) in showData">
      <div>
        <el-row class="dataTable">
          <el-row class="el-row-header">
            <el-col :span="8" style="margin-left: 19px;">仓储业务编号：{{item.repoBusiNo}}</el-col>
            <el-col :span="8">订单编号：{{item.orderNo}}</el-col>
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
              <el-row>{{item.repoCertNo | nullSituation}}</el-row><!--仓单编号-->
            </el-col>
            <el-col :span="4">
              <el-row>{{item.repoCertStatus | repoCertStatus | nullSituation}}</el-row><!--仓单状态-->
            </el-col>
            <el-col :span="3">
              <el-col :span="24">
                <el-button size="mini" type="text" class="buyerColor" v-if="item.curRepoBusiStatus===constantData.INFORRESPONSE" @click.native.prevent="inResponse(item.repoBusiNo)">入库响应</el-button>
                <el-button size="mini" type="text" class="buyerColor" v-if="item.curRepoBusiStatus===constantData.FORIN" @click.native.prevent="inConfirm(item.repoBusiNo)">入库确认</el-button>
                <el-button size="mini" type="text" class="buyerColor" v-if="item.curRepoBusiStatus===constantData.FOROUT" @click.native.prevent="outConfirm(item.repoBusiNo)">出库确认</el-button>
              </el-col>
              <el-col :span="24" style="margin-left: -9px">
                <el-button size="small" @click.native.prevent="checkDetail(item.repoBusiNo)">查看详情</el-button>
              </el-col>
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

  export default {
    name: 'repoDataTable',
    props: ['repoList','status','pageSize'],
    data(){
      return{
        tableData:this.repoList,
        showData:[],
        repoStatus:this.status,
      }
    },
    watch:{
      repoList(curVal){
          this.tableData = curVal
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
      getDataByStatus(){
        if(this.repoStatus == 0){
          return
        }
        var res=[];
        for(var i=0;i<this.tableData.length;i++ ){
          var item = this.tableData[i];
          if(item.curRepoBusiStatus == this.repoStatus){
            res.push(item)
          }
        }
        this.tableData = res;
      },
      getDataByPageNum(pageNum){
        if ((pageNum + 1) * this.pageSize > this.tableData.length) {
          this.showData = this.tableData.slice(pageNum * this.pageSize);
        } else {
          this.showData = this.tableData.slice(pageNum * this.pageSize, (pageNum + 1) * this.pageSize);
        }
      },
      checkDetail(repoBusinessNo){
        store.commit('setCheckIdRepo',repoBusinessNo);
        this.$router.push('/warehousingCompany/repoDetails')
      },
      inResponse(repoBusinessNo){
        store.commit('setCheckIdRepo',repoBusinessNo);
        this.$router.push('/warehousingCompany/inResponse')
      },
      inConfirm(repoBusinessNo){
        store.commit('setCheckIdRepo',repoBusinessNo);
        this.$router.push('/warehousingCompany/inConfirm')
      },
      outConfirm(repoBusinessNo){
        store.commit('setCheckIdRepo',repoBusinessNo);
        this.$router.push('/warehousingCompany/outConfirm')
      }
    }
  }
</script>

<style>
</style>
