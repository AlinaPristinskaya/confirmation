<template>
  <form>
    <div>
      <input
        v-model="status"
        type="radio"
        class="custom-checkbox"
        id="happy1"
        name="happy"
        value="1"
      />
      <label for="happy1" class="labelNew">Підтвердити*</label>
      <br />
      <input
        v-model="status"
        type="radio"
        class="custom-checkbox"
        id="happy2"
        name="happy"
        value="2"
      />
      <label for="happy2" class="labelNew">Зателефонуйте мені</label>

      <br />
      <el-button @click.prevent="submit" type="submit" class="btn">
        Відправити
      </el-button>
    </div>
  </form>
</template>

<script>
export default {
  name: "Form",
  data() {
    return {
      status: "2",
    };
  },
  methods: {
    submit() {
      this.$emit("submit", {
        status: this.status,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";
.btn {
  position: relative;
  display: inline-block;
  background: $--color-header;
  color: white;
  margin-top: 40px;
  left: 50%;
  transform: translate(-50%, 0);
}
.custom-checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
.custom-checkbox + label {
  display: inline-flex;
  align-items: center;
  user-select: none;
}
.custom-checkbox + label::before {
  content: "";
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  flex-grow: 0;
  border: 4px solid $--color-header;
  background-color: $--color-header;
  border-radius: 25px;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
}
.custom-checkbox:checked + label::before {
  border-color: $--color-header;
  background-color: $--color-white;
}
.labelNew {
  display: block;
  padding-left: 20px;
  white-space: nowrap;
  @media (max-width: 570px) {
    font-size: 14px;
  }
}
.content {
  display: flex;
  flex-direction: column;
  color: black;
  padding: 0 20px;
  margin: 0 auto;
  flex: 1 1 100%;
  & .labelNew:not(:last-child) {
    padding-top: 30px;
  }
}
</style>
