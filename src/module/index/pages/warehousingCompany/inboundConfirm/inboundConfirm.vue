<template>
  <el-card>
    <span>入库确认列表</span>
    <el-table
      :data="tableData"
      border:false
      class="el-table"
      style="width: auto;">
      <el-table-column
        prop="number"
        label="业务编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="owner"
        label="持有人"
        width="100">
      </el-table-column>
      <el-table-column
        prop="state"
        label="仓储状态"
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
          <el-button><router-link to="/inboundConfirm/inConfirmDetails">立即处理</router-link></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
  export default {
    name:'index',
    data () {
      return {
        tableData:[{
          number: '20170403123456',
          owner: 'A公司',
          state:'待入库',
          time: '2017-03-31 10:00:00'
        }, {
          number: '20170403234567',
          owner: 'B公司',
          state:'待入库',
          time: '2017-03-31 10:00:00'
        }, {
          number: '20170403123567',
          owner: 'C公司',
          state:'待入库',
          time: '2017-03-31 10:00:00'
        }]
      };
    },
    methods: {
      handleClick(tab, event){
        console.log(tab, event);
      }
    }
  }
</script>
