# Svelte Demo

http://scott.maclure.info/svelte-demo/

## Running

Install deps:

```
npm install -g http-server svelte-cli rollup
```

Generate test data:

```
node scripts/generate-data.js
```

Compile for simple script inclusion as an iife:

```
svelte compile -f iife  -i src -o docs
```

Run a local server:

```
http-server docs
```

http://localhost:8080/

## TODO

- [x] Initial setup with 1k rows, delete row functionality
- [x] Deploy to github
- [x] Split HelloWorld into a couple of subcomponents
- [ ] Add a search/filter component above table (update data.json to be more diverse)
- [ ] Add a build system (rollup)
- [ ] Testing components individually (Mocha)