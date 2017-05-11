<template>
  <div id="receiptDataTable"  >
    <el-row class="el-row-header" style="background-color: rgb(229,241,245)">
      <el-col :span="6" style="margin-left: 19px">货品信息</el-col>
      <el-col :span="6">所在仓储</el-col>
      <el-col :span="6">仓单状态</el-col>
      <el-col :span="4">操作</el-col>
    </el-row>
    <template v-if="tableData.length===0">
      <el-row style="text-align: center">
        <img :src="imgUrl.default_0" style="width: 200px;margin-top: 15px">
      </el-row>
      <el-row style="text-align: center;font-size: 18px;color: #959697">
        <span>暂无该状态的仓单信息</span>
      </el-row>
    </template>
    <template v-else>
    <template v-for="(item,index) in showData">
      <div>
        <el-row class="dataTable">
          <el-row class="el-row-header">
            <el-col :span="8" style="margin-left: 19px;">仓单编号：{{item.repoCertNo | nullSituation}}</el-col>
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
              <el-button v-if="item.repoCertNo !== ''" size="small" @click.native.prevent="checkDetail(item.repoCertNo)">查看详情</el-button>
              <span v-else>暂无操作</span>
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
  import store from '../../vuex/store'
  import constantData from '../../../../common/const'
  import default_0 from  '../../assets/default_0.png'
  export default {
    name: 'receiptDataTable',
    props: ['receiptList','status','pageSize'],
    data(){
      return{
        tableData:this.receiptList,
        showData:[],
        accountsStatus:this.status,
        imgUrl: {
          default_0:default_0
        }
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
          case 'canFlow':/*可流转*/
            var res=[];
            for(var i=0;i<this.tableData.length;i++ ){
              var item = this.tableData[i];
              if(item.repoCertStatus===constantData.CANFLOW){
                res.push(item)
              }
            }
            this.tableData = res;break;
          case 'frozen':/*冻结中*/
            var res=[];
            for(var i=0;i<this.tableData.length;i++ ){
              var item = this.tableData[i];
              if(item.repoCertStatus===constantData.FROZEN){
                res.push(item)
              }
            }
            this.tableData = res;break;
          case 'disabled':/*已失效*/
            var res=[];
            for(var i=0;i<this.tableData.length;i++ ){
              var item = this.tableData[i];
              if(item.repoCertStatus===constantData.DISABLED){
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

        store.commit('setCheckIdRepoCert',checkId);
        console.log(store.state.checkIdRepoCert);
        this.$router.push("/warehousing/receiptsDetails");
      },
    }
  }
</script>
