

According to Nader Dabit (May 2019) "AWS AppSync supports configuring more than one authorization type for GraphQL APIs. You can now configure a single GraphQL API to deliver private and public data. Private data requires authenticated access using authorization mechanisms such as IAM, Amazon Cognito User Pools, and OIDC. Public data does not require authenticated access and is delivered through authorization mechanisms such as API Keys."

I thought it might be a good idea to make the most of the opportunity to secure my GraphQL APIs. So let's look at a simple representation of the user group blogging engine:





Resources

- ["AWS Amplify Multi-Auth GraphQL — Public Read and Authenticated Create, Update, Delete."](https://medium.com/@fullstackpho/aws-amplify-multi-auth-graphql-public-read-and-authenticated-create-update-delete-1bf5443b0ad1)
- [Using multiple authorization types with AWS AppSync GraphQL APIs](https://aws.amazon.com/blogs/mobile/using-multiple-authorization-types-with-aws-appsync-graphql-apis/)