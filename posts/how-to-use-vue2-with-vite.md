---
title: How to use Vue 2 with Vite
date: 2021-03-14
updated: 2022-03-05

tags:
  - Vue
  - Vite
---

If you just want an example repo to clone, visit here: [https://github.com/matt-auckland/vite-vue2-starter](https://github.com/matt-auckland/vite-vue2-starter). I'd recommend using [degit](https://github.com/Rich-Harris/degit) to clone it.

If you're wondering how to use Vue2 with Vite, read on.

First we'll need to create a new Vite app using the Vue 3 template.

```bash
npm init @vitejs/app vue2-vite --template vue; # Init vite with Vue3
cd vue2-vite;
npm install; #install packages
```

Next we need to install the [vite-plugin-vue2](https://github.com/underfin/vite-plugin-vue2) package which allows Vite to work with Vue2.

We also need to install Vue2 itself!

```bash
npm install vite-plugin-vue2; # add vue2 plugin
npm install vue@2 # install Vue V2, replaces the Vue V3 package
```

{% raw %}
<div class="note"><div class="note-title">EDIT, March 5 2022</div><span>Some people seem to need to install <code>vue-template-compiler</code> in order to get this working, I didn't but if you are having issues, try <code>npm i vue-template-compiler</code> and see if that helps!</span></div>
{% endraw %}

Now we need to update `vite.config.js` so it uses the new plugin:

```js
const { createVuePlugin } = require('vite-plugin-vue2');

module.exports = {
  plugins: [createVuePlugin()],
};
```

And now we need to update `main.js` so it uses Vue2 syntax to create our app instead of Vue3

```js
import Vue from 'vue';
import App from './App.vue';

new Vue({
  render: (h) => h(App),
}).$mount('#app');
```

Now if you run `npm run dev`, Vite should start up! But you should get an error:

> [vite] Internal server error: Component template should contain exactly one root element. If you are using v-if on multiple elements, use v-else-if to chain them instead.

We'll need to update our `.Vue` files so they use Vue 2 syntax instead of Vue 3. I've included the changes I made below, click on the file names to reveal the code.



<details>
    <summary>Click to expand code for <code>App.vue</code></summary>

```html
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Hello Vue 2 + Vite" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
export default {
  components: {
    HelloWorld,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```
</details>

<details>
<summary>
 Click to reveal code for <code>HelloWorld.vue</code>
</summary>
{% raw %}
  ```html
  <template>
    <div>
      <h1>{{ msg }}</h1>

      <p>
        <a href="https://vitejs.dev/guide/features.html" target="_blank"
          >Vite Documentation</a
        >
        |
        <a href="https://vuejs.org/v2/guide/" target="_blank"
          >Vue 2 Documentation</a
        >
      </p>

      <button @click="count++">count is: {{ count }}</button>
      <p>
        Edit
        <code>components/HelloWorld.vue</code> to test hot module replacement.
      </p>
    </div>
  </template>

  <script>
  export default {
    props: {
      msg: String,
    },
    data() {
      return {
        count: 0,
      };
    },
  };
  </script>

  <style scoped>
  a {
    color: #42b983;
  }
  </style>
  ```
  {% endraw %}
</details>

That should resolve all errors, happy coding!
Feel free to log an issue on my [repo](https://github.com/matt-auckland/vite-vue2-starter) if it's still not working, or if you have any improvements to add :)
