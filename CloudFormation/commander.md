The shell script takes the AWS CLI Profile as a parameter (`awsug` in this example).

How to deploy CloudFormation to create CloudFront distribution with S3 origin and restrict access to S3 with OAI:
```
cd CloudFormation/
chmod +x CloudFront.sh
sh CloudFront.sh
```

Wait for it to finish...

Get the Distribution ID from CloudFront console when you're ready:

```
aws cloudfront get-distribution --id EK4HQYEDRURRB --profile awsug
```
