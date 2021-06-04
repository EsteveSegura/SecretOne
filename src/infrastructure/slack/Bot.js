const { RTMClient } = require('@slack/rtm-api');
const { server: { host }, slack: { token, botName, expireAt } } = require('../config')
const SaveSecretCommand = require('../../application/save_secret/save-secret-command');
const container = require('../../container');
const rtm = new RTMClient(token);

(async () => {
    await rtm.start();
})();

rtm.on('message', async (event) => {
    const { text } = event
    if (event.username !== botName) {

        const command = new SaveSecretCommand({ text, expireAt })
        const saveSecret = container.resolve('saveSecret');
        const response = await saveSecret.save(command)

        _sendMessage(event.channel, response)
    }
});

function _sendMessage(channel, response) {
    rtm.webClient.chat.postMessage({
        channel,
        text: `${host}/secret/${response._id}/${response._secretKey}`
    })
}