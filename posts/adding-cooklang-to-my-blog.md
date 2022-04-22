---
title: Adding Cooklang Support to my Eleventy Blog
date:

tags:
  - Cooklang
  - Eleventy
---

Over the past few years I've been doing a lot more cooking and have been recording various recipes as I go, and the temptation to share these has been growing and growing. Cue my discovery of "Cooklang", some time off from work, and we had a perfect storm.

## What the heck is a "Cooklang"?

Cooklang is like Markdown but for recording recipes, and simplfying the management of them. Each recipe is a self contaned `.cook` file and contains the cooking instructions for the recipe. Things like the cookware + ingredients needed are indicated by annotating them in the recipe, a Cooklang parser will automatically pick these up, no need to maintain seperate lists. A sample recipe (`easy-pancakes.cook`) might look like this:

```txt
>> source: https://www.jamieoliver.com/recipes/eggs-recipes/easy-pancakes/

Crack the @eggs{3} into a blender, then add the @flour{125%g}, @milk{250%ml} and @sea salt{1%pinch}, and blitz until smooth.

Pour into a #bowl and leave to stand for ~{15%minutes}.

Melt the @butter (or a drizzle of @oil if you want to be a bit healthier) in a #large non-stick frying pan{} on a medium heat, then tilt the pan so the butter coats the surface.

Pour in 1 ladle of batter and tilt again, so that the batter spreads all over the base, then cook for 1 to 2 minutes, or until it starts to come away from the sides.

Once golden underneath, flip the pancake over and cook for 1 further minute, or until cooked through.

Serve straightaway with your favourite topping. -- Add your favorite topping here to make sure it's included in your meal plan!
```

And you'd get a list of ingredients and cookware from the recipe like this:

Ingredients:

- 3 eggs
- 125 g flour
- 250 ml milk
- 1 pinch sea salt
- some butter
- some oil

Cookware:

- bowl
- large non-stick frying pan

You can find more info on Cooklang {% extLink "https://cooklang.org/" "on the official site" %}.

## Adding support for .cook files

Luckily I'm using Eleventy which makes adding support for arbitrary file types a breeze. To this end, I've actually gone and created a ({% extLink "https://www.npmjs.com/package/eleventy-plugin-cooklang" "simple Eleventy Plugin to add support" %}), it's pretty barebones but, it works well enough for my purposes (though I'll be improving it over time).

The plugin adds support for `.cook` files by utilising the {% extLink "https://github.com/cooklang/cooklang-ts" "cooklang/cooklang-ts" %} package to parse the contents of any `.cook` files, it then transforms takes the output of that parse and returns it as part of the page's data.

The display of the data is left up to user, I don't attempt to include a default layout, though maybe I will add an example to get people started in future.

## Displaying a recipe

I created a custom layout for my recipes, `recipe.njk` which just renders the data onto a page with a few loops, nothing fancy. I also added a data file inside the `recipes` folder (where I store all my recipes) that sets the layout of all the files in that folder to `recipe.njk`

To see an example recipe take a look at my [Anzac biscuit recipe](/recipes/anzac-biscuits/), a local New Zealand/Australian biscuit which traces it's origins back to the First World War and the ANZAC troops.

## Adding a Recipe Collection

Of course when it comes to displaying these, I wanted to have a page with all my recipes listed ([/recipes](/recipes)), so I needed a custom collection.

Since I have created a custom layout for recipes, this was really easy, just grab all my posts, filter for things that use the recipe layout, and sort by date.

```js
eleventyConfig.addCollection('recipes', function (collectionApi) {
  return collectionApi
    .getAll()
    .filter((i) => i.data.layout === 'pages/recipe.njk')
    .sort((recipeA, recipeB) => {
      return recipeA.date - recipeB.date;
    });
});
```

## Links

- {% extLink "https://cooklang.org/" "Cooklang official site" %}
- My {% extLink "https://www.npmjs.com/package/eleventy-plugin-cooklang" "eleventy plugin for cooklang" %}, `eleventy-plugin-cooklang`
- {% extLink "https://github.com/cooklang/cooklang-ts" "cooklang/cooklang-ts" %} package
- My [Anzac biscuit recipe](/recipes/anzac-biscuits/)
- {% extLink "https://en.wikipedia.org/wiki/Anzac_biscuit" "Anzac Biscuits" %} on Wikipedia
