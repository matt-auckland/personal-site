---
title: Using Tailwind CSS JIT with Vite

date: 2021-03-21

tags:
  - Tailwind
  - Vite
  - Vue
---

I recently saw
{% extLink 'https://twitter.com/adamwathan/status/1371505992840663051', "Adam Watham's tweet" %} announcing the release of Tailwind CSS's new just-in-time compiler, and instantly wondered if it'll work with Vite out of the box?

Turns out with a new minor tweaks, it works without much effort at all.

```bash
# Create a new vite project using Vue3
npm init @vitejs/app vite-tailwind-jit vue2-vite --template vue
cd vite-tailwind-jit
# install Vite's packages
npm i
# install the latest packages for tailwinds and it's dependencies
npm install -D @tailwindcss/jit tailwindcss@latest postcss@latest autoprefixer@latest
# generate tailwinds and post css config files
npx tailwindcss init -p
```

Alright so at this point we now have a Vite project using Vue 3, as well as our new tailwinds set up but.. there are a few chores we need to do before we can start working on our new project.

Open up `tailwind.config.js`, it will look like this:

```js
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
```

Now we need to update `purge: []` to look like:

```js
module.exports = {
  purge: ['./index.html', './src/**/*.{vue}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
```

Save that and then open up your `postcss.config.js` file, it'll look like this:

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

We need to replace the `tailwindcss` plugin with `'@tailwindcss/jit'`, which will look like this:

```js
module.exports = {
  plugins: {
    '@tailwindcss/jit': {},
    autoprefixer: {},
  },
};
```

Next we need to create a new CSS file, which we will import into our Vite project.

I just created one called `index.css` and put it in my `src/assets` folder. The contents should be the following:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Next, crack open `src/main.js`, and insert the following line:

```js
import './assets/index.css';
```

You'll end up with something like this:

```js
import { createApp } from 'vue';
import App from './App.vue';
import './assets/index.css';

createApp(App).mount('#app');
```

Now, make sure you saved all your files, and run `npm run dev`. You should now be up and running with Vite and Tailwind's new JIT compiler, happy hacking!
