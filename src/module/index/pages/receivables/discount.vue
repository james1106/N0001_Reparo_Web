<template>
  <div id="discount" class="discount">
    <el-breadcrumb separator=">" class="bread">
      <img src="../../assets/combinedShape.png" class="combinedShape">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>应收账款</el-breadcrumb-item>
      <el-breadcrumb-item>我的应收账款</el-breadcrumb-item>
      <el-breadcrumb-item>贴现</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <span class="sellerStepTtle">1. 请确认账款信息</span>
      </div>
      <el-row>
        <el-col :span="24">
          <el-card class="box-card mybox" style="width:100%">
            <div slot="header" class="clearfix el-row-header">
              <i class="el-icon-menu" style="margin-right: 10px"></i><span class="keynote">应收账款信息</span>
            </div>
            <div class="box-card mycard1">
              <el-row>
                <el-col :span="6" class="msgName keynote">应收账款编号：123456</el-col>
                <el-col :span="6" class="msgName keynote">订单编号：</el-col>
                <el-col :span="6" class="msgName">发起时间：</el-col>
                <el-col :span="6" class="msgName">到期日：</el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="msgName">收款人：</el-col>
                <el-col :span="6" class="msgName">付款人：</el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="msgName">账款金额（元）：</el-col>
                <el-col :span="6" class="msgName">票面利息：</el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="msgName">应收账款状态明细：</el-col>
                <el-col :span="24" class="stateShow" style="font-size: 12px;color: rgb(102,102,102)">
                  <label> 2017-04-03 10:00:00 签发</label>
                </el-col>
                <el-col :span="24" class="stateShow" style="font-size: 12px;color: rgb(102,102,102)">
                  <label>2017-04-03 11:00:00 承兑已签收</label>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-card class="box-card mybox" style="width:100%">
            <div slot="header" class="clearfix el-row-header">
              <i class="el-icon-menu" style="margin-right: 10px"></i><span class="keynote">其他信息</span>
            </div>
            <div class="box-card mycard1">
              <el-row class="msgName keynote">收款人信息：</el-row>
              <el-row>
                <el-col :span="6" class="msgName">收款人：11</el-col>
                <el-col :span="6" class="msgName">收款人账号：3215351</el-col>
                <el-col :span="6" class="msgName">收款人开户行：</el-col>
              </el-row>
              <el-row class="cutoff">
                <el-col :span="6" class="msgName">联系人：23142</el-col>
                <el-col :span="6" class="msgName">联系方式：234234</el-col>
              </el-row>
              <el-row class="msgName keynote" style="margin-top: 10px">付款人信息：</el-row>
              <el-row>
                <el-col :span="6" class="msgName">付款人：eqfgef</el-col>
                <el-col :span="6" class="msgName">付款人账号：324123412</el-col>
                <el-col :span="6" class="msgName">付款人开户行：21</el-col>
              </el-row>
              <el-row class="cutoff">
                <el-col :span="6" class="msgName">联系人：fff</el-col>
                <el-col :span="6" class="msgName">联系方式：234234234</el-col>
              </el-row>
              <el-row class="msgName keynote" style="margin-top: 10px">附加信息：</el-row>
              <el-row>
                <el-col :span="6" class="msgName">合同编号：324123423</el-col>
                <el-col :span="6" class="msgName">发票号：324123423423</el-col>
                <el-col :span="6" class="msgName">物流企业：暂无</el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="msgName">运单编号：暂无</el-col>
                <el-col :span="6" class="msgName">仓储机构：暂无</el-col>
                <el-col :span="6" class="msgName">仓单编号：暂无</el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div>
        <span class="sellerStepTtle">2. 请选择贴现银行</span>
      </div>
      <el-row>
        <el-form ref="discount" :model="discountParam" :label-position="labelPosition" :rules="discountRules">
          <el-col :span="12">
            <el-form-item label="请选择贴现银行" prop="discountBank">
              <el-select v-model="discountParam.discountBank" placeholder="请选择开户行">
                <el-option label="农业银行（默认）" value="4"></el-option>
                <el-option label="工商银行" value="5"></el-option>
                <el-option label="兴业银行" value="6"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-button type="primary" @click.native.prevent="onSubmit('launchOrder')">贴现确认</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
  export default {
    name:'discount',
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
        discountParam:{
          receivableNo:'',        //应收款编号
          applicantAcctId:'',     //申请人账号
          replyerAcctId:'',       //回复人账号
          discountApplyAmount:'', //申请贴现金额
          discountBank:''         //贴现银行
        },
        discountRules:{
          discountBank:[
            {required:true, message:'请选择贴现银行'},
          ]
        }
      }
    },
    methods:{
      accept(){
        this.$http.post('/v1/receivable/discountApply',this.acceptParam,{emulateJSON:true}).then((data) => {
          console.log(data);


        },(err) => {
          console.log(err);
        })
      }
    }
  }
</script>
