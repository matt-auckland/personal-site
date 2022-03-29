---
title: Cordova Hooks Explained
date: 2021-07-09

tags:
  - Cordova
---

Cordova's hooks are a bit confusing at the best of times, and the [documentation](https://cordova.apache.org/docs/en/10.x/guide/appdev/hooks/) isn't the most straightforward explanation either, so to try and clarify this I've listed each command and the hooks that run with it below.

Hooks generally run before or after a Cordova CLI command is executed but, some CLI commands will execute other commands within themselves, leading to multiple hooks being called, sometimes confusingly.

If something seems to be missing, all I can say is this is how it was working with Cordova Cli v10.0.0.

| Command                |                                                            Hooks                                                             |                       Comments                        |
| ---------------------- | :--------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------: |
| `cordova prepare`      |                                            `before_prepare` <br/> `after_prepare`                                            |                                                       |
| `cordova compile`      |                                            `before_compile` <br/> `after_compile`                                            |                                                       |
| `cordova build`        | `before_build` <br/> `before_prepare` <br/> `after_prepare` <br/> `before_compile` <br/> `after_compile` <br/> `after_build` | Shorthand for `cordova prepare` and `cordova compile` |
| `cordova run`          |              `before_run` <br/> `before_prepare` <br/> `after_prepare` <br/> `before_deploy` <br/> `after_run`               |              Also runs `cordova prepare`              |
| `cordova serve`        |                       `before_serve` <br/> `before_prepare` <br/> `after_prepare` <br/> `after_serve`                        |              Also runs `cordova prepare`              |
| `cordova clean`        |                                              `before_clean` <br/> `after_clean`                                              |                                                       |
| `cordova emulate`      |           `before_emulate` <br/> `before_prepare` <br/> `after_prepare` <br/> `before_deploy` <br/>`after_emulate`           |              Also runs `cordova prepare`              |
| `cordova platform add` |                                       `before_platform_add` <br/> `after_platform_add`                                       |                                                       |
| `cordova platform ls`  |                                        `before_platform_ls` <br/> `after_platform_ls`                                        |                                                       |
| `cordova platform rm`  |                                        `before_platform_rm` <br/> `after_platform_rm`                                        |                                                       |
| `cordova plugin add`   |                                       `before_platform_add` <br/> `after_platform_add`                                       |                                                       |
| `cordova plugin ls`    |                                        `before_platform_ls` <br/> `after_platform_ls`                                        |                                                       |
| `cordova plugin rm`    |                          `before_plugin_rm` <br/> `before_plugin_uninstall` <br/> `after_plugin_rm`                          |                                                       |
