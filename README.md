# Mojaloop Payment Manager UI

## Guidelines

### Styling

The project aims to use the BEM naming convention.

### Coding

The project uses TypeScript. Utility command `yarn lint` can help identifing wrong and missing types.

### Versioning

Versioning is done via `yarn version`. Usually a _patch_ version change is enough; if a new page/module is added, instead, a _minor_ change is required.

### Proxy

The UI is configured to use a proxy so that real apis deployed online can be used when developing locally. The proxy is available under the `server` folder and it can be run with `node index.js` or `yarn proxy`

### Pushing to the repo

Before merging any PR, make sure that:
- the version is incremented. the command `yarn version` should be used for this purpose.
- every changed line followes the styleguide pattern; the command `yarn prettier` should be used for this purpose.
- there are no linting issues; the command `yarn lint` should be used for this purpose.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn proxy`

Runs the proxy to connect to online apispac


### `yarn eject` - DON'T DO THIS

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `yarn prettier`

Runs prettier on the project source files.

### `yarn lint`

Runs ESLint on the project source files.

### `yarn serve`

Serves the production build on port 8080.

## Docker

### Building docker image

The command `docker build --build-arg API_BASE_URL=http://backend-url:3000 -t mojaloop-payment-manager-ui .` creates a docker image with the name `mojaloop-payment-manager-ui`. Exposes the UI on port 8080.

### Running the docker image

The command `docker run --rm -p 8080:8080 mojaloop-payment-manager-ui` runs the docker image binding the port 8080.

## Makefile

### Building the docker image

The command `make build` creates a docker image with the name `mojaloop-payment-manager-ui`. Exposes the UI on port 8080.

### Running the docker image

The command `make run` runs the docker image binding the port 8080.