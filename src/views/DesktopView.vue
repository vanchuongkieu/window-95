<template>
  <div class="desktop">
    <div class="desktop-screen" id="desktop-screen">
      <window-desktop
        v-for="window in activeWindows"
        :iconName="window.windowIcon"
        :windowId="window.windowId"
        :key="window.windowId"
        :id="window.windowId"
        :class="{
          minimize: window.windowState == 'minimize',
          maximize: window.windowFullscreen,
        }"
      >
        <template v-slot:title>{{ window.windowTitle }}</template>
        <template v-slot:content>{{ window.windowContent }}</template>
      </window-desktop>
      <grid-desktop></grid-desktop>
    </div>
    <taskbar-desktop></taskbar-desktop>
  </div>
</template>

<script>
import GridDesktop from "@/components/GridDesktop.vue";
import WindowDesktop from "@/components/WindowDesktop.vue";
import TaskbarDesktop from "@/components/TaskbarDesktop.vue";
import { mapGetters } from "vuex";

export default {
  name: "DesktopView",
  components: {
    GridDesktop,
    WindowDesktop,
    TaskbarDesktop,
  },
  computed: {
    ...mapGetters(["activeWindows", "activeWindow"]),
  },
};
</script>

<style lang="scss" scoped>
.desktop {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;

  &-screen {
    width: 100%;
    height: 100%;
    background: #018281;
  }
}
</style>
