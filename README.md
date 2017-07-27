# Svelte Demo

http://scott.maclure.info/svelte-demo/

## Running

Install globals and locals

```
npm install -g http-server svelte-cli rollup eslint eslint-plugin-html node-check-updates
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
- [ ] Add a router, add "pages" (splash screen, Users table, User edit screen)
- [ ] Testing components individually (Mocha)
- [ ] Add a11y test automation and update app with a11y
- [ ] Support older browsers using babel (see rollup-starter-project) (css vars issue)