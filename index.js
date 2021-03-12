const core = require('@actions/core');
const axios = require('axios');

try {
    const URL = 'https://slack.com/api/chat.postMessage';


    axios.post(URL, {
        "text": core.getInput('message'),
        "channel": core.getInput('channel_id'),
    },
        {
           "headers": {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Bearer " + core.getInput('bot_token')
            }
        }
    )
    .then(function (response) {
        console.log(response);
    })
    

} catch (error) {
  core.setFailed(error.message);
}