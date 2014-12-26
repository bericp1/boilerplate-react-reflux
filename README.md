# React/Reflux Boilerplate

A simple, opinionated project boilerplate/seed.

## Libraries/Features

### Front-end

| Library                                                 | Purpose                               |
| ------------------------------------------------------- | ------------------------------------- |
| [React](http://facebook.github.io/react/)               | View-controller layer                  |
| [Reflux](https://github.com/spoike/refluxjs)            | Uni-directional dataflow architecture |
| [react-router](https://github.com/rackt/react-router/)  | Declarative routing                   |
| [browserify](http://browserify.org/)                    | CommonJS module system                |
| [es5-shim](https://github.com/es-shims/es5-shim)        | Support for non-ES5 clients           |
| [jquery](http://jquery.com/)                            | For its utility methods (I'm *sorry*) |

### Back-end

| Library                                                 | Purpose                            |
| ------------------------------------------------------- | ---------------------------------- |
| [express v4](http://expressjs.com/)                     | Web app framework and routing      |
| [body-parser](https://github.com/expressjs/body-parser) | [Middleware] Request body parsing  |

### Build Toolchain

| Library                                                    | Purpose                               |
| ---------------------------------------------------------- | ------------------------------------- |
| [gulp](http://gulpjs.com/)                                 | Streaming build system                |
| [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)   | [Production] uglify js source         |
| [gulp-util](https://github.com/gulpjs/gulp-util)           | Logging in gulp, etc.                 |
| [gulp-concat](https://github.com/wearefractal/gulp-concat) | Concat'ing vendor scripts             |
| [browserify](http://browserify.org/)                       | Bundling front-end CommonJS modules   |
| vinyl-source-stream                                        | Make Browserify usable with gulp      |
| [reactify](https://github.com/andreypopp/reactify/)        | A React/JSX transform for browserify  |
| [watchify](https://github.com/substack/watchify)           | Efficient rebundling on changes       |

## Build tasks

### `$ gulp browserify`

Bundles `public/src/app.js` with browserify and places it in
`public/dist/app.js`.

### `$ gulp serve` or `$ gulp dev`

  1. runs `['vendor', 'copy']`
  2. bundles `public/src/app.js` with browserify to `public/dist/app.js`
  3. starts the server (`server.js`)
  4. fires up watchify which will rebundle on changes to any bundled files.
     Watchify uses a caching  system to make this a comparatively efficient
     operation.

### `$ gulp vendor`

Concats all vendor scripts specified in `config.build[NODE_ENV].vendor` into
`public/dist/vendor.js`

### `$ gulp copy`

Copies `public/{index.html,assets}` recursively to `public/dist` as is.

### `$ gulp build`

Should be used for building front end into public/dist where the server will
serve from. Alias for `['copy', 'browserify']`.

## Structure/Architecture

### Directories & Files

    ├─ config.js                : app config
    ├─ lib                      : first-party general node modules
    ├─ public
    │  ├─ dist                  : post-build output; served from here
    │  └─ src                   : front-end code
    │     ├─ assets             : static files; no build processing
    │     ├─ index.html         : app entry; usually no need to edit
    │     └─ js                 : all CommonJS modules for front-end
    │        ├─ app.js          : entry; exports root view-controller
    │        └─ [app-component] : a component of the app
    │           ├─ index.js     : entry point; exports view-controller
    │           ├─ actions.js   : Reflux actions for component
    │           └─ store.js     : Reflux store for component
    ├─ server.js                : entry point for express server
    ├─ start.js                 : starts `server.js` with defaults
    └─ config.js                : global app config; see [below](#config)

### Front-end

The front-end should be routed with `react-router`, utilizing `React` for the
view-controllers, all tied together with `Reflux`, a library-backed
app architecture that relies on uni-directional data-flow and convention over
configuration.

The entry point for the front end (`public/src/app.js`) should...

  - Build and render the root `Application` React view-controller
  - `require` each app component from their subdirs
  - describe the `react-router` routes
  - render the base application

See the example: [app.js](public/src/js/app.js).

Each app component should...
  - be separated into its own subdir within `public/src/js/`
  - be designated/named by the purpose it serves
  - have its own Reflux actions/stores and React view-controller(s)
    - React view-controllers can live in separate `*.jsx` files or be rendered
      in the app component's `index.js`
    - stores in `*-store.js` or simply `store.js`
    - and actions in `*-actions.js` or simply `actions.js`
  - export via `module.exports` in its `index.js` its root React view-controller

See either example: [react-example](public/src/js/react-example) or
[reflux-example](public/src/js/reflux-example)

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

Located in [`config.js`](config.js). Open up that file to see
defaults and general structure.

**Important**: Notice that the config can contain at its root two special
properties: `production` and `development` which will override the other config
options when the environment variable `NODE_ENV` is either `development` or
`production`.

For example, if

    config.server.port === 8000

but

    config.production.server.port === 80 && process.env.NODE_ENV === 'production'

then 80 will be favored by `server.js` over 8000. As a side note though,
`server.js` by default prefers the port passed directly to it via its options,
then the `PORT` environment variable, and finally `config.server.port`.
