<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="所有运单" name="first">
      <el-card>
        <el-table
          :data="tableData"
          border:false
          class="el-table"
          style="width: auto;">
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
            width="180">
          </el-table-column>
          <el-table-column
            prop="option"
            label="查看"
            width="114">
            <template scope="scope">
              <el-button><router-link to="/logisticsCompany/companyBillDetails">立即查看</router-link></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-tab-pane>
    <el-tab-pane label="已发货" name="second">已发货</el-tab-pane>
    <el-tab-pane label="已收货" name="third">已收货</el-tab-pane>
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
