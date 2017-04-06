<template>
  <div>
    <div class="box1">
      <el-card class="box-card">
        <div slot="header" class="clearfix headername">
          <span>订单管理</span>
        </div>
        <div v-for="item in items1" class="text item">
          {{ item.message }}
        </div>
      </el-card>

      <el-card class="box-card">
        <div slot="header"  class="clearfix headername">
          <span>应收账款</span>
        </div>
        <div v-for="item in items2" class="text item">
          {{ item.message }}
        </div>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix headername">
          <span>预付账款</span>
        </div>
        <div v-for="item in items3" class="text item">
          {{ item.message }}
        </div>
      </el-card>
    </div>

    <div class="box2">
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
    </div>
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
        { message: '确认订单' },
        { message: '所有订单' }
      ],
      items2: [
        { message: '应收还款' },
        { message: '确认应收' },
        { message: '应收融资' }
      ],
      items3: [
        { message: '追缴保金' },
        { message: '确认预付' },
        { message: '预付融资' }
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

  /*卡片样式*/
  .box1{
    border: 1px solid #d1dbe5;
    height: 220px;
    padding:20px 1px 0px 10px;
    margin-right: 80px;
  }
  .box2{
    border: 1px solid #d1dbe5;
    width: 752px;;
    height: 250px;
    padding:20px 1px 0px 25px;
    margin-top: 20px;
  }
  .headername{
    font-size: 18px;
    line-height: 20px;
    text-align: center;
    border-bottom: 0px!important;
  }
  .text {
    font-size: 14px;
    text-align: center;
  }

  .item {
    padding: 5px 0;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 220px;
    float: left;
    margin: 0 15px;
    background-color: rgb(242,242,242);
  }
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
</style>
