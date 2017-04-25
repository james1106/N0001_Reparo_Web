<template>
  <div>
    <el-breadcrumb separator=">" class="bread">
      <svg class="icon combinedShape" aria-hidden="true">   <use xlink:href="#icon-locate"></use> </svg>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>仓储管理</el-breadcrumb-item>
      <el-breadcrumb-item>我的仓储</el-breadcrumb-item>
      <el-breadcrumb-item>仓储详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row class="el-row-header statePosition">
        <el-col class="buyerColor stateShow"><svg class="icon detailIcon" aria-hidden="true">   <use xlink:href="#icon-zhuangtai"></use> </svg>仓储当前状态：{{repoDetails.curRepoBusiStatus | repoStatus}}
          <el-button size="small" v-if="handleInfo.showHandleBtn"  @click.native.prevent="handle" style="border-color: rgb(0,150,215);color: rgb(0,150,215);margin-left: 10px">{{handleInfo.title}}</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-card class="box-card mybox" style="width:100%">
            <div slot="header" class="clearfix el-row-header">
              <svg class="icon detailIcon" aria-hidden="true">   <use xlink:href="#icon-cc_H"></use> </svg>
              <span class="keynote">仓储信息</span>
            </div>
            <div class="box-card mycard1 detailContent">
              <el-row>
                <el-col :span="8" class="msgName keynote">仓储业务编号：{{repoDetails.repoBusiNo}}</el-col>
                <el-col :span="8" class="msgName">仓储状态：{{repoDetails.curRepoBusiStatus | repoStatus}}</el-col><!--卖家和买家会显示混合-->
                <el-col :span="8" class="msgName" v-if="state.isBuyer==='true'">入库时间：{{repoDetails.inRepoTime | timeTransfer}}</el-col>
                <el-col :span="8" class="msgName" v-else>出库时间：{{repoDetails.outRepoTime | timeTransfer}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8" class="msgName keynote">仓单编号：{{repoDetails.repoCertNo | nullSituation}}</el-col>
                <el-col :span="8" class="msgName">仓储机构：{{repoDetails.repoEnterpriceName}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8" class="msgName">货品名称：{{repoDetails.productName}}</el-col>
                <el-col :span="8" class="msgName">货品数量：{{repoDetails.productQuantity}}</el-col>
                <el-col :span="8" class="msgName">货品总额(元)：{{repoDetails.productTotalPrice}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8" class="msgName">物流公司：{{repoDetails.logisticsEntepsName | nullSituation}}</el-col>
                <el-col :span="8" class="msgName">物流运单号：{{repoDetails.waybillNo | nullSituation}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8" class="msgName">仓储状态明细：</el-col>
              </el-row>


              <!--<el-row v-for="item in repoDetails.operationRecordVoList">
                <el-col :span="8" class="msgName">{{item.state | repoStatus}}：{{item.operateTime | timeTransfer}}</el-col>
              </el-row>-->

              <el-row class="collapseTop">
                <template v-for="(item,index) in repoDetails.operationRecordVoList">
                  <el-row class="status-list" :class="{circleBlue:index==(repoDetails.operationRecordVoList.length-1)}">
                    <el-col :span="8" :class="{colorBlue:index==(repoDetails.operationRecordVoList.length-1)}"><span>{{item.state | repoStatus}}：{{item.operateTime | timeTransfer}}</span></el-col>
                  </el-row>
                </template>
              </el-row>

            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog title="提示" v-model="dialogVisible" size="tiny">
      <span>{{msg}}</span>
      <span slot="footer" class="dialog-footer">
       <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  import Store from '../../vuex/store'
  import constantData from '../../../../common/const'
  export default {
    name:'index',
    data () {
      return {
        handleInfo:{
          showHandleBtn:false,
          title:''
        },
        dialogVisible:false,
        msg:'',
        repoDetails:{
          curRepoBusiStatus:'仓储当前状态',
          serialNumber:'20170403123456',
          state:'已入库',
          storageTime:'2017-08-01',
          operationRecordVoList:[],
          inRepoTime:'',
          outRepoTime:''
        }
      }
    },
    computed:{
      state () {
        return Store.state
      }
    },
    mounted () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.getDetail();
    },
    methods:{
      getDetail(){
        this.$http.get("../v1/repository/getRepoBusiHistoryList?repoBusinessNo="+Store.state.checkIdRepo).then(function(res){
//            请求仓储详情数据
          console.log(res.body);
          if(res.body.code != 0){
            return;
          }

          this.repoDetails=res.body.data;
          this.repoDetails.inRepoTime='';//返回数据里面没有这两个字段
          this.repoDetails.outRepoTime='';
          for(var item in this.repoDetails.operationRecordVoList){
            if(item.state===constantData.ALREADYIN){/*筛选入库时间*/
              console.log("筛选入库时间");
              this.repoDetails.inRepoTime=item.operateTime;
              break;
            }
          }
          for(var item in this.repoDetails.operationRecordVoList){
            if(item.state===constantData.ALREADYOUT){/*筛选出库时间*/
              console.log("筛选出库时间");
              this.repoDetails.outRepoTime=item.operateTime;
              break;
            }
          }
          this.handleInfo.showHandleBtn = false;
          switch (this.repoDetails.curRepoBusiStatus){
            case constantData.INFORRESPONSE:
              this.handleInfo.showHandleBtn = true;
              this.handleInfo.title = '入库响应';
              break;
            case constantData.FORIN:
              this.handleInfo.showHandleBtn = true;
              this.handleInfo.title = '入库确认';
              break;
            case constantData.FOROUT:
              this.handleInfo.showHandleBtn = true;
              this.handleInfo.title = '出库确认';
              break;
          }

        },function(err){
          console.log(err)
        });
      },
      handle(){
      switch (this.repoDetails.curRepoBusiStatus){
        case constantData.INFORRESPONSE:
            this.inResponse();
          break;
        case constantData.FORIN:
            this.inConfirm();
          break;
        case constantData.FOROUT:
            this.outConfirm();
          break;
        }
      },
      inResponse(){
        var param = {repoBusinessNo:Store.state.checkIdRepo}
        this.$http.post('../v1/repository/incomeApplyResponse',param,{emulateJSON:true}).then((res) => {
          console.log(res.body);
          var code =  res.body.code;
          if(code != 0){
            return;
          }
          this.dialogVisible = true;
          this.msg = '已入库响应';
          this.getDetail();
        },(err) => {
          console.log(err);
        })
      },
      inConfirm(){
        this.$http.put('../v1/repository/incomeConfirm?repoBusinessNo='+Store.state.checkIdRepo).then((res) => {
          console.log(res.body);
          var code =  res.body.code;
          if(code != 0){
            return;
          }
          this.dialogVisible = true;
          this.msg = '已入库确认';
          this.getDetail();
        },(err) => {
          console.log(err);
        })
      },
      outConfirm(){
        this.$http.put('../v1/repository/outcomeConfirm?repoBusinessNo='+Store.state.checkIdRepo).then((res) => {
          console.log(res.body);
          var code =  res.body.code;
          if(code != 0){
            return;
          }
          this.dialogVisible = true;
          this.msg = '已出库确认';
          this.getDetail();
        },(err) => {
          console.log(err);
        })
      }
    }
  }
</script>
