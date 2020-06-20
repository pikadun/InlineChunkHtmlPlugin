# Inline chunk html plugin

Copy from [react-dev-utils](https://github.com/facebook/create-react-app/blob/master/packages/react-dev-utils/InlineChunkHtmlPlugin.js)

## `new InlineChunkHtmlPlugin(htmlWebpackPlugin: HtmlWebpackPlugin, tests: Regex[])`

This webpack plugin inlines script chunks into `index.html`.
It works in tandem with [HtmlWebpackPlugin](https://github.com/ampedandwired/html-webpack-plugin) 4.x.

```js
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var InlineChunkHtmlPlugin = require('inline-chunk-html-plugin');

// webpack config
var publicUrl = '/my-custom-url';

module.exports = {
  output: {
    // ...
    publicPath: publicUrl + '/',
  },
  // ...
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('public/index.html'),
    }),
    // Inlines chunks with `runtime` in the name
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime/]),
    // ...
  ],
  // ...
};
```
