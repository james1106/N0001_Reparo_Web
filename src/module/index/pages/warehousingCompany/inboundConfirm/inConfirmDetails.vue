<template>
  <!--入库确认-->
  <el-form ref="inboundConfirm" :model="inboundConfirm" label-width="200px">
    <el-form-item label="申请人">
      <el-select v-model="inboundConfirm.applicant" style="width: 250px">
        <el-option label="A企业" value="companyA"></el-option>
        <el-option label="B企业" value="companyB"></el-option>
        <el-option label="C企业" value="companyC"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="运单号">
      <el-input v-model="inboundConfirm.trackingNumber" style="width: 250px"></el-input>
    </el-form-item>
    <el-form-item label="物流公司">
      <el-input v-model="inboundConfirm.logisticsCompany" style="width: 250px"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    name:'index',
    data () {
      return {
        inboundConfirm:{
          applicant:'',
          trackingNumber:'',
          logisticsCompany:''
        }
      }
    }
  }
</script>
