<template>
  <div id="signout">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>应收账款</el-breadcrumb-item>
      <el-breadcrumb-item>承兑</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="row-bg">
      <el-col :span="9" offset="0" class="row-bg1">
        <label>状态：已签发待承兑</label>
      </el-col>
      <el-col :span="3"  offset="12" class="row-bg1">
        <el-button type="primary">承兑确认
        </el-button>
      </el-col>
      <el-col :span="24" offset="0" class="row-bg1">
        <label>账单信息</label>
      </el-col>
      <el-col :span="8" class="row-bg1">
        <label>账单编号：010</label>
      </el-col>
      <el-col :span="8" class="row-bg1">
        <label>承兑时间：2017-02-10 22:10:10</label>
      </el-col>
      <el-col :span="8" class="row-bg1">
        <label>签发时间：2017-02-10 22:10:10</label>
      </el-col>
      <el-table :data="data" stripe="" style="width:100%">
        <el-table-column prop="bianhao" label="订单编号" style="width:20%"></el-table-column>
        <el-table-column prop="shoukuanfang" label="收款方" style="width:15%"></el-table-column>
        <el-table-column prop="fukuanfang" label="付款方" style="width:15%"></el-table-column>
        <el-table-column prop="zhandan" label="账单金额" style="width:15%"></el-table-column>
        <el-table-column prop="lixi" label="带息利率" style="width:15%"></el-table-column>
        <el-table-column prop="data" label="到期时间" style="width:20%"></el-table-column>
      </el-table>
    </el-row>

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

  </div>
</template>
<script>
  export default {
    name:'signout',
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
        ]
      }
    }
  }
</script>
