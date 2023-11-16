---
title: How to write a minimal code editor
description: Writing a code editor is a complex task. But what if there was an alternative approach for simpler use cases?
date: 2023-11-16
---

Code editors are complex. They do a lot of things to emulate the same experience as normal `textarea` while providing a ton of additional features such as indenting the code, autocomplete, annotations, multiple cursors etc. In this article, we'll do none of these things.

Well, that's disappointing. I hear you say. Wait, don't close the page. I still have something for you.

Sometimes, all you want is a basic editor to embed some editable code on a page. You don't need all the features of the complex editors. All you care about is that it should be lightweight and should load fast. We'll discuss an approach to achieve just that.

## How do code editors work?

Typically, code editors such as [CodeMirror](https://codemirror.net), [Ace](https://ace.c9.io/), [Monaco](https://microsoft.github.io/monaco-editor) etc. use a hidden `textarea` to detect what you type and other operations. Then they reflect those changes in the DOM so it appears like you're directly editing it. The caret you see is fake and is just a `div` pretending to be a caret. There is usually a lot more going on, and some editors may take a different approach. But that's the gist of it.

Another approach is to use `contentEditable` div which allows you to make any element editable. [`react-live`](https://github.com/FormidableLabs/react-live) uses this approach. But `contentEditable` can often be tricky to work with.

But we are here to build a minimal code editor, so we'll take a different route that's easier to implement.

## Using a hidden `textarea`

While we're not going to follow the same approach as other editors, a hidden `textarea` is still going to be a part of our solution.

The idea is that we use a normal `textarea` for our editor, highlight the code with [prismjs](https://prismjs.com) and align it on top of the `textarea`. Whenever the `textarea`'s value changes, we update the highlighted code. Then we disable interactions with the highlighted code by using `pointer-events: none` and whenever you interact with the editor, you actually interact with the `textarea`.

I got this idea from a library ([kueblc/LDT](https://github.com/kueblc/LDT)) around 5 years ago.

Here is a demo editor with this approach:

```js playground="react" dependencies="prismjs@1.29.0" height="500px"
import * as React from 'react';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

export default function App() {
  const [value, setValue] = React.useState(code);

  return (
    <div>
      <textarea value={value} onChange={(e) => setValue(e.target.value)} />
      <pre
        dangerouslySetInnerHTML={{
          __html: highlight(value, languages.js, 'js'),
        }}
      />
      <style>{css}</style>
    </div>
  );
}

const code = `function add(a, b) {
  return a + b;
}
`;

const css = `
div {
  font-family: monospace;
  font-size: 18px;
  position: relative;
  text-align: left;
  overflow: hidden;
  padding: 0;
  height: 200px;
}

textarea, pre {
  box-sizing: inherit;
  display: inherit;
  font: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  tab-size: inherit;
  text-indent: inherit;
  text-rendering: inherit;
  text-transform: inherit;
  margin: 0;
  padding: 0;
  border: 0;
  white-space: pre-wrap;
}

textarea {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  outline: 0;
  resize: none;
  background: none;
  overflow: hidden;

  -moz-font-smoothing: antialiased;
  -webkit-font-smoothing: antialiased;
  -webkit-text-fill-color: transparent;
}

pre {
  position: relative;
  pointer-events: none;
}
`;
```

We are doing the following things here:

- We use a `textarea` with the code and a `pre` element to display the highlighted code.
- The text is kept in sync by updating the `pre` element whenever the `textarea`'s value changes.
- The `pre` has `pointer-events: none` so that you can't interact with it.
- Additional styles are applied to make the `textarea` and `pre` look the same with same font, line height etc.
- The text in the `textarea` is hidden by `-webkit-text-fill-color: transparent` (it also works on non-webkit browsers such as Firefox).
- The syntax highlighting is done by [prismjs](https://prismjs.com).

So now we have a minimal code editor which is super lightweight and good enough for simple use cases.

## What's missing?

A good code editor is not only text with syntax highlighting. There are still a few more things we need to do to make it usable.

### Indentation

A large part of writing code is indenting it, and a simple text area doesn't provide this feature.

To implement indentation support with tab, we will need to listen to `keydown` events from the `textarea` and check if tab key was pressed. Then we can prevent the default behaviour and insert the tab character programmatically.

To handle tabs properly (inserting tab character, indenting and unindenting a selected text while maintaining proper selection etc.), a fair bit of code is required, so I'm not going to discuss it here.

### Undo/redo

When updating the `textarea` programmatically, the undo stack gets lost. We can use `document.execCommand` instead to insert the text, which will preserve the undo stack. However, it's a deprecated feature and also doesn't work on Firefox ([bug 1220696](https://bugzilla.mozilla.org/show_bug.cgi?id=1220696[])), so it's not a feasible solution.

The only option I know at the time of writing this post is to implement a custom undo manager and maintain our own undo stack. Then we can listen to `keydown` events for undo/redo shortcuts, and apply the changes ourselves instead of relying on the browser.

### Switching focus

Since we are intercepting tab key, the default behaviour of switching focus is now gone, which is not good for accessibility. The best we can do here is to provide a keybinding which allows toggling this behaviour.

## Limitations

There are limitations of this approach to be aware of:

- The syntax highlighted code cannot have different font family, font weight, font style, line height etc. for its content. Since the editor works by aligning the highlighted code over a `textarea`, changing anything that affects the layout can misalign it.
- The custom undo stack is incompatible with undo/redo items browser's context menu.
- Since the editor works by syntax highlighting the all of the code and inserting it DOM, unlike other editors which tokenize and highlight only parts of the code, the editor is not optimized for performance and large documents can inversely affect the typing speed.

Because of these limitations, this approach is not suitable for full featured code editors. But it's good enough for basic use cases.

## Wrapping up

A while ago I made this idea into a package: [`react-simple-code-editor`](https://github.com/react-simple-code-editor/react-simple-code-editor). It implements the indentation, undo/redo and focus switching features discussed above. The syntax highlighting can be done by any third party library (such as Prism). You can try the [demo here](https://react-simple-code-editor.github.io/react-simple-code-editor).

This component is used in [snack.expo.dev](https://snack.expo.dev) to provide a minimal code editor for embedding code snippets, as well as a replacement for the default editor on slower connections.
