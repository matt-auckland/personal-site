const prettier = require("prettier");

module.exports = function (eleventyConfig, config) {
  eleventyConfig.addTransform("prettify-files", function (content, outputPath) {
    if (outputPath.match(/\.(html|css|js)$/)) {
      content = prettier.format(content, { filepath: outputPath })
    }
    return content;
  });
}