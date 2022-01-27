import axios from "axios";
axios.defaults.baseURL = process.env.VUE_APP_HTTP;
export default {
  fetchTrackingInfo(key, func, uid, status) {
    return axios.get(`index.php`, {
      params: {
        key,
        func,
        uid,
        status,
      },
    });
    /*  .then((response) => {
        console.log(response);
        return response;
      }); */
  },
};
