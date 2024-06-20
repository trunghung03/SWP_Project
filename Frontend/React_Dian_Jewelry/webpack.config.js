const path = require("path");
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: "./src/index.js", //entry chính là input.
  output: { // như cái tên gọi của nó, đây chính là output.
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle.js"
  },
  plugins: [
    new Dotenv()
  ],
  resolve: {
    // ...
    // add the fallback setting below 
    fallback: {
      "fs": false,
      "os": false,
      "path": false
    }

  }
}
