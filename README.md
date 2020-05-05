# awsug2

## Libraries
The [aws-amplify-vue](https://github.com/aws-amplify/amplify-js/tree/master/packages/aws-amplify-vue) library gives us the AmplifyEventBus 🔥


## Project setup
```
git clone...
npm install
```
starting a new one..
```
```
    npm init
    npm i aws-amplify
    npm i aws-amplify-vue
    npm i @vue/cli
    npm i @aws-amplify/cli
    npm install --save vuex
    npm audit fix
    amplify init
    amplify add auth

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Important links
- https://github.com/dabit3/basic-amplify-storage-example

## Error log
First deployment to production fails
- This relative module was not found:
 * ./aws-exports in ./src/main.js
 I've had this error before...
 Fuckit just include aws-exports in the repo 💩


## Lambda Test Event
{ 
    "body": {
      "name": "Sarel Seemonster",
      "email": "sarel@seemonster.com",
      "mobile": "021 180 2290",
      "description": "I LOVE YOU GUYS",
      "estimatedLength": "15 minutes",
      "dateOption1": "2020-04-07",
      "dateOption2": "2020-05-05"
    }
}


## GraphQL

### Mutations
```
mutation{createSpeakerEOI (input: {
  id: 1
  name: "sarel"
  surname: "seemonster"
  email: "sarel@seemonstor.com" 
  mobile: "021 180 2290" 
  description: "A new life"
  estimatedLength: "an hour"
  dateOption1: "1st of May"
  dateOption2: "1st of June" 
  sortHash: "Sorted"
}) {
  id name surname
}}
```

### Queries
```
query {speakerEOIByCreatedAt 
  (sortHash: "Sorted" sortDirection:DESC) {
    items {
      name
      sortHash
      createdAt
    }
  }}
  ```
