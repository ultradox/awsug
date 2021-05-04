# Updating the site
Read all the instructions please.

## Development Environment Requirements
You should have the latest version of all the following:
- git
- node 
- npm (cli)
- vue cli (recommended)
- aws cli
- aws amplify cli

Other than that, you'll also need:
- CLI credentials to connect to the AWSUG AWS account.
- CLI credentials to your github / bitbucket account.
- _aws cli_ profile (default ap-southeast-2 region) setup to run amplify cli - commands on AWSUG account.
- AWS Amplify console (logon AWSUG AWS account, search Amplify)

## How the process works
- Setup your local development environment
- Run the site locally, for testing
- Make any changes you want
- Once you're happy, commit and push your changes
- Wait a couple of minutes, and Voila! The latest version of the site magically appears in your favorite browser at www.awsug.nz


## Here are some pointers:
- Cone: https://github.com/ultradox/awsug (you don't have permission to push changes directly here **)
- There are two branches - _master_ (deploys to awsug.nz) and _playpen_  which deploys to a dev site on a randomly generated domain. See the AWS console for details.
- You can use master exclusively, but test your changes properly on localhost before pushing them.
- If you’re not sure, checkout the playpen on git, and remember to do the same on amplify:
- $ amplify env checkout playpen
- You’ll have to run ```$ amplify init``` again on the Amplify environment you checked out if it’s the first time you’re checking it out.


** Ultimately, you'll have to migrate the site to your own github or bitbucket account so you have full control over the entire process.
- This will require changes in the AWS Amplify console
- The quickest way is to create a new app in the AWS Amplify console, link that to your version control backend (github or bitbucket account)
- Test the pipeline, then remove the custom domain from the old app, apply it to the new app, and delete the old app once your site is up and running on your latest Amplify app.

## If this is the your first time:
Once you've cloned the repo, in your cli, cd to the cloned repo:
You’ll be on the master branch by default…
- $ npm install
- $ amplify init, follow all the prompts
- $ you should be able to run an $ amplify status and get:
| Category | Resource name                 | Operation | Provider plugin   |
| -------- | ----------------------------- | --------- | ----------------- |
| Function | awsug1ae5855ePostConfirmation | No Change | awscloudformation |
| Function | automailer                    | No Change | awscloudformation |
| Auth     | awsug1ae5855e                 | No Change | awscloudformation |
| Api      | awsug                         | No Change | awscloudformation |

Now run your local site:
- $ npm run serve

Make any changes you need, commit then push.

## Useful commands
$ amplify help
$ amplify env list
$ amplify init