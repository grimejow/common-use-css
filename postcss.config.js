module.exports = {
  plugins: [
      require('autoprefixer')({
          "overrideBrowserslist": [
              "last 2 versions",
              "> 1%",
              "last 3 iOS versions",
              "not dead"
          ]
      })
  ]
};