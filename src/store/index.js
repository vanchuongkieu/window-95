import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeWindow: "hello",
    activeWindows: [
      {
        windowId: "hello",
        windowTitle: "Title",
        windowContent: "Content...",
        windowIcon: "icon-window",
      },
      {
        windowId: "www",
        windowTitle: "WWW",
        windowContent: "Content WWW...",
        windowIcon: "icon-window",
      },
    ],
  },
  getters: {
    activeWindow(state) {
      return state.activeWindow;
    },
    activeWindows(state) {
      return state.activeWindows;
    },
  },
  mutations: {
    SET_ACTVIE_WINDOW(state, window) {
      state.activeWindow = window;
    },
    CLOSE_ACTVIE_WINDOW(state, window) {
      const filtered = state.activeWindows.filter(
        (item) => item.windowId !== window
      );
      state.activeWindows = filtered;
    },
  },
  actions: {},
  modules: {},
});
