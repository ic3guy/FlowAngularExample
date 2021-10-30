# How to get FCL working with Angular 12

Angular used to provide built-in polyfills, Webpack 4 did as well for node core calls. Here we are telling webpack that we actually do need these node specific polyfills.

While the Angular team says that anything running in an Angular app shouldn't rely on node specific calls, we have no choice due to the third party dependencies that rely on some node specific stuff. The stream-http and https-browserify to me seem to be ok to use in the browser, even if it isn't canonical Angular use.

In a `custom-webpack.config.ts` file:

```js
const webpack = require('webpack')  

module.exports = { 
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            process: 'process/browser'
        })],
    resolve: { 
        fallback: { 
            "http": require.resolve('stream-http'),
            "https": require.resolve('https-browserify'),
            "buffer": require.resolve('buffer'),
            "process": require.resolve('process/browser')
        } 
    }
}
```
along with a global window polyfill in `polyfills.ts`

`(window as any).global = window;`

To use a custom webpack config one must

`npm install stream-http https-browserify buffer process @angular-builders/custom-webpack`

In `angular.json` change the following

```diff
"architect": {
        "build": {
-         "builder": "@angular-devkit/build-angular:browser", 
+         "builder": "@angular-builders/custom-webpack:browser"
         ...
          "options": {
          ...
            "customWebpackConfig": {
              "path": "./custom-webpack.config.ts"
            },
            "allowedCommonJsDependencies": [
              "buffer",
              "@improbable-eng/grpc-web-node-http-transport"
            ]
          }
...
        "serve": {
-         "builder": "@angular-devkit/build-angular:dev-server",
+         "builder": "@angular-builders/custom-webpack:dev-server",
````

The `allowedCommonJsDependencies` is telling angular that we know what we are doing. Again it would be great if those third party dependencies didn't use CommonJS but we are a little stuck here. The Angular docs claim that bundle sizes could be larger, but for a proof of concept, I'm ok with doing this.

# Development Points

In `flow.service.ts` I've redirected `fcl.currentUser().subscribe()` to a ReplaySubject so that other components and services can consume the call in an Angular native way.

Furthermore, I've given examples of how the script and transaction calls can be transformed into observables. The RxJS `defer()` function only creates the observable when the wrapped function is subscribed to. This allows for consumption in components using async pipes quite easily and for use in observable pipelines.

In `flow.service.spec.ts` rxjs marble testing is used to verify that user forwarding is consumed by the `getInitializationState()` Cadence script wrapper.