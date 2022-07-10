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

a {
  text-decoration: none;
  outline: none;
}

.button {
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

  &-content {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem;
    font-weight: 700;
  }
  font-size: 1rem;

  span {
    width: calc(100% - 18px);
    margin-bottom: -0.2rem;
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
    text-align: left;
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
}
</style>
