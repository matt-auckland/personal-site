---
title: How to add Android Adaptive Icons to a Cordova project
date: 2021-11-09

tags:
  - Cordova
  - Android
---

## Why would I use adaptive icons?

(If you just want the how, skip this section).

With Android 12 coming out, I launched an initiative at work to make sure that our app doesn't break when the new update launches, thankfully nothing was broken but one thing I did notice is that our app's icon looked a bit different. (Note: For the purposes of this post I'm using a fresh Cordova project).

<figure>
  <img src="/assets/images/regular-icon.png" width="316" height="316" loading="lazy"/>
  <figcaption>
    Weird looking non-adaptive icon
  </figcaption>
</figure>


This lead me to Android's {% extLink 'https://developer.android.com/guide/practices/ui_guidelines/icon_design_adaptive.html' 'Adaptive icons' %}, and I realised that if you aren't using adaptive icons, your icon is gonna look kind of bad, which was more than enough motivation for me.

But if you need more than one reason, check out this article: {% extLink 'https://medium.com/google-design/designing-adaptive-icons-515af294c783' '"Designing Adaptive Icons"' %}

<figure>
  <img src="/assets/images/adaptive-icon.png" width="316" height="316" loading="lazy"/>
  <figcaption>
    Beautiful adaptive icon, this is the end result we're going for
  </figcaption>
</figure>




## Just tell me how to do it

(For reference I'm using `cordova-android` version 9.1.0, but I'm pretty sure this should work on newer versions of `cordova-android`, unless how icons work is changed in version 11 or something.)

Adaptive Icons are composed of a foreground image and a background image (or colour), so prepare two SVGs or a single SVG and know what background colour you want to use.

### Prepare your icon - Non-SVG

You will need to prepare a fresh version of your icon with a transparent background, I used a PNG in this case, 512x512px.

Next we will use Android Studio to help us find what size our icon needs to be so that it displays nicely.
Open a new project in Android Studio and in the toolbar go `File` -> `New` -> `Image Asset`.

This will open a window up, under the "Source Asset" find your transparent icon.

After it loads in, play around with the scaling to find what % you need to scale your icon by so that it fits nicely, in my case I need to scale it down to 55%.
Make sure "Show safe zone" is checked, if your icon is outside of this zone (represented by a thin border in the preview window), your icon will be cropped.

<figure>
  <img src="/assets/images/android-image-editor.png" width="600" height="404" loading="lazy"/>
  <figcaption>
    You can edit the background colour using the "Background layer" tab, but it's not needed as we're just checking what size we need to scale our icon by.
  </figcaption>
</figure>

Now edit your icon so that it's scaled to the right size, but make sure the image canvas itself is still the same size, i.e. a 512x512px image.

<figure>
  <img src="/assets/images/before-after.png"  width="600" height="300" loading="lazy"/>
  <figcaption>
    Before -> After
  </figcaption>
</figure>

If you have a background image then repeat the same process for it.

If you opted for a background colour instead, you will need to create a `colors.xml` file (also in the `res` folder) and put your colour in it.

Mine looks like this:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="background">#bde3f5</color>
</resources>
```

### What if I want to use an SVG?

This is a similar process to above but with an extra step. Load your SVG into Android studio the same way as described above, then scale it appropriately.

Next we will use Android Studio to convert that SVG into an Android Drawable.
In Android Studio and in the toolbar go `File` -> `New` -> `Vector Asset`.

Then select your SVG and import it.

<figure>
  <img src="/assets/images/svg-import.png" width="600" height="458" loading="lazy"/>
  <figcaption>
    Importing the SVG
  </figcaption>
</figure>

Find your new "drawable" in Android Studio to get access to it's "code", copy the contents (`<vector>...</vector>`) and paste them into a new XML file, I threw mine in the `res` folder where I keep my splashscreen images but, you can throw it anywhere in your project.

<figure>
  <img src="/assets/images/vectors.png" width="600" height="399" loading="lazy"/>
  <figcaption>
    It's like an SVG but not quite
  </figcaption>
</figure>


### Updating your config.xml

Next, in your `config.xml` add the `colors.xml` file as a resource if you're using a background colour.

After that, specify your icons as so, make sure to include a `src` for your old icons if you support older Android versions (Android SDK version 25 and below use the old icon format I think).
Below I'm using an XML file but if you're using a PNG for your foreground icon link to a PNG!

```xml
 <!-- Colors.xml -->
 <resource-file src="res/values/colors.xml" target="/app/src/main/res/values/colors.xml" />

 <icon density="ldpi" background="@color/background" foreground="res/icon/android/adaptive_icon_foreground.xml" src="res/icon/android/ldpi.png" />
 <icon density="mdpi" background="@color/background" foreground="res/icon/android/adaptive_icon_foreground.xml" src="res/icon/android/mdpi.png" />
 <icon density="hdpi" background="@color/background" foreground="res/icon/android/adaptive_icon_foreground.xml" src="res/icon/android/hdpi.png" />
 <icon density="xhdpi" background="@color/background" foreground="res/icon/android/adaptive_icon_foreground.xml" src="res/icon/android/xhdpi.png" />
 <icon density="xxhdpi" background="@color/background" foreground="res/icon/android/adaptive_icon_foreground.xml" src="res/icon/android/xxhdpi.png" />
 <icon density="xxxhdpi" background="@color/background" foreground="res/icon/android/adaptive_icon_foreground.xml" src="res/icon/android/xxxhdpi.png" />
```

### Try to build your app

Run `cordova prepare`

Try to build your app in Android Studio or Cordova CLI (I use Android Studio personally for _reasons_, but you can probably use the Cordova CLI to build it fine.)

If you run into issues try to remove your Android platform with Cordova and reinstall it.





