const fs = require('fs');
const { exec } = require('child_process');

const pluginRss = require('@11ty/eleventy-plugin-rss');
// const lazyImagesPlugin = require('eleventy-plugin-lazyimages');
const embedEverything = require('eleventy-plugin-embed-everything');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const formatFiles = require('./utils/formatFiles');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  // eleventyConfig.addPlugin(lazyImagesPlugin);
  eleventyConfig.addPlugin(embedEverything);
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware('*', (req, res) => {
          const content_404 = fs.readFileSync('_site/404.html');
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

  eleventyConfig.addFilter('cacheBust', function (url = "") {
    return `${url}?v=${Date.now()}`;
  });

  eleventyConfig.addFilter('tagUrl', function (tag) {
    return `../../tags/${tag.toLowerCase()}`;
  });
  
  eleventyConfig.addFilter('formatTag', function (tag) {
    const lowercaseTag = `${tag.toLowerCase()}`;
    if (lowercaseTag === 'ios') return 'iOS';
    return lowercaseTag.slice(0,1).toUpperCase() +  lowercaseTag.slice(1);
  });

  eleventyConfig.addFilter("sliceArr", function(arr, count) {
    return arr.slice(0, count);
  });


  eleventyConfig.addCollection('posts', function (collectionApi) {
    return collectionApi
      .getAll()
      .filter((i) => i.data.layout == 'pages/post.njk')
      .sort((postA, postB) => {
        return postA.date - postB.date
      });
  });

  eleventyConfig.addCollection('recentPosts', function (collectionApi) {
    return collectionApi
      .getAll()
      .filter((i) => i.data.layout == 'pages/post.njk')
      .sort((postA, postB) => {
        return (postA.date - postB.date) * -1
      }).slice(0,5);
  });

  eleventyConfig.addWatchTarget('css/*');
  eleventyConfig.addWatchTarget('js/*');
  eleventyConfig.addWatchTarget('assets/*');

  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addPassthroughCopy('css');
  eleventyConfig.addPassthroughCopy('js');

  eleventyConfig.addShortcode(
    'extLink',
    (url, text) =>
      `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`
  );

  eleventyConfig.addShortcode(
    'booktag',
    (tagArr) => {
      function getTagHtml(tag) {
        return `<span class="book-tag book-tag-${tag.toLowerCase().replace("'", "").replace(/\ /g, "-")}">${tag.replace(/\-/g, ' ')}</span>`
      }

      if (Array.isArray(tagArr)) {
        let html = '';
        tagArr.forEach((tag) => {
          html += getTagHtml(tag);
        });
        return html;
      } else if (typeof tagArr === 'string') {
        return getTagHtml(tagArr);
      }
      return '';
    }
  );

  eleventyConfig.addPairedShortcode("note", function(content, title) { 
      return `<div class="note">
      <div class="note-title">${title}</div>${content}
      </div>`;
  });


  eleventyConfig.on('afterBuild', formatFiles);
};
