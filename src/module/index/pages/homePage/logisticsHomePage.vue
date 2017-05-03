<template>
  <div>
    <el-row id="logisticsHp">
      <el-col :span="5" style="margin-right: 1.7%;width: 23%">
        <el-card class="showCard">
          <svg class="icon" aria-hidden="true" style="font-size: 55px;float: left">   <use xlink:href="#icon-yd_o"></use> </svg>
          <div class="showMesg">
            <span class="showName">全部仓单</span> <br>
            <span class="showNum">1000</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="5" style="margin-right: 1.7%;width: 23%">
        <el-card class="showCard">
          <svg class="icon" aria-hidden="true" style="font-size: 55px;float: left">   <use xlink:href="#icon-fh_o"></use> </svg>
          <div class="showMesg">
            <span class="showName">仓单申请确认</span> <br>
            <span class="showNum">1000</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="5" style="margin-right: 1.7%;width: 23%">
        <el-card class="showCard">
          <svg class="icon" aria-hidden="true" style="font-size: 55px;float: left">   <use xlink:href="#icon-sh_o"></use> </svg>
          <div class="showMesg">
            <span class="showName">出库确认</span> <br>
            <span class="showNum">1000</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" style="float: right">
        <img :src="imgUrl.wlG" style="height: 80px;float: right">
      </el-col>
    </el-row>
    <el-row>
      <img :src="imgUrl.adImg" style="width: 100%">
    </el-row>
    <el-card>
      <div slot="header" class="clearfix" style="height: 8px">
        <span>待办物流</span>
      </div>
      <el-row class="el-row-header" style="background-color: rgb(229,241,245)">
        <el-col :span="6" style="margin-left: 19px">物流信息</el-col>
        <el-col :span="6">货品信息</el-col>
        <el-col :span="6">物流状态</el-col>
        <el-col :span="4" style="text-align: center">操作</el-col>
      </el-row>
      <span v-if="wayBillList.length == 0" class="msgName">暂无待办物流!</span>
      <template v-for="item in wayBillList">
        <div>
          <el-row class="dataTable">
            <el-row class="el-row-header">
              <el-col :span="6" style="margin-left: 19px;">运单编号：{{item.wayBillNo}}</el-col>
              <el-col :span="6">发货人：{{item.senderEnterpriseName}}</el-col>
              <el-col :span="8">收货人：{{item.receiverEnterpriseName}}</el-col>
            </el-row>
            <el-row class="el-row-content">
              <el-col :span="6" style="margin-left: 19px;">
                <el-row>收货仓储：{{item.receiverRepoEnterpriseName}}</el-row>
                <el-row>发货仓储：{{item.senderRepoEnterpriseName}}</el-row>
              </el-col>
              <el-col :span="6">
                <el-row>货品名称：{{item.productName}}</el-row>
                <el-row>货品数量：{{item.productQuantity}}</el-row>
              </el-col>
              <el-col :span="6">
                <el-row>{{item.waybillStatusCode | wayBillStatus}}</el-row>
              </el-col>
              <el-col :span="4">
                <el-row style="text-align: center;" v-if="item.waybillStatusCode===constantData.SENDFORRESPONSE"><!--发货待响应-->
                  <el-button size="mini" type="text" @click.native.prevent="sendConfirm(item.orderNo)">确认发货</el-button>
                </el-row>
                <el-row style="text-align: center;" v-if="item.waybillStatusCode===constantData.SENDED"><!--已发货-->
                  <el-button size="mini" type="text" @click.native.prevent="receiveConfirm(item.orderNo)">确认收货</el-button>
                </el-row>
                <el-row style="text-align: center;">
                  <el-button size="small" style="height: 25px" @click.native.prevent="checkDetail(item.orderNo)">查看详情</el-button>
                </el-row>
              </el-col>
            </el-row>
          </el-row>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script>
  import '../../../../framework/iconfont.js'
  import adImg from '../../assets/ad.png'
  import wlG from '../../assets/wl_G.png'
  import ccG from '../../assets/cc_G.png'
  import constantData from '../../../../common/const.js'
  import Store from "../../vuex/store"

  export default {
  name: 'logisticsHp',
  mounted: function (){
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.getTopList();
  },
  computed: {
    state () {
      return Store.state;
    },
    constantData () {
      return constantData;
    }
  },
  data () {
    return {
      imgUrl:{
        adImg:adImg,
        wlG:wlG,
        ccG:ccG
      },
      wayBillList:[]
    }
  },
    methods:{
      getTopList(){
        this.$http.get("../v1/waybill/allWayBillDetail").then(function(res){
          var code = res.body.code;
          if(code != 0){
            return;
          }
          var list = res.body.data.wayBillDetailVoList;
          var temp = [];
          for(var i = 0;i < list.length;i++){
            var item = list[i];
            if(item.waybillStatusCode === constantData.SENDFORRESPONSE ||
              item.waybillStatusCode === constantData.SENDED ){
              temp.push(item);
              if(temp.length >= 4) break;
            }
          }
          this.wayBillList = temp;
        },function(err){
          console.log(err);
        });
      },
      checkDetail (orderNo) {
        Store.commit('setCheckIdOrder',orderNo);
        this.$router.push("/logisticsCompany/companyBillDetails");
      },
      sendConfirm(orderNo){
        Store.commit('setCheckIdOrder',orderNo);
        this.$router.push('/logisticsCompany/sendConfirm');
      },
      receiveConfirm(orderNo){
        Store.commit('setCheckIdOrder',orderNo);
        this.$router.push('/logisticsCompany/receiveConfirm');
      },
    }
}
</script>

<style>

</style>
