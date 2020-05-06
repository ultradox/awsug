# SUMMARY
---------------------------------------------------------------------

I'm stoked to present the AWS User Group new blogging thing  🎉 It uses [AWS Amplify development platform](https://aws.amazon.com/amplify/), [Vue.js](https://vuejs.org/), and a couple of other AWS services in the background. 

In this post, I'd like to walk you through the process of submitting your own content to the site. It's quick and easy. All you need is to register an account, prepare your content using [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet), and submit for publication. Next time, we'll take a closer look at the architecture and the [code base](https://github.com/ultradox/awsug).

![Photo by Glenn Carstens-Peters on Unsplash](https://awsug-image-bank.s3-ap-southeast-2.amazonaws.com/blog-1-getting-started/get-blogging-sm.jpg "Get Bloggin!")


# CONTENT
----------------------------------------------------------------------

# AWS User Group Blogging
> Estimated 5 minute read ⏱

Do you have something you'd like to share with a wider audience? We've got the perfect platform to publish your next AWS blog, article or poem using our fab website ❣️

Here's the steps to publish your content:
1. Register an account
2. Create a new blog in your personalised blogging portal
3. Manage your [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) content
4. Once you're ready, submit it for publication
5. We get back to you asap to let you know when it's published, or let you know why we thought it best not to (yet!)

> I apologise to everyone who had previously registered an account on the site. The AWS Cognito user pool was recreated during site upgrade. You'll have to register again in order to use the blogging engine 😔

## Register and sign in
Once you're signed in, you'll be taken to the members only area.

![Members only](https://awsug-image-bank.s3-ap-southeast-2.amazonaws.com/blog-1-getting-started/welcome-member.jpg "Members only")

## Create a new blog
Now select BLOG from the navigation bar, then press "Write a Blog".

![Write a new blog](https://awsug-image-bank.s3-ap-southeast-2.amazonaws.com/blog-1-getting-started/welcome-blog-portal.jpg "Write a new blog")

When you first create a blog, you must submit content for all the fields on the form. If you don't have your content ready, generate some [Lorem Ipsum](https://www.lipsum.com/).

But before you can fill anything in, you must agree to the community standards.

![Community Standards](https://awsug-image-bank.s3-ap-southeast-2.amazonaws.com/blog-1-getting-started/community-norms.jpg "Community Standards")

Once you've agreed, you'll be asked to provide a Blog Title, Author and a link to any social media identity.

![Basic information](https://awsug-image-bank.s3-ap-southeast-2.amazonaws.com/blog-1-getting-started/community-standards.jpg "Basic information")

## Manage your Content

Next, a blog **summary** of no more than 1000 characters. Your blog content can be substantially more: [the maximum size of a DynamoDB item is 400KB](https://stackoverflow.com/questions/42181346/maximum-size-of-dynamodb-item), you do the math.

### Write your content
Don't be shy now. **Always remember to save.** Also, you might wanna try distraction free mode.

![Distraction Free](https://awsug-image-bank.s3-ap-southeast-2.amazonaws.com/blog-1-getting-started/distraction-free.jpg "Distraction Free")

## Ready to publish 💕
Good to go? Hit Publish and confirm you're ready.

![Publish It](https://awsug-image-bank.s3-ap-southeast-2.amazonaws.com/blog-1-getting-started/publish-it.jpg "Publish It")

Once you've submitted a blog for publication, you can't edit it until it has been reviewed.

![Under Review](https://awsug-image-bank.s3-ap-southeast-2.amazonaws.com/blog-1-getting-started/under-review.jpg "Under Review")

## Site admins
Members of the user group internal organisers can get added to the `admin` user group. 

Let's say the site admin **Dullie** checks in. There might be nothing...

![No new speakers, no new blogs](https://awsug-image-bank.s3-ap-southeast-2.amazonaws.com/blog-1-getting-started/admin-portal-empty.jpg "No new speakers, no new blogs")

Unbeknownst to Dullie, in a different part of town, Ultradox is just finishing off his first blog for an eclectic user group[^1]. An hour later, Dullie gets an email notifying him a new blog has been submitted for review! He checks in to find a literary gem, makes sure the hyperlinks are kosher, then hits approve. Your blog goes live instantanously 🔥🔥🔥

![New Post](https://awsug-image-bank.s3-ap-southeast-2.amazonaws.com/blog-1-getting-started/welcome-admin.jpg "New Post")

![Approve Publication](https://awsug-image-bank.s3-ap-southeast-2.amazonaws.com/blog-1-getting-started/approve-publication.jpg "Approve Publication")

[^1]: **eclectic**, philosophical word origin: denoting or belonging to a class of ancient philosophers who did not belong to or found any recognized school of thought but selected doctrines from various schools of thought.
