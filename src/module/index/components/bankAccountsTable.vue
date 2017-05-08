<template>
  <div id="accountTable">
    <el-row class="el-row-header" style="background-color: rgb(229,241,245)">
      <el-col :span="5" style="margin-left: 20px">账款金额</el-col>
      <el-col :span="5">账款信息</el-col>
      <el-col :span="5">账款到期日</el-col>
      <el-col :span="5">当前状态</el-col>
      <el-col :span="2">操作</el-col>
    </el-row>
    <template v-if="tableData.length===0">
      <el-row style="text-align: center">
        <img :src="imgUrl.default_0" style="width: 200px;margin-top: 15px">
      </el-row>
      <el-row style="text-align: center;font-size: 18px;color: #959697">
        <span>暂无该状态的应收账款</span>
      </el-row>
    </template>

    <template v-else>
    <template v-for="item in showData">
      <el-row class="dataTable">
        <el-row class="el-row-header">
          <el-col :span="10" style="margin-left: 19px;">应收帐款编号：{{item.receivableNo}}</el-col>
          <el-col :span="10">融资申请时间：</el-col>
        </el-row>
        <el-row class="el-row-content">
          <el-col :span="5" style="margin-left: 19px;">
            <el-col :span="24">{{item.isseAmt}}元</el-col>
          </el-col>
          <el-col :span="5">
            <el-col :span="24">持有人：</el-col>
            <el-col :span="24">承兑人：</el-col>
          </el-col>
          <el-col :span="5">
            <el-col :span="24">{{item.dueDt | timeTransfer}}</el-col>
          </el-col>
          <el-col :span="5">
            <el-col :span="24">{{item.status | receStatus}}</el-col>
          </el-col>
          <el-col :span="2">
            <el-col :span="24">
              <el-button size="mini" type="text" class="buyerColor" @click.native.prevent="discount(item.receivableNo)">确认融资</el-button>
            </el-col>
            <el-col :span="24" style="margin-left: -9px">
              <!--.native是子组件绑定原生事件而不是父控件响应子组件的方法 -->
              <el-button size="small" type="default" @click.native.prevent="showDetail(item.receivableNo)">查看详情</el-button>
            </el-col>
          </el-col>
        </el-row>
      </el-row>
    </template>
    <el-pagination
      layout="total,prev, pager, next,jumper"
      @current-change="currentChange"
      :total="tableData.length" :page-size="pageSize">
    </el-pagination>
    </template>
  </div>
</template>

<script>
  import constantData from '../../../common/const'
  import Store from '../vuex/store.js'
  import default_0 from  '../assets/default_0.png'

  export default {
    name: 'accountTable',
    props: ['accountInfo','status','pageSize','isBuyer'],
    data(){
        return{
          tableData:this.accountInfo,
          showData:[],
          accountsStatus:this.status,
          imgUrl: {
            default_0:default_0
          }
        }
    },
    computed: {
      state () {
        return Store.state;
      },
      constantData () {
        return constantData;
      },
      pageSize () {
        return this.pageSize;
      }
    },
    watch:{
      accountInfo(curVal){
        this.tableData = curVal
        this.getDataByStatus()
        this.getDataByPageNum(0)
      }
    },
    methods:{
      currentChange(val){
        this.getDataByPageNum(val - 1)
      },
      getDataByStatus(){
          if(this.accountsStatus == 0){
              return
          }
          var res = []
          for(var i=0;i<this.tableData.length;i++ ){
            var item = this.tableData[i];
            if(item.status == this.accountsStatus){
              res.push(item)
            }
          }
          this.tableData = res
      },
      getDataByPageNum(pageNum){
          if((pageNum + 1) * this.pageSize > this.tableData.length){
            this.showData = this.tableData.slice(pageNum * this.pageSize);
          }else {
            this.showData = this.tableData.slice(pageNum * this.pageSize,(pageNum + 1)*this.pageSize);
          }
      },
      showDetail(receivableNo){
        Store.commit('setCheckIdRece',receivableNo);
        this.$router.push("/bank/detail");
      },
//      discount(){
//        this.$router.push("/bank/detail");
//      }
    }
  }
</script>
