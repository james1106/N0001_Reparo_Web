<template>
  <div class="dialog">
    <el-dialog title="提示" v-model="dialogVisible" size="tiny">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'dialog',
  props:['isShow'],
  created: function () {
    alert(this.isShow);
  },
  data () {
    return {
      dialogVisible:this.isShow,
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
