<template>
  <div id="index">
    <div>
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>仓储管理</el-breadcrumb-item>
        <el-breadcrumb-item>我的仓储</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="所有仓储" name="first">
        <div style="width: auto;height: auto;border: 1px solid #d1dbe5">
          <el-row>
            <el-col :span="24">
              <el-card class="box-card card">
                <el-form ref="list" :model="list" labelWidth="80px">
                  <el-row>
                    <el-col :span="8"><el-form-item label="订单编号:"><span v-model="list.number">{{list.number}}</span></el-form-item></el-col>
                    <el-col :span="8"><el-form-item label="创建时间:"><span v-model="list.time">{{list.time}}</span></el-form-item></el-col>
                    <el-col :span="8"><el-form-item label="状态:"><span v-model="list.state">{{list.state}}</span></el-form-item></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">货品名称：卡纸</el-col>
                    <el-col :span="8">订单金额：20,000</el-col>
                    <router-link to="/allWarehousing/details"><el-button>查看详情</el-button></router-link>
                  </el-row>
                  <el-row>
                    <el-col :span="8">货品数量：1,000（箱）</el-col>
                    <el-col :span="8">付款方式：应收账款支付</el-col>
                  </el-row>
                </el-form>
              </el-card>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-card class="box-card card">
                <el-form ref="list" :model="list" labelWidth="80px">
                  <el-row>
                    <el-col :span="8"><el-form-item label="订单编号:"><span v-model="list.number">{{list.number}}</span></el-form-item></el-col>
                    <el-col :span="8"><el-form-item label="创建时间:"><span v-model="list.time">{{list.time}}</span></el-form-item></el-col>
                    <el-col :span="8"><el-form-item label="状态:"><span v-model="list.state">{{list.state}}</span></el-form-item></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">货品名称：卡纸</el-col>
                    <el-col :span="8">订单金额：20,000</el-col>
                    <router-link to="/allWarehousing/details"><el-button>查看详情</el-button></router-link>
                  </el-row>
                  <el-row>
                    <el-col :span="8">货品数量：1,000（箱）</el-col>
                    <el-col :span="8">付款方式：应收账款支付</el-col>
                  </el-row>
                </el-form>
              </el-card>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-card class="box-card card">
                <el-form ref="list" :model="list" labelWidth="80px">
                  <el-row>
                    <el-col :span="8"><el-form-item label="订单编号:"><span v-model="list.number">{{list.number}}</span></el-form-item></el-col>
                    <el-col :span="8"><el-form-item label="创建时间:"><span v-model="list.time">{{list.time}}</span></el-form-item></el-col>
                    <el-col :span="8"><el-form-item label="状态:"><span v-model="list.state">{{list.state}}</span></el-form-item></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">货品名称：卡纸</el-col>
                    <el-col :span="8">订单金额：20,000</el-col>
                    <router-link to="/allWarehousing/details"><el-button>查看详情</el-button></router-link>
                  </el-row>
                  <el-row>
                    <el-col :span="8">货品数量：1,000（箱）</el-col>
                    <el-col :span="8">付款方式：应收账款支付</el-col>
                  </el-row>
                </el-form>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="待确认" name="second">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    name:'index',
    data () {
      return {
        activeName: 'first',
        list:{
          number:'20170403123456',
          time:'2017-04-03 10:29:11',
          state:'待确认'

        }
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>
<style>
  .card{
    width: 95%;
    margin-left: 2.5%;
    background-color: rgb(242,242,242)!important;
  }
</style>
