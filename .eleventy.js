const fs = require("fs");
const { exec } = require("child_process");

const pluginRss = require("@11ty/eleventy-plugin-rss");
const lazyImagesPlugin = require("eleventy-plugin-lazyimages");
const embedEverything = require("eleventy-plugin-embed-everything");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(lazyImagesPlugin);
  eleventyConfig.addPlugin(embedEverything);

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware("*", (req, res) => {
          const content_404 = fs.readFileSync("_site/404.html");
          // Provides the 404 content without redirect.
          res.write(content_404);
          // Add 404 http status code in request header.
          // res.writeHead(404, { "Content-Type": "text/html" });
          res.writeHead(404);
          res.end();
        });
      },
    },
  });

  eleventyConfig.addFilter("tagUrl", function (tag) {
    return `../../tags/${tag.toLowerCase()}`;
  });

  eleventyConfig.addCollection("posts", function (collectionApi) {
    // get unsorted items
    const posts = collectionApi
      .getAll()
      .filter((i) => i.data.layout == "pages/post.njk");
    return posts;
  });

  eleventyConfig.addWatchTarget("css/*");
  eleventyConfig.addWatchTarget("js/*");
  eleventyConfig.addWatchTarget("assets/*");

  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");

  eleventyConfig.addShortcode(
    "extLink",
    (url, text) =>
      `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`
  );

    // eleventyConfig.on('afterBuild', () => {
    //   exec('npx prettier "./_site/**/*.{html,js,css}" --write', function(err, stdout, stderr) {
    //     if (err || stdout || stderr) console.log("eleventy-plugin-prettier logs:")
    //     err && console.log(err);
    //     stdout && console.log(stdout);
    //     stderr && console.log(stderr);
    //   });
    // });
};
