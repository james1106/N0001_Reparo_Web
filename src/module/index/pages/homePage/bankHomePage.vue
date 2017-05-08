<template>
  <div id="bankHp">
    <el-row>
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
        <img :src="imgUrl.ccG" style="height: 80px;width:100%;float: right">
      </el-col>
    </el-row>
    <el-row>
      <img :src="imgUrl.adImg" style="width: 100%">
    </el-row>
    <el-card>
      <div slot="header" class="clearfix" style="height: 8px">
        <span class="green_span">待办操作</span>
      </div>
      <el-row v-if="discountList.length == 0">
        <el-row class="el-row-header" style="background-color: rgb(229,241,245)">
          <el-col :span="5" style="margin-left: 19px">账款金额</el-col>
          <el-col :span="5">账款信息</el-col>
          <el-col :span="5">账款到期日</el-col>
          <el-col :span="5">当前状态</el-col>
          <el-col :span="2" style="text-align: center">操作</el-col>
        </el-row>
        <el-row style="text-align: center">
          <img :src="imgUrl.default_0" style="width: 200px;margin-top: 15px">
        </el-row>
        <el-row style="text-align: center;font-size: 18px;color: #959697">
          <span>暂无操作列表</span>
        </el-row>
      </el-row>
      <el-row v-else>
        <el-row class="el-row-header" style="background-color: rgb(229,241,245)">
          <el-col :span="5" style="margin-left: 19px">账款金额</el-col>
          <el-col :span="5">账款信息</el-col>
          <el-col :span="5">账款到期日</el-col>
          <el-col :span="5">当前状态</el-col>
          <el-col :span="2" style="text-align: center">操作</el-col>
        </el-row>
        <template v-for="item in discountList">
          <div>
            <el-row class="dataTable">
              <el-row class="el-row-header">
                <el-col :span="10" style="margin-left: 19px;">账款编号：{{item.receivableNo}}</el-col>   <!--{{item.wayBillNo}}-->
                <el-col :span="10">融资申请时间：{{item.discountApplyTime | timeTransfer}}</el-col>
              </el-row>
              <el-row class="el-row-content">
                <el-col :span="5" style="margin-left: 19px;">
                  <el-row>{{item.isseAmt}}元</el-row>  <!--账款金额-->
                </el-col>
                <el-col :span="5">
                  <el-row>持有人：{{item.firstOwnerName}}</el-row>
                  <el-row>承兑人：{{item.accptrName}}</el-row>
                </el-col>
                <el-col :span="5">
                <el-row>{{item.dueDt | timeTransfer}}</el-row>  <!--账款到期日-->
              </el-col>
                <el-col :span="5">
                  <el-row>{{item.status | receStatus}}</el-row>  <!--当前状态-->
                </el-col>
                <el-col :span="2">
                  <el-row style="text-align: center;">
                    <el-button size="mini" type="text" @click.native.prevent="discount(item.receivableNo)">确认融资</el-button>
                  </el-row>
                  <el-row style="text-align: center;">
                    <el-button size="small" style="height: 25px" @click.native.prevent="checkDetail(item.receivableNo)">查看详情</el-button>
                  </el-row>
                </el-col>
              </el-row>
            </el-row>
          </div>
        </template>
      </el-row>
    </el-card>
  </div>
</template>
<script>
  import '../../../../framework/iconfont.js'
  import adImg from '../../assets/ad.png'
  import ccG from  '../../assets/cc_G.png'
  import default_0 from  '../../assets/default_0.png'
  import Localstore from "../../../../common/store.js"
  import Store from "../../vuex/store"
  import constantData from "../../../../common/const"

  export default {
    name: 'bankHp',
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
          ccG:ccG,
          default_0:default_0
        },
        discountList:[]
      }
    },
    methods:{
      getTopList(){
        this.$http.post('../v1/receivable/receivableSimpleDetailList',{roleCode:'3'},{emulateJSON:true}).then(function(res){
          if(res.body.code != 0){
            this.$message.error(res.body.message);
            return;
          }
          var list = res.body.data;
          var temp = [];
          for(var i = 0;i < list.length;i++){
            var item = list[i];
            if(item.status === constantData.DISCOUNTED){
              temp.push(item);
              if(temp.length >= 4) break;
            }
          }
          this.discountList = temp;
        },function(err){
          console.log(err);
        });
      }
    }
  }
</script>

<style>
</style>
