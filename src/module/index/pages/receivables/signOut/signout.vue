<template>
  <div id="qianfa">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>应收账款</el-breadcrumb-item>
      <el-breadcrumb-item>签发</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="row-bg" :gutter="20">
        <!--<el-col :span="24">-->
            <el-col :span="9" offset="2" class="row-bg1">
              <label>订单编号：xxxxx</label>
            </el-col>
            <el-col :span="9"  offset="2" class="row-bg1">
              <label>发起时间：xxxxx</label>
             </el-col>
        <!--</el-col>-->
        <el-col :span="8" class="row-bg1">
          <div class="grid-content bg-purple-light">
            <label>购买人:xxx</label>
          </div>
        </el-col>
        <el-col :span="8" class="row-bg1">
          <div class="grid-content bg-purple-light">
            <label>订单金额:xxx</label>
          </div>
        </el-col>
        <el-col :span="8" class="row-bg1">
          <div class="grid-content bg-purple-light">
            <label>付款方式:xxx</label>
          </div>
        </el-col>

        <el-col :span="8" class="row-bg1">
          <div class="grid-content bg-purple-light">
            <label>货品名称:xxx</label>
          </div>
        </el-col>
        <el-col :span="8" class="row-bg1">
          <div class="grid-content bg-purple-light">
            <label>货品数量:xxx</label>
          </div>
        </el-col>
        <el-col :span="8" class="row-bg1">
          <div class="grid-content bg-purple-light">
            <label>购买人:xxx</label>
          </div>
        </el-col>

        <el-col :span="8" class="row-bg1">
          <div class="grid-content bg-purple-light">
            <label>购买人:xxx</label>
          </div>
        </el-col>
        <el-col :span="8" class="row-bg1">
          <div class="grid-content bg-purple-light">
            <label>购买人:xxx</label>
          </div>
        </el-col>
        <el-col :span="8" class="row-bg1">
          <div class="grid-content bg-purple-light">
            <label>购买人:xxx</label>
          </div>
        </el-col>
    </el-row>

    <el-row class="row-bg" :gutter="20">
        <el-col :span="9" offset="2" class="row-bg1">
          <div class="grid-content bg-purple-light">
            <label>订单编号</label>
          </div>
        </el-col>
        <el-col :span="9"  offset="2" class="row-bg1">
           <div class="grid-content bg-purple-light">
            <label>账款金额</label>
          </div>
        </el-col>
        <el-col :span="9" offset="2" class="row-bg1">
            <div class="grid-content bg-purple-light">
            <label>付款到日期</label>
            <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions0">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="9"  offset="2" class="row-bg1">
           <div class="grid-content bg-purple-light">
            <label>带利息率</label>
          </div>
        </el-col>
        <el-col :span="9" offset="2" class="row-bg1">
            <div class="grid-content bg-purple-light">
            <label>付款人名称</label>
          </div>
        </el-col>
        <el-col :span="9"  offset="2" class="row-bg1">
           <div class="grid-content bg-purple-light">
            <label>收款人名称</label>
          </div>
        </el-col>
        <el-col :span="9" offset="2" class="row-bg1">
            <div class="grid-content bg-purple-light">
            <label>付款人开户行</label>
          </div>
        </el-col>
        <el-col :span="9"  offset="2" class="row-bg1">
           <div class="grid-content bg-purple-light">
            <label> 收款人开户行</label>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="9" offset="2" class="row-bg1">
            <div class="grid-content bg-purple-light">
            <label>付款人账户</label>
          </div>
        </el-col>
        <el-col :span="9"  offset="2" class="row-bg1">
           <div class="grid-content bg-purple-light">
            <label> 收款人账户</label>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="9" offset="2" class="row-bg1">
            <div class="grid-content bg-purple-light">
            <label>购买人:xxx</label><el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
        <el-col :span="9"  offset="2" class="row-bg1">
           <div class="grid-content bg-purple-light">
            <label>购买人:xxx</label><el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
        <el-col :span="9" offset="2" class="row-bg1">
            <div class="grid-content bg-purple-light">
            <label>购买人:xxx</label>
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
        <el-col :span="9"  offset="2" class="row-bg1">
           <div class="grid-content bg-purple-light">
            <label>购买人</label><el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
        <el-col :span="4"  offset="18" class="row-bg1">
           <div class="grid-content bg-purple-light">
            <el-button type="primary">确认订单
            </el-button>
          </div>
        </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    name:'qianfa',
    data () {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }]
      }
    }
  }
</script>

<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    margin-bottom: 0px;
    border-radius: 4px;
  }
  /*.bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }*/
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    /*background-color: #f9fafc;*/
  }

  .row-bg1 {
    padding: 10px 0;
    /*background-color: #f9fafc;*/
  }

</style>
