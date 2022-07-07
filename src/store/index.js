import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    zIndex: 2,
    activeWindow: "",
    activeWindows: [],
    windowList: [
      {
        windowId: "hello",
        windowState: "open",
        windowTitle: "Title",
        windowContent: "Content...",
        windowIcon: "icon-biography",
        windowFullscreen: false,
      },
      {
        windowId: "www",
        windowState: "open",
        windowTitle: "WWW",
        windowContent: "Content WWW...",
        windowIcon: "icon-document",
        windowFullscreen: false,
      },
    ],
  },
  getters: {
    getWindowById(state) {
      return (window) => {
        return state.activeWindows.find((x) => x.windowId == window);
      };
    },
    activeWindow(state) {
      return state.activeWindow;
    },
    activeWindows(state) {
      return state.activeWindows;
    },
    windowList(state) {
      return state.windowList;
    },
  },
  mutations: {
    SET_ZINDEX_WINDOW(state, window) {
      state.zIndex += 1;
      document.getElementById(window).style.zIndex = state.zIndex;
    },
    SET_ACTVIE_WINDOW(state, window) {
      state.activeWindow = window;
    },
    PUSH_ACTVIE_WINDOW(state, window) {
      const findedWindow = state.activeWindows.find(
        (x) => x.windowId == window.windowId
      );
      if (!findedWindow) {
        state.activeWindows.push(window);
      }
    },
    CLOSE_ACTVIE_WINDOW(state, window) {
      const filtered = state.activeWindows.filter(
        (item) => item.windowId !== window
      );
      state.activeWindows = filtered;
    },
    SET_WINDOW_STATE(state, payload) {
      if (payload.windowState != "maximize") {
        const updated = state.activeWindows.map((x) =>
          x.windowId == payload.windowId
            ? { ...x, windowState: payload.windowState }
            : x
        );
        state.activeWindows = updated;
      } else {
        const updated = state.activeWindows.map((x) => {
          return x.windowId == payload.windowId
            ? { ...x, windowFullscreen: !x.windowFullscreen }
            : x;
        });
        state.activeWindows = updated;
      }
      if (payload.windowState == "open") {
        this.commit("SET_ZINDEX_WINDOW", payload.windowId);
      } else if (payload.windowState == "minimize") {
        const filteredActives = state.activeWindows.filter(
          (x) => x.windowState != "minimize"
        );
        this.commit(
          "SET_ACTVIE_WINDOW",
          filteredActives.length > 0 ? filteredActives[0].windowId : ""
        );
      }
    },
  },
  actions: {},
  modules: {},
});
