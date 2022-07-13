<template>
<!-- 2022-04-20 19:41:04
  home组件，主组件，包含了sidebar侧边栏和header顶部栏
 -->
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content">
      <transition name="move"
                  mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import vHead from './Header.vue'
import vSidebar from './Sidebar.vue'
import vReadme from '../page/Readme.vue'
export default {
  components: {
    vHead,
    vSidebar,
    vReadme,
  },
}
</script>
