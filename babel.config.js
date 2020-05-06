module.exports = {
  // ...
  plugins: [
    // ... other plugins
    [
      'babel-plugin-module-resolver',
      {
        root: './',
        alias: {
          "components": "./src/components",
          "hooks": "./src/hooks",
          "stores": "./src/stores",
          "types": "./src/types",
          "utils": "./src/utils"
        },
      },
    ],
  ],
}
