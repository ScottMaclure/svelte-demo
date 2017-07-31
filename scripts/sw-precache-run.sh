
var path = require('path');
var swPrecache = require('sw-precache');
var rootDir = 'docs';

swPrecache.write(
  path.join(rootDir, 'service-worker.js'),
  {
    staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif}'],
    stripPrefix: rootDir
  },
  () => {
    console.log('done')
  }
);