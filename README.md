## Installation

Install all dependencies
```shell script
$ yarn
-----------------------
Result:
Done in 30.53s.
```

Build components in defined workspaces
```shell script
$ yarn build
-----------------------
Result:
yarn run v1.19.1
yarn workspaces run build
npx directus-extension build
√ Done
Done in 4.58s.
```

Run docker compose
```shell script
$ docker compose up
-----------------------
Result:
directus  | 07:08:56 ⚠️  PUBLIC_URL is not a valid URL
directus  | 07:08:56 ✨ Loaded extensions: custom-interface
directus  | 07:08:56 ✨ Server started at port 8055
```

Directus reports loaded custom extensions from extension folder. If you don't see yours, then something went wrong.

Open browser and go to localhost:8055

Default login and password is defined in docker-compose.yml as env var for Directus

