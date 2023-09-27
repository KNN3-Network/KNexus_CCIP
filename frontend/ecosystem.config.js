module.exports = {
  apps: [
    {
      name: "K.Transformer-client",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
