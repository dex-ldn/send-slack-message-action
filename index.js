const core = require('@actions/core');
const axios = require('axios');
const AsciiTable = require('ascii-table')

try {
    const URL = 'https://slack.com/api/chat.postMessage';

    const message = core.getInput('message');
    console.log('type: ', typeof message);
    const tableData = message["data"];
    const tableHeader = tableData["head"];
    const tableBody = tableData["body"];

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
        console.log("Success!");
    })
    

} catch (error) {
  core.setFailed(error.message);
}