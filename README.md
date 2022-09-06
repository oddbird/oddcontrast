# OddContrast

_OddBird's color contrast checker for modern CSS color formats_

[![Netlify Status](https://api.netlify.com/api/v1/badges/b5488a16-3ab0-4f72-b8cb-251d528babb8/deploy-status)](https://app.netlify.com/sites/oddcontrast/deploys)

## Developing

To develop with local versions of Node/Yarn, first install the frontend
dependencies with `yarn install`, then:

```bash
yarn dev

# or start the server and open the app in a new browser tab
yarn dev --open
```

## Developing (Docker-based)

If you are using VS Code devcontainers to manage Node/Yarn versions, open the
project folder and run "Re-open in container", then:

```bash
yarn dev

# or start the server and open the app in a new browser tab
yarn dev --open
```

## Building

To create a production version of your app:

```bash
yarn build
```

You can preview the production build with `yarn preview`.

## Deploying

The staging site is automatically deployed via Netlify to
<https://oddcontrast.netlify.app/> every time a commit is made on the `main`
branch.
