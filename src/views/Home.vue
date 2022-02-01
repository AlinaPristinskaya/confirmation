<template>
  <div class="main">
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
    <div class="content _container">
      <div v-if="error">
        <el-alert
          class="alert"
          title="Помилка"
          description="uid не знайдено, відповідь success:false"
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
      <div class="content" v-if="!error && !choice">
        <form @submit="submit">
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
      dataClient: null,
      error: false,
      choice: false,
      telephone: "(044) 501-11-88",
      email: "client@kovalska.com",
    };
  },
  created() {
    this.getDataClient();
  },

  methods: {
    async getDataClient() {
      if (!this.uid) {
        this.error = true;
      }
      await api
        .fetchTrackingInfo(this.key, "checkUID", this.uid)
        .then((resp) => {
          if (resp.data.success === false || resp.data.data.length === 0) {
            this.error = true;
          } else {
            //тест
            // this.dataClient = {
            //   number: "1x1",
            //   deliveryDateTime: "11:18 27.01.2022",
            //   prod_name: "Смесь1",
            //   volume: "23.00",
            //   product_speed: "0.00",
            // };
            this.dataClient = resp.data.data[0];
          }
        })
        .catch((e) => {
          this.$message({
            message: `Помилка відправлення відповіді`,
            type: "warning",
          });
          console.log("e", e);
        });
    },

    submit() {
      api
        .fetchTrackingInfo(this.key, "confirm", this.uid, this.status)
        .then((resp) => {
          if (!resp.data.success) {
            this.$message({
              message: `Замовлення недоступне для підтвердження`,
              type: "warning",
            });
          } else {
            this.choice = true;
            return;
          }
        })
        .catch((e) => {
          this.$message({
            message: `Помилка відправлення відповіді`,
            type: "warning",
          });
          console.log("e", e);
        });
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
  width: 100%;
}
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  background: $--color-header;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 50px;
  &__content {
    padding-right: 20px;
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
/* .radioBtn {
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
  white-space: nowrap;
  @media (max-width: 570px) {
    font-size: 14px;
  }
} */
.btn {
  position: relative;
  display: inline-block;
  background: $--color-header;
  color: white;
  margin-top: 40px;
  left: 50%;
  transform: translate(-50%, 0);
}
.footer {
  font-size: 14px;
  padding: 10px;
  width: 60%;
  align-self: flex-end;
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
  background: $--color-header;
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
</style>
