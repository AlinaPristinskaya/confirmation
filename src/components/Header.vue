<template>
  <div class="header">
    <Logo />
    <div class="header__content _container">
      <div class="phone">
        <el-button
          icon="el-icon-phone"
          type="primary"
          plain
          circle
          @click="open"
        >
        </el-button>
      </div>
      <div v-if="dataClient" class="back">
        <p>Номер замовлення:</p>
        <p>{{ dataClient.number }}</p>
        <br />
        <p>{{ dataClient.deliveryDateTime }}</p>
        <p>{{ dataClient.prod_name }}</p>
        <p>
          {{ dataClient.volume }} м<sup>3</sup>
          <span v-if="+dataClient.product_speed">
            по {{ dataClient.product_speed }} м<sup>3</sup>/год
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "./Logo.vue";
export default {
  name: "Header",
  components: { Logo },
  props: {
    dataClient: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      telephone: "(044) 501-11-88",
      email: "client@kovalska.com",
    };
  },
  methods: {
    open() {
      this.$alert(
        `<strong> <a href="tel: +38${this.telephone}" class="tell"><i class="el-icon-phone"></i>${this.telephone}</a></strong>\n
                 <strong><a href="mailto:${this.email}" class="mail"><i class="el-icon-message"></i>${this.email}</a></strong>`,
        "Контакти",
        {
          dangerouslyUseHTMLString: true,
          distinguishCancelAndClose: true,
          showConfirmButton: false,
          cancelButtonText: "Відмінити",
          showClose: true,
          showCancelButton: true,
          closeOnClickModal: true,
          customClass: "modal-contact",
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";
.header {
  display: flex;
  background: $--color-header;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 50px;
  &__content {
    padding-right: 20px;
    margin: 0px;
  }
}
.back {
  color: #fff;
  font-size: 16px;
  padding: 10px 0px 10px 0;
  text-align: right;
  vertical-align: super;
  white-space: nowrap;
  margin: auto;
  @media (max-width: 500px) {
    font-size: 12px;
    padding: 5px 0px 5px 0;
  }
}
.phone {
  align-self: center;
}
</style>
