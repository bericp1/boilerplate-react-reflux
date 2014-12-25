# React/Reflux Boilerplate

A simple, opinionated project boilerplate/seed.

## Libraries

### Front-end

  - **Component-view layer**
    - [React](http://facebook.github.io/react/)
  - **Uni-directional dataflow architecture**
    - [Reflux](https://github.com/spoike/refluxjs)
  - **Declaritive routing**
    - [react-router](https://github.com/rackt/react-router/)
  - **CommonJS module system**
    - [browserify](http://browserify.org/)
  - **Support for non-ES5 browsers**
    - [es5-shim](https://github.com/es-shims/es5-shim)


### Back-end

  - **Streaming build system**
    - [gulp](http://gulpjs.com/)
    - [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
    - [browserify](http://browserify.org/)
    - [reactify](https://github.com/andreypopp/reactify/)
  - **Web app framework**
    - [express v4](http://expressjs.com/)
    - [body-parser](https://github.com/expressjs/body-parser)

## Structure/Architecture

### Directories

  - `lib`: first-party, general node modules used on server side or in build
    process
  - `public`
    - `src`: all front-end code
      - `assets`: static files that don't need build processing
      - `js`: all front-end common.js modules
        - `app.js`: entry point
      - `index.html`
    - `dist`: post-build output; site is served from here
      - `assets`: copied directly from `../src/assets`
      - `app.js`: browserify bundle of `../src/app.js`
      - `vendor.js`: concatenated third-party libraries
      - `index.html`: copied directly from `../src/index.html`
  - `config.js`: global configuration; see [below](#config)
  - `server.js`: entry point for expressjs server

### Front-end

**Notice**: This is all theory at this point. I'm not even sure it'll work this
way.

The front-end should be routed with `react-router`, utilizing `React` for the
view-controller components, all tied together with `Reflux`, a library-backed
app architecture that relies on uni-directional data-flow and convention over
configuration.

The entry point for the front end (`public/src/app.js`) should...

  - Build and render the root `Application` React component
  - `require` each section appropriately (see below)
  - describe the `react-router` routes
  - render the base application

Preferably, each section of the front-end should...
  - be separated into its own directory within `public/src/js/`
  - be designated by the purpose it serves
  - have its own Reflux actions/stores and React view-controller(s)
    - React view-controllers should live in separate `*.jsx` files
    - stores in `*-store.js` files
    - and actions in `*-actions.js` files
  - likely have its own modules such as services for fetching server data
  - export via `module.exports` in its `index.js` or other entry point its root
    React view-component


All front-end-related code goes in the `public/src` directory. The build process
will...

  1. Use browserify to bundle `public/src/app.js`
    - `reactify` is used to transform JSX files
  2. Place that bundle in `public/dist/app.js`
    - And uglify it if `NODE_ENV` is `production`
  3. Concat all third-party libraries listed in `config.build[NODE_ENV].vendor`
  4. Output that to `public/dist/vendor.js`
  5. Copy `public/src/index.html` and `public/src/assets` to `public/dist` as is

### Back-end

There's no explicit structure for the server side. It may be neatest to create a
`routes` directory to enforce some sort of structure and to abstract away as
much as possible into modules that can be placed in `lib`.

## Deployment

Ready to deploy to Heroku. `package.json` is configured with the correct `start`
script so that `Procfile` is auto-generated and the correct `postinstall`
script so that `gulp build` is run when a new commit is pushed live, building
the app.

## Config

Located in [`config.js`](blob/master/config.js). The general structure and
defaults are shown for each config section.

### `config.build`

There are two different sets of configuration `build.development` OR
`build.production`. Which is used is determined explicitly by `NODE_ENV`.

Both should have the exact same structure (defaults are shown as if `NODE_ENV`
were `development`):

    {
      // All of the following scripts will
      vendor: [
        './node_modules/es5-shim/es5-shim.js'
      ]
    }

### `config.server`

    {
      port: 8000
    }
