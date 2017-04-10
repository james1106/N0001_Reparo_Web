<template>
  <div id="list">
    <el-tabs type="border-card" v-bind:value="status">
      <el-tab-pane label="所有应收账款" name="all">
        <template>
          <el-row class="row-black row-padding">
            <el-col :span="5">货品信息</el-col>
            <el-col :span="5">账款信息</el-col>
            <el-col :span="5">收款人</el-col>
            <el-col :span="5">账款状态</el-col>
            <el-col :span="4">操作</el-col>
          </el-row>
            <el-row class="row-black row-padding">
              <el-col :span="24">应收账款编号：20170403123456</el-col>
            </el-row>
            <el-row class="row-padding">
              <el-col :span="5">
                <el-col :span="24">货品名称：卡片</el-col>
                <el-col :span="24">货品数量：1000箱</el-col>
              </el-col>
              <el-col :span="5">
                <el-col :span="24">账款金额：20000</el-col>
                <el-col :span="24">付款方式：应收款支付</el-col>
                <el-col :span="24">到期日：2017-11-03</el-col>
              </el-col>
              <el-col :span="5">
                <el-col :span="24">A企业</el-col>
              </el-col>
              <el-col :span="5">
                <el-col :span="24">承兑已签收</el-col>
              </el-col>
              <el-col :span="4">
                <el-col :span="24">
                  <router-link to="/allAccounts/all/detail">查看详情</router-link>
                </el-col>
              </el-col>
            </el-row>
        </template>
      </el-tab-pane>
      <el-tab-pane label="待签发" name="signout" v-if="isBuyer === false">
        <template>
          <el-row class="row-black row-padding">
            <el-col :span="5">货品信息</el-col>
            <el-col :span="5">账款信息</el-col>
            <el-col :span="5">收款人</el-col>
            <el-col :span="5">账款状态</el-col>
            <el-col :span="4">操作</el-col>
          </el-row>
          <el-row class="row-black row-padding">
            <el-col :span="24">应收账款编号：20170403123456</el-col>
          </el-row>
          <el-row class="row-padding">
            <el-col :span="5">
              <el-col :span="24">货品名称：卡片</el-col>
              <el-col :span="24">货品数量：1000箱</el-col>
            </el-col>
            <el-col :span="5">
              <el-col :span="24">账款金额：20000</el-col>
              <el-col :span="24">付款方式：应收款支付</el-col>
              <el-col :span="24">到期日：2017-11-03</el-col>
            </el-col>
            <el-col :span="5">
              <el-col :span="24">A企业</el-col>
            </el-col>
            <el-col :span="5">
              <el-col :span="24">承兑已签收</el-col>
            </el-col>
            <el-col :span="4">
              <el-col :span="24">
                <router-link to="/allAccounts/signout/signout">签发账款</router-link>
              </el-col>
              <el-col :span="24">
                <router-link to="/allAccounts/signout/detail">查看详情</router-link>
              </el-col>
            </el-col>
          </el-row>
        </template>
      </el-tab-pane>
      <el-tab-pane label="承兑待签收" name="accept" >
        <template>
          <el-row class="row-black row-padding">
            <el-col :span="5">货品信息</el-col>
            <el-col :span="5">账款信息</el-col>
            <el-col :span="5">收款人</el-col>
            <el-col :span="5">账款状态</el-col>
            <el-col :span="4">操作</el-col>
          </el-row>
          <el-row class="row-black row-padding">
            <el-col :span="24">应收账款编号：20170403123456</el-col>
          </el-row>
          <el-row class="row-padding">
            <el-col :span="5">
              <el-col :span="24">货品名称：卡片</el-col>
              <el-col :span="24">货品数量：1000箱</el-col>
            </el-col>
            <el-col :span="5">
              <el-col :span="24">账款金额：20000</el-col>
              <el-col :span="24">付款方式：应收款支付</el-col>
              <el-col :span="24">到期日：2017-11-03</el-col>
            </el-col>
            <el-col :span="5">
              <el-col :span="24">A企业</el-col>
            </el-col>
            <el-col :span="5">
              <el-col :span="24">承兑待签收</el-col>
            </el-col>
            <el-col :span="4">
              <el-col :span="24">
                <router-link to="/allAccounts/accpet/accept">承兑账款</router-link>
              </el-col>
              <el-col :span="24">
                <router-link to="/allAccounts/accpet/detail">查看详情</router-link>
              </el-col>
            </el-col>

          </el-row>
        </template>
      </el-tab-pane>
      <el-tab-pane label="待兑付" name="cash" v-if="isBuyer === true">
        <template>
          <el-row class="row-black row-padding">
            <el-col :span="5">货品信息</el-col>
            <el-col :span="5">账款信息</el-col>
            <el-col :span="5">收款人</el-col>
            <el-col :span="5">账款状态</el-col>
            <el-col :span="4">操作</el-col>
          </el-row>
          <el-row class="row-black row-padding">
            <el-col :span="24">应收账款编号：20170403123456</el-col>
          </el-row>
          <el-row class="row-padding">
            <el-col :span="5">
              <el-col :span="24">货品名称：卡片</el-col>
              <el-col :span="24">货品数量：1000箱</el-col>
            </el-col>
            <el-col :span="5">
              <el-col :span="24">账款金额：20000</el-col>
              <el-col :span="24">付款方式：应收款支付</el-col>
              <el-col :span="24">到期日：2017-11-03</el-col>
            </el-col>
            <el-col :span="5">
              <el-col :span="24">A企业</el-col>
            </el-col>
            <el-col :span="5">
              <el-col :span="24">承兑已签收</el-col>
            </el-col>
            <el-col :span="4">
              <el-col :span="24">
              <router-link to="/allAccounts/cash/cash">兑付账款</router-link>
            </el-col>
              <el-col :span="24">
                <router-link to="/allAccounts/cash/detail">查看详情</router-link>
              </el-col>
            </el-col>
          </el-row>
        </template>
      </el-tab-pane>
      <el-tab-pane label="承兑已签收" name="discount" v-if="isBuyer === false">
        <template>
          <el-row class="row-black row-padding">
            <el-col :span="5">货品信息</el-col>
            <el-col :span="5">账款信息</el-col>
            <el-col :span="5">收款人</el-col>
            <el-col :span="5">账款状态</el-col>
            <el-col :span="4">操作</el-col>
          </el-row>
          <el-row class="row-black row-padding">
            <el-col :span="24">应收账款编号：20170403123456</el-col>
          </el-row>
          <el-row class="row-padding">
            <el-col :span="5">
              <el-col :span="24">货品名称：卡片</el-col>
              <el-col :span="24">货品数量：1000箱</el-col>
            </el-col>
            <el-col :span="5">
              <el-col :span="24">账款金额：20000</el-col>
              <el-col :span="24">付款方式：应收款支付</el-col>
              <el-col :span="24">到期日：2017-11-03</el-col>
            </el-col>
            <el-col :span="5">
              <el-col :span="24">A企业</el-col>
            </el-col>
            <el-col :span="5">
              <el-col :span="24">承兑已签收</el-col>
            </el-col>
            <el-col :span="4">
            <el-col :span="24">
                <router-link to="/allAccounts/discount/discount">贴现账款</router-link>
              </el-col>
              <el-col :span="24">
                <router-link to="/allAccounts/discount/detail">查看详情</router-link>
              </el-col>
            </el-col>
          </el-row>
        </template>
      </el-tab-pane>
      <el-tab-pane label="贴现待签收" name="" v-if="isBuyer === false" >
        <template>
          <el-row class="row-black row-padding">
            <el-col :span="5">货品信息</el-col>
            <el-col :span="5">账款信息</el-col>
            <el-col :span="5">收款人</el-col>
            <el-col :span="5">账款状态</el-col>
            <el-col :span="4">操作</el-col>
          </el-row>
          <el-row class="row-black row-padding">
            <el-col :span="24">应收账款编号：20170403123456</el-col>
          </el-row>
          <el-row class="row-padding">
            <el-col :span="5">
              <el-col :span="24">货品名称：卡片</el-col>
              <el-col :span="24">货品数量：1000箱</el-col>
            </el-col>
            <el-col :span="5">
              <el-col :span="24">账款金额：20000</el-col>
              <el-col :span="24">付款方式：应收款支付</el-col>
              <el-col :span="24">到期日：2017-11-03</el-col>
            </el-col>
            <el-col :span="5">
              <el-col :span="24">A企业</el-col>
            </el-col>
            <el-col :span="5">
              <el-col :span="24">承兑已签收</el-col>
            </el-col>
            <el-col :span="4">
              <el-col :span="24">
                <router-link to="/allAccounts/discount/detail">查看详情</router-link>
              </el-col>
            </el-col>
          </el-row>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import Store from '../../vuex/store.js'

  export default {
    name:'list',
    created: function () {
      this.status = Store.state.accountsStatus
      this.isBuyer = Store.state.isBuyer
      this.$http.get('/api/getList').then((data) => {
          console.log(data);
      },(err) => {
        console.log(err);
      })
    },
    watch: {
      '$route' () {
        this.status = Store.state.accountsStatus
      }
    },
    data () {
      return {
        status:'all',
        isBuyer:true,
        dataList:[
          {
            yewubianhao:"20170403123456",
            yewuleixing:"待承兑",
            jiaoyiduishou:"A企业",
            jine:"20，000"
          },
          {
            yewubianhao:"20170403123456",
            yewuleixing:"待承兑",
            jiaoyiduishou:"B企业",
            jine:"20，000"
          },
          {
            yewubianhao:"20170403123456",
            yewuleixing:"待承兑",
            jiaoyiduishou:"A企业",
            jine:"20，000"
          },
          {
            yewubianhao:"20170403123456",
            yewuleixing:"待承兑",
            jiaoyiduishou:"C企业",
            jine:"20，000"
          }
        ]
      }
    },
    methods:{
       showDetail: function (handle) {
         switch (handle){
           case 'accept':  //承兑
               break;
           case 'accept':
             break;
           case 'accept':
             break;
           case 'accept':
             break;
           case 'detail':
             break;
         }
       }
    }
  }
</script>
