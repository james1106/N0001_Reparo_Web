<template>
  <div id="receiptDataTable">
    <el-row class="el-row-header" style="background-color: rgb(229,241,245)">
      <el-col :span="6" style="margin-left: 19px">货品信息</el-col>
      <el-col :span="6">所在仓储</el-col>
      <el-col :span="6">仓单状态</el-col>
      <el-col :span="4">操作</el-col>
    </el-row>
    <template v-for="(item,index) in showData">
      <div>
        <el-row class="dataTable">
          <el-row class="el-row-header">
            <el-col :span="8" style="margin-left: 19px;">仓单编号：{{item.repoBusinessNo | nullSituation}}</el-col><!--后台的数据传的是仓储业务编号 不对吧:(-->
          </el-row>
          <el-row class="el-row-content">
            <el-col :span="6" style="margin-left: 19px;">
              <el-row>货品名称：{{item.productName}}</el-row>
              <el-row>货品数量：{{item.productQuantity}}</el-row>
            </el-col>
            <el-col :span="6">
              <el-row>{{item.repoEnterpriseName}}</el-row>
            </el-col>
            <el-col :span="6">
              <el-row>{{item.repoCertStatus | repoCertStatus}}</el-row>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" size="small" @click.native.prevent="checkDetail(item.repoBusinessNo)">查看详情</el-button><!--根据仓储业务编号竟然查到了仓单信息，是这样嘛？-->
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
    name: 'receiptDataTable',
    props: ['receiptList','status','pageSize'],
    data(){
      return{
        tableData:this.receiptList,
        showData:[],
        receiptStatus:this.status,
        detailPath:''
      }
    },
    mounted(){/*初始值，后面请求数据就删掉，以免显示空列表*/
      console.log(this.receiptList);

      this.getDataByStatus();
      this.getDataByPageNum(0);
    },
    watch:{
      receiptList(curVal){
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
        if((pageNum + 1) * this.pageSize > this.tableData.length){
          this.showData = this.tableData.slice(pageNum * this.pageSize);
        }else {
          this.showData = this.tableData.slice(pageNum * this.pageSize,(pageNum + 1)*this.pageSize);
        }
      },
      checkDetail (checkId) {
        store.commit('setCheckId',checkId);
        console.log(store.state.checkId);
        this.$router.push('');
      },
    }
  }
</script>

<style>
</style>
