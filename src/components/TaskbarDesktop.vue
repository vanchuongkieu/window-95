<template>
  <div>
    <div class="taskbar">
      <div
        ref="startMenuRef"
        @click="onActiveStartMenu"
        class="taskbar-item-active start-menu"
        :class="{ 'taskbar-item-active-depressed': startMenuActive }"
      >
        <i class="icon icon-window"></i>
        <span>Start</span>
      </div>
      <div
        ref="taskbarItemRef"
        v-for="window in activeWindows"
        @click="setActiveMenu(window.windowId)"
        class="taskbar-item-active item"
        :class="{
          'taskbar-item-active-depressed': activeWindow == window.windowId,
        }"
        :key="window.windowId"
      >
        <i class="icon" :class="window.windowIcon"></i>
        <span>{{ window.windowTitle }}</span>
      </div>
      <div class="taskbar-time">
        <time ref="time"> {{ time }} </time>
      </div>
    </div>
    <div
      ref="taskbarStartMenuRef"
      class="taskbar-start-menu"
      :class="{ 'start-menu-active': startMenuActive }"
    >
      <div class="taskbar-start-menu--sidebar">
        <img src="@/assets/icons/window-start-menu.png" class="sidebar-image" />
      </div>
      <div class="taskbar-start-menu--menu">
        <a href="https://www.facebook.com/chuonqit" target="_blank">
          <div class="bar">
            <img src="@/assets/icons/facebook.png" class="bar-image" />
            <u>F</u>acebook
          </div>
        </a>
        <a href="https://github.com/vanchuongkieu" target="_blank">
          <div class="bar">
            <img src="@/assets/icons/github.webp" class="bar-image" />
            <u>G</u>ithub 2
          </div>
        </a>
        <a href="https://github.com/chuonqit" target="_blank">
          <div class="bar">
            <img src="@/assets/icons/github.webp" class="bar-image" />
            <u>G</u>ithub 1
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  name: "TaskbarDesktop",
  data() {
    return {
      toggle: false,
      window: {},
      taskbarActive: false,
      time: moment().format("hh:mm A"),
      startMenuActive: false,
    };
  },
  computed: {
    ...mapGetters(["activeWindows", "activeWindow"]),
  },
  mounted() {
    setInterval(() => {
      this.time = moment().format("hh:mm A");
    }, 1000);
    window.addEventListener("click", this.checkOutsite);
  },
  methods: {
    setActiveMenu(windowId) {
      this.$store.commit("SET_ACTVIE_WINDOW", windowId);
      this.$store.commit("SET_WINDOW_STATE", {
        windowId: windowId,
        windowState: "open",
      });
    },
    onActiveStartMenu() {
      this.startMenuActive = !this.startMenuActive;
    },
    checkOutsite(event) {
      const startMenuRef = this.$refs.startMenuRef;
      const taskbarStartMenuRef = this.$refs.taskbarStartMenuRef;
      if (startMenuRef && taskbarStartMenuRef) {
        if (
          !startMenuRef.contains(event.target) &&
          !taskbarStartMenuRef.contains(event.target)
        ) {
          this.startMenuActive = false;
        } else {
          this.$store.commit("SET_ACTVIE_WINDOW", "");
        }
      }
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
    width: 17rem;
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
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    padding-bottom: 0.2rem;
    gap: 0.5rem;

    @media (max-width: 768px) {
      width: 10rem;
    }

    &.item {
      span {
        width: calc(100% - 18px);
        margin-bottom: -0.2rem;
        white-space: nowrap;
        overflow: hidden !important;
        text-overflow: ellipsis;
      }
    }

    &:active {
      background: silver;
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
      width: 7rem;
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

  &-start-menu {
    width: 22rem;
    height: 35rem;
    background: black;
    background: rgb(195, 195, 195);
    overflow: hidden;
    border-top: solid rgb(250, 250, 250) 2px;
    border-left: solid rgb(250, 250, 250) 2px;
    border-right: solid rgb(90, 90, 90) 1.5px;
    border-bottom: solid rgb(90, 90, 90) 1.5px;
    box-shadow: 1.5px 1.5px black;
    max-height: 100%;
    max-width: 100%;
    align-items: flex-end;
    outline: rgb(222, 222, 222) 1px solid;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    font-size: 12px;
    position: absolute;
    bottom: 4rem;
    z-index: 99999;
    visibility: hidden;

    a {
      text-decoration: none;
      font-size: 1rem;
      color: #000;
    }

    .bar {
      display: flex;
      flex-direction: row;
      padding: 5px 10px 5px 10px;
      align-items: center;

      &:hover {
        background: rgb(0, 0, 118);
        color: white;
      }

      &-image {
        width: 30px;
        height: 30px;
        margin-right: 10px;
        border-radius: 6px;
      }
    }

    .divider {
      width: 100%;
      height: 1px;
      background: rgb(123, 125, 123);
      border-bottom: white solid 1px;
    }

    &--menu {
      flex-grow: 1;
      margin-top: auto;
    }

    &--sidebar {
      width: 25px;
      background: #7b7d7b;
      height: 100%;
      display: flex;
      align-items: flex-end;

      img {
        width: 100%;
      }
    }

    &.start-menu-active {
      visibility: visible;
    }
  }
}
</style>
