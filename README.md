# awsug2

## Project setup
To run the project locally, you need [AWS Amplify CLI](https://github.com/aws-amplify/amplify-cli). The project was deployed using AWS Amplify CLI version 4.18.1. You will have to run `amplify init` and use a profile to your own AWS account.
```
git clone...
npm install
amplify init...
amplify status
amplify push [to your own account]
```

### Compiles and hot-reloads for development
```
npm run serve
```

## Useful links

* [Implementing Search in GraphQL](https://medium.com/open-graphql/implementing-search-in-graphql-11d5f71f179)
* [GraphQL API Security with AWS AppSync and Amplify](https://aws.amazon.com/blogs/mobile/graphql-security-appsync-amplify/)
* [Amplify GraphQL Documentation](https://aws-amplify.github.io/docs/cli-toolchain/graphql#transform)
* [Amplify GraphQL Getting Started](https://docs.amplify.aws/lib/graphqlapi/getting-started/q/platform/js)
* [AWS AppSync Multi-Auth](https://aws-amplify.github.io/docs/js/api#aws-appsync-multi-auth-1)

## Libraries
* The [aws-amplify-vue](https://github.com/aws-amplify/amplify-js/tree/master/packages/aws-amplify-vue) library gives us the AmplifyEventBus 🔥

## Further work
* Refactor code to use Vuex
* Refactor some components for reusability / general code cleanup
* AWS Certification Leaderboard
