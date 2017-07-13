# Svelte Demo

http://scott.maclure.info/svelte-demo/

## Running

Install globals and locals

```
npm install -g http-server svelte-cli rollup
npm install
```

(Re)Generate test data:

```
node scripts/generate-data.js
```

Build bundle.js, run server and open browser:

```
npm start
```

## TODO

- [x] Initial setup with 1k rows, delete row functionality
- [x] Deploy to github
- [x] Split HelloWorld into a couple of subcomponents
- [x] Add a build system (rollup), update readme
- [x] Move all data modification code into main.js (out of components) (leaving isLoading alone for now)
- [ ] Add a search/filter component above table (update data.json to be more diverse)
- [ ] Add A-Z/Z-A sorting by clicking in the headers
- [ ] Testing components individually (Mocha)
- [ ] Add a router, add "pages" (splash screen, Users table, User screen)
- [ ] Support older browsers using babel (see rollup-starter-project)