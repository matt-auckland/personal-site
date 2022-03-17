---
title: Cordova Webview Schemes/Protocols
date: 2022-03-15
updated: 2022-03-16

tags:
  - Cordova
  - Ionic
  - Android
  - iOS
---

Generally Cordova serves it's webviews from one of two locations:

- `https://localhost` for Android (cordova-android v10.x.x)
  - This was `file:///android_asset/www/index.html` in earlier versions
- `file://` for iOS (cordova-ios v6.x.x)
  - `file://localhost` sometimes depending on settings, see the section on iOS below

If you're using {% extLink "https://github.com/ionic-team/cordova-plugin-ionic-webview" "cordova-plugin-ionic-webview" %} you might have something like:

- `http://localhost` for Android
- `ionic://localhost` for iOS

This can sometimes cause issues, perhaps you're loading in a third party script that checks `window.location` and uses the current protocol to request other assets or to send network requests.

I recently ran into this issue with a particular script, and unfortunately I wasn't able to find a perfect resolution I'll recount what I could do.

<div class="note"><div class="note-title">Note:</div>
Consider whether it's possible to modify the script to work with your app, rather than modifying your app to fit the script, and if that makes sense. Whichever is optimal depends on your exact situation but, it's important to ask the question.
</div>

## Protocol Relative URLs

If you're not familar with these, a protocol relative URL looks like this {% extLink "//mathew-paul.nz" "//mathew-paul.nz" %}, notice the absense of a network protocol?

What your browser does with these URLs is fill in the missing protocol with the window's current protocol, so in this case of this website, HTTPS as that's what I serve my site with.

These URLs can sometimes do behave in unexpected ways when you use them inside a Cordova app, for example if your app is serving from `file:///android_asset/www/index.html` or `app://localhost`, the above URL would become `file://mathew-paul.nz` or `app://mathew-paul.nz`, that's gonna be a broken link!

## Android solutions

If you're on one of the newer versions of `cordova-android` (v10 or higher), you should be serving your app from HTTPS by default, but if you're not for some reason, or you're on a lower version, you can add `<preference name="scheme" value="https" />` to your `config.xml` to change that.

If your Cordova app is serving from HTTP this could be an issue on Android as by default Android does not allow network requests to use HTTP as it's insecure, if you can't change from HTTP to HTTPS for some reason, I recommend following {% extLink "https://cordova.apache.org/docs/en/11.x/guide/platforms/android/index.html?#android-quirks" "this guide" %} in the Cordova docs to allow insecure network requests. Please consider if this is the right option for you though, security matters!

You can also tweak the `localhost` part of the URL (the hostname) to be something else by using  `<preference name="hostname" value="your_value" />`
## iOS solutions

Unfortunately you cannot set your app to use HTTPS on iOS, while you can configure the protocol, Apple disallows the use of HTTP or HTTPS in it's webviews when serving files. I'm sure they have a good reason for doing so but I'm not privy to what that is.
This limitation also applies to the `cordova-plugin-ionic-webview` plugin.

I haven't found a good work around for this sadly, but if I do I'll update this post.

You can also use the `<preference name="scheme" value="your_value" />`, `<preference name="hostname" value="your_value" />` preferences for iOS but the scheme values cannot be `http`, `https` or `file`.

The hostname is normally undefined by default but will switch to localhost by default when you set a custom scheme.

dpouge from the Cordova team recommends using `app` as a scheme to make life a bit easier on iOS.


## Iconic Web View

If you're using `cordova-plugin-ionic-webview`, your app is probably serving from `http://localhost` on Android, to change this you can add a `<preference name="Scheme" value="https" />` tag to your `config.xml` (I'd do it under the Android platform section as iOS also shares this preference but with some quirks) which will change the protocol you serve the app from HTTP to HTTPS.

The ionic webview plugin also allows you to configure {% extLink  "https://github.com/ionic-team/cordova-plugin-ionic-webview#mixedcontentmode" "'Mixed Content Mode'" %}, which may be required to solve the issue if you need to keep on HTTP for some reason.

## A warning on changing your schemes

Changing your schemes can cause your app to lose access to data that it's storing in places like localStorage, so if you depend on that I'd recommend reading {% extLink "https://github.com/apache/cordova-ios/issues/906" "this Github issue" %} for information on migrating your data.
## Closing Notes

If this was helpful to you I'm glad, these behaviours/features certainly took me for a spin when I discovered them, and hopefully this post will serve as a useful resource to you and others.

I also want to give my thanks to Cordova contributors Erisu and dpouge from the {% extLink "https://join.slack.com/t/cordova/shared_invite/zt-z70vy6tx-7VNulesO0Qz0Od9QV4tc1Q" "Cordova Slack Channel" %}, who helped clarify and share some information on this topic.
## Further Reading

Cordova Android
- {% extLink "https://github.com/apache/cordova-android/pull/1137" "PR introducting of the new default scheme for Android." %}
- {% extLink "https://github.com/apache/cordova-android/pull/1222" "PR for backwards compatibility support for the 'file' scheme" %}

Cordova iOS
- {% extLink "https://github.com/apache/cordova-ios/pull/781" "PR adding support for Scheme & Hostname" %}
- {% extLink "https://github.com/apache/cordova-ios/pull/866" "PR reverting the default scheme to 'file'" %}, because of concern it was a massive breaking change.