const core = require('@actions/core');
const axios = require('axios');

try {
    const URL = 'https://slack.com/api/chat.postMessage';
    const message = 'FOOBAR';

    axios.post(URL, {
        "message": message,
        "channel": "C01R1KE835Y",
    },
        {
           "headers": {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Bearer " + core.getInput('SLACK_BOT_TOKEN')
            }
        }
    )
    .then(function (response) {
        console.log(response);
    })
    

} catch (error) {
  core.setFailed(error.message);
}