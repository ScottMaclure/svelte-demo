# Svelte Demo

http://scott.maclure.info/svelte-demo/

## Running

Install globals and locals

```
npm install -g http-server svelte-cli rollup eslint eslint-plugin-html
npm install
```

(Re)Generate test data:

```
node scripts/generate-data.js
```

Build initial bundle.js, run server:

```
npm start
```

And open http://127.0.0.1:8080

While server is running, run app (rollup) in watch mode:

```
npm run watch
```

## TODO

- [x] Initial setup with 1k rows, delete row functionality
- [x] Deploy to github
- [x] Split HelloWorld into a couple of subcomponents
- [x] Add a build system (rollup), update readme
- [x] Move all data modification code into main.js (out of components) (leaving isLoading alone for now)
- [x] Add sort asc/desc feature in table header.
- [x] Refactor "processed items" (sorted & filtered) into computed property.
- [x] Setup eslint with some defaults.
- [x] Add rollup-watch (https://github.com/rollup/rollup-watch) for dev
- [x] Add a search/filter component above table
- [x] Add a basic router, add "pages/routes" (splash screen, Users table) - use History API (pushState)
- [x] Remember filtering and sorting between routes (main.js)
- [x] unicode icons for delete, edit
- [x] Config.js for shared/common config values between components
- [x] Support lazy load of items for direct page load of edit route (#EditUser/1)
- [x] Add support for loading commonjs node_modules (lodash isEqual, etc)
- [ ] Add a user edit screen, combine with router, save
- [ ] Refactor edit user to add user, auto-inc the id
- [ ] Replace html table with a grid of "cards" or similar (https://gridbyexample.com/patterns/header-asmany-footer/)
- [ ] Edit user - add validation to the input fields
- [ ] Use svelte-router, see if it works well
- [ ] Use router5, replace basic routing solution
- [ ] Testing main.js data functions independently of components (SvelteDemoApp mock?) (https://github.com/ModuleLoader/es-module-loader)
- [ ] Testing components individually (Mocha)
- [ ] Add a11y test automation and update app with a11y
- [ ] Support older browsers using babel (see rollup-starter-project) (css vars issue)