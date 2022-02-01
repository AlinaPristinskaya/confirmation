const path = require("path");
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/confirm/" : "/",
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/"),
        "@varscss": path.resolve(
          __dirname,
          "./src/assets/scss/_variables.scss"
        ),
      },
    },
  },
};
