const core = require('@actions/core');
const axios = require('axios');
const AsciiTable = require('ascii-table')

try {
    const URL = 'https://slack.com/api/chat.postMessage';

    const message = core.getInput('message');
    const tableInfo = message[0];
    const table = message[1].data;
    const tableHeader = table.head;
    const tableBody = table.body;

    var formattedTable = new AsciiTable('Out-of-date dependencies');
    formattedTable.setHeading(tableHeader);
    tableBody.forEach(tableRow => { formattedTable.addRow(tableRow)});

    axios.post(URL, {
        "text": formattedTable.toString(),
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