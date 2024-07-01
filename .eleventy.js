const { execSync } = require('child_process')
const pluginRss = require('@11ty/eleventy-plugin-rss');
// const lazyImagesPlugin = require('eleventy-plugin-lazyimages');
const embedEverything = require('eleventy-plugin-embed-everything');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const formatFiles = require('./utils/formatFiles');
const eleventyPluginHtmlValidate = require('eleventy-plugin-html-validate');
const eleventyPluginCookLang = require('eleventy-plugin-cooklang')


module.exports = function (eleventyConfig) {
  eleventyConfig.on('eleventy.before', () => {
    console.warn('⚠️⚠️⚠️ Deleting _site folder ⚠️⚠️⚠️')
    execSync('rm -rf ./_site')
  });

  eleventyConfig.addPlugin(pluginRss);
  // eleventyConfig.addPlugin(lazyImagesPlugin);
  eleventyConfig.addPlugin(embedEverything);
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addFilter('cacheBust', function (url = "") {
    return `${url}?v=${Date.now()}`;
  });

  eleventyConfig.addFilter('tagUrl', function (tag = "", type = "post") {
    if (type === 'post') return `/tags/${tag.toLowerCase()}`;
    if (type === 'recipe') return `/recipe-tags/${tag.toLowerCase()}`;
  });

  eleventyConfig.addFilter('formatTag', function (tag = "") {
    const lowercaseTag = `${tag.toLowerCase()}`;
    if (lowercaseTag === 'ios') return 'iOS';
    if (['css', 'html'].includes(lowercaseTag)) return lowercaseTag.toUpperCase();
    return lowercaseTag.slice(0, 1).toUpperCase() + lowercaseTag.slice(1);
  });

  eleventyConfig.addFilter("sliceArr", function (arr, count) {
    return arr.slice(0, count);
  });


  // COLLECTIONS ====

  eleventyConfig.addCollection('posts', function (collectionApi) {
    return collectionApi
      .getAll()
      .filter((i) => i.data.layout == 'pages/post.njk')
      .sort((postA, postB) => {
        return postA.date - postB.date
      });
  });

  eleventyConfig.addCollection('recipes', function (collectionApi) {
    return collectionApi
      .getAll()
      .filter((i) => i.data.layout == 'pages/recipe.njk')
      .sort((recipeA, recipeB) => {
        return recipeA.date - recipeB.date
      });
  });

  eleventyConfig.addCollection('hobbies', function (collectionApi) {
    return collectionApi
      .getAll()
      .filter((i) => i.data.page.inputPath.includes('/hobbies/'))
      .filter((i) => !i.data.page.inputPath.includes('/hobbies/index') && !i.data.page.inputPath.includes('/hobbies/recipes'))
      .sort((pageA, pageB) => {
        return pageA.date - pageB.date
      });
  });

  eleventyConfig.addCollection('recentPosts', function (collectionApi) {
    return collectionApi
      .getAll()
      .filter((i) => i.data.layout == 'pages/post.njk')
      .sort((postA, postB) => {
        return (postA.date - postB.date) * -1
      }).slice(0, 10);
  });

  // WATCHES ====

  eleventyConfig.addWatchTarget('css/*');
  eleventyConfig.addWatchTarget('js/*');
  eleventyConfig.addWatchTarget('assets/*');
  eleventyConfig.addWatchTarget('utils/*');

  // FILE COPIES ====

  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addPassthroughCopy('css');
  eleventyConfig.addPassthroughCopy('js');
  eleventyConfig.addPassthroughCopy('playground');


  // SHORTCODES ====

  eleventyConfig.addShortcode(
    'extLink',
    (url, text) =>
      `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`
  );

  eleventyConfig.addShortcode(
    'booktag',
    (tagArr) => {
      function getTagHtml(tag = "") {
        const className = `book-tag-${tag.toLowerCase().replace("'", "").replace(/\ /g, "-")}`
        const label = tag.replace(/\-/g, ' ')
        return `<span class="book-tag ${className}">${label}</span>`
      }

      if (Array.isArray(tagArr)) {
        let html = '';
        tagArr.forEach((tag) => {
          if (tag !== 'Reading') {
            html += getTagHtml(tag);
          }
        });
        return html;
      } else if (typeof tagArr === 'string') {
        if (tag !== 'Reading') {
          return getTagHtml(tagArr);
        }
      }
      return '';
    }
  );

  eleventyConfig.addPairedShortcode("note", function (content, title) {
    return `<div class="note">
      <div class="note-title">${title}</div>${content}
      </div>`;
  });


  // PLUGINS ====

  eleventyConfig.addPlugin(formatFiles);
  // eleventyConfig.addPlugin(eleventyPluginHtmlValidate);
  eleventyConfig.addPlugin(eleventyPluginCookLang, { limitIngredientDecimals: 2 });
};
