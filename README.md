# gist-manager

A simple GitHub gist manager.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Project Setup

```sh
pnpm install
```

Add a `.env` file to the project's root with the following DEV app config:
```
VITE_GH_CLIENT_ID=7222e02319f9a6739f40
VITE_GH_GATEWAY_URL=https://lqhtbb6e6k.execute-api.eu-north-1.amazonaws.com/dev/
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```
