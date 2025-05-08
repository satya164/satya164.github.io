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
2. Node.js code written with CommonJS modules can only import ESM code asynchronously with dynamic `import` syntax on older versions of Node.js (< 20.19.0), so providing a CommonJS version is necessary for synchronous usage.

Essentially, providing both ESM and CommonJS modules is a way to move to ESM without a breaking change when supporting older environments.

If you don't need to support legacy environments, you can publish your library as an ESM-only package which is much simpler.

> [!NOTE]
>
> [Synchronous require for ESM](https://nodejs.org/api/esm.html#interoperability-with-commonjs) is now [unflagged in Node.js 22](https://github.com/nodejs/node/pull/55085) and [has been backported to Node.js 20.19.0](https://github.com/nodejs/node/pull/56927). So if you're targeting Node.js 20 or later, consumers still using CommonJS can seamlessly use your library without needing to publish a dual module setup - unless you use [top-level `await`](https://v8.dev/features/top-level-await).

## Entry points in `package.json`

The `package.json` can contain various fields that point to the file that should be loaded when the package is imported or required.

The most common fields are:

- `main`: This field has been supported in Node.js for a long time and points to the CommonJS entry point. This is supported by the majority of tools and bundlers.
- `module`: This field is used by bundlers like [webpack](https://webpack.js.org) or [Rollup](https://rollupjs.org/) to load the ESM entry point. This field is not supported in Node.js.
- `exports`: This field is a newer addition to the `package.json` specification and allows specifying [multiple entry points for different environments conditionally](https://nodejs.org/api/packages.html#conditional-exports).

In addition, if you're writing client-side code, you may have come across the following fields:

- `browser`: This field is used to specify a different entry point for client-side code for the browser. This field is used by bundlers such as webpack and Rollup.
- `react-native`: This field is used to specify a different entry point for React Native environments. This field is supported by bundlers like [Metro](https://metrobundler.dev) on versions older than 0.82.0 (newer versions use the `exports` field).

When writing dual modules, we'd want to use the `exports` field to specify both ESM and CommonJS entry points, while also providing the `main` and `module` fields for backwards compatibility.

## The `exports` field in `package.json`

The `exports` field in `package.json` allows specifying multiple entry points for different environments conditionally. It can be used to specify ESM and CommonJS entry points for dual module libraries.

Here we'll cover the 2 most common cases. You can find more information in the [official Node.js documentation for entry points](https://nodejs.org/api/packages.html#package-entry-points).

### Conditional exports

The `exports` field specifies conditions for different environments. Think of it like an if-else statement - the module resolution goes through each of the conditions one by one and uses the first one that matches.

A basic example of `exports` field would be:

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
      "react-native": "./dist/react-native.js",
      "browser": "./dist/browser.js",
      "module": "./dist/module.js",
      "default": "./dist/index.js"
    }
  }
}
```

In the above example, the conditions are matched as follows:

- When the package is imported in a browser environment, the `browser` condition is used
- When the package is imported in a bundler environment (e.g. [webpack](https://webpack.js.org/), [rollup.js](https://rollupjs.org/)), the `module` condition is used
- When the package is imported in a React Native environment, the `react-native` condition is used
- If none of the above conditions matches, the `default` condition is used

What conditions are available depends on the environment and the tooling used for module resolution.

**The order of the conditions is important**. Multiple conditions may match, e.g. if we have the conditions `node` and `require` - both would match when the package is required in Node.js. In this case, the first condition that matches is used:

```json title="package.json"
// This is not correct
{
  "exports": {
    ".": {
      "require": "./cjs/index-node.js",
      "node": "./esm/index-node.js"
    }
  }
}
```

In the above example, the `require` condition would always match first, so the `node` condition would never be used. The correct order would be:

```json title="package.json"
{
  "exports": {
    ".": {
      "node": "./esm/index-node.js",
      "require": "./cjs/index-node.js"
    }
  }
}
```

It is recommended to use the most specific conditions first, and the most general conditions last.

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

This can be useful if you want to have more specific conditions for certain environments.

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

CommonJS and ESM have different semantics, with [different sets of features and limitations](https://nodejs.org/api/esm.html#differences-between-es-modules-and-commonjs). This means that we need to be explicit about which module system we're using.

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

## The `import.meta` object

The `import.meta` object is a special object with null-prototype that contains metadata about the module. As per the [specification](https://tc39.es/proposal-import-meta/), each tool can add its own properties to the `import.meta` object. This means that the `import.meta` object is not guaranteed to be the same across different tools and environments.

For example, most tools support the `import.meta.url` property, which is a URL string representing the module's location, whereas there are many properties only supported by specific tools:

- Node.js adds [`import.meta.resolve`](https://nodejs.org/api/esm.html#importmetaresolvespecifier) and more
- Webpack adds [`import.meta.webpackHot`](https://webpack.js.org/api/module-variables/#importmetawebpackhot), [`import.meta.webpackContext`](https://webpack.js.org/api/module-variables/#importmetawebpackcontext) and more
- Vite adds [`import.meta.env`](https://vite.dev/guide/env-and-mode) and more

Additionally, the `import.meta` syntax is currently not supported in [Metro](https://metrobundler.dev/) (React Native) and will result in a syntax error.

So relying on properties from `import.meta` may lock your library into supporting only those specific tools.

More importantly, it is only available in ES modules and will result in a syntax error if used in CommonJS modules. So it's not appropriate to use `import.meta` when writing dual module libraries.

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

// Export as default export to simulate CommonJS behavior
export default myModule;
```

Here the wrapper imports the CommonJS module and exports the individual properties as named exports so that they can be individually imported in ESM:

```js
import { foo, bar } from 'my-module';

console.log(foo, bar);
```

Or with namespace import:

```js
import * as myModule from 'my-module';

console.log(myModule.foo, myModule.bar);
```

It also exports the entire module as a default export which lets us import the module as follows:

```js
import myModule from 'my-module';

console.log(myModule.foo, myModule.bar);
```

A CommonJS module can be imported as a default import as well as namespace import when imported in a ESM environment. So this approach emulates this behavior in the ESM wrapper.

Then in your `package.json`, you'd specify the `exports` field to point to the ESM wrapper for ESM environments and the CommonJS module for CommonJS environments, as well as fallbacks with `main` and `module` fields:

```json title="package.json"
{
  "type": "commonjs",
  "main": "./my-module.js",
  "exports": {
    ".": {
      "import": "./esm-wrapper.mjs",
      "require": "./my-module.js"
    }
  }
}
```

This avoids the need to refactor all of your code to ESM, and gradually migrate to ESM over time by adding ESM-only exports in the wrapper. This also avoids [the dual package hazard](#dual-package-hazard).

However, this approach has a few downsides:

- The ESM wrapper needs to be maintained manually, so it can be error-prone to keep it in sync with the CommonJS code.
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

With this approach, the ESM and CommonJS versions of the package are treated as separate modules by Node.js as they are different files, leading to [potential issues](https://nodejs.org/docs/latest-v19.x/api/packages.html#dual-package-hazard) if the package is both imported and required in the same runtime environment.

If the package relies on any state that can cause issues if 2 separate instances are loaded, it's necessary to isolate the state into a separate CommonJS module that can be shared between the ESM and CommonJS builds.

This is not an issue if it's safe to have 2 separate instances of the package loaded in the same environment, which is often the case for most libraries.

#### Mismatched module type

The `import` and `require` conditions only tell Node.js which file to load when the package is imported or required, but they don't say which module system is used in the file. In Node.js, the module system is determined by the file extension or the `type` field in `package.json`. By default, all `.js` files are treated as CommonJS files unless the `type` field is set to `module`.

So it's possible to specify an ES module in the `require` condition and a CommonJS module in the `import` condition, which may not work as expected.

To avoid this footgun, you can do any of the following:

- Avoid using `.js` files and use the `.cjs` and `.mjs` file extensions to specify the module system.
- Specify `type: 'commonjs'` in `package.json` to treat all `.js` files as CommonJS and use `.mjs` files for the ESM build.
- Specify `type: 'module'` in `package.json` to treat all `.js` files as ESM and use `.cjs` files for the CommonJS build.

#### Lack of support for `.mjs` or `.cjs`

Since we aim to support older environments that don't support the new ES module system, they may not recognize the `.mjs` or `.cjs` file extensions. Most modern tools and bundlers support the `.mjs` and `.cjs` file extensions, but they might also differ in how they treat these files. For example, [Vite](https://vitejs.dev) allows importing `.mjs` files without explicit file extensions, but [Metro](https://metrobundler.dev) doesn't.

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
- Omit the extension from the import statement - while this won't work on Node.js, bundlers such as Metro, Webpack etc. still support ESM without file extensions.

#### Tool specific conditions

An alternative approach to specifying `import` and `require` conditions is to use tool-specific conditions instead to specify different builds for different tools.

This has the benefit of avoiding [dual package hazard](#dual-package-hazard) entirely since each tool would only load the version of the module that it supports, and not based on whether `import` or `require` is used to load the module.

For example, here is a setup that uses ESM for Webpack, Vite, Rollup, Metro (React Native) and Node.js, and CommonJS for the rest:

```json title="package.json"
{
  "main": "./cjs/index.js",
  "module": "./esm/index.js",
  "exports": {
    ".": {
      "react-native": "./esm/index.js",
      "module": "./esm/index.js",
      "module-sync": "./esm/index.js",
      "default": "./cjs/index.js"
    }
  }
}
```

Here, we specify 4 conditions:

- `react-native`: Used when the library is imported in a React Native environment with Metro.
- `module`: Used when the library is imported in some bundlers such as Webpack, Vite or Rollup.
- `module-sync`: Used when the library is imported on Node.js 22.10.0+ - regardless of whether it's imported with `import` or `require`.
- `default`: Fallback used when the library is imported in an environment that doesn't support the other conditions.

This way, we can specify the appropriate conditions based on the tools we want to support. This is more verbose than a classic dual module setup, but it avoids the dual package hazard, so it's worth considering for libraries where this is a concern.

A list of conditions supported in various tools can be found in the following resources:

- [Runtime Keys proposal specification](https://runtime-keys.proposal.wintercg.org/)
- [Webpack documentation](https://webpack.js.org/guides/package-exports/#conditions)
- [Node.js documentation](https://nodejs.org/docs/latest/api/packages.html#community-conditions-definitions)

## TypeScript

### Configuration

When writing ES modules in TypeScript, it's necessary to configure the `module` and `moduleResolution` options in `tsconfig.json`:

```json title="tsconfig.json"
{
  "compilerOptions": {
    "module": "nodenext",
    "moduleResolution": "nodenext"
  }
}
```

When the `module` option is set to `nodenext` (or `node16`), TypeScript generates ES module syntax in the output. It also requires file extensions in `import` statements.

### File extensions in `import` statements

When using TypeScript with ES modules, it's necessary to specify the `.js` file extensions in `import` statements:

```ts
import { foo } from './module.js';
```

In this case, the authored file `module.ts` would have the `.ts` extension and not `.js`, however, we need to specify the `.js` extension in the `import` statement to match the output file extension.

TypeScript has an option: `allowImportingTsExtensions: true` to write `./module.ts` instead of `./module.js` in the `import` statement. It's also possible to specify `moduleResolution: 'bundler'` to allow omitting the file extension in the `import` statement. However, TypeScript compiler doesn't rewrite the imports to add the correct file extension, so unless they are added by another tool, the imports will fail at runtime.

TypeScript also supports `.mts` and `.cts` file extensions. When these extensions are used in combination with `module: 'NodeNext'`, TypeScript generates ESM and CommonJS output accordingly. It can be useful if you explicitly want to specify a module system for a file. However, for our setup where we always author ESM and generate 2 builds for ESM and CommonJS, using these extensions will complicate the build process.

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

When publishing dual module libraries, it's necessary to provide separate declaration files for both ESM and CommonJS modules. Declaration files can be specified using the `types` condition in the `exports` field:

```json
{
  "exports": {
    ".": {
      "import": {
        "types": "./esm/index.d.ts",
        "default": "./esm/index.js"
      },
      "require": {
        "types": "./cjs/index.d.ts",
        "default": "./cjs/index.js"
      }
    }
  }
}
```

In the above case, either a `package.json` in each build folder containing a `type` field, or the file extension (`.d.mts` or `.d.cts`) can be used to specify the module system.

If we don't have separate declaration files for each module system, it will cause issues:

#### CommonJS types

If the library's `package.json` has no `type` field or `type: 'commonjs'`, the types will be treated as CommonJS types, i.e. types representing a CommonJS build.

This will result in incorrect types when the library is imported with `import`, as the ESM build will get imported which doesn't match the types. Consider the following example:

```js title="my-library/esm/index.mjs"
export const foo = 42;
```

Now, when the library is imported, TypeScript will allow the following:

```ts
import lib from 'my-library';

console.log(lib.foo);
```

This would've worked if the CommonJS build was being used, however, since the ESM build is being used, the above code won't work during runtime as the library doesn't have a default export. The correct code would be:

```ts
import { foo } from 'my-library';

console.log(foo);
```

#### ESM types

If the library's `package.json` has `type: 'module'`, the types will be treated as ESM types, i.e. types representing an ESM build.

In this case, TypeScript will produce an error when the library is imported with `require` or with `import` in a project with CommonJS output, as the CommonJS build will get imported which doesn't match the types:

```sh
The current file is a CommonJS module whose imports will produce 'require' calls;
however, the referenced file is an ECMAScript module and cannot be imported with 'require'.
Consider writing a dynamic 'import("my-library")' call instead.
To convert this file to an ECMAScript module, create a local package.json file with `{ "type": "module" }`.
```

This happens because it's currently not possible to import ESM modules synchronously from CommonJS modules in Node.js. However, we're using the CommonJS build during runtime, so this error is incorrect.

### Custom conditions

When using conditions other than `import` and `require`, such as the ones shown in the [Tool specific conditions](#tool-specific-conditions) section, TypeScript may need additional configuration to recognize the conditions.

For example, let's say we have a `module` condition in the `exports` field:

```json title="package.json"
{
  "exports": {
    ".": {
      "module": {
        "types": "./esm/index.d.ts",
        "default": "./esm/index.js"
      },
      "default": {
        "types": "./cjs/index.d.ts",
        "default": "./cjs/index.js"
      }
    }
  }
}
```

Here, we'd also want to specify a `types` field for the `module` condition due to the reasons we outlined in the [Types in the `exports` field](#types-in-the-exports-field) section.

For TypeScript to recognize the `module` condition, we need to specify it in the [`customConditions`](https://www.typescriptlang.org/tsconfig/#customConditions) field under `compilerOptions` in `tsconfig.json`:

```json title="tsconfig.json"
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "customConditions": ["module"]
  }
}
```

When publishing a library, it's also crucial to document that consumers need to add the `customConditions` field to their `tsconfig.json` file.

In some environments such as React Native, the default TypeScript configuration is already set up to recognize conditions such as `react-native`, so no additional configuration is needed.

## Useful tools

Writing dual module libraries can be complex, so here are some tools that can help:

- [`arethetypeswrong`](https://arethetypeswrong.github.io) - A tool to check if the types in the `exports` field of a `package.json` are correct.
- [`tshy`](https://github.com/isaacs/tshy) - A build tool that handles generating dual module builds and declaration files with minimal configuration.
- [`react-native-builder-bob`](https://callstack.github.io/react-native-builder-bob/build) - A build tool for React Native libraries that can rewrite imports to add the correct file extension for ESM compatibility.

## Wrapping up

Writing dual module libraries has a lot of nuances and can be tricky. And some of the problems can take a lot of work to solve.

Here are my recommendations:

- Use `.js` extensions for both ESM and CommonJS builds with a `package.json` file in each build folder to specify the module system (`type: 'module'` for ESM and `type: 'commonjs'` for CommonJS).
- Use `.ts` extension for TypeScript files instead of `.mts` or `.cts` so that we get `.js` output files
- Use `.js` extension in the import statements when importing TypeScript files, unless another tool rewrites the imports to add the correct file extension.
- If you need to support platform-specific extensions, don't use `.js` extension for imports to avoid breaking platform-specific resolution.
- Use named exports instead of default exports to avoid inconsistent output between ESM and CommonJS builds when compiling with TypeScript or Babel.
- Don't use `import.meta` in dual module libraries as it will result in a syntax error in the CommonJS build.
- Be mindful of the order of conditions in the `exports` field and use the most specific conditions first.
- Consider using [tool-specific conditions](#tool-specific-conditions) with [custom conditions in TypeScript](#custom-conditions) instead of a classic dual module setup to avoid dual package hazard.
- Use tools like `tshy` or `react-native-builder-bob` to simplify the build process instead of maintaining it manually.

A typical `package.json` for such a setup would look like this:

```json title="package.json"
{
  "main": "./cjs/index.js",
  "module": "./esm/index.js",
  "exports": {
    ".": {
      "import": {
        "types": "./esm/index.d.ts",
        "default": "./esm/index.js"
      },
      "require": {
        "types": "./cjs/index.d.ts",
        "default": "./cjs/index.js"
      }
    }
  }
}
```

In this setup:

- The `esm` and `cjs` folders contain the ESM and CommonJS builds respectively.
- The `esm` folder contains a `package.json` with the content `{ "type": "module" }`.
- The `cjs` folder contains a `package.json` with the content `{ "type": "commonjs" }`.

This should cover most of the issues you might encounter when writing dual module libraries. Unfortunately, you may still run into some edge cases in more specialized setups, but hopefully, this post has given you a good starting point.
