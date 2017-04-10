<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="所有运单" name="first">
      <el-card>
        <el-table
          :data="tableData"
          border:false
          class="el-table"
          style="width: 724px;">
          <el-table-column
            prop="number"
            label="运单编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            width="180">
          </el-table-column>
          <!--<el-table-column-->
            <!--prop="time"-->
            <!--label="申请时间"-->
            <!--width="100">-->
          <!--</el-table-column>-->
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
            prop="option"
            label="查看"
            width="114">
            <template scope="scope">
              <el-button><router-link to="/waybill/waybillDetails">立即查看</router-link></el-button>
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
          number: '20170403123456',
          state: '已发货',
//          time:'2017-03-31 10:00:00',
          sender: 'A公司',
          receiver:'D公司'
        }, {
          number: '20170403234567',
          state: '已发货',
//          time:'2017-03-31 10:00:00',
          sender: 'B公司',
          receiver:'E公司'
        }, {
          number: '20170403123567',
          state: '已送达',
//          time:'2017-03-31 10:00:00',
          sender: 'C公司',
          receiver:'F公司'
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
