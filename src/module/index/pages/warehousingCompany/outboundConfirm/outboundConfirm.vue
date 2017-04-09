<template>
  <el-tabs v-model="activeName">
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
          prop="owner"
          label="持有人"
          width="180">
        </el-table-column>
        <el-table-column
          prop="state"
          label="仓储状态"
          width="100">
        </el-table-column>
        <el-table-column
          prop="receiptNum"
          label="仓单编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="receiptState"
          label="仓单状态"
          width="100">
        </el-table-column>
        <el-table-column
          prop="option"
          label="查看"
          width="114">
          <template scope="scope">
            <el-button><router-link to="/allWarehousing/allWarehousingDetails">立即处理</router-link></el-button>
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
        tableData:[{
          number: '20170403123456',
          owner: 'A公司',
          state:'已入库',
          receiptNum:'123456',
          receiptState: '可质押'
        }, {
          number: '20170403234567',
          owner: 'B公司',
          state:'已入库',
          receiptNum:'123456',
          receiptState: '可质押'
        }, {
          number: '20170403123567',
          owner: 'C公司',
          state:'已入库',
          receiptNum:'123456',
          receiptState: '可质押'
        }]
      };
    }
  }
</script>
