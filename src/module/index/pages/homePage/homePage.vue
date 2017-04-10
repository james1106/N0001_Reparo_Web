<template>
  <div>
    <!--<el-card>-->
      <!--<el-card class="box-card">-->
        <!--<div slot="header" class="clearfix headername">-->
          <!--<span>订单管理</span>-->
        <!--</div>-->
        <!--<div v-for="item in items1" class="text item">-->
          <!--{{ item.message }}-->
        <!--</div>-->
      <!--</el-card>-->
      <!--<el-card class="box-card">-->
        <!--<div slot="header"  class="clearfix headername">-->
          <!--<span >应收账款</span>-->
        <!--</div>-->
        <!--<div v-for="item in items2" class="text item">-->
          <!--{{ item.message }}-->
        <!--</div>-->
      <!--</el-card>-->
      <!--<el-card class="box-card" style="height: 187px">-->
        <!--<div slot="header" class="clearfix headername">-->
          <!--<span>物流管理</span>-->
        <!--</div>-->
        <!--<div v-for="item in items3" class="text item">-->
          <!--{{ item.message }}-->
        <!--</div>-->
      <!--</el-card>-->
      <!--<el-card class="box-card">-->
        <!--<div slot="header" class="clearfix headername">-->
          <!--<span>仓储管理</span>-->
        <!--</div>-->
        <!--<div v-for="item in items4" class="text item">-->
          <!--{{ item.message }}-->
        <!--</div>-->
      <!--</el-card>-->
    <!--</el-card>-->

    <el-card>
      <el-table
        :data="tableData"
        border:false
        class="el-table"
        style="width: 724px;">
        <el-table-column
          prop="number"
          label="业务编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="type"
          label="业务类型"
          width="180">
        </el-table-column>
        <el-table-column
          prop="opponent"
          label="交易对手"
          width="100">
        </el-table-column>
        <el-table-column
          prop="value"
          label="金额"
          width="150">
        </el-table-column>
        <el-table-column
          prop="option"
          label="操作"
          width="114">
          <template scope="scope">
            <el-button>立即查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>

</template>


<script>
export default {
  name: 'app',
  data () {
    return {
//      msg: 'Welcome to Your Vue.js App'
      items1: [
        { message: '发起订单' },
        { message: '我买入的订单' },
        { message: '待付款' }
      ],
      items2: [
        { message: '签发' },
        { message: '我的应收账款' },
        { message: '贴现' }
      ],
      items3: [
        { message: '我的物流' },
        { message: '待收货' }
      ],
      items4: [
        { message: '我的仓储' },
        { message: '已入库' },
        { message: '待入库' }
      ],
      tableData: [{
        number: '20170403123456',
        type: '签发待确认',
        opponent:'A企业',
        value: '20,000',
      }, {
        number: '20170403234567',
        type: '订单待确认',
        opponent:'B企业',
        value: '20,000'
      }, {
        number: '20170403123567',
        type: '到期待还款',
        opponent:'C企业',
        value: '20,000'
      }]
    }
  }
}
</script>

<style>
  /*.headername{*/
    /*font-size: 18px;*/
    /*line-height: 20px;*/
    /*text-align: center;*/
    /*border-bottom: 0px!important;*/
  /*}*/
  /*.text {*/
    /*font-size: 14px;*/
    /*text-align: center;*/
  /*}*/

  /*.item {*/
    /*padding: 5px 0;*/
  /*}*/

  /*.clearfix:before,*/
  /*.clearfix:after {*/
    /*display: table;*/
    /*content: "";*/
  /*}*/
  /*.clearfix:after {*/
    /*clear: both*/
  /*}*/

  /*.box-card {*/
    /*width: 190px;*/
    /*float: left;*/
    /*margin: 0 5px;*/
    /*background-color: rgb(242,242,242);*/
  /*}*/
  .el-table th.is-leaf{
    border-bottom: 0px!important;
    background-color: transparent;
  }
  .el-table td{
    border-bottom: 0px!important;
    background-color: rgb(242,242,242);
    height: 55px!important;
  }
  .el-table__fixed-header-wrapper thead div, .el-table__header-wrapper thead div{
    background-color: rgb(201,201,201)!important;
    width: 100%;
  }
  /*.el-card__body{*/
    /*height: 90px;*/
  /*}*/
</style>
