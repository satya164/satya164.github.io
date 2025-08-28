---
title: macOS-like shortcuts in Hyprland
description: I have been using a MacBook for a while. Here is how I managed to make common shortcuts like copy & paste use the same keys as macOS in Hyprland.
date: 2025-08-27
---

I am used to shortcuts like <kbd>⌘C</kbd> & <kbd>⌘V</kbd> for copy & paste, and <kbd>⌘</kbd> key in general since I have been using a MacBook for a long time now. So using [Hyprland](https://hypr.land) on Linux has been a bit challenging as I always press the wrong keys due to muscle memory.

I still need to use MacBook for work, so I don't want to get used to different shortcuts. This is my attempt to make the shortcuts in Hyprland more familiar.

## Keybindings

It's already quite straightforward to set up [custom keybindings](https://wiki.hypr.land/Configuring/Binds) in Hyprland to do specific actions, like opening an app launcher, quitting an app etc. It can be done using the `bind` directive in the config file at `$XDG_CONFIG_HOME/hypr/hyprland.conf` (usually `~/.config/hypr/hyprland.conf`).

For the `$mainMod` key, I use <kbd>Alt</kbd>, since it's in the same location as the <kbd>⌘</kbd> key on a MacBook:

```ini
$mainMod = ALT
```

I use [rofi-wayland](https://github.com/in0ni/rofi-wayland) to replicate functionality such as app launcher (like Spotlight), switching between windows (like <kbd>⌘</kbd><kbd>Tab</kbd>) and inserting emojis with [rofimoji](https://github.com/fdw/rofimoji) (like <kbd>Ctrl</kbd><kbd>⌘</kbd><kbd>Space</kbd>):

```ini
bind = $mainMod, SPACE, exec, rofi -show drun
bind = $mainMod, TAB, exec, rofi -show window
bind = $mainMod CTRL, SPACE, exec, rofimoji --use-icons
```

I have more customizations for rofi, but this is the basic setup to replicate this idea.

Also [hyprlock](https://wiki.hypr.land/Hypr-Ecosystem/hyprlock/) for the lock screen using the same shortcut as macOS (<kbd>Ctrl</kbd><kbd>⌘</kbd><kbd>Q</kbd>):

```ini
bind = $mainMod CTRL, Q, exec, hyprlock
```

Then shortcuts such as fullscreen, and closing apps:

```ini
bind = $mainMod CTRL, F, fullscreen,
bind = $mainMod, Q, killactive,
```

The `killactive` binding is not quite the same as <kbd>⌘</kbd><kbd>Q</kbd> as `killactive` actually closes the window and not quit the app. But it's closer than how <kbd>⌘</kbd><kbd>W</kbd> works, since the <kbd>⌘</kbd><kbd>W</kbd> shortcut is used to close tabs in addition to closing windows.

## Remapping

The next step is to remap shortcuts to be more in line with macOS. It's actually straightforward with the `sendshortcut` [dispatcher](https://wiki.hypr.land/Configuring/Dispatchers/#list-of-dispatchers). The main idea is to assign keybindings to the shortcuts I want to remap, then use the `sendshortcut` dispatcher to send a different key combination.

The `sendshortcut` dispatcher takes 3 params: `mod`, `key`, `window` (optional). So to remap `$mainMod A` to <kbd>⌘</kbd><kbd>A</kbd>, it'd be something like this:

```ini
bind = $mainMod, A, sendshortcut, CTRL, A,
```

I basically remapped <kbd>⌘</kbd> + all characters in the alphabet so most shortcuts will be remapped:

```ini
bind = $mainMod, A, sendshortcut, CTRL, A,
bind = $mainMod, B, sendshortcut, CTRL, B,
bind = $mainMod, C, sendshortcut, CTRL, C,
bind = $mainMod, D, sendshortcut, CTRL, D,
bind = $mainMod, E, sendshortcut, CTRL, E,
bind = $mainMod, F, sendshortcut, CTRL, F,
bind = $mainMod, G, sendshortcut, CTRL, G,
bind = $mainMod, H, sendshortcut, CTRL, H,
bind = $mainMod, I, sendshortcut, CTRL, I,
bind = $mainMod, J, sendshortcut, CTRL, J,
bind = $mainMod, K, sendshortcut, CTRL, K,
bind = $mainMod, L, sendshortcut, CTRL, L,
bind = $mainMod, M, sendshortcut, CTRL, M,
bind = $mainMod, N, sendshortcut, CTRL, N,
bind = $mainMod, O, sendshortcut, CTRL, O,
bind = $mainMod, P, sendshortcut, CTRL, P,
bind = $mainMod, R, sendshortcut, CTRL, R,
bind = $mainMod, S, sendshortcut, CTRL, S,
bind = $mainMod, T, sendshortcut, CTRL, T,
bind = $mainMod, U, sendshortcut, CTRL, U,
bind = $mainMod, V, sendshortcut, CTRL, V,
bind = $mainMod, W, sendshortcut, CTRL, W,
bind = $mainMod, X, sendshortcut, CTRL, X,
bind = $mainMod, Y, sendshortcut, CTRL, Y,
bind = $mainMod, Z, sendshortcut, CTRL, Z,
```

Pretty straightforward!

For redo, it should actually be <kbd>⌘</kbd><kbd>Shift</kbd><kbd>Z</kbd> instead of <kbd>⌘</kbd><kbd>Y</kbd>, so something like this:

```ini
bind = $mainMod SHIFT, Z, sendshortcut, CTRL, Y,
```

Unfortunately this didn't seem to work for me. If you have any ideas, please let me know!

### Copy & Paste in Terminal

It's great that copy and paste use the same shortcuts as in other applications on macOS. However, since Linux uses <kbd>Ctrl</kbd> + <kbd>C</kbd> for copy, Terminal apps need to use a different shortcut as <kbd>Ctrl</kbd> + <kbd>C</kbd> is already used for killing processes in terminals. So our remapping for copy and paste won't work.

Luckily, we can also add custom logic for our keybindings, where we can check whether the active window is a terminal or not using [hyprctl](https://wiki.hypr.land/Configuring/Using-hyprctl/). Then we can dispatch <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>C</kbd> and <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>V</kbd> instead.

I use [Ghostty](https://ghostty.org/) for my Terminal, so I wrote the binding by checking if the active window class matches Ghostty:

```js
bind = $mainMod, C, exec, hyprctl activewindow | grep -q "class: com.mitchellh.ghostty" && hyprctl dispatch sendshortcut "CTRL SHIFT, C," || hyprctl dispatch sendshortcut "CTRL, C,"
bind = $mainMod, V, exec, hyprctl activewindow | grep -q "class: com.mitchellh.ghostty" && hyprctl dispatch sendshortcut "CTRL SHIFT, V," || hyprctl dispatch sendshortcut "CTRL, V,"
```

This way, I send <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>C</kbd> to Ghostty and <kbd>Ctrl</kbd> + <kbd>C</kbd> to other applications using the same shortcuts.

### Text-editing shortcuts

I also found myself using the same shortcuts for text navigation and editing as in macOS. So I remapped them as well.

```ini
bind = CTRL, A, sendshortcut, , home,
bind = CTRL, E, sendshortcut, , end,
bind = CTRL, F, sendshortcut, , right,
bind = CTRL, B, sendshortcut, , left,
bind = CTRL, P, sendshortcut, , up,
bind = CTRL, N, sendshortcut, , down,
bind = CTRL, D, sendshortcut, , delete,
bind = CTRL, H, sendshortcut, , backspace,
```

## Wrapping up

This list is also nowhere near exhaustive, just the ones I use frequently. I may also have missed any edge cases. So it's always a good idea to adjust your keybindings to fit your workflow and only use my setup as a starting point.
