<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="所有仓储" name="first">
      <el-card>
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
            width="150">
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
              <el-button><router-link to="/myWarehousing/details">立即查看</router-link></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-tab-pane>
    <el-tab-pane label="入库待响应" name="second">入库待响应</el-tab-pane>
    <el-tab-pane label="待入库" name="third">待入库</el-tab-pane>
    <el-tab-pane label="已入库" name="fourth">已入库</el-tab-pane>
    <el-tab-pane label="待出库" name="fifth">待出库</el-tab-pane>
    <el-tab-pane label="已出库" name="sixth">已出库</el-tab-pane>
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
          owner: 'A公司',
          state:'待入库',
          receiptNum: '',
          receiptState:''
        }, {
          number: '20170403234567',
          owner: 'B公司',
          state:'已入库',
          receiptNum: '123455',
          receiptState:'可质押'
        }, {
          number: '20170403123567',
          owner: 'C公司',
          state:'已出库',
          receiptNum: '1232445252',
          receiptState:'已失效'
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
