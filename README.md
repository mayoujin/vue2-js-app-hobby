# Vue.JS 2 Code Sample App of Hobby Lists
Vue.JS 2 project with soft DDD approaches in separating entities, view models and domain services a.k.a use cases.

## [Live](https://mayoujin.github.io/vue2-js-app-hobby/)

## Core tools and technologies

### Core
- [VueJS 2](https://vuejs.org/)
- [REST API](https://mockapi.io/projects) – Frontend mock API provider
- [Vuex 3](https://vuex.vuejs.org/) - Local State Manager

### Infrastructure
- [Vue CLI 4](https://cli.vuejs.org/)
- 📦 Bundler: [Webpack 4](https://webpack.js.org/)
- Code Linting fro Vue.JS: [ESLint](https://eslint.vuejs.org/)

## Project structure

```bash
.
├── .github                 # – github workflows
├── .webpack                # – webpack config overrides and extensions
├── dist                    # – app build catalog
├── public
├── src
│   ├── .boot               # - vue app instance, plugins configure and boot scripts
│   ├── api                 # – api clients (part of infra, actually)
│   ├── app                 # - app specific commo logic services, models
│   │   ├── models          # – reusable app specific models
│   │   └── services        # – app common services
│   ├── domain              # - domain logic
│   │   ├── services        # – common domain services / usecases
│   │   └── entities        # – domain entities
│   ├── infra               # - infrastructure
│   │   └── services        # – infrastructure services
│   ├── components          # – reusable components
│   ├── pages               # – page components having routes
│   ├── store               # - local state manager
│   ├── router              # - app routing
│   ├── styles              # – global / common css styles
│   ├── plugins             # - vue plugins configure, init and install
│   └── utils               # - common utils
│
├── vue.config.js
...
└── README.md
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm start
```

### Compiles and minifies for production
```
npm run build
```
