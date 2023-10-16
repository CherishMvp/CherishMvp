module.exports = {
  apps: [
    {
      name: "vue-show",
      script: "./server/index.js",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};