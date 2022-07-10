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
        windowId: "biography",
        windowState: "close",
        windowTitle: "Biography",
        windowContent: "ProfileFolder",
        windowComponent: "WindowDesktop",
        windowIcon: "icon-biography",
        windowFullscreen: false,
      },
      {
        windowId: "documents",
        windowState: "close",
        windowTitle: "My Documents",
        windowContent: "DocumentFolder",
        windowComponent: "WindowDesktop",
        windowIcon: "icon-document",
        windowFullscreen: false,
      },
    ],
    startMenuActive: false,
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
    startMenuActive(state) {
      return state.startMenuActive;
    },
  },
  mutations: {
    START_MENU_ACTIVE(state, active) {
      state.startMenuActive = active;
    },
    SET_ZINDEX_WINDOW(state, windowId) {
      state.zIndex += 1;
      document.getElementById(windowId).style.zIndex = state.zIndex;
    },
    SET_ACTIVE_WINDOW(state, window) {
      state.activeWindow = window;
    },
    PUSH_ACTIVE_WINDOW(state, payload) {
      const findedWindow = state.activeWindows.find(
        (window) => window.windowId == payload.windowId
      );
      if (!findedWindow) {
        state.activeWindows.push(payload);
      }
    },
    CLOSE_ACTIVE_WINDOW(state, windowId) {
      const filtered = state.activeWindows.filter(
        (item) => item.windowId != windowId
      );
      state.activeWindows = filtered;
      if (state.activeWindows.length == 0) {
        state.zIndex = 2;
      }
    },
    UPDATE_ACTIVE_WINDOW(state, payload) {
      const updated = state.activeWindows.map((window) =>
        window.windowId == payload.windowId ? payload : window
      );
      state.activeWindows = updated;
    },
    SET_FULLSCREEN_WINDOW(state, payload) {
      const updated = state.activeWindows.map((window) =>
        window.windowId == payload.windowId
          ? { ...window, windowFullscreen: payload.windowFullscreen }
          : window
      );
      state.activeWindows = updated;
    },
    SET_WINDOW_STATE(state, payload) {
      const window = state.activeWindows.find(
        (window) => window.windowId == payload.windowId
      );

      if (payload.windowState == "open") {
        window.windowState = payload.windowState;
        setTimeout(() => {
          this.commit("SET_ZINDEX_WINDOW", payload.windowId);
        }, 1);
      } else if (payload.windowState == "maximize") {
        this.commit("SET_FULLSCREEN_WINDOW", {
          windowId: window.windowId,
          windowFullscreen: !window.windowFullscreen,
        });
      } else if (payload.windowState == "minimize") {
        window.windowState = payload.windowState;
        const actives = state.activeWindows.find(
          (window) => window.windowState != "minimize"
        );
        this.commit("SET_ACTIVE_WINDOW", actives ? actives.windowId : "");
      }
    },
  },
  actions: {},
  modules: {},
});
