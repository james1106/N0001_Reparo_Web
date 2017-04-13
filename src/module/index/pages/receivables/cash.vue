<template>
  <div id="cash">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的应付账款</el-breadcrumb-item>
      <el-breadcrumb-item>兑付</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="row-bg">
      <el-col :span="20" offset="0" class="row-bg1">
        <label>账单状态：承兑已签收</label>
      </el-col>
      <el-col :span="4" offset="0" class="row-bg1">
        <el-button type="primary" size="small">兑付确认</el-button>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="24" offset="0" class="row-bg1">
        <label>应收账款编号：123456</label>
      </el-col>
      <el-col :span="24" offset="0" class="row-bg1">
      <el-table :data="data" stripe="" style="width:100%">
        <el-table-column prop="bianhao" label="订单编号" style="width:20%"></el-table-column>
        <el-table-column prop="shoukuanfang" label="收款方" style="width:15%"></el-table-column>
        <el-table-column prop="fukuanfang" label="付款方" style="width:15%"></el-table-column>
        <el-table-column prop="zhandan" label="账单金额" style="width:15%"></el-table-column>
        <el-table-column prop="lixi" label="带息利率" style="width:15%"></el-table-column>
        <el-table-column prop="data" label="到期时间" style="width:20%"></el-table-column>
      </el-table>
      </el-col>
      <el-col :span="24" offset="0" class="row-bg1">
      <el-tabs type="border-card">
        <el-tab-pane label="用户管理">
          <el-row class="row-bg">
            <el-col :span="7" offset="1">
              <label>首款人：A企业</label>
            </el-col>
            <el-col :span="7"  offset="1">
              <label>收款人账号：123456</label>
            </el-col>
            <el-col :span="7"  offset="1">
              <label>首款人开户行：中国农业银行</label>
            </el-col>
            <el-col :span="7" offset="1">
              <label>联系人：张玮</label>
            </el-col>
            <el-col :span="7"  offset="1">
              <label>联系方式：15728697625</label>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="付款人信息">
          付款人信息
        </el-tab-pane>
        <el-tab-pane label="附加信息">
          附加信息
        </el-tab-pane>
      </el-tabs>
      </el-col>
      <el-col :span="24" offset="0" class="row-bg1">
        <label>账款状态</label>
      </el-col>
      <el-col :span="24" offset="0" class="row-bg1">
        <label>承兑已签发:2017-04-03 10:00:00</label>
      </el-col>
      <el-col :span="24" offset="0" class="row-bg1">
        <label>承兑已签收:2017-04-03 11:00:00</label>
      </el-col>
    </el-row>

  </div>
</template>
<script>
  export default {
    name:'cash',
    created: function () {
      this.$http.get('/api/getList').then((data) => {
          console.log(data);
      },(err) => {
        console.log(err);
      })
    },
    data () {
      return {
        data:[
          {
            bianhao:"20170403123456",
            shoukuanfang:"A企业",
            fukuanfang:"B企业",
            zhandan:"20，000",
            lixi:"4%",
            data:"2018-01-30"
          }
        ],
        cashParam:{
          receivableNo:'',       //应收款编号
          applicantAcctId:'',    //申请人账号
          replyerAcctId:'',      //回复人账号
          discountApplyAmount:'' //申请贴现金额
        }
      }
    },
    methods:{
       handleClick () {
        console.log("查看");
      }
    }
  }
</script>
