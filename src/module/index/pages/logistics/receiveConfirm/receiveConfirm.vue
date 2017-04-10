<template>
  <el-card>
    <span>收货申请列表</span>
    <el-table
      :data="tableData"
      border:false
      class="el-table"
      style="width: auto;">
      <el-table-column
        prop="number"
        label="运单编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="type"
        label="业务类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sender"
        label="寄件人"
        width="150">
      </el-table-column>
      <el-table-column
        prop="receiver"
        label="收件人"
        width="100">
      </el-table-column>
      <el-table-column
        prop="time"
        label="申请时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="option"
        label="查看"
        width="114">
        <template scope="scope">
          <el-button><router-link to="/receiveConfirm/receiveDetails">立即处理</router-link></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  </el-tabs>
</template>
<script>
  export default {
    name:'index',
    data () {
      return {
        activeName: 'first',
        tableData:[{
          number: '20170403123456',
          type: '收货待确认',
          time:'2017-03-31 10:00:00',
          sender: 'A公司',
          receiver:'D公司'
        }, {
          number: '20170403234567',
          type: '收货待确认',
          time:'2017-03-31 10:00:00',
          sender: 'B公司',
          receiver:'E公司'
        }, {
          number: '20170403123567',
          type: '收货待确认',
          time:'2017-03-31 10:00:00',
          sender: 'C公司',
          receiver:'F公司'
        }]
      };
    }
  }
</script>
