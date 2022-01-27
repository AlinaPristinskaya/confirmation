<template>
  <div class="logo">
    <img src="../assets/img.svg" alt="Vue Logo" class="img" />
  </div>
</template>

<script>
export default {
  name: "Logo",
};
</script>

<style lang="scss" scoped>
.logo {
  padding: 0;
  margin: 0;
  align-items: flex-start;
}
.img {
  display: block;
  background: white;

  @media (max-width: 400px) {
    height: 70px;
    width: 70px;
  }
}
</style>
