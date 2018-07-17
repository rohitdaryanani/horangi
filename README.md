# Todo App using GraphQL

check the live version [here](https://horangi.netlify.com/)

### Tech stack

- **React** - frontend/view library
- **GrapQL** - for querying the API
- **Apollo Client** - Client Library for GraphQL

### Setup and Run

- `$ git clone https://github.com/rohitdaryanani/horangi.git && cd github` will download the app and cd to the folder once done.

- `npm install` - to install dependencies.
- `npm start` - Runs the app in development mode.
- `npm run build` - Builds the app for production to the build folder.

### Questions

- packages/libraries used.

  - [materializecss](https://materializecss.com//) - for quick css styles and ui
  - [react](https://facebook.github.io/react/) - awesome view library
  - [react-router](https://github.com/ReactTraining/react-router) - for routing
  - [GraphQL](https://graphql.org/) - for querying the API *really amazing*
  - [Apollo Client](https://graphql.org/) - client side library for graphql 
  - [create-react-app](https://github.com/facebookincubator/create-react-app) - react project generator by facebook this handles the initial file struture and zero configuration
  - [surge](https://surge.sh/) - for deploying frontend apps

- file structure

  - Top Level

  ```
  ├── README.md
  ├── build
  ├── node_modules
  ├── package.json
  ├── public
  │   ├── favicon.ico
  │   ├── index.html
  │   └── manifest.json
  └── src
      ├── components
      ├── mutations
      ├── queries
      ├── index.css
      ├── index.js
      ├── App.css
      ├── App.js
      ├── logo.svg
      └── registerServiceWorker.js
  ```

  - build - is the transpiled and minified source for the project and is used for deployment
  - src - is where are code is and is divided into 3 folders
    - components - interaction with the data and UI breaking them down by features
    - queries - GraphQL related queries
    - mutations - GraphQL related mutations

- create-react-app comes with a built in script to build, this handles our transpiling and minifying our code into a single js and CSS file. All we have to do is upload the build folder.
  For this project, I'm using `surge` for deployment.
