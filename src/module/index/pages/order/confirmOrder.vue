<template>
<div class="confirmOrder">
  <div>
    <el-breadcrumb separator=">" class="bread">
      <img src="../../assets/combinedShape.png" class="combinedShape">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我卖出的订单</el-breadcrumb-item>
      <el-breadcrumb-item>确认订单</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <el-card>
    <div>
      <span class="sellerStepTitle">1. 请填写订单详情</span>
    </div>
    <el-row class="dataTable">
      <el-row class="el-row-header">
        <el-col :span="6" style="margin-left: 19px">订单编号：2342132352</el-col>
        <el-col :span="6">发起时间：2017-04-01 10:00:00</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="msgName" style="margin-left: 19px">购买人：杭州趣链科技有限公司</el-col>
        <el-col :span="6" class="msgName">订单金额(元)：20,000</el-col>
        <el-col :span="6" class="msgName">付款方式：应收账款支付</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="msgName" style="margin-left: 19px">货品名称：卡纸</el-col>
        <el-col :span="6" class="msgName">货品数量(箱)：1000</el-col>
        <el-col :span="6" class="msgName">货品单价：20元／箱</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="msgName" style="margin-left: 19px">支付银行：中国农业银行</el-col>
        <el-col :span="8" class="msgName">付款账户：2142341234235235</el-col>
      </el-row>
    </el-row>
    <div>
      <span class="sellerStepTitle">2. 请选择货品出库并确认订单</span>
    </div>
    <el-form :model="confirmOrder">
      <el-card style="width:100%;" class="confirmCard">
        <el-row>
          <el-col :span="12">
            <el-form-item label="出库货品所在仓储：">
              <el-select v-model="confirmOrder.payeeRepoName" placeholder="请选择仓储">
                <template v-for="item in confirmOrder.repoList">
                  <el-option :label="item" :value="item"></el-option>
                </template>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货品的仓单编号：">
              <el-input v-model="confirmOrder.payeeRepoCertNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-row>
        <el-col :span="24" style="text-align: left;margin-top: 10px">
          <el-button type="primary" @click="onSubmit">确认订单</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>

  <!--自定义弹框-->
  <transition name="modal">
  <div class="modal-mask" v-show="showModal">
    <div class="modal-confirm">
      <h3 class="confirm-header">
       确认订单
      </h3>
      <div class="confirm-content">
        <el-row>
          <el-col :span="12">
            订单编号：{{orderDetail.txDetail.orderId}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            购买人：{{orderDetail.txDetail.payerCompanyName}}
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
          <el-col :span="12">
            付款方式：{{orderDetail.txDetail.payingMethod | payingMethod}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            支付银行：{{orderDetail.txDetail.payerBank}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            付款账户：{{orderDetail.txDetail.payerAccount}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            订单出库仓储：{{confirmOrder.payeeRepo}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
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
  import '../../../../assets/css/style.css'
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
          payeeRepoName:'',
          payeeRepoCertNo:'',
          repoList:''
        },
        showModal:false,

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
      this.$http.get("/v1/account/allEnterpriseName?roleCode=2").then(function(res){
        this.confirmOrder.repoList=res.body.data;
        console.log("the repo list: "+res.body.data);
      },function(err){
        console.log(err)
      });
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
    width: 650px;
    height: 400px;
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
