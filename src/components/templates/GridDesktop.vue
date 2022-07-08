<template>
  <div class="grid">
    <button
      class="grid-item"
      v-for="window in windowList"
      @dblclick="setActiveWindow(window, $event)"
      :key="window.windowId"
    >
      <i class="icon" :class="window.windowIcon"></i>
      <div class="border">
        <span class="icon-text">{{ window.windowTitle }}</span>
      </div>
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["windowList"]),
  },
  methods: {
    setActiveWindow(window, e) {
      e.stopPropagation();
      this.$store.commit("PUSH_ACTIVE_WINDOW", window);
      this.$store.commit("SET_ACTIVE_WINDOW", window.windowId);
      setTimeout(() => {
        this.$store.commit("SET_WINDOW_STATE", {
          windowId: window.windowId,
          windowState: "open",
        });
      }, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.grid {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 10px;
  padding-left: 10px;
  padding-top: 10px;
  height: calc(100% - 4rem);
  width: 0;

  &-item {
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 1.2rem;
    color: white;
    padding: 10px;
    background: none;
    border: none;
    outline: inherit;
    cursor: pointer;
    user-select: none;

    &:focus .border {
      border: rgb(255, 255, 148) dotted 1px;
    }
    &:focus .icon {
      filter: grayscale(100%) brightness(30%) sepia(100%) hue-rotate(-180deg)
        saturate(400%) contrast(0.9);
    }
    &:focus .icon-text {
      background: rgb(0, 0, 118);
    }

    & .icon {
      width: 30px;
      max-height: 30px;
      min-height: 30px;
      margin-bottom: 8px;
    }
  }
}
</style>
