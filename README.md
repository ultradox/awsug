# AWS User Group Aotearoa website repo

Available online at [awsug.nz](https://www.awsug.nz/).

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
* [Actions, Resources, and Condition Keys for AWS AppSync](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_awsappsync.html)

## Libraries
* The [aws-amplify-vue](https://github.com/aws-amplify/amplify-js/tree/master/packages/aws-amplify-vue) library gives us the AmplifyEventBus 🔥

## Further work
* 🔥🔥🔥 [Restrict S3 access](https://www.google.com/search?client=firefox-b-d&q=how+to+restrict+s3+access+to+my+website+only#kpvalbx=_bpOyXuX6LO6Z4-EP6PqQgAE32)
* Refactor code to use Vuex
* Refactor some components for reusability / general code cleanup
* AWS Certification Leaderboard


## Recent work
Restricting Access to Amazon S3 Content by Using an Origin Access Identity 

Did some further digging... amplify creates a CloudFront distribution... managed by AWS, and not visible in your account CloudFront console. Observe the Route 53 Alia record: d2*******8tg.cloudfront.net. After adding hosting with CloudFront and S3 with `amplify add hosting` I get dh*******4ob.cloudfront.net.

To manage access to the image bank served from an independent S3 bucket, setup new CloudFront distribution to front the image bank.

The next question: If Amplify manages the CloudFront distribution for the app, how is that configured?

## Ref: Question on StackOverflow

https://stackoverflow.com/questions/61656125/aws-amplify-cli-cloudfront-s3-restrictions/61746792#61746792

When hosting a site with AWS S3 and CloudFront, it's possible to [restrict access to content that you serve from Amazon S3 buckets](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html). I want to restrict access to assets on S3 to my Amplify App (CDN).

Is it possible to achieve the same restriction with AWS Amplify? After deploying my AWS Amplify App, I don't see a CloudFront distribution. The documentation states: "The AWS Amplify Console leverages the Amazon CloudFront Global Edge Network to distribute your web app globally" ([FAQ, Hosting](https://aws.amazon.com/amplify/console/faqs/)).

### Original Answer

I did some research and found it is possible to restrict access to S3 from a CloudFront distribution. In order to configure your CloudFront distribution using the Amplify CLI, add hosting: $ amplify add hosting

The relevant documentation is [here](https://docs.amplify.aws/cli/hosting#using-aws-amplify-console); it states there are two overall categories of hosting:

    - Using AWS Amplify Console
    - Using S3 and CloudFront (prod stage)

In the past, I only ever used the Amplify Console to associate a custom domain to my app. I didn't understand why I couldn't find a CloudFront distribution. After running $ amplify add hosting and selecting:

    - Select the plugin module to execute: Amazon CloudFront and S3
    - Select the environment setup: PROD (S3 with CloudFront using HTTPS)

Followed by $ amplify publish. I waited about half an hour later and voila! There's now a CloudFront distribution fronting my web app, with Route 53 automatically configured 🤓
