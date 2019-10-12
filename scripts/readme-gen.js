const { generateMD } = require("readme-jsx");

generateMD("./README.jsx").then(() => {
  console.log("README.md generated !");
  process.exit();
});
