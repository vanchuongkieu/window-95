<template>
  <div class="resume-content">
    <div class="resume-content-button">
      <a
        href="/files/kieuvanchuong-intern-reactjs.pdf"
        class="button"
        style="z-index: 10"
        download
        target="_blank"
      >
        <div class="button-content">
          <i class="icon icon-file"></i>
          <span>Download</span>
        </div>
      </a>

      <a
        href="/files/kieuvanchuong-intern-reactjs.pdf"
        class="button"
        style="z-index: 10"
        target="_blank"
      >
        <div class="button-content">
          <i class="icon icon-file-internet"></i>
          <span>Open In New Tab</span>
        </div>
      </a>
    </div>
    <iframe
      class="frame"
      src="https://drive.google.com/file/d/1XDeLJS8mmiRKKXW6sRm7qX_IkeSAfcgp/preview"
    ></iframe>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.resume-content {
  height: 100%;

  &-button {
    display: flex;
    gap: 10px;
    height: 3.5rem;
    justify-content: flex-start;
    padding-bottom: 0.5rem;
  }

  & .frame {
    width: 100%;
    height: calc(100% - 3.5rem);
  }
}
</style>
