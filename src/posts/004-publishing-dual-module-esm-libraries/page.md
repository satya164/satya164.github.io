---
title: Publishing dual module ESM libraries
description: Dual module libraries containing both ESM and CommonJS modules can be tricky. Here's what I learned.
date: 2024-07-12
---

Recently I've been looking into moving to ES modules for my libraries and wanted to do it in a way that doesn't break existing users. But it's tricky - and took a lot of trial and error. In this post, I'll share my findings.

## ESM and CommonJS

[ES modules](https://nodejs.org/api/esm.html) (ESM) are the official standard module system in JavaScript. They are supported in modern browsers and [Node.js](https://nodejs.org), as well as by most bundlers. They are defined by the `import` and `export` keywords:

```js
// Importing an ES module
import { foo } from './module.js';

// Exporting from an ES module
export default function bar() {
  return foo;
}
```

[CommonJS modules](https://nodejs.org/api/modules.html) (CJS) are the module system that has been traditionally used in Node.js, but also adopted by most tools and bundlers. They are defined by the `require` function and the `module.exports` object:

```js
// Importing a CommonJS module
const { foo } = require('./module.js');

// Exporting from a CommonJS module
module.exports = function bar() {
  return foo;
};
```

So depending on the environment, we'd need to use the appropriate module system.

## Why dual module libraries?

When publishing a library written with ES modules, we may want to provide both ESM and CommonJS modules. This can be necessary for a couple of reasons:

1. Some tools or environments may not support ES modules yet, so providing a CommonJS version can be useful.
2. Node.js code written with CommonJS modules can only import ESM code asynchronously with dynamic `import` syntax ([synchronous require is available for Node.js 22 behind a flag: `--experimental-require-module`](https://nodejs.org/api/esm.html#interoperability-with-commonjs)), so providing a CommonJS version is necessary for synchronous usage.

Essentially, providing both ESM and CommonJS modules is a way to move to ESM without a breaking change.

And of course, if you don't need to support CommonJS environments, you can publish your library as an ESM-only package which is much simpler.

## Entry points in `package.json`

The `package.json` can contain various fields that point to the file that should be loaded when the package is imported or required.

The most common fields are:

- `main`: This field has been supported in Node.js for a long time and points to the CommonJS entry point. This is supported by the majority of tools and bundlers.
- `module`: This field is used by bundlers like [webpack](https://webpack.js.org) or [Rollup](https://rollupjs.org/) to load the ESM entry point. This field is not supported in Node.js.
- `exports`: This field is a newer addition to the `package.json` specification and allows specifying [multiple entry points for different environments conditionally](https://nodejs.org/api/packages.html#conditional-exports).

In addition, if you're writing client-side code, you may have come across the following fields:

- `browser`: This field is used to specify a different entry point for client-side code for the browser. This field is used by bundlers such as webpack and Rollup.
- `react-native`: This field is used to specify a different entry point for React Native environments. This field is supported by bundlers like [Metro](https://metrobundler.dev).

When writing dual modules, we'd want to use the `exports` field to specify both ESM and CommonJS entry points, while also providing the `main` and `module` fields for backwards compatibility.

## The `exports` field in `package.json`

The `exports` field in `package.json` allows specifying multiple entry points for different environments conditionally. It can be used to specify ESM and CommonJS entry points for dual module libraries.

Here we'll cover the 2 most common cases. You can find more information in the [official Node.js documentation for entry points](https://nodejs.org/api/packages.html#package-entry-points).

### Conditional exports

The `exports` field can have the following structure:

```json title="package.json"
{
  "exports": {
    ".": {
      "import": "./esm/index.js",
      "require": "./cjs/index.js"
    }
  }
}
```

Here, the condition is as follows:

- When the package is imported, the `import` condition is used
- When the package is required, the `require` condition is used

In addition, the conditions can also specify a `default` for the fallback, which is used if none of the conditions match:

```json title="package.json"
{
  "exports": {
    ".": {
      "browser": "./dist/browser.js",
      "react-native": "./dist/react-native.js",
      "default": "./dist/index.js"
    }
  }
}
```

In the above example, the condition is as follows:

- When the package is imported in a browser environment, the `browser` condition is used
- When the package is imported in a React Native environment, the `react-native` condition is used
- If neither of the conditions matches, the `default` condition is used

What conditions are available depends on the environment and the tooling used for module resolution.

**The order of the conditions is important**. Multiple conditions may match, e.g. if we have the conditions `node` and `require` - both would match when the package is required in Node.js. In this case, the first condition that matches is used.

The conditions can also be nested. For example:

```json title="package.json"
{
  "exports": {
    ".": {
      "node": {
        "import": "./esm/index-node.js",
        "require": "./cjs/index-node.js"
      },
      "default": "./esm/index.js"
    }
  }
}
```

### Subpath exports

When the `exports` field is defined, it's no longer possible import a subpath of the package directly. For example, if we have the following `exports` field:

```json title="package.json"
{
  "exports": {
    ".": {
      "import": "./esm/index.js",
      "require": "./cjs/index.js"
    }
  }
}
```

We can't import or require a subpath of the package directly:

```js
// This would not work
require('my-package/foo.js');
```

Similar to how `.` points to the main entry point, subpaths can also be specified in the `exports` field:

```json title="package.json"
{
  "exports": {
    ".": {
      "import": "./esm/index.js",
      "require": "./cjs/index.js"
    },
    "./foo.js": {
      "import": "./esm/foo.js",
      "require": "./cjs/foo.js"
    }
  }
}
```

This will now allow importing or requiring `my-package/foo.js`.

## Ambiguity in ESM and CommonJS

CommonJS and ESM have different semantics, with different sets of features and limitations. This means that we need to be explicit about which module system we're using.

There are a few ways to specify the module system:

### The `type` field in `package.json`

The `type` field in `package.json` can be used to specify the module system used by the package in `Node.js`. The value can be either `module` for ESM or `commonjs` for CommonJS:

```json title="package.json"
{
  "type": "module"
}
```

When the `type` field is set to `module`, all `.js` files in the package are treated as ESM files. When the `type` field is set to `commonjs`, all `.js` files are treated as CommonJS files.

By default, the `type` field is assumed to be `commonjs` if not specified.

### File extension

The file extension can also be used to specify the module system in `Node.js`:

- `.mjs` files are treated as ESM files.
- `.cjs` files are treated as CommonJS files.

Regardless of the `type` field, files with the `.mjs` extension are always treated as ESM files, and files with the `.cjs` extension are always treated as CommonJS files in Node.js.

### Script tag `type` attribute

In the browser, the module system is determined by the `type` attribute in the `script` tag:

```html
<script type="module" src="module.js"></script>
```

When the `type` attribute is set to `module`, the file is treated as an ESM file. When the `type` attribute is not specified or set to `text/javascript`, the file is treated as a CommonJS file.

Unlike Node.js, the file extension does not determine the module system in the browser, and browsers don't read the `package.json` file.

## Explicit file extensions

Unlike CommonJS modules, ES modules in Node.js require explicit file extensions in `import`/`export` statements:

```js
import { foo } from './module.js';
```

While explicit file extensions are not required in browsers - as the import specifier is a URL and the server can be configured to serve the correct file, it can still be simpler to use file extensions to avoid additional logic on the server.

## Approaches

There are [2 main approaches](https://nodejs.org/api/packages.html#dual-commonjses-module-packages) to publishing dual module libraries:

### ES module wrapper with CommonJS code

This is the simplest approach. You write your library in CommonJS and create an ESM wrapper around it. The ESM wrapper imports the CommonJS code and re-exports it:

```js title="esm-wrapper.mjs"
// Import the CommonJS module
import myModule from './my-module.js';

// Export the individual exports from the CommonJS module
export const foo = myModule.foo;
export const bar = myModule.bar;
```

Then in your `package.json`, you'd specify the `exports` field to point to the ESM wrapper for ESM environments and the CommonJS module for CommonJS environments, as well as fallbacks with `main` and `module` fields:

```json title="package.json"
{
  "type": "commonjs",
  "main": "./my-module.js",
  "module": "./esm-wrapper.mjs",
  "exports": {
    ".": {
      "import": "./esm-wrapper.mjs",
      "require": "./my-module.js"
    }
  }
}
```

This avoids the need to refactor your code to ESM.

However, this approach has a few downsides:

- The ESM wrapper needs to be maintained manually, so it can be error-prone.
- Since our code is still written in CommonJS, we don't get the benefits of ESM like tree-shaking with bundlers.

### Separate ESM and CommonJS builds

This approach involves writing your library in ESM and CommonJS separately - or more commonly, authoring in ESM and using tooling to generate the CommonJS build.

Then in your `package.json`, you'd specify the `exports` field to point to the ES module for ESM environments and the CommonJS module for CommonJS environments, as well as fallbacks with `main` and `module` fields:

```json title="package.json"
{
  "main": "./cjs/index.cjs",
  "module": "./esm/index.mjs",
  "exports": {
    ".": {
      "import": "./esm/index.mjs",
      "require": "./cjs/index.cjs"
    }
  }
}
```

This approach has the benefit of allowing you to write your code in ESM and get the benefits of ESM like tree-shaking with bundlers. But it also increases complexity in the build process.

When following this approach, you may encounter a few issues:

#### Dual package hazard

With this approach, the ESM and CommonJS versions of the package are treated as separate modules by Node.js as they are different files, leading to [potential issues](https://nodejs.org/api/packages.html#dual-package-hazard) if the package is both imported and required in the same runtime environment.

If the package relies on any state that can cause issues if 2 separate instances are loaded, it's necessary to isolate the state into a separate CommonJS module that can be shared between the ESM and CommonJS builds.

This is not an issue if it's safe to have 2 separate instances of the package loaded in the same environment, which is often the case for most libraries.

#### Mismatched module type

The `import` and `require` conditions only tell Node.js which file to load when the package is imported or required, but they don't say which module system is used in the file. So it's possible to specify an ES module in the `require` condition and a CommonJS module in the `import` condition, which may not work as expected.

To avoid this footgun, you can do any of the following:

- Avoid using `.js` files and use the `.cjs` and `.mjs` file extensions to specify the module system.
- Specify `type: 'commonjs'` in `package.json` to treat all `.js` files as CommonJS and use `.mjs` files for the ESM build.
- Specify `type: 'module'` in `package.json` to treat all `.js` files as ESM and use `.cjs` files for the CommonJS build.

#### Lack of support for `.mjs` or `.cjs`

Since we aim to support older environments that don't support the new ES module system, they may not recognize the `.mjs` or `.cjs` file extensions. Most modern tools and bundlers support the `.mjs` and `.cjs` file extensions, but they might also differ in how they treat these files. For example, [Vite](https://vitejs.dev) allows importing `.mjs` files without explicit file extensions, but Metro doesn't.

One way to avoid this issue is to use the `.js` file extension for both ESM and CommonJS files. But how do we specify the module system in this case? We can't use the `type` field in the project's `package.json` as it applies to all `.js` files. But we can create `package.json` files with a `type` field in each of the build folders:

```sh
my-library/
├── esm/
│   ├── index.js
│   └── package.json # { "type": "module" }
└── cjs/
     ├── index.js
     └── package.json # { "type": "commonjs" }
```

And then in the main `package.json`, we point to the respective `.js` files:

```json title="package.json"
{
  "main": "./cjs/index.js",
  "module": "./esm/index.js",
  "exports": {
    ".": {
      "import": "./esm/index.js",
      "require": "./cjs/index.js"
    }
  }
}
```

#### Lack of support for Platform-specific extension

When writing cross-platform code, such as code that supports React Native, we often use platform-specific extensions such as `.android.js`, `.ios.js`, `.native.js`, etc. However, this doesn't work with the explicit file extension requirement in ESM.

For example, let's say we have 2 files: `foo.android.js` and `foo.js`, and an import statement: `import foo from './foo'`. Normally the bundler would resolve `foo.android.js` for Android and `foo.js` for other platforms. But in ESM, the file extension is required, so the import statement would need to be `import foo from './foo.js'` - which would break the platform-specific resolution as now the bundler would always resolve `foo.js`.

Alternative approaches to handle this would be to:

- Use a separate CommonJS build that contains the platform-specific files, and can import them without specifying the file extension.
- Instead of separate files, use a single file with platform-specific logic conditionally executed based on the platform.

## TypeScript

### Configuration

When writing ES modules in TypeScript, it's necessary to configure the `module` and `moduleResolution` options in `tsconfig.json`:

```json title="tsconfig.json"
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "NodeNext"
  }
}
```

When the `module` option is set to `ESNext`, TypeScript generates ES module syntax in the output. It also requires file extensions in `import` statements.

### File extensions in `import` statements

When using TypeScript with ES modules, it's necessary to specify the `.js` file extensions in `import` statements:

```ts
import { foo } from './module.js';
```

In this case, the authored file `module.ts` would have the `.ts` extension and not `.js`, however, we need to specify the `.js` extension in the `import` statement to match the output file extension.

TypeScript has an option: `allowImportingTsExtensions: true` to write `./module.ts` instead of `./module.js` in the `import` statement. It's also possible to specify `moduleResolution: 'Bundler'` to allow omitting the file extension in the `import` statement. However, TypeScript compiler doesn't rewrite the imports to add the correct file extension, so unless they are added by another tool, the imports will fail at runtime.

TypeScript also supports `.mts` and `.cts` file extensions. However, they would still need another tool to rewrite the imports to add the correct file extension. So there's no real benefit to using these extensions when writing dual modules.

### Default exports

Default exports in TypeScript can be problematic. Let's consider the following code:

```js
const foo = 42;

export default foo;
```

This code works in ESM with the following:

```js
import foo from './module.js';

console.log(foo); // 42
```

However, when the code is compiled to CommonJS, the default export is converted to an object with a `default` property:

```js
const foo = 42;

exports.default = foo;
```

So now the import statement would need to be:

```js
const foo = require('./module.js').default;
```

This can be problematic when writing dual modules, as what we import in ESM is different from what we import in CommonJS. Ideally, we want the following CommonJS output:

```js
const foo = 42;

module.exports = foo;
```

We can get this output if we change the source code to the following:

```js
const foo = 42;

export = foo;
```

However, this is not compatible with compiling to ESM.

To workaround this issue, there are a 2 options:

- Use named exports instead of default exports.
- Add a wrapper for the CommonJS build that re-exports the default export with `export =`.

### Types in the `exports` field

When publishing dual module libraries, it's necessary to provide declaration files for both ESM and CommonJS modules. Declaration files can be specified using the `types` condition in the `exports` field:

```json
{
  "exports": {
    ".": {
      "import": {
        "types": "./esm/index.d.ts",
        "default": "./esm/index.mjs"
      },
      "require": {
        "types": "./cjs/index.d.ts",
        "default": "./cjs/index.cjs"
      }
    }
  }
}
```

## Useful tools

Writing dual module libraries can be complex, so here are some tools that can help:

- [`arethetypeswrong`](https://arethetypeswrong.github.io) - A tool to check if the types in the `exports` field of a `package.json` are correct.
- [`tshy`](https://github.com/isaacs/tshy) - A build tool that handles generating dual module builds and declaration files with minimal configuration.
- [`react-native-builder-bob`](https://callstack.github.io/react-native-builder-bob/build) - A build tool for React Native libraries that can rewrite imports to add the correct file extension for ESM compatibility.

## Conclusion

Writing dual module libraries has a lot of nuances and can be tricky. And some of the problems can take a lot of work to solve. I can only hope that soon Node.js will have [better interoperability between ESM and CommonJS](https://nodejs.org/api/esm.html#interoperability-with-commonjs) modules with synchronous `require` for ES modules without a flag and all tools to support the new module system.

But when writing libraries and wanting to support many environments, it's unfortunately necessary to deal with these complexities. I hope this post has helped you understand some of the challenges.
