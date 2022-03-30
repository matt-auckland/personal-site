---
title: Validating my Eleventy Blog's HTML
date: 2022-03-30

tags:
  - HTML
  - Eleventy
  - Project
---

<div class="note"><div class="note-title">Note</div>This is just a quick write up, I'll probably edit this post later to make it nicer to read</div>

So the other night, I was reading an article on {% extLink "https://css-tricks.com/write-html-the-html-way-not-the-xhtml-way/" "CSS tricks" %} about writing HTML vs XHTML (why not?), and that linked off to another
{% extLink "https://meiert.com/en/blog/the-frontend-developer-test/" "blog post" %} which discussed the importance of validating your HTML.

Which got me thinking, why don't _I_ start validating my HTML?

So I tried using {% extLink "https://validator.w3.org/" "W3's validator service" %}, which broke when I tried to run it on this blog. After messing around with it for a bit I realised that I can take matters into my own hands...

The next night armed with Eleventy and {% extLink "https://www.npmjs.com/package/html-validator" "the first NPM package I found on Google for HTML validation" %}, I started hacking together something.

Essentially I already had some code that runs on the `eleventy.after` event, which formats my HTML/CSS/JS, so I hijacked that event and jammed in the `html-validator` package to check over my HTML files and log out when it found issues.

A simplified example of what I was doing:

```js
const validate = require('validate.js');

module.exports = function (eleventyConfig) {
  // do other stuff

  eleventyConfig.on('elventy.after', validate);
};
```

Naturally it found a few issues, I fixed them, {% extLink "https://twitter.com/mattatt4ck/status/1508730776703025153" "fired off a tweet" %} and called it a night.

After seeing some interest in how I did things I decided to write a blog post, and ended up creating an NPM package instead.

{% extLink "https://www.npmjs.com/package/eleventy-plugin-html-validate" "eleventy-plugin-html-validate" %} is a simple plugin that, when installed, runs on the `eleventy.after` event and scans through all the HTML files listed in the event's output.

To use it just install the package and in your `.eleventy.js` file:

```js
const eleventyHTMLValidate = require('eleventy-plugin-html-validate');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyHTMLValidate);
};
```

If you're curious about whats under the hood, you can {% extLink "https://github.com/matt-auckland/eleventy-plugin-html-validate" "check out the source code" %}, otherwise here's a slightly simplified version:

```js
async function validateHTMLFiles(buildOutput) {
  // grab all the HTML file paths
  const htmlFilePaths = buildOutput.results
    .map((r) => r.outputPath)
    .filter((path) => path.match(/.html$/));

    htmlFilePaths.forEach(async (filePath, i) => {
    if (fs.existsSync(filePath)) {
      try {
        // load file
        const options = {
          format: 'text',
          data: fs.readFileSync(filePath, 'utf8')
        }

        // validate
        const result = await htmlValidator(options)
        const pass = result.includes("The document validates according to the specified schema(s).")

        // log out any errors
        if (!pass) {
          console.log(filePath + ' ❌');
          console.log(result);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}
```

Having referenced the {% extLink "https://www.11ty.dev/docs/events/#event-arguments" "11ty docs" %} again for writing this post I've realised that _maybe_ I have access to the output of the `eleventy.after` event because I'm using one of the canary versions of Eleventy, but anyway you can try it out and see if it works 😅
