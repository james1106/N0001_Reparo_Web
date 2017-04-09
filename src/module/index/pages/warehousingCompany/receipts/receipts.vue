<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="所有仓单" name="first">
      <el-card>
        <el-table
          :data="tableData"
          border:false
          class="el-table"
          style="width: 724px;">
          <el-table-column
            prop="receiptNum"
            label="仓单编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="owner"
            label="持有人"
            width="180">
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            width="100">
          </el-table-column>
          <el-table-column
            prop="operateTime"
            label="操作时间"
            width="150">
          </el-table-column>
          <el-table-column
            prop="option"
            label="查看"
            width="114">
            <template scope="scope">
              <el-button><router-link to="/receipts/receiptsDetails">立即查看</router-link></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-tab-pane>
    <el-tab-pane label="可质押" name="second">可质押</el-tab-pane>
    <el-tab-pane label="已失效" name="third">已失效</el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    name:'index',
    data () {
      return {
        activeName: 'first',
        tableData:[{
          receiptNum: '2017-03-31 10:00:00',
          owner: 'A公司',
          state:'可质押',
          operateTime: ''
        }, {
          receiptNum: '20170403234567',
          owner: 'B公司',
          state:'可质押',
          operateTime: '2017-03-31 10:00:00'
        }, {
          receiptNum: '20170403123567',
          owner: 'C公司',
          state:'已失效',
          operateTime: '2017-03-31 10:00:00'
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
