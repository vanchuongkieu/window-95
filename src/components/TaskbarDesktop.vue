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
        v-for="item in activeWindows"
        @click="setActiveMenu(item.windowId)"
        class="taskbar-item-active"
        :class="{
          'taskbar-item-active-depressed': activeWindow === item.windowId,
        }"
        :key="item.windowId"
      >
        <i class="icon" :class="item.windowIcon"></i>
        <span>{{ item.windowTitle }}</span>
      </div>
      <div class="taskbar-time">
        <time ref="time"> {{ time }} </time>
      </div>
    </div>
    <div
      ref="taskbarStartMenuRef"
      class="taskbar-start-menu"
      :class="{ 'start-menu-active': startMenuActive }"
    ></div>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  name: "TaskbarDesktop",
  data() {
    return {
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
    },
    onActiveStartMenu() {
      this.startMenuActive = !this.startMenuActive;
    },
    checkOutsite(event) {
      const startMenuRef = this.$refs.startMenuRef;
      const taskbarStartMenuRef = this.$refs.taskbarStartMenuRef;
      if (
        !startMenuRef.contains(event.target) &&
        !taskbarStartMenuRef.contains(event.target)
      ) {
        this.startMenuActive = false;
      } else {
        this.$store.commit("SET_ACTVIE_WINDOW", "");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.taskbar {
  width: 100%;
  height: 3.5rem;
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
    height: 2.5rem;
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
    gap: 0.5rem;

    span {
      width: calc(100% - 18px);
      margin-bottom: -0.2rem;
      white-space: nowrap;
      overflow: hidden !important;
      text-overflow: ellipsis;
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
      width: 8rem;
      justify-content: center;
      span {
        width: auto;
      }
    }
  }

  &-time {
    margin-left: auto;
    margin-right: 0.5rem;
    padding: 0 0.8rem;
    height: 2.5rem;
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
    bottom: 3.5rem;
    z-index: 99;
    visibility: hidden;

    &.start-menu-active {
      visibility: visible;
    }
  }
}
</style>
