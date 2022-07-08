<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./assets/icons/icons.scss";

@font-face {
  font-family: "Windows 95";
  src: url("@/assets/fonts/w-95-sans-serif.woff2") format("woff2"),
    url("@/assets/fonts/w-95-sans-serif.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}

* {
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
.h1,
.h2,
.h3,
.h4,
.h5,
.h6 {
  font-family: "Windows 95", sans-serif;
  font-weight: 400;
}

body {
  margin: 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: left;
  line-height: 1.5;
  background-color: #fff;
  text-rendering: optimizeLegibility;
}

::-webkit-scrollbar-thumb {
  background: #bdbebd;
  border-top: 1.5px solid #fafafa;
  border-left: 1.5px solid #fafafa;
  border-bottom: 1.5px solid #5a5a5a;
  border-right: 1.5px solid #5a5a5a;
  outline: #dbdbdb;
}

::-webkit-scrollbar {
  width: 15px;
  background: repeating-conic-gradient(#bdbebd 0 25%, #fff 0 50%) 50%/2px 2px;
}
</style>
