<template>
  <div id="index">
    <transition name="fade">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>
<script>
  export default {
    name:'index',
    data () {
      return {}
    }
  }
</script>
