<template>
  <div class="logo">
    <el-image
      style="max-height: 133px; height: 100%; object-fit: cover"
      :src="url"
      fit="fit"
      class="img"
    ></el-image>
  </div>
</template>

<script>
export default {
  name: "Logo",
  data: () => ({
    url: require("../assets/img.svg"),
  }),
};
</script>

<style lang="scss" scoped>
.logo {
  padding: 0;
  margin: 0;
  align-items: flex-start;
  background-color: white;
}
.img {
  display: block;
  background: white;

  @media (max-width: 400px) {
    height: 100px;
    width: 100px;
  }
}
</style>
