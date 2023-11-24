---
title: Stacking context - the hidden layers in CSS
description: How do you position an element on top of another element in CSS? Just use z-index, right? Right?? Turns out, there is a bit more to it.
date: 2023-11-18
---

We often reach for `z-index` when we want to position an element on top of another element. But it doesn't always work as expected. Sometimes even using a ridiculously high value like `z-index: 9999` doesn't seem to do anything. So what stops `z-index` from working as expected? The answer lies in stacking context.

Stacking context refers to how elements are stacked or layered along an imaginary z-axis. Kind of like layers in Photoshop. These layers are stacked relative to each other.

![Layers](./layers.svg)

We can customize the order of stacking within a stacking context using `z-index` property. The higher the `z-index` value, the higher the element will be stacked and it'll be visible on top of other elements. Adding `z-index` to an element works because the root element (`html`) creates a stacking context, and all the elements are stacked within it by default.

## Nested stacking contexts

Stacking contexts can be nested. So when we add a `z-index` to an element, we are not only changing the stacking order of that element but also creating a new stacking context. This means that elements within that element will be stacked relative to that element, and not the root element.

In the following demo, we have 3 elements, each with a different `z-index` value.

- The yellow box has a `z-index` of `3` - which is the highest
- The blue box has a `z-index` of `2` - which is in the middle
- The red box has a `z-index` of `1` - which is the lowest

```js playground="react"
export default function App() {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ position: 'relative', zIndex: 0 }}>
        <Box
          style={{ zIndex: 3, backgroundColor: yellow, left: 30, top: 60 }}
        />
      </div>
      <Box style={{ zIndex: 2, backgroundColor: blue, left: -100, top: 30 }} />
      <Box style={{ zIndex: 1, backgroundColor: red, left: -140, top: 0 }} />
    </div>
  );
}

function Box({ children, style }) {
  return (
    <div
      style={{
        position: 'relative',
        width: 100,
        aspectRatio: 1,
        borderRadius: 5,
        display: 'grid',
        placeItems: 'center',
        ...style,
      }}
    >
      z-index: {style.zIndex}
    </div>
  );
}

const yellow = '#ffcb6b';
const blue = '#82aaff';
const red = '#f07178';
```

Typically, we may expect the elements to be positioned so that the red box is at the bottom, the blue box is in the middle, and the yellow box is on top. But in the demo, we see that the yellow box is at the bottom even though it has the highest `z-index`.

This is because the yellow box is inside a `div` that has `z-index` of `0` - which creates a new stacking context. So it is stacked within that div and cannot be stacked any higher or lower. The elements inside this stacking context are stacked independently from the elements in the parent stacking context.

If you remove the `z-index` from the parent `div`, it'll no longer create a new stacking context and the yellow box will be on top.

## What creates a new stacking context?

So far we've seen that adding a `z-index` creates a new stacking context. So far it doesn't seem too complicated. But there are many more ways a stacking context can be created.

For example, let's consider this demo:

```js playground="react"
export default function App() {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ opacity: 0.99 }}>
        <Box
          style={{ zIndex: 3, backgroundColor: yellow, left: 30, top: 60 }}
        />
      </div>
      <Box style={{ zIndex: 2, backgroundColor: blue, left: -100, top: 30 }} />
      <Box style={{ zIndex: 1, backgroundColor: red, left: -140, top: 0 }} />
    </div>
  );
}

function Box({ children, style }) {
  return (
    <div
      style={{
        position: 'relative',
        width: 100,
        aspectRatio: 1,
        borderRadius: 5,
        display: 'grid',
        placeItems: 'center',
        ...style,
      }}
    >
      z-index: {style.zIndex}
    </div>
  );
}

const yellow = '#ffcb6b';
const blue = '#82aaff';
const red = '#f07178';
```

Here, we don't have any `z-index` on the parent `div`, but the yellow box is still at the bottom. This is because the parent `div` has an `opacity` of `0.99` - which creates a new stacking context. Try changing the `opacity` to `1` and notice how the yellow box is now on top.

This is quite unexpected. But yes, any opacity value lower than `1` will create a new stacking context. Similarly, other properties such as `transform`, `filter` etc. also create a new stacking context.

You can see a [full list of scenarios that create a new stacking context on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context).

Since stacking contexts can be created in so many ways, often unintentionally as we're styling our elements, this can lead to unexpected results when using `z-index`. So being aware of this can help us understand why `z-index` doesn't work sometimes and how to fix it.
