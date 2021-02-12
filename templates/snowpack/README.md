# snowpack

A template using snowpack for svelte-phaser. It's the fastest option for development,
however it has issues with HMR as of snowpack v3.0. Specifically when you bind
to a svelte-phaser's `instance` prop, the HMR seems to break completely and requires
a full reload.

For this reason, I recommend the [svite](../svite) or [svite-ts](../svelte-ts) templates until HMR is fixed.

## Available Scripts

### npm start

Runs the app in the development mode.
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm run build

Builds the app for production to the `build/` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!
