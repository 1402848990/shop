const path = require("path");
module.exports = (context) => {
  const { webpack } = context;
  // webpack config
  return {
    devServer: {
      port: 5555,
      sockHost: "http://localhost:5555/",
      sockPort: 5555,
      disableHostCheck: true,
      open: false,
      hot: false,
    },
    resolve: {
      alias: {
        services: path.resolve(__dirname, "src/services"),
        common: path.resolve(__dirname, "src/common"),
        components: path.resolve(__dirname, "src/components"),
        request: path.resolve(__dirname, "request"),
        pages: path.resolve(__dirname, "src/pages"),
        config: path.resolve(__dirname, "config"),
      },
    },
  };
};

// module.exports = () => {
//   return {
//     //...
//     resolve: {
//       alias: {
//         services: path.resolve(__dirname, 'src/services'),
//       },
//     },
//   };
// }
