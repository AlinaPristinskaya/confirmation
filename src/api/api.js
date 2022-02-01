import axios from "axios";
// eslint-disable-next-line no-undef
axios.defaults.baseURL = settings.url;
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
