<template>
  <div class="desktop">
    <div class="desktop-screen">
      <window-desktop
        v-for="item in activeWindows"
        :iconName="item.windowIcon"
        :windowId="item.windowId"
        :key="item.windowId"
      >
        <template v-slot:title>{{ item.windowTitle }}</template>
        <template v-slot:content>{{ item.windowContent }}</template>
      </window-desktop>
    </div>
    <taskbar-desktop></taskbar-desktop>
  </div>
</template>

<script>
import WindowDesktop from "@/components/WindowDesktop.vue";
import TaskbarDesktop from "@/components/TaskbarDesktop.vue";
import { mapGetters } from "vuex";

export default {
  name: "DesktopView",
  components: {
    "window-desktop": WindowDesktop,
    "taskbar-desktop": TaskbarDesktop,
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
