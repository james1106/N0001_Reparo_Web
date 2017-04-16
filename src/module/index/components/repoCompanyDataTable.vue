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
          <el-row class="el-row-content">
            <el-col :span="4" style="margin-left: 19px;">
              <el-row>{{item.repoBusiNo}}</el-row>
            </el-col>
            <el-col :span="4">
              <el-row>持有人</el-row>
            </el-col>
            <el-col :span="4">
              <el-row>{{item.status | repoStatus}}</el-row>
            </el-col>
            <el-col :span="4">
              <el-row>{{item.repoCertNo}}</el-row>
            </el-col>
            <el-col :span="4">
              <el-row>{{item.repoCertStatus}}</el-row>
            </el-col>
            <el-col :span="3">
              <el-button type="primary" size="small" @click.native.prevent="checkDetail(item.repoBusinessNo,item.status)">查看详情</el-button>
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
        repoStatus:this.status,
      }
    },
    mounted(){/*初始值，后面请求数据就删掉，以免显示空列表*/
      this.getDataByStatus();
      this.getDataByPageNum(0);
    },
    watch:{
//      repoList(curVal){
//          this.tableData = curVal
//          this.getDataByStatus();
//          this.getDataByPageNum(0);
//      }
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
          if(item.status == this.repoStatus){
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
      checkDetail(repoBusinessNo,status){
        store.commit('setCheckId',repoBusinessNo);
//        INFORRESPONSE:1,/*入库待响应*/
//          FORIN:2,/*待入库*/
//          ALREADYIN:3,/*已入库*/
//          OUTFORRESPONSE:4,/*出库待响应*/
//          FOROUT:5,/*待出库*/
//          ALREADYOUT:6,/*已出库*/
        var path = '';
        switch (status){
          case constantData.INFORRESPONSE:
            path = '/warehousingCompany/inResponse'
            break;
          case constantData.FORIN:
            path = '/warehousingCompany/inConfirm'
            break;
          case constantData.FOROUT:
            path = '/warehousingCompany/outConfirm'
            break;
          default:
        }
        this.$router.push(path)
      }
    }
  }
</script>

<style>
</style>
