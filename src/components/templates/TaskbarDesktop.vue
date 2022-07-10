<template>
  <div class="taskbar-wrapper">
    <div class="taskbar">
      <button
        ref="startMenuRef"
        @click="onActiveStartMenu"
        class="taskbar-item-active start-menu"
        :class="{ 'taskbar-item-active-depressed': startMenuActive }"
      >
        <div class="taskbar-item-active-content">
          <i class="icon icon-window"></i> <span>Start</span>
        </div>
      </button>
      <button
        v-for="window in activeWindows"
        class="taskbar-item-active item"
        @click="setActiveMenu(window.windowId)"
        :class="{
          'taskbar-item-active-depressed': activeWindow == window.windowId,
        }"
        :key="window.windowId"
      >
        <div class="taskbar-item-active-content">
          <i class="icon" :class="window.windowIcon"></i>
          <span>{{ window.windowTitle }}</span>
        </div>
      </button>
      <div class="taskbar-time">
        <time ref="time"> {{ time }} </time>
      </div>
    </div>
    <start-menu :buttonRef="$refs.startMenuRef" />
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";

import StartMenu from "./StartMenu.vue";

export default {
  data() {
    return {
      window: {},
      time: moment().format("hh:mm A"),
    };
  },
  components: { StartMenu },
  computed: {
    ...mapGetters(["activeWindows", "activeWindow", "startMenuActive"]),
  },
  mounted() {
    setInterval(() => {
      this.time = moment().format("hh:mm A");
    }, 1000);
  },
  methods: {
    setActiveMenu(windowId) {
      this.$store.commit(
        "SET_ACTIVE_WINDOW",
        this.activeWindow == windowId ? "" : windowId
      );
      this.$store.commit("SET_WINDOW_STATE", {
        windowId: windowId,
        windowState: "open",
      });
    },
    onActiveStartMenu() {
      this.$store.commit("START_MENU_ACTIVE", !this.startMenuActive);
    },
  },
};
</script>

<style lang="scss" scoped>
.taskbar {
  width: 100%;
  height: 4rem;
  background: silver;
  border-top: 0.2rem solid #fafafa;
  z-index: 100;
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
  position: fixed;
  bottom: 0;
  left: 0;

  &-item-active {
    max-width: 17rem;
    width: 100%;
    margin: 0.5rem;
    margin-right: 0;
    padding: 0 0.8rem;
    height: 3rem;
    box-shadow: 0.1rem 0.1rem #000;
    border-top: 0.1rem solid #fafafa;
    border-left: 0.1rem solid #fafafa;
    border-bottom: 0.1rem solid #5a5a5a;
    border-right: 0.1rem solid #5a5a5a;
    background: silver;
    align-items: center;
    display: flex;
    cursor: pointer;
    padding-bottom: 0.2rem;
    outline: none;
    font-family: inherit;

    @media (max-width: 768px) {
      width: 10rem;
    }

    &:focus .taskbar-item-active-content {
      border: rgb(255, 255, 148) dotted 1px;
    }

    &-content {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 0.5rem;
      font-weight: 700;
    }
    font-size: 1rem;

    &.item {
      span {
        width: calc(100% - 18px);
        margin-bottom: -0.2rem;
        white-space: nowrap;
        overflow: hidden !important;
        text-overflow: ellipsis;
        text-align: left;
      }
    }

    &:active {
      background: silver;
      border: 0;
    }

    &-depressed,
    &:active {
      box-shadow: none;
      border-top: 0.15rem solid #000;
      border-left: 0.15rem solid #000;
      border-bottom: 0.15rem solid #fafafa;
      border-right: 0.15rem solid #fafafa;
    }

    &.start-menu {
      max-width: 7rem;
      justify-content: center;
      span {
        width: auto;
        margin-bottom: -0.2rem;
      }
    }
  }

  &-time {
    margin-left: auto;
    margin-right: 0.5rem;
    padding: 0 1rem;
    height: 3rem;
    background: silver;
    border-right: 0.15rem solid #fafafa;
    border-bottom: 0.15rem solid #fafafa;
    border-top: 0.15rem solid #5a5a5a;
    border-left: 0.15rem solid #5a5a5a;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    font-size: 0.8em;
  }
}
</style>
