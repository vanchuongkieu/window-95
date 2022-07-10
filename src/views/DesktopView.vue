<template>
  <div class="desktop">
    <div class="desktop-screen" id="desktop-screen">
      <div v-for="window in activeWindows" :key="window.key">
        <component
          :is="window.windowComponent"
          :windowId="window.windowId"
          :id="window.windowId"
        >
          <component :is="window.windowContent" slot="content"></component>
        </component>
      </div>
      <grid-desktop></grid-desktop>
    </div>
    <taskbar-desktop></taskbar-desktop>
  </div>
</template>

<script>
import GridDesktop from "@/components/templates/GridDesktop.vue";
import WindowDesktop from "@/components/templates/WindowDesktop.vue";
import TaskbarDesktop from "@/components/templates/TaskbarDesktop.vue";

import DocumentFolder from "@/components/DocumentFolder.vue";
import ProfileFolder from "@/components/ProfileFolder.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    GridDesktop,
    WindowDesktop,
    TaskbarDesktop,
    DocumentFolder,
    ProfileFolder,
  },
  computed: {
    ...mapGetters(["activeWindows", "activeWindow"]),
  },
  created() {
    if (process.env.ENV_NODE == "production") {
      document.addEventListener("contextmenu", (e) => {
        e.preventDefault();
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.desktop {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  user-select: none;

  &-screen {
    width: 100%;
    height: 100%;
    background: #018281;
  }
}
</style>
