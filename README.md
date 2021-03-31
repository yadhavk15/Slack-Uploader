# Slack Uploader

A Javascript Slack Bot created using Bolt  framework. It allows a file upload from terminal directly to a slack channel.

# How To

## Create App
1. use this tutorial to create a slack application : https://slack.com/intl/en-mu/help/articles/115005265703-Create-a-bot-for-your-workspace
2. Get token and signingSecret 
3. Input them in the slack_uploader.js

## Install node
```
sudo apt install npm
```

## Install bolt

Use this tutorial to setup : https://slack.dev/bolt-js/tutorial/getting-started

```
npm install @slack/bolt
node slack_uploader.js
```
## Upload File 
upload file to url endpoint using curl in linux

```
curl --upload-file ./<file-to-upload> http://127.0.0.1:3000/
```

