#!/bin/bash
# Parameter #1: AWS CLI Profile

ScriptName="CloudFront.cfn.yml"
StackName="awsug-image-bank"

Region="ap-southeast-2"

DeployBucket="cfn-modules-$Profile-$Region"
echo "check if bucket ($DeployBucket) exists"
if ! aws s3api head-bucket --bucket $DeployBucket --region $Region --profile $Profile 2>/dev/null
then
  echo "bucket does not exist. create it."
  aws s3 mb s3://$DeployBucket --region $Region --profile $1
fi

echo "---- Package CloudFormation Stacks"
echo "check if build directory exists"
mkdir -p ../build
aws cloudformation package \
  --template-file $ScriptName \
  --s3-bucket $DeployBucket \
  --output-template-file ../build/$ScriptName \
  --region $Region \
  --profile $1

if [ ! $? -eq 0 ]
then
  echo "Error in packaging "
  exit
fi

echo "---- Deploy CloudFormation Stacks"
aws cloudformation deploy \
    --template-file ../build/$ScriptName \
    --stack-name $StackName \
    --capabilities CAPABILITY_IAM \
    --region $Region \
    --profile $1
