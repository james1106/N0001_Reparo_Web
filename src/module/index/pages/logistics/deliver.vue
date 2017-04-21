<template>
  <div id="deliver" class="deliver">
    <div>
      <el-breadcrumb separator=">" class="bread">
        <img src="../../assets/combinedShape.png" class="combinedShape">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>物流管理</el-breadcrumb-item>
        <el-breadcrumb-item>发货</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card>
      <div>
        <span class="sellerStepTitle">1. 请确认订单详情</span>
      </div>
      <el-row class="dataTable">
        <el-row class="el-row-header">
          <el-col :span="6" style="margin-left: 19px">订单编号：{{sendGoodForm.orderNo}}</el-col>
          <el-col :span="6">发起时间：{{sendGoodForm.launchOrderTime | timeTransfer}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="msgName" style="margin-left: 19px">购买人：{{sendGoodForm.receiverEnterpriseName}}</el-col>
          <el-col :span="6" class="msgName">订单金额（元）：{{sendGoodForm.productValue}}</el-col>
          <el-col :span="6" class="msgName">付款方式：{{sendGoodForm.payingMethod | payingMethod}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="msgName" style="margin-left: 19px">货品名称：{{sendGoodForm.productName}}</el-col>
          <el-col :span="6" class="msgName">货品数量：{{sendGoodForm.productQuantity}}</el-col>
          <el-col :span="6" class="msgName">货品单价（元）：{{sendGoodForm.productUnitPrice}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="msgName" style="margin-left: 19px">支付银行：{{sendGoodForm.payerBank}}</el-col>
          <el-col :span="8" class="msgName">付款账户：{{sendGoodForm.payerAccount}}</el-col>
        </el-row>
      </el-row>
      <div>
        <span class="sellerStepTitle">2. 请确认发货信息</span>
      </div>
      <el-row class="dataTable">
        <el-row class="el-row-header">
          <el-col :span="6" style="margin-left: 19px">发货信息</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="msgName" style="margin-left: 19px">发货人：{{sendGoodForm.senderEnterpriseName}}</el-col>
          <el-col :span="6" class="msgName">订单金额(元)：{{sendGoodForm.productValue}}</el-col>
          <el-col :span="6" class="msgName">付款方式：{{sendGoodForm.payingMethod | payingMethod}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="msgName" style="margin-left: 19px">货品名称：{{sendGoodForm.productName}}</el-col>
          <el-col :span="6" class="msgName">货品数量：{{sendGoodForm.productQuantity}}</el-col>
          <el-col :span="6" class="msgName">货品总价(元)：{{sendGoodForm.productValue}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="msgName" style="margin-left: 19px">货品所在仓储：{{sendGoodForm.senderRepoEnterpriseName}}</el-col>
          <el-col :span="8" class="msgName">货品的仓单编号：{{sendGoodForm.senderRepoCertNo}}</el-col>
        </el-row>
      </el-row>
      <el-row class="dataTable">
        <el-row class="el-row-header">
          <el-col :span="6" style="margin-left: 19px">收货信息</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="msgName" style="margin-left: 19px">收货人：{{sendGoodForm.receiverEnterpriseName}}</el-col>
          <el-col :span="6" class="msgName">收货仓储：{{sendGoodForm.receiverRepoEnterpriseName}}</el-col>
        </el-row>
      </el-row>
      <div>
        <span class="sellerStepTitle">3. 请填写物流信息</span>
      </div>
      <el-form :model="sendGoodForm1" ref="sendGoodForm1">
        <el-tabs v-model="activeName" type="card" @tab-click="">
        <el-tab-pane label="在线选择" name="first">
          <el-col :span="12">
            <el-form-item label="选择物流企业">
              <el-select v-model="sendGoodForm1.logisticsEnterpriseName" placeholder="请选择物流企业" style="width:50%">
                <template v-for="item in sendGoodForm1.logisticsList">
                  <el-option :label="item" :value="item"></el-option>
                </template>
              </el-select>
            </el-form-item>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="自己联系" name="second">
          <el-col :span="12">
            <el-form-item label="填写物流企业"><el-input v-model="sendGoodForm1.logistics1"></el-input></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="填写运单号"><el-input v-model="sendGoodForm1.No"></el-input></el-form-item>
          </el-col>
        </el-tab-pane>
      </el-tabs>
      </el-form>
    </el-card>
    <el-button type="success" @click="confirmSend">确认发货</el-button>
  </div>
</template>
<script>
  import store from '../../vuex/store'
  export default {
    name: 'index',
    data () {
      return {
        sendGoodForm: {
          orderNo:'',
          senderEnterpriseName:'',
          receiverEnterpriseName:'',
          productName:'',
          productQuantity:'',
          productValue:'',
          senderRepoEnterpriseName:'',
          senderRepoCertNo:'',
          receiverRepoEnterpriseName:'',
          receiverRepoBusinessNo:'',

          logisticsEnterpriseName:'',
          logisticsList:''
        },
        sendGoodForm1:{
          logisticsEnterpriseName:'',
          logistics1:'',
          logisticsList:'',
          No:''
        },
        activeName: "first",
        orderDetail:''
      }
    },
    methods:{
        confirmSend () {
          this.sendGoodForm.logisticsEnterpriseName = this.sendGoodForm1.logisticsEnterpriseName;
          this.sendGoodForm.logisticsList = this.sendGoodForm1.logisticsList;
          console.log(this.sendGoodForm)
            this.$http.post("/v1/waybill/unConfirmedWaybill",this.sendGoodForm,{emulateJSON:true}).then(function(res){
                console.log(res.body);
              store.commit('setCheckIdOrder',this.sendGoodForm.orderNo);
              console.log(store.state.checkIdOrder);
              this.$router.push("/logistics/wayBillDetails");
            },function(err){
                console.log(err);
            });
        }
    },
    mounted () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
        /*请求物流企业列表*/
        this.$http.get("/v1/account/allEnterpriseName?roleCode=1").then(function(res){
            this.sendGoodForm1.logisticsList=res.body.data;
        },function(err){
            console.log(err);
        });
        /*根据订单号请求订单详情并填写*/

      this.$http.get("/v1/order/detail?orderNo=" + store.state.checkIdOrder).then(
        function (res) {
          // 处理成功的结果
          console.log(res.body);
          this.orderDetail = res.body.data;
          this.sendGoodForm.orderNo=this.orderDetail.txDetail.orderId;/*订单编号	*/
          console.log("sendGoodForm: "+this.sendGoodForm.orderNo);
          this.sendGoodForm.launchOrderTime=this.orderDetail.txDetail.operationRecordVoList[0].operateTime;/*订单发起时间，只显示用*/
          this.sendGoodForm.payingMethod=this.orderDetail.txDetail.payingMethod;/*付款方式，显示用*/
          this.sendGoodForm.payerBank=this.orderDetail.txDetail.payerBank;/*支付银行*/
          this.sendGoodForm.payerAccount=this.orderDetail.txDetail.payerAccount;/*支付账户*/
          this.sendGoodForm.senderEnterpriseName=this.orderDetail.txDetail.payeeCompanyName;/*发货人企业名称（当前账户企业名称）	*/
          this.sendGoodForm.receiverEnterpriseName=this.orderDetail.txDetail.payerCompanyName;/*收货人企业名称	*/
          this.sendGoodForm.productName=this.orderDetail.txDetail.productName;
          this.sendGoodForm.productQuantity=this.orderDetail.txDetail.productQuantity;
          this.sendGoodForm.productValue=this.orderDetail.txDetail.productTotalPrice;/*货品价值*/
          this.sendGoodForm.productUnitPrice=this.orderDetail.txDetail.productUnitPrice;/*货品单价，只显示用*/
          this.sendGoodForm.senderRepoEnterpriseName=this.orderDetail.txDetail.payeeRepo;/*货品所在仓储公司名称	*/
          this.sendGoodForm.senderRepoCertNo=this.orderDetail.txDetail.payeeRepoCertNo;/*发货货品仓单编号	*/
          this.sendGoodForm.receiverRepoEnterpriseName=this.orderDetail.txDetail.payerRepo;/*收货仓储公司名称	*/
          this.sendGoodForm.receiverRepoBusinessNo=this.orderDetail.payeeRepoBusinessNo;/*收货仓储业务编号	*/
        }, function (err) {
          // 处理失败的结果
          console.log(err);
        }
      );
    }
  }
</script>
<style>
  .el-row {
    margin-bottom: 20px;
  }

  .el-row:last-child {
    margin-bottom: 0;
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
