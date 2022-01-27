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
  async created() {
    this.getDataClient();
    console.log("dataClient", typeof this.dataClient.product_speed);
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
          } // test commit
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
  width: 200px;
}
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  background: red;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 50px;
  &__content {
    padding: 0 10px;
  }
}
.back {
  color: #fff;
  font-size: 16px;
  padding: 20px;
  text-align: right;
  vertical-align: super;
  @media (max-width: 400px) {
    font-size: 10px;
    padding: 5px;
  }
}
.content {
  display: flex;
  flex-direction: column;
  color: black;
  padding: 0 20px;
  margin: 0 auto;
  flex: 1 1 100%;
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
  white-space: nowrap;
  @media (max-width: 570px) {
    font-size: 14px;
  }
}
.btn {
  position: relative;
  display: inline-block;
  background: red;
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
</style>
