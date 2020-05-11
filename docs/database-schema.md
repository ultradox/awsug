# TITLE
----------------------------------------------------
AWS Amplify Multi-Auth GraphQL

# SUMMARY
----------------------------------------------------
# AWS AppSync GraphQL API Security 🔥🔐😻
In the preceding blog, we took a look at the blogging engine used to manage user's content, submit requests for publication, and how site administrators review and publish blogs.

In this blog post, we look at the backend configuration managed and deployed with AWS [Amplify Framework](https://docs.amplify.aws/). In particular, we do a deep dive on the different authorization modes available to secure GraphQL APIs, and look at their implementation on this website's blogging engine. Enjoy ❣️

![Secure this site](https://awsug-image-bank.s3-ap-southeast-2.amazonaws.com/blog-2-technical-overview/hackers-beware.jpg "Secure this site")

# SOCLINK
------------------------------------------------------
[LinkedIn](https://www.linkedin.com/in/carlos-reyneke-636037108/)

# CONTENT
------------------------------------------------------
# AWS AppSync GraphQL API Security 🔥🔐😻
> Estimated 12+ hours read ⏱ `if you follow along ;)`

Are you curious to know if your original content is safe on this site? Let's take a closer look at the blogging engine we use to manage the blog your reading at this very moment. Pure _recursive_ joy❣️  Feel free at any time to **[join the fun](https://www.awsug.nz/blog-admin)**. You can also read **[part 1](https://www.awsug.nz/blog/aws-user-group-getting-started-blog)** for more details on getting started.

# Authorizing access to GraphQL API's

Securing serverless applications is a big topic. Let's take a closer look at one aspect in particular: GraphQL API Authorization. 

According to Nader Dabit (**[AWS, May 2019](https://aws.amazon.com/blogs/mobile/using-multiple-authorization-types-with-aws-appsync-graphql-apis/)**) "AWS AppSync supports configuring more than one **authorization type for GraphQL APIs**. You can now configure a single GraphQL API to deliver private and public data. Private data requires authenticated access using authorization mechanisms such as IAM, Amazon Cognito User Pools, and OIDC. _Public data does not require authenticated access and is delivered through authorization mechanisms such as API Keys._"

Turns out... that last statement presented some challenges. After applying API Key authorization in conjunction with Cognito authorization, I found that authenticated users could read public blogs, but that unauthenticated users were prevented from viewing the blog. But I'm getting ahead of myself... let's first take a look at the users, data entities and use cases.

> Read more about AWS [AppSync](https://aws.amazon.com/appsync/)
>
> Read more about [AppSync Security](https://docs.aws.amazon.com/appsync/latest/devguide/security.html)

## Users

I identified three types of users for the site:
1. **Anonymous users** casually browse the site; they can read content (blogs and comments), but can't create or modify any content
2. **Registered users** can create new blogs and comments
3. **Site administrators** review and approve DRAFT blogs submitted by awesome bloggers for publication

![Users](https://awsug-image-bank.s3-ap-southeast-2.amazonaws.com/blog-2-technical-overview/users.jpg "Users")

## Entities

I also identified three Dynamo-DB entities I need to keep track of: 
1. **Drafts** are blogs-in-the-making; authenticated users should have full [CRUD permissions](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) on their own drafts
2. **Blogs** are drafts that got published; a.k.a. **Blog Posts** or singular a **Post**; anyone is able to read a Blog/Post and it's comments; only a site administrator can create, update and delete a Blog/Post.
3. **Comments** are attached to blogs - an upcoming feature ;)

![Entities](https://awsug-image-bank.s3-ap-southeast-2.amazonaws.com/blog-2-technical-overview/entities.jpg "Entities")


## Use Cases

The diagram below illustrates each use case in relation to our users and database entities:

![User API access Privileges](https://awsug-image-bank.s3-ap-southeast-2.amazonaws.com/blog-2-technical-overview/data-and-user-access-privileges.jpg "User API Access Privileges")

There's a fair bit going on here. Let's take a closer a look at the subset of rules as applied to the **Draft** entity.

## The GraphQL Schema for Draft

Refer to the `schema definition` below showing the **Draft** entity definition:
- Because no public *read* access is required, the `@auth` mode is set to Cognito user pools only (i.e. no API-key or IAM `@auth` modes required yet)
- The `@auth` rules enable *CRUD* operations for the **owner**, but *read*, *update* and *delete* only for site **administrators**
- Using `@key` directive, defined custom primary index: `anchor` 
    - This lets us use a human-readable anchor as the primary DynamoDB lookup
    - DynamoDB enforces a unique constraint on `anchor` (*primary* key n'all)
- Define a Global Secondary Index (`byCreatedAt`) using a static sort hash, combined with a sort-key of `createdAt` date & timestamp

```
type Draft
  @model 
  @aws_cognito_user_pools
  @auth(
    rules: [
      { allow: owner
        operations: [create, read, update, delete] }
      { allow: groups
        groups: ["admin"]
        operations: [read, update, delete] }
    ]
  ) 
  @key (fields: ["anchor"])
  @key (
    name: "byCreatedAt"
    fields: ["sortHash", "createdAt"]
    queryField: "draftByCreatedAt") 
  { userName: String!
    anchor: String!
    author: String!
    socLink: String!
    sortHash: String!
    title: String!
    summary: String!
    content: String!
    ...
    ...
  }
```

## AWS Design from context of the Draft entity
Here's a look at the AWS resources in terms of how users interact with Draft entity:
![DynamoDB Draft entity and affected/ing services](https://awsug-image-bank.s3-ap-southeast-2.amazonaws.com/blog-2-technical-overview/aws-design-drafts.jpg "DynamoDB Draft entity and affected/ing services")

## Blog Post Entity

Now that we've taken a look at the authorization mode for the **Draft** entity, let's turn our attention to that of a Blog **Post**. Remember, a Post is a published draft, and must be readable by all users: unauthorized and authorized. In addition, site admins alone have CRUD permissions on the Post entity.

```
type Post 
  @model @aws_iam @aws_cognito_user_pools
  @auth(
    rules: [
      { allow: groups
        groups: ["admin"]
        operations: [create, read, update, delete] }
      { allow: groups
        groups: ["everyone"]
        operations: [read] }
      { allow: public
        provider: iam
        operations: [read] }] 
  )
  @key (fields: ["anchor"])
  @key (  
    name: "byPubDate"
    fields: ["sortHash", "pubDate"]
    queryField: "postByPubDate"
  ) 
  { userName: String!
    anchor: String!
    author: String!
    socLink: String!
    sortHash: String!
    title: String!
    summary: String!
    content: String!
    pubDate: String!
    lastModified: String!
    createdAt: String
    comments: [Comment] @connection(keyName: "byAnchor", fields: ["anchor"])
  }
```

Notice we are now using two authorization types: `@aws_iam` and `@aws_cognito_user_pools`. Let's look at each of the rules in turn:
- First rule states that Cognito users belonging to the `admin` group have `CRUD` permissions
- Second rule says Cognito users belonging to the `everyone` group have `read` permissions
- Finally, we see public `read` access is given through `@aws_iam` (`{allow: public provider: iam}`)

It's this last rule that had me going for a while. If you remember right at the beginning I quoted Nader Dabit's AWS article about authorization modes. It seems from that the suggestion is to use API Keys for public read access. When I tried that though, I found only authorized users could read a Post (anyone, not only the owner). To get read access for unauthorized users I followed along [these instructions](https://medium.com/@fullstackpho/aws-amplify-multi-auth-graphql-public-read-and-authenticated-create-update-delete-1bf5443b0ad1).

## Amplify CLI changes needed

For the `@aws_iam` to work, you'll need to modify your Amplify GraphQL API using the Amplify CLI:

![Amplify GraphQL API](https://awsug-image-bank.s3-ap-southeast-2.amazonaws.com/blog-2-technical-overview/aws-amplify-graphql-api.jpg "Amplify GraphQL API")

To ensure all newly registered users are automatically added to the `everyone` Cognito User Group, modify use `$ amplify auth update`

![Amplify auth update](https://awsug-image-bank.s3-ap-southeast-2.amazonaws.com/blog-2-technical-overview/aws-amplify-auth-update.jpg "Amplify auth update")

## AWS Design from context of the Draft entity
Here's a look at the AWS resources in terms of how users interact with Draft entity:
![DynamoDB Draft entity and affected/ing services](https://awsug-image-bank.s3-ap-southeast-2.amazonaws.com/blog-2-technical-overview/aws-design-post.jpg "DynamoDB Draft entity and affected/ing services")

You can see Amplify provisioned additional resources, including a Post Confirmation lambda function trigger to add all new registrants to the "everyone" user group on Cognito.

But there's one bit missing - an IAM role with appropriate policy attached to the Cognito user group.

![Cognito User Group IAM Role ARN](https://awsug-image-bank.s3-ap-southeast-2.amazonaws.com/blog-2-technical-overview/cognito-user-group-role-arn.jpg "Cognito User Group IAM Role ARN")

And the policy...
![IAM Role Policy](https://awsug-image-bank.s3-ap-southeast-2.amazonaws.com/blog-2-technical-overview/cognito-user-group-role-policy.jpg "IAM Role Policy")


## JavaScript / Vue Implementation for Draft

The section of code below is taken from the Vue file creating a new draft: `/src/views/BlogNew.vue`. Here are the main queries and mutations for the Draft entity in action:

```
import API, { graphqlOperation } from "@aws-amplify/api";
import { createDraft } from "../graphql/mutations";
import { getDraft } from "../graphql/queries";

// getDraft
async getDraft(anchor) {
      try {
        const result = await API.graphql(
          graphqlOperation(getDraft, { anchor: anchor })
        );
        if (result.data.getDraft) {
          this.anchorTaken = true;
        } 

async submit() {
    try {
        await API.graphql(graphqlOperation(createDraft, { input }));
        ...
    } catch(e) {
        ...
    } 
```
Quick and easy. I don't even have to worry about specifying the owner of the Draft. As long as I understand the use case, implementing at the most rudimentary level proves a breeze. Now if any authorized User asks for Drafts, the database only ever returns records **owned** by that user. No further filtering required.

If you look carefully at the `/amplify/backend/api/awsug/schema.graphql` schema definition in the [repo](https://github.com/ultradox/awsug), you'll notice there is no owner column. But if you look at the DynamoDB table that gets created when you push your backend changes with the CLI `$ amplify push` command, you'll see a column automatically added to the table: `owner` 🛸 whoeeee....

## JavaScript implementation for getPost
If you look at `/src/views/BlogView.vue` you'll notice a different implementation of the GraphQL `query` to make use of IAM authorisation:

```
import API from "@aws-amplify/api";
import { getPost } from "../graphql/queries";

    async getBlog() {
      try {
        const data = await API.graphql({
          query: getPost,
          variables: { anchor: this.anchor },
          authMode: "AWS_IAM"
        });
        this.blog = data.data.getPost;
      } catch (e) {
        this.err = e.errors[0].message || e;
      }
```

# References
- Nader Dabit, "**Using multiple authorization types with AWS AppSync GraphQL APIs**" [available online](https://aws.amazon.com/blogs/mobile/using-multiple-authorization-types-with-aws-appsync-graphql-apis/)

- Jane Shen, "**Supporting backend and internal processes with AWS AppSync multiple authorization types**" [available online](https://aws.amazon.com/blogs/mobile/supporting-backend-and-internal-processes-with-aws-appsync-multiple-authorization-types/)
- Orjiewuru Kingdom, "**GraphQL Queries, Mutations and Subscriptions**" [available online](https://medium.com/software-insight/graphql-queries-mutations-and-subscriptions-286522b263d9)\

- AWS AppSync documentation, "**AWS AppSync Security**" [available online](https://docs.aws.amazon.com/appsync/latest/devguide/security.html)

- FullstackPho, "**AWS Amplify Multi-Auth GraphQL — Public Read and Authenticated Create, Update, Delete**" [available online](https://medium.com/@fullstackpho/aws-amplify-multi-auth-graphql-public-read-and-authenticated-create-update-delete-1bf5443b0ad1)

- AWS DynamoDB documentation, "**Improving Data Access with Secondary Indexes**" [available online](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SecondaryIndexes.html)
