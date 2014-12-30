# React/Reflux Boilerplate

A simple, opinionated project boilerplate/seed.

## Libraries/Features

### Front-end

| Library                                                 | Purpose                               |
| ------------------------------------------------------- | ------------------------------------- |
| [React](http://facebook.github.io/react/)               | View-controller layer                 |
| [Reflux](https://github.com/spoike/refluxjs)            | Uni-directional dataflow architecture |
| [react-router](https://github.com/rackt/react-router/)  | Declarative routing                   |
| [browserify](http://browserify.org/)                    | CommonJS module system                |
| [es5-shim](https://github.com/es-shims/es5-shim)        | Support for non-ES5 clients           |
| [jquery](http://jquery.com/)                            | For its utility methods (I'm *sorry*) |
| sass/scss                                               | A CSS preprocessor                    |

### Back-end

| Library                                                 | Purpose                            |
| ------------------------------------------------------- | ---------------------------------- |
| [express v4](http://expressjs.com/)                     | Web app framework and routing      |
| [body-parser](https://github.com/expressjs/body-parser) | [Middleware] Request body parsing  |
| [mongoose](http://mongoosejs.com/)                      | MongoDB object modeling            |

### Build Toolchain

| Library/Service                                            | Purpose                               |
| ---------------------------------------------------------- | ------------------------------------- |
| [gulp](http://gulpjs.com/)                                 | Streaming build system                |
| [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)   | [Production] uglify js source         |
| [gulp-util](https://github.com/gulpjs/gulp-util)           | Logging in gulp, etc.                 |
| [gulp-concat](https://github.com/wearefractal/gulp-concat) | Concat'ing vendor scripts             |
| [gulp-sass](https://www.npmjs.com/package/gulp-sass)       | For processing sass/scss into css     |
| [gulp-cssmin](https://www.npmjs.com/package/gulp-cssmin)   | [Production] minify css               |
| [browserify](http://browserify.org/)                       | Bundling front-end CommonJS modules   |
| vinyl-source-stream                                        | Make Browserify usable with gulp      |
| [reactify](https://github.com/andreypopp/reactify/)        | A React/JSX transform for browserify  |
| [watchify](https://github.com/substack/watchify)           | Efficient rebundling on changes       |
| [Heroku](https://heroku.com)                               | Easy deployment (must add `mongolab`) |


## Getting Started

First off...

    $ git clone https://github.com/bericp1/boilerplate-react-reflux.git app-name
    $ cd app-name
    $ git remote remove origin # Remove the boilerplate as the origin
                               # You can optionally rename the remote

If you plan on deploying to heroku, also run the commands in the
[deployment](#deployment) section below.

In general, you build React components and their associated Reflux stores and
actions in separate directories within `public/src/scripts/`, `require` and use
them in `public/src/app.js` to build the root front-end app.

SASS styles go in `public/src/styles/` in `*.scss` files which then can be
`@import`ed into the entry stylesheet `public/src/styles/app.scss`.

Static files can go in `public/src/assets/`.

The compiled front-end is outputted to `public/dist/` from which it is served.

Server logic goes in `server.js` and separate express `Router`s in `routes/`,
which can use mongoose models deined in `models/` for persistent storage.

## Build tasks

### `$ gulp browserify`

Bundles `public/src/scripts/app.js` with browserify and places it in
`public/dist/app.js`.

### `$ gulp sass`

Processes `public/src/styles/app.scss` into CSS and places it in
`public/dist/app.css`. This means that all styles will be compiled into one
file (minified in production) and must be `@import`ed somewhere down the line
starting form `app.scss`. **Partials (`_*.scss`) are your friends.**

### `$ gulp serve` or `$ gulp dev`

  1. runs `['vendor', 'copy', 'sass']`
  2. bundles `public/src/scripts/app.js` with browserify to `public/dist/app.js`
  3. starts the server (`server.js`)
  4. fires up watchify which will rebundle on changes to any bundled files.
     Watchify uses a caching  system to make this a comparatively efficient
     operation.
  5. watches for changes to `public/src/styles/**/*.*` and runs `sass` task
  6. watches for changes to static files (`public/src/{index.html,assets/}`)
     and runs `copy` task

### `$ gulp vendor`

Concats all vendor scripts specified in `config.build.vendor.js` into
`public/dist/vendor.js`

### `$ gulp copy`

Copies `public/src/{index.html,assets}` recursively to `public/dist` as is.

### `$ gulp build`

Should be used for building front end into public/dist where the server will
serve from. Alias for `['copy', 'browserify', 'sass']`.

## Structure/Architecture

### Directories & Files

**Note:** These are all mostly just suggestions. Use whatever structure
you feel comfortable with. Just note that this structure is what I had in mind
while putting together this bootstrap.

    ├─ config.js                 : app config
    ├─ lib/                      : first-party general node modules
    ├─ public/
    │  ├─ dist/                  : post-build output; served from here
    │  └─ src/                   : front-end code
    │     ├─ assets/             : static files; no build processing
    │     ├─ index.html          : app entry; usually no need to edit
    │     ├─ styles/             : all sass/scss styles for the frontend
    │     │  └─app.scss          : entry for styles; use @import here
    │     ├─ lib/                : re-usable modules for front-end
    │     └─ scripts/            : all CommonJS modules for front-end
    │        ├─ app.js           : entry; exports root view-controller
    │        └─ [app-component]/ : a component of the app
    │           ├─ index.js      : entry point; exports view-controller
    │           ├─ actions.js    : Reflux actions for component
    │           ├─ store.js      : Reflux store for component
    │           └─ my-view.jsx   : A related React view-component
    ├─ server.js                 : entry point for express server
    ├─ start.js                  : starts `server.js` with defaults
    ├─ routes/                   : modules that export an express `Router`
    ├─ models/                   : modules that export mongoose models
    └─ config.js                 : global app config; see [below](#config)

### Front-end

The front-end should be routed with `react-router`, utilizing `React` for the
view-controllers, all tied together with `Reflux`, a library-backed
app architecture that relies on uni-directional data-flow and convention over
configuration.

The entry point for the front end (`public/src/scripts/app.js`) should...

  - Build and render the root `Application` React view-controller
  - `require` each app component from their subdirs
  - describe the `react-router` routes
  - render the base application

See the example: [app.js](public/src/scripts/app.js).

Each app component should...
  - be separated into its own subdir within `public/src/scripts/`
  - be designated/named by the purpose it serves
  - have its own Reflux actions/stores and React view-controller(s)
    - React view-controllers can live in separate `*.jsx` files or be rendered
      in the app component's `index.js`
    - stores in `*.store.js` or simply `store.js`
    - and actions in `actions.js`
  - export via `module.exports` in its `index.js` its root React view-controller

See either example: [react-example](public/src/scripts/react-example) or
[reflux-example](public/src/scripts/reflux-example)

For SCSS styles, its recommended to have a separate `*.scss` file in
`public/styles` for each app component which can then be `@import`ed into
`app.scss`. For naming classes, its recommended to use component specific
prefixes (perhaps separated form the rest of the class name with a double dash
`--`) to avoid naming conflicts.

### Back-end

Note that the back-end is much more free-from and flexible but these are my
formal suggestions when it comes to structure/architecture.

#### Routing

Create individual modules in `routes/` that export express `Router`s. It is
recommended for the sake of organization to use file names/paths that directly
correlate to the mount path of each `Router`.

For example, if we're mounting an api endpoint to access posts at `/api/posts`,
you might want to create the route in the file `routes/api.posts.js` or
`routes/api/posts.js`. I personally prefer the former.

#### Mongoose

Mongoose is included in this bootstrap. I would recommend exporting mongoose
models in modules in the `models/` directory so that they can be included by
routes on an as-needed bases without having to access mongoose's internal
model registry-thing.

## Deployment

Ready to deploy to Heroku after the `mongolab` addon is added to the heroku
app along with the proper `NODE_ENV` environment variable:

    $ heroku apps:create app-name
    $ heroku config:set NODE_ENV=production
    $ heroku addons:add mongolab
    $ git push heroku master

`package.json` is configured with the correct `start` script so that `Procfile`
is auto-generated and the correct `postinstall` script so that `gulp build` is
run when a new commit is pushed live, building the app. The port to run on
and the URI to use to access mongodb will also be properly detected.

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
