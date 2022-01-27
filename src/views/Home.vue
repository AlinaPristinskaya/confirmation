<template>
  <div class="main">
    <div class="header">
      <Logo />
      <div class="_container">
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
        <div class="back">
          <p>Номер замовлення:</p>
          <p>141</p>
          <br />
          <p>15:00 21.01.2022p</p>
          <p>300 м<sup>3</sup> по 100 м<sup>3</sup>/год</p>
        </div>
      </div>
    </div>
    <div class="content _container">
      <div v-if="!error">
        <el-alert
          class="alert"
          title="Ошибка"
          description=" uid незнайдено, ответ succeses:false"
          type="error"
          effect="dark"
          v-bind:show-icon="true"
        >
        </el-alert>
      </div>
      <div class="content" v-if="choice">
        <el-alert
          description="Відправлено"
          type="success"
          effect="dark"
          v-bind:show-icon="true"
          class="alert"
        >
        </el-alert>
      </div>
      <div class="content" v-if="error && !choice">
        <form @submit="submit">
          <div>
            <label for="one" class="label">
              <input
                type="radio"
                id="one"
                value="1"
                v-model="status"
                class="radioBtn"
              /><span class="icon"></span>
              Підтвердити*
            </label>
            <br />

            <!-- <label for="two" class="label">
            <input
              type="radio"
              id="two"
              value="2"
              v-model="status"
              class="radioBtn"
            /><span class="icon"></span>
            Скасувати
          </label>
          <br /> -->

            <label for="three" class="label">
              <input
                type="radio"
                id="three"
                value="2"
                v-model="status"
                class="radioBtn"
              /><span class="icon"></span>
              Зателефонуйте мені
            </label>
            <br />
            <button @click.prevent="submit" type="submit" class="btn">
              Відправити
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="footer _container">
      <p>
        *Oчікуйте на додаткове повідомлення, коли відвантаження розпочнеться.
        Читайте, переходьте за посиланням та натискайте на міксер, щоб завжди
        мати актуальну інформацію про деталі кожної доставки!
      </p>
    </div>
  </div>
</template>

<script>
import api from "../api/api";
import Logo from "../components/Logo.vue";

export default {
  name: "Home",
  components: { Logo },
  data() {
    return {
      picked: null,
      key: "D3C6D997-8CBE-42CA-81FC-EE56DA3F4418",
      uid: this.$route.params.uid,
      func: "checkUID",
      status: "1",
      error: "false",
      choice: "false",
      telephone: "(044) 501-11-88",
      email: "client@kovalska.com",
    };
  },
  async created() {
    this.choice = false; //Эту строку надо удалить
    const { data } = await api.fetchTrackingInfo(
      this.key,
      "checkUID",
      this.uid
    );
    if (data.success === false) {
      this.error = true;
    }
  },

  methods: {
    submit() {
      api.fetchTrackingInfo(this.key, "confirm", this.uid, this.status);
      this.choice = true;
    },
    open() {
      this.$alert(
        `<strong> <a href="tel: +38${this.telephone}" class="tell"><i class="el-icon-phone"></i>${this.telephone}</a></strong>\n
                 <strong><a href="mailto:${this.email}" class="mail"><i class="el-icon-message"></i>${this.email}</a></strong>`,
        "Контакты",
        {
          dangerouslyUseHTMLString: true,
          distinguishCancelAndClose: true,
          showConfirmButton: false,
          cancelButtonText: "Отмена",
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
@import "../assets/scss/_reset.scss";
.phone {
  align-self: center;
}
.alert {
  padding: 10px;
  width: 200px;
}
.main {
  width: 100%;
}
.header {
  display: flex;
  background: $bg;
  justify-content: space-between;
  margin-bottom: 50px;
}
.back {
  color: #fff;
  font-size: 16px;
  padding: 20px;
  text-align: right;
  vertical-align: super;
  @media (max-width: 400px) {
    font-size: 12px;
    padding: 5px;
  }
}
.content {
  display: flex;
  flex-direction: column;
  color: black;
  padding: 0 20px;
  margin: 0 auto;
}
.radioBtn {
  margin: 5px 10px;
  appearance: none;
}
.icon {
  content: "";
  display: inline-block;
  width: 14px;
  height: 14px;
  background-color: red;
  border-radius: 20px;
  margin-right: 5px;
  margin-left: -20px;
  border: 4px solid;
  border-color: red;
}
.radioBtn:checked + .icon {
  background-color: white;
}
.label {
  display: block;
  padding-left: 20px;
}
.btn {
  position: relative;
  display: inline-block;
  background: red;
  color: white;
  padding: 8px 8px;
  border-radius: 6px;
  border: none;
  font-size: 20px;
  margin-top: 40px;
  text-align: center;
  left: 50%;
  transform: translate(-50%, 0);
}
.footer {
  position: absolute;
  bottom: 10px;
  font-size: 14px;
  right: 0;
  padding: 10px;
  width: 60%;
}
</style>
