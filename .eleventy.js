module.exports = function (eleventyConfig) {
  // Output directory: _site

  eleventyConfig.addFilter("tagUrl", function (tag) {
    return `../../tags/${tag.toLowerCase()}`;
  });

  eleventyConfig.addCollection("posts", function (collectionApi) {
    // get unsorted items
    const posts = collectionApi
      .getAll()
      .filter((i) => i.data.layout == "post.njk");
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
