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
              <el-row>{{item.repoBusiNo | nullSituation}}</el-row>
            </el-col>
            <el-col :span="4">
              <el-row>{{item.holderEnterpriseName}}</el-row>
            </el-col>
            <el-col :span="4">
              <el-row>{{item.curRepoBusiStatus | repoStatus}}</el-row>
            </el-col>
            <el-col :span="4">
              <el-row>{{item.repoCertNo | nullSituation}}</el-row>
            </el-col>
            <el-col :span="4">
              <el-row>{{item.repoCertStatus | repoCertStatus}}</el-row>
            </el-col>
            <el-col :span="3">
              <el-button size="small" @click.native.prevent="showDetail(item.repoBusiNo,item.curRepoBusiStatus)">查看详情</el-button>
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
      showDetail(repoBusinessNo,status){
        store.commit('setCheckId',repoBusinessNo);
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
