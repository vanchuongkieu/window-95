<template>
  <interact
    draggable
    :dragOption="dragOption"
    @dragmove="dragmove"
    @resizemove="resizemove"
    @mousedown.native="setWindowActive"
    :style="style"
  >
    <div class="window">
      <div
        class="window-toolbar"
        @mousedown="mousedown"
        @mouseup="mouseup"
        :class="{
          moving: dragging,
          'window-toolbar-deactivated': windowId != activeWindow,
        }"
      >
        <div
          style="
            color: white;
            margin-left: 3px;
            display: flex;
            align-items: center;
            gap: 5px;
          "
        >
          <div v-if="iconName" class="icon" :class="iconName"></div>
          <slot name="title"></slot>
        </div>
        <div class="triple-button">
          <div class="button-hide" @click="setMinimize">
            <span
              style="
                height: 2px;
                width: 70%;
                background: black;
                margin-top: 8px;
              "
            ></span>
          </div>
          <!-- <div class="button-expand">
            <i
              style="
                height: 10px;
                width: 12px;
                border-left: black 1px solid;
                border-right: black 1px solid;
                border-left: black 1px solid;
                border-bottom: black 1px solid;
                border-top: black 2px solid;
              "
            ></i>
          </div> -->
          <div class="button-close" @click="closeWindowActive">x</div>
        </div>
      </div>
      <div class="window-content">
        <div class="window-content-scroll">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </interact>
</template>

<script>
import interact from "interactjs";
import { mapGetters } from "vuex";

export default {
  name: "WindowDesktop",
  props: ["iconName", "windowId"],
  data() {
    return {
      dragOption: {
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: "#desktop-screen",
            endOnly: true,
          }),
        ],
        allowFrom: ".window-toolbar",
      },
      x: 0,
      y: 0,
      left: Math.random() * (30 - 8) + 8,
      top: Math.random() * (30 - 8) + 9,
      dragging: false,
    };
  },
  computed: {
    ...mapGetters(["activeWindow", "getWindowById"]),
    style() {
      return {
        transform: `translate(${this.x}px, ${this.y}px)`,
        left: this.left + "%",
        top: this.top + "vh",
      };
    },
  },
  created() {
    this.window = this.getWindowById(this.windowId);
  },
  methods: {
    dragmove(event) {
      this.x += event.dx;
      this.y += event.dy;
    },
    mouseup() {
      this.dragging = false;
    },
    mousedown() {
      this.dragging = true;
    },
    resizemove(event) {
      this.x += event.deltaRect.left;
      this.y += event.deltaRect.top;
      console.log(1);
    },
    setWindowActive() {
      this.$store.commit("SET_ZINDEX_WINDOW", this.windowId);
      this.$store.commit("SET_ACTVIE_WINDOW", this.windowId);
    },
    closeWindowActive(event) {
      event.stopPropagation();
      this.$store.commit("CLOSE_ACTVIE_WINDOW", this.windowId);
    },
    setMinimize(event) {
      event.stopPropagation();
      this.$store.commit("SET_WINDOW_STATE", {
        windowId: this.windowId,
        windowState: "minimize",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.interact {
  height: 60vh;
  width: 60vw;
  left: 20%;
  top: 17vh;
  z-index: 8;
  position: absolute;

  @media (max-width: 768px) {
    width: 90vw;
    left: 5%;
  }

  @media (max-width: 968px) {
    width: 80vw;
    left: 10%;
  }
}

.window {
  background: rgb(195, 195, 195);
  border-top: solid rgb(250, 250, 250) 2px;
  border-left: solid rgb(250, 250, 250) 2px;
  border-right: solid rgb(90, 90, 90) 1.5px;
  border-bottom: solid rgb(90, 90, 90) 1.5px;
  box-shadow: 1.5px 1.5px black;
  align-items: flex-end;
  outline: rgb(222, 222, 222) 1px solid;
  overflow: hidden;
  width: 100%;
  height: 100%;
  min-height: 60vh;

  &-toolbar {
    display: flex;
    height: 25px;
    width: auto;
    background: rgb(0, 0, 124);
    z-index: 10;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    margin: 2px;
    cursor: default;
    user-select: none;

    &-deactivated {
      background: rgb(123, 125, 123) !important;
    }

    &.moving {
      cursor: grabbing;
    }

    .triple-button {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .button-close {
        padding-bottom: 4px;
      }
      .button-expand,
      .button-close,
      .button-hide {
        background: rgb(195, 195, 195);
        border-top: solid rgb(250, 250, 250) 1px;
        border-left: solid rgb(250, 250, 250) 1px;
        border-right: solid rgb(90, 90, 90) 1px;
        border-bottom: solid rgb(90, 90, 90) 1px;
        box-shadow: 1px 1px black;
        height: 16px;
        width: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: bold;
        margin-right: 0.4rem;
        font-size: 1.2rem;
        cursor: pointer;

        &:active,
        &:active,
        &:active {
          border-radius: 0px;
          background: rgb(192, 192, 192);
          box-shadow: none;
          border-top: solid rgb(0, 0, 0) 1.5px;
          border-left: solid rgb(0, 0, 0) 1.5px;
          border-bottom: solid rgb(250, 250, 250) 1.5px;
          border-right: solid rgb(250, 250, 250) 1.5px;
        }

        span {
          line-height: 1.35;
          margin-top: -3px;
        }
      }
    }
  }

  &-content {
    padding: 0.5rem;
    width: 100%;
    height: calc(100% - 25px);
    overflow-y: auto;
  }
}
</style>
