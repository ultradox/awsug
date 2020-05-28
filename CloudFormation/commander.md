# Notes from the edge of the narrative matrix

There has been some confusion around CloudFront distributions and hosting options with regards to Amplify apps. Here is the stackoverflow [link](https://stackoverflow.com/questions/61656125/aws-amplify-cli-cloudfront-s3-restrictions/61746792#61746792).

## Restricting access to content on S3

When hosting a site with AWS S3 and CloudFront, it's possible to restrict access to content that you serve from Amazon S3 buckets. 

How to deploy CloudFormation to create CloudFront distribution with S3 origin and restrict access to S3 with OAI:
```
cd CloudFormation/
chmod +x CloudFront.sh
sh CloudFront.sh
```

Wait for it to finish...

Get the Distribution ID from CloudFront console when you're ready:

```
aws cloudfront get-distribution --id XXXXXX --profile awsug
```

## Manage images

**DOWNLOAD**
```
aws s3 sync s3://awsug-image-bank-cfn . --exclude "*.DS_Store"  --profile awsug
```

**UPLOAD**
```
aws s3 sync . s3://awsug-image-bank-cfn --exclude "*.DS_Store"  --profile awsug
```
