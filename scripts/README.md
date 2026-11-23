# Scripts

Run a TypeScript script with `node --env-file-if-exists=.env.local --import ./scripts/alias-loader.mjs scripts/<name>.ts`. Node 22.18 or newer strips the types, and `alias-loader.mjs` resolves the `@/` alias and extensionless imports, so scripts reuse `src/` code without a build step. Node type stripping does not support enums, parameter properties or `.tsx` files.
