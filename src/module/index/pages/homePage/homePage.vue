<template>
  <div id="homePage">
    <el-breadcrumb separator=">" class="bread">
      <svg class="icon combinedShape" aria-hidden="true"> 
        <use xlink:href="#icon-locate"></use>
         
      </svg>
      <el-breadcrumb-item>首页</el-breadcrumb-item>
    </el-breadcrumb>
    <template v-if="companyType == 0">
      <el-row v-if="state.isBuyer==='true'">  <!--买家-->
        <el-col :span="5" style="margin-right: 1.7%;width: 23%">
          <el-card class="showCard">
            <svg class="icon" aria-hidden="true" style="font-size: 55px;float: left"> 
              <use xlink:href="#icon-order_o"></use>
               
            </svg>
            <div class="showMesg">
              <span class="showName">买入的订单</span> <br>
              <span class="showNum">10</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="5" style="margin-right: 1.7%;width: 23%">
          <el-card class="showCard">
            <svg class="icon" aria-hidden="true" style="font-size: 55px;float: left"> 
              <use xlink:href="#icon-yszk_o"></use>
               
            </svg>
            <div class="showMesg">
              <span class="showName">应付账款</span> <br>
              <span class="showNum">5</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="5" style="margin-right: 1.7%;width: 23%">
          <el-card class="showCard">
            <svg class="icon" aria-hidden="true" style="font-size: 55px;float: left"> 
              <use xlink:href="#icon-cc_o"></use>
            </svg>
            <div class="showMesg">
              <span class="showName">我的仓储</span> <br>
              <span class="showNum">8</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6" style="float: right">
          <img :src="imgUrl.maiB" style="height: 80px;width:100%;float: right">
        </el-col>
      </el-row>
      <el-row v-else>  <!--卖家-->
        <el-col :span="5" style="margin-right: 1.7%;width: 18%">
          <el-card class="showCard">
            <svg class="icon" aria-hidden="true" style="font-size: 55px;float: left"> 
              <use xlink:href="#icon-order_o"></use>
               
            </svg>
            <div class="showMesg">
              <span class="showName">卖出的订单</span> <br>
              <span class="showNum">13</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="5" style="margin-right: 1.7%;width: 18%">
          <el-card class="showCard">
            <svg class="icon" aria-hidden="true" style="font-size: 55px;float: left"> 
              <use xlink:href="#icon-yszk_o"></use>
               
            </svg>
            <div class="showMesg">
              <span class="showName">应收账款</span> <br>
              <span class="showNum">2</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="5" style="margin-right: 1.7%;width: 18%">
          <el-card class="showCard">
            <svg class="icon" aria-hidden="true" style="font-size: 55px;float: left"> 
              <use xlink:href="#icon-wl_o"></use>
               
            </svg>
            <div class="showMesg">
              <span class="showName">我的物流</span> <br>
              <span class="showNum">8</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="5" style="margin-right: 1.7%;width: 18%">
          <el-card class="showCard">
            <svg class="icon" aria-hidden="true" style="font-size: 55px;float: left"> 
              <use xlink:href="#icon-cc_o"></use>
               
            </svg>
            <div class="showMesg">
              <span class="showName">待确认订单</span> <br>
              <span class="showNum">2</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="5" style="float: right">
          <img :src="imgUrl.maiG" style="height: 80px;width:100%;float: right">
        </el-col>
      </el-row>
      <el-row>
        <img :src="imgUrl.adImg" style="width: 100%">
      </el-row>
      <el-card>
        <div slot="header" class="clearfix" style="height: 8px">
          <span :class="[{'green_span': state.isBuyer==='false', 'blue_span': state.isBuyer==='true'}]">待办订单</span>
        </div>
        <el-row v-if="showOrder.length===0">
          <el-row class="el-row-header" style="background-color: rgb(229,241,245)">
            <el-col :span="7" style="margin-left: 20px">货品信息</el-col>
            <el-col :span="6">付款信息</el-col>
            <el-col :span="8">订单状态</el-col>
            <el-col :span="2">操作</el-col>
          </el-row>
          <el-row style="text-align: center">
            <img :src="imgUrl.default_0" style="width: 200px;margin-top: 15px">
          </el-row>
          <el-row style="text-align: center;font-size: 18px;color: #959697">
            <span>暂无订单</span>
          </el-row>
        </el-row>
        <el-row v-else>
        <el-row class="el-row-header" style="background-color: rgb(229,241,245)">
          <el-col :span="7" style="margin-left: 20px">货品信息</el-col>
          <el-col :span="6">付款信息</el-col>
          <el-col :span="8">订单状态</el-col>
          <el-col :span="2">操作</el-col>
        </el-row>
        <template v-for="(item,index) in showOrder">
          <div>
            <el-row class="dataTable">
              <el-row class="el-row-header">
                <el-col :span="7" style="margin-left: 19px;">订单编号：{{item.orderNo}}</el-col>
                <el-col :span="6">创建时间：{{item.orderGenerateTime | timeTransfer}}</el-col>
                <el-col :span="8" v-if="state.isBuyer==='true'">卖家：{{item.payeeCompanyName}}</el-col>
                <el-col :span="8" v-else>买家：{{item.payerCompanyName}}</el-col>
                <el-col :span="2">操作</el-col>
              </el-row>
              <el-row class="el-row-content">
                <el-col :span="7" style="margin-left: 19px;">
                  <el-row>货品名称：{{item.productName}}</el-row>
                  <el-row>货品数量：{{item.productQuantity}}</el-row>
                </el-col>
                <el-col :span="6">
                  <el-row>订单金额(元)：{{item.productTotalPrice | numTransfer}}</el-row>
                  <el-row>付款方式：{{item.payingMethod | payingMethod}}</el-row>
                </el-col>
                <el-col :span="2">
                  <el-row>交易状态</el-row>
                  <el-row>{{item.transactionStatus | transactionStatus}}</el-row>
                </el-col>
                <el-col :span="2">
                  <el-row>账款状态</el-row>
                  <el-row
                    v-if="(item.transactionStatus>=constantData.CONFIRMED)&&(item.receStatus===constantData.NOMESSAGE)">
                    {{constantData.CONFIRMED | receStatus}}

                  </el-row>
                  <el-row v-else>{{item.receStatus | receStatus}}</el-row>
                </el-col>
                <el-col :span="2">
                  <el-row>仓储状态</el-row>
                  <el-row>{{item.repoStatus | repoStatus}}</el-row>
                </el-col>
                <el-col :span="2">
                  <el-row>物流状态</el-row>
                  <el-row
                    v-if="(item.receStatus>=constantData.ACCEPTED)&&(item.wayBillStatus===constantData.NOMESSAGE)">
                    {{constantData.FORSEND | wayBillStatus}}

                  </el-row>
                  <el-row v-else>{{item.wayBillStatus | wayBillStatus}}</el-row>
                </el-col>
                <el-col :span="2">
                  <el-row>
                    <el-button size="mini" type="text"
                               v-if="(state.isBuyer==='false')&&(item.transactionStatus===constantData.UNCONFIRMED)"
                               @click.native.prevent="confirmOrder(item.orderNo)">确认订单

                    </el-button>
                    <el-button size="mini" type="text"
                               v-if="(state.isBuyer==='false')&&(item.transactionStatus===constantData.CONFIRMED)&&(item.receStatus===constantData.NOMESSAGE)"
                               @click.native.prevent="signBill(item.orderNo)">签发账款

                    </el-button>
                    <el-button size="mini" type="text"
                               v-if="(state.isBuyer==='false')&&(item.receStatus===constantData.ACCEPTED)&&(item.wayBillStatus===constantData.FORSEND)"
                               @click.native.prevent="sendGood(item.orderNo)">发货

                    </el-button>
                    <el-button size="mini" type="text"
                               v-if="(state.isBuyer==='true')&&(item.receStatus===constantData.FORACCEPT)"
                               @click.native.prevent="acceptBill(item.orderNo)">签收账款

                    </el-button>
                  </el-row>
                  <el-row>
                    <el-button size="mini" style="text-align: center;"
                               @click.native.prevent="checkDetail(item.orderNo)">查看详情
                    </el-button>
                  </el-row>
                </el-col>
              </el-row>
            </el-row>
          </div>
        </template>
        </el-row>
      </el-card>
    </template>
    <template v-else-if="companyType == 2">
      <logistics-homepage></logistics-homepage>
    </template>
    <template v-else-if="companyType == 1">
      <repo-homepage></repo-homepage>
    </template>
    <template v-else>
      <bank-homepage></bank-homepage>
    </template>
  </div>
</template>

<script>
  import '../../../../framework/iconfont.js'
  import adImg from '../../assets/ad.png'
  import maiB from '../../assets/mai_B.png'
  import maiG from  '../../assets/mai_G.png'
  import Localstore from "../../../../common/store.js"
  import default_0 from  '../../assets/default_0.png'
  import logisticsHomepage from "./logisticsHomePage.vue"
  import repoHomepage from "./repoHomePage.vue"
  import bankHomepage from "./bankHomePage.vue"
  import store from "../../vuex/store"
  import constantData from "../../../../common/const"

  export default {
    name: 'homePage',

    mounted: function () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      var tempRole;
      switch (store.state.isBuyer) {
        case "true":
          tempRole = 0;
          break;/*0表示买方*/
        case "false":
          tempRole = 1;
          break;
        default:
          break;
      }
      if (this.companyType != 0){
          return;
      }
      this.$http.get("../v1/order/order_list/" + tempRole).then(function (res) {
          console.log("获取到的所有订单: " + res.body.data.length);
          if(res.body.code != 0){
            this.$message.error(res.body.message);
            return;
          }
          this.showOrder = res.body.data;
          //买家筛选待办订单,只有承兑操作
        if(store.state.isBuyer==="true") {
          var temp = [];
          for (var i = 0; i < this.showOrder.length; i++) {
            var item = this.showOrder[i];
            if (item.receStatus === constantData.FORACCEPT) {
              temp.push(item);
              if (temp.length === 4) break;//只筛选4条
            }
          }
          this.showOrder = temp;
          console.log("this.showOrder"+this.showOrder.length);
        }
        //卖家筛选待办订单，有确认订单、签发账款、发货等操作
        else {
          var temp = [];
          for (var i = 0; i < this.showOrder.length; i++) {
            var item = this.showOrder[i];
            if ((item.transactionStatus===constantData.UNCONFIRMED)||((item.transactionStatus===constantData.CONFIRMED)&&(item.receStatus===constantData.NOMESSAGE))||((item.receStatus===constantData.ACCEPTED)&&(item.wayBillStatus===constantData.FORSEND))) {
              temp.push(item);
              if (temp.length === 4) break;//只筛选4条
            }
          }
          this.showOrder = temp;
        }
        },
        function (err) {
          console.log(err);
        }
      );
    },
    created: function () {
      var userInfo = Localstore.fetchUserInfo();
      this.companyType = userInfo.roleCode;
    },
    components: {
      logisticsHomepage, repoHomepage,bankHomepage
    },
    computed: {
      state () {
        return store.state;
      },
      constantData () {
        return constantData;
      }
    },
    data () {
      return {
        imgUrl: {
          adImg: adImg,
          maiB: maiB,
          maiG: maiG,
          default_0:default_0,
          companyType: 0  //0.融资企业 1.仓储公司 2.物流公司
        },
        showOrder:  [{
          orderNo: "20170403123456",
          orderGenerateTime: '2017-04-03 10:29:11',
          payeeAccount: '',
          productName: '卡纸',
          totalPrice: '20,000',
          productNum: '1,000',
          payingMethod: '应收账款支付',
        }
        ]
      }
    },
    methods:{
      checkDetail (orderNo) {
        store.commit('setCheckIdOrder', orderNo);
        console.log(store.state.checkIdOrder);
        this.$router.push("/order/orderDetail");
      },
      confirmOrder (orderNo) {
        console.log("确认订单！");
        store.commit('setCheckIdOrder', orderNo);
        this.$router.push("/order/confirmOrder");
      },
      signBill (checkId) {
        console.log("签发应收账款");//签发用的是orderId
        store.commit('setCheckIdOrder', checkId);
        this.$router.push("/allAccounts/signout/signout");
      },
      sendGood (checkId) {
        console.log("发货");
        store.commit('setCheckIdOrder', checkId);
        this.$router.push("/logistics/deliver");
      },
      acceptBill (checkId) {
        console.log("签收账款");
        this.$http.get("../v1/order/detail?orderNo=" + checkId).then(function (res) {//通过订单编号获取应收账款编号，再到签收页面
          console.log(res.body.data);
          if(res.body.code != 0){
            this.$message.error(res.body.message);
            return;
          }
          store.commit("setCheckIdRece", res.body.data.receOver.receNo);
          this.$router.push("/allAccounts/accept/accept");
        }, function (err) {
          console.log(err);
        });
      }
    }
  }
</script>

<style>

</style>
