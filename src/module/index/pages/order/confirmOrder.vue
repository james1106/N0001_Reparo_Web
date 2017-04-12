<template>
<div>
    <el-card class="box-card mybox" style="width:100%">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">1. 请确认订单信息</span>
      </div>
      <div class="box-card mycard1">
        <el-row class="">
          <el-col :span="8">购买人：{{orderDetail.txDetail.payerAddress}}</el-col>
          <el-col :span="8">订单金额：{{orderDetail.txDetail.productTotalPrice}}</el-col>
          <el-col :span="8">付款方式：{{orderDetail.txDetail.payingMethod | payingMethod}}</el-col>
        </el-row>
        <el-row class="">
          <el-col :span="8">货品名称：{{orderDetail.txDetail.productName}}</el-col>
          <el-col :span="8">货品数量：{{orderDetail.txDetail.productQuantity}}</el-col>
        </el-row>
        <el-row class="" style="border-bottom: 1px solid #fff">
          <el-col :span="8">支付银行：{{orderDetail.txDetail.payerBank}}</el-col>
          <el-col :span="8">付款账户：{{orderDetail.txDetail.payerAccount}}</el-col>
        </el-row>
      </div>
    </el-card>
  <el-form ref="orderDetail" :model="confirmOrder">
  <el-card class="box-card mybox" style="width:100%;margin-top: 20px !important">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">2. 请选择货品出库并确认订单</span>
      </div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="出库货品所在仓储：">
              <el-select v-model="confirmOrder.payeeRepo" placeholder="请选择仓储">
                <el-option label="A仓储企业" value="Acangchu"></el-option>
                <el-option label="B仓储企业" value="Bcangchu"></el-option>
                <el-option label="C仓储企业" value="Ccangchu"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="">
          <el-col :span="12">
            <el-form-item label="货品的仓单编号：">
              <el-select v-model="confirmOrder.payeeRepoCertNo" placeholder="请选择仓单编号">
                <el-option label="123" value="1"></el-option>
                <el-option label="234" value="2"></el-option>
                <el-option label="456" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
    </el-card>
      <el-col :span="24" style="text-align: right;margin-top: 10px">
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确认订单</el-button>
    </el-form-item>
      </el-col>
  </el-form>
  <!--自定义弹框-->
  <transition name="modal">
  <div class="modal-mask" v-show="showModal">
    <div class="modal-confirm">
      <h3 class="confirm-header">
       确认订单
      </h3>
      <div class="confirm-content">
        <el-row>
          <el-col :span="24">
            订单编号：{{orderDetail.txDetail.orderId}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            购买人：{{orderDetail.txDetail.payerAddress}}
          </el-col>
          <el-col :span="12">
            订单金额：{{orderDetail.txDetail.productTotalPrice}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            货品名称：{{orderDetail.txDetail.productName}}
          </el-col>
          <el-col :span="12">
            货品数量：{{orderDetail.txDetail.productQuantity}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            付款方式：{{orderDetail.txDetail.payingMethod | payingMethod}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            支付银行：{{orderDetail.txDetail.payerBank}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            付款账户：{{orderDetail.txDetail.payerAccount}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            订单出库仓储：{{confirmOrder.payeeRepo}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            订单出库仓单编号：{{confirmOrder.payeeRepoCertNo}}
          </el-col>
        </el-row>
       </div>
      <div class="confirm-btns">
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </div>
  </div>
  </transition>
</div>
</template>
<script>
  import store from "../../vuex/store"
  export default {
    name: 'index',
    data () {
      return {
        orderDetail: {
          txDetail: {},
          receDetail: {},
          repoDetail: {},
          wayBillDetail: {}
        },
        confirmOrder: {
          orderNo:'',
          payeeRepo:'',
          payeeRepoCertNo:'',
        },
        showModal:false
      }
    },
    methods: {
      onSubmit () {
        /*this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定',
          callback: function(){}
        });*/
        this.showModal=true;
      },
      confirm () {
          this.showModal=false;
        console.log("订单确认");
         this.confirmOrder.orderNo=store.state.checkId;
         console.log(this.confirmOrder);
         this.$http.post("/v1/order/confirmation",this.confirmOrder,{emulateJSON:true}).then(
         function(res){console.log(res.body);},
         function(err){console.log(err)}
         );
//        this.$router.push('/forDeliver(发货 后面用到)');
      }
    },
    mounted () {
        this.$http.get("/v1/order/detail?orderNo="+store.state.checkId).then(
            function(res){
                console.log(res.body);
                this.orderDetail=res.body.data;
            },
          function(err){
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

  .modal-mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(55,55,55,.6);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal-confirm{
    width: 400px;
    box-sizing: border-box;
    padding: 30px 40px;
    background-color: #fff;
    border-radius: 6px;
  }
  .confirm-content el-row {margin-bottom: 2px !important;}
  .confirm-btns {float:right;margin-top: 5px}
  @media only screen and (max-width: 640px) {
    .modal-confirm{
      width: 100%;
      margin: 0 20px;
      padding: 10px 20px;
    }
  }

  .modal-enter, .modal-leave {
    opacity: 0;
  }
  .modal-enter-active, .modal-leave-active {
    transition: all .3s ease;
  }
</style>
