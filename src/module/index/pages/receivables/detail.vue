<template>
  <div id="detail">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的应付账款</el-breadcrumb-item>
      <el-breadcrumb-item>详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="row-bg">
      <el-col :span="20" offset="0" class="row-bg1">
        <label>账单状态：承兑已签收</label>
      </el-col>
      <el-col :span="4" offset="0" class="row-bg1">
        <el-button type="primary" size="small">承兑确认</el-button>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="24" offset="0" class="row-bg1">
        <label>应收账款编号：{{detailInfo.receivableNo}}</label>
      </el-col>
      <el-col :span="24" offset="0" class="row-bg1">
        <el-table :data="data" stripe="" style="width:100%">
          <el-table-column prop="orderNo" label="订单编号" style="width:20%"></el-table-column>
          <el-table-column prop="pyeeEnterpriseName" label="收款方" style="width:15%"></el-table-column>
          <el-table-column prop="pyerEnterpriseName" label="付款方" style="width:15%"></el-table-column>
          <el-table-column prop="isseAmt" label="账单金额" style="width:15%"></el-table-column>
          <el-table-column prop="rate" label="带息利率" style="width:15%"></el-table-column>
          <el-table-column prop="dueDt" label="到期时间" style="width:20%"></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" offset="0" class="row-bg1">
        <el-tabs type="border-card">
          <el-tab-pane label="用户管理">
            <el-row class="row-bg">
              <el-col :span="7" offset="1">
                <label>收款人：{{detailInfo.pyeeEnterpriseName}}</label>
              </el-col>
              <el-col :span="7"  offset="1">
                <label>收款人账号：{{detailInfo.pyee}}</label>
              </el-col>
              <el-col :span="7"  offset="1">
                <label>收款人开户行：{{detailInfo.pyeeAcctSvcrName}}</label>
              </el-col>
              <el-col :span="7" offset="1">
                <label>联系人：{{detailInfo.pyeeLinkMan}}</label>
              </el-col>
              <el-col :span="7"  offset="1">
                <label>联系方式：{{detailInfo.pyeePhone}}</label>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="付款人信息">
            <el-row class="row-bg">
              <el-col :span="7" offset="1">
                <label>付款人：{{detailInfo.pyerEnterpriseName}}</label>
              </el-col>
              <el-col :span="7"  offset="1">
                <label>付款人账号：{{detailInfo.pyer}}</label>
              </el-col>
              <el-col :span="7"  offset="1">
                <label>付款人开户行：{{detailInfo.pyerAcctSvcrName}}</label>
              </el-col>
              <el-col :span="7" offset="1">
                <label>联系人：{{detailInfo.pyerLinkMan}}</label>
              </el-col>
              <el-col :span="7"  offset="1">
                <label>联系方式：{{detailInfo.pyerPhone}}</label>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="附加信息">
            <el-row class="row-bg">
              <el-col :span="11" offset="1">
                <label>合同编号：{{detailInfo.contractNo}}</label>
              </el-col>
              <el-col :span="11"  offset="1">
                <label>发票号：{{detailInfo.invoiceNo}}</label>
              </el-col>
              <el-col :span="11"  offset="1">
                <label>物流企业：暂无</label>
              </el-col>
              <el-col :span="11" offset="1">
                <label>运单编号：暂无</label>
              </el-col>
              <el-col :span="11"  offset="1">
                <label>仓储机构：暂无</label>
              </el-col>
              <el-col :span="11"  offset="1">
                <label>仓单编号：暂无</label>
              </el-col>
            </el-row>
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
    name:'detail',
    created:function () {

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
        detailInfo:{
          receivableNo:'', //应收款编号
          orderNo:'',       //订单编号
          signer:'',//签发人账号
          accptr:'',//承兑人账号
          pyer:'',//付款人账号
          pyee:'',//收款人账号
          pyerEnterpriseName:'',//付款人企业名称
          pyeeEnterpriseName:'',//收款人企业名称
          pyerAcctSvcrName:'', //付款人开户行名称
          pyeeAcctSvcrName:'',//付款人开户行名称
          firstOwner:'',//本手持有人
          secondOwner:'',//下手持有人
          isseAmt:'',//票面金额
          cashedAmount:'',//已兑付金额
          status:'',//应收款上一状态
          lastStatus:'',//应收款下一状态
          isseDt:'',//签发日
          signInDt:'',//签收日
          dueDt:'', //到期日
          rate:'',//利率
          contractNo:'',//合同号
          invoiceNo:'',//发票号
          note:'', //备注
          discounted:'',//贴现标志
          discountInHandAmount:'',//贴现实际到手金额
          pyeeLinkMan:'',//收款人联系人
          pyerLinkMan:'',//付款人联系人
          pyeePhone:'',//收款人联系方式
          pyerPhone:''//付款人联系方式
        }
      }
    },
    methods:{
        getDetail(){
          this.$http.post('/v1/receivable/receivableInfo',{emulateJSON:true}).then((res) => {
            console.log(res.body);
            var code =  res.body.code;
            var data =  res.body.data;
            if(code != 0){
//            this.dialogVisible = true;
//            this.msg = res.body.message;
              return;
            }
            this.detailInfo = data;
          },(err) => {
            console.log(err);
          })
        }
    }
  }
</script>
