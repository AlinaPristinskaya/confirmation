<template>
  <div class="main">
    <Header :dataClient="dataClient" />
    <div class="content _container">
      <div v-if="loading" v-loading="loading">
        <element-loading-spinner></element-loading-spinner>
      </div>

      <div v-if="error && !loading">
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
      <div class="content" v-if="error && !choice && !loading">
        <Form @submit="submit" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import api from "../api/api";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Form from "../components/Form.vue";

export default {
  name: "Home",
  components: {
    Header,
    Footer,
    Form,
  },

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
      loading: false,
    };
  },
  created() {
    this.getDataClient();
  },

  methods: {
    async getDataClient() {
      if (!this.uid) {
        this.error = true;
      } else {
        this.loading = true;
        await api
          .fetchTrackingInfo(this.key, "checkUID", this.uid)
          .then((resp) => {
            this.loading = false;
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
      }
    },

    submit({ status }) {
      this.status = status;
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
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";
@import "../assets/scss/_reset.scss";

.alert {
  padding: 20px;
  width: 100%;
}
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.content {
  display: flex;
  flex-direction: column;
  color: black;
  padding: 0 20px;
  margin: 0 auto;
  flex: 1 1 100%;
}
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
  line-height: 16px;
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
</style>
