<template>
  <div id="repoHp">
    <el-row>
      <el-col :span="5" style="margin-right: 1.7%;width: 23%">
        <el-card class="showCard">
          <svg class="icon" aria-hidden="true" style="font-size: 55px;float: left">   <use xlink:href="#icon-order_o"></use> </svg>
          <div class="showMesg">
            <span class="showName">卖出的订单</span> <br>
            <span class="showNum">1000</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="5" style="margin-right: 1.7%;width: 23%">
        <el-card class="showCard">
          <svg class="icon" aria-hidden="true" style="font-size: 55px;float: left">   <use xlink:href="#icon-yszk_o"></use> </svg>
          <div class="showMesg">
            <span class="showName">应收账款</span> <br>
            <span class="showNum">1000</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="5" style="margin-right: 1.7%;width: 23%">
        <el-card class="showCard">
          <svg class="icon" aria-hidden="true" style="font-size: 55px;float: left">   <use xlink:href="#icon-wl_o"></use> </svg>
          <div class="showMesg">
            <span class="showName">我的物流</span> <br>
            <span class="showNum">1000</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" style="float: right">
        <img :src="imgUrl.ccG" style="height: 80px;float: right">
      </el-col>
    </el-row>
    <el-row>
      <img :src="imgUrl.adImg" style="width: 100%">
    </el-row>
    <el-card>
      <div slot="header" class="clearfix" style="height: 8px">
        <span>待办仓储</span>
      </div>
      <el-row class="el-row-header" style="background-color: rgb(229,241,245)">
        <el-col :span="4" style="margin-left: 19px">业务编号</el-col>
        <el-col :span="4">持有人</el-col>
        <el-col :span="4">仓储状态</el-col>
        <el-col :span="4">仓单编号</el-col>
        <el-col :span="4">仓单状态</el-col>
        <el-col :span="2">操作</el-col>
      </el-row>
      <span v-if="repoList.length == 0" class="msgName">暂无待办仓储！</span>
      <template v-for="item in repoList">
        <div>
          <el-row class="dataTable">
            <el-row class="el-row-header">
              <el-col :span="8" style="margin-left: 19px;">仓储业务编号：{{item.repoBusiNo}}</el-col>
              <el-col :span="8">订单编号：{{item.orderNo}}</el-col>
            </el-row>
            <el-row class="el-row-content">
              <el-col :span="4" style="margin-left: 19px;">
                <el-row>货品名称：{{item.productName}}</el-row>
                <el-row>货品数量：{{item.productQuantity}}</el-row>
              </el-col>
              <el-col :span="4">
                <el-row>{{item.holderEnterpriseName}}</el-row>
              </el-col>
              <el-col :span="4">
                <el-row>{{item.curRepoBusiStatus | repoStatus}}</el-row><!--仓储状态-->
              </el-col>
              <el-col :span="4">
                <el-row>{{item.repoCertNo | nullSituation}}</el-row><!--仓单编号-->
              </el-col>
              <el-col :span="4">
                <el-row>{{item.repoCertStatus | repoCertStatus | nullSituation}}</el-row><!--仓单状态-->
              </el-col>
              <el-col :span="3">
                <el-col :span="24">
                  <el-button size="mini" type="text" class="buyerColor" v-if="item.curRepoBusiStatus===constantData.INFORRESPONSE" @click.native.prevent="inResponse(item.repoBusiNo)">入库响应</el-button>
                  <el-button size="mini" type="text" class="buyerColor" v-if="item.curRepoBusiStatus===constantData.FORIN" @click.native.prevent="inConfirm(item.repoBusiNo)">入库确认</el-button>
                  <el-button size="mini" type="text" class="buyerColor" v-if="item.curRepoBusiStatus===constantData.FOROUT" @click.native.prevent="outConfirm(item.repoBusiNo)">出库确认</el-button>
                </el-col>
                <el-col :span="24" style="margin-left: -9px">
                  <el-button size="small" @click.native.prevent="checkDetail(item.repoBusiNo)">查看详情</el-button>
                </el-col>
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
    name: 'repoHp',
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
        repoList:[]
      }
    },
    methods:{
        getTopList(){
          this.$http.get("../v1/repository/getRepoBusiList?role=3").then(function(res){
            var code = res.body.code;
            if(code != 0){
                return;
            }
            var list = res.body.data;
            var temp = [];
            for(var i = 0;i < list.length;i++){
                var item = list[i];
                if(item.curRepoBusiStatus === constantData.INFORRESPONSE ||
                  item.curRepoBusiStatus === constantData.FORIN ||
                  item.curRepoBusiStatus === constantData.FOROUT){
                    temp.push(item);
                    if(temp.length >= 4) {
                        break;
                    }
                }
            }
            this.repoList = temp;
          },function(err){
            console.log(err);
          });
        },
      checkDetail(repoBusinessNo){
        Store.commit('setCheckIdRepo',repoBusinessNo);
        this.$router.push('/warehousingCompany/repoDetails')
      },
      inResponse(repoBusinessNo){
        Store.commit('setCheckIdRepo',repoBusinessNo);
        this.$router.push('/warehousingCompany/inResponse')
      },
      inConfirm(repoBusinessNo){
        Store.commit('setCheckIdRepo',repoBusinessNo);
        this.$router.push('/warehousingCompany/inConfirm')
      },
      outConfirm(repoBusinessNo){
        Store.commit('setCheckIdRepo',repoBusinessNo);
        this.$router.push('/warehousingCompany/outConfirm')
      }
    }
  }
</script>

<style>

</style>
