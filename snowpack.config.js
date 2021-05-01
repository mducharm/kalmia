const package = require('./package.json');
process.env.SNOWPACK_PUBLIC_PACKAGE_VERSION = package.version;
process.env.SNOWPACK_PUBLIC_SERVICE_WORKER = 'sw.js';

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: '/',
    src: '/_dist_'
  },
  plugins: [
    ['@snowpack/plugin-svelte'],
    ['@snowpack/plugin-typescript'],
    [
      '@snowpack/plugin-webpack',
      {
        extendConfig: (config) => {
          const { glob } = require("glob");
          const { InjectManifest } = require('workbox-webpack-plugin');
          const additionalManifestEntries = [
            ...glob.sync("*.{png,html,json,txt}", { cwd: './build' })
          ].map((e) => ({ url: e, revision: process.env.SNOWPACK_PUBLIC_PACKAGE_VERSION }));

          config.plugins.push(
            new InjectManifest({
              "mode": "development",
              "additionalManifestEntries": additionalManifestEntries,
              "swSrc": "./_dist_/serviceWorker.js",
              "swDest": process.env.SNOWPACK_PUBLIC_SERVICE_WORKER
            })
          );
          return config;
        },
      },
    ]
  ],
  packageOptions: {
    "packageLookupFields": ["svelte", "module", "main"]
  },
  devOptions: {
    port: 5000
  },
  buildOptions: {
    /* ... */
  },
  routes: [
    { match: 'routes', src: '.*', dest: '/index.html' },
  ],
  alias: {
    "components": "./src/components"
  }
};
