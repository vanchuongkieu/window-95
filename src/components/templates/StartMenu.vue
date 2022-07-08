<template>
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
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["buttonRef"],
  computed: {
    ...mapGetters(["startMenuActive"]),
  },
  mounted() {
    window.addEventListener("click", this.checkOutsite);
  },
  methods: {
    checkOutsite(event) {
      const taskbarStartMenuRef = this.$refs.taskbarStartMenuRef;
      if (this.buttonRef && taskbarStartMenuRef) {
        if (
          !this.buttonRef.contains(event.target) &&
          !taskbarStartMenuRef.contains(event.target)
        ) {
          this.$store.commit("START_MENU_ACTIVE", false);
        } else {
          this.$store.commit("SET_ACTIVE_WINDOW", "");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.taskbar {
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
    user-select: none;

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
