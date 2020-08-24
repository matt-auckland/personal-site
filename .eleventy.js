const fs = require("fs");

module.exports = function (eleventyConfig) {
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

  // Output directory: _site

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

  // Copy `img/` to `_site/img`
  eleventyConfig.addPassthroughCopy("assets");

  // Copy `css/fonts/` to `_site/css/fonts`
  // If you use a subdirectory, it’ll copy using the same directory structure.
  // eleventyConfig.addPassthroughCopy("css/fonts");

  eleventyConfig.addShortcode(
    "extLink",
    (url, text) =>
      `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`
  );
};
