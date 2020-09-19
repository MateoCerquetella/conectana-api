


# 🌎 Ayudalo App Api | 2020

### Install

#### `yarn install express`
Global dependecies

#### `yarn install @types/node typescript rimraf ts-node nodemon --save-dev`
Developer local dependecies

### Scripts

#### `yarn run dev`

Starts the application in development using `nodemon` and `ts-node` to do hot reloading.

#### `yarn run build`

Builds the app at `build`, cleaning the folder first.

#### `yarn run start`

Starts the app in production by first building the project with `npm run build`, and then executing the compiled JavaScript at `build/index.js`.
