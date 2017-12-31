var request = require('request');
class sendMessage {
    constructor() {
        this._token = "EAALBIgDENZB8BACVI8gHoHmRkNFYE2Cm4W1uwXV0Ywl60Id5mGg1ljJsUA0VKJMy6A0tGJtGJqA38eZAWtZA03g1XeLGHN3Um0Yfn4FcUeo3V5NCOZAbiCfwVpXpAzqd6RjZCUgNMUaWDs9JVvXwVraGkEhcQeiV2CRJFBwMg9AZDZD"
    }
    sendTextMessage(senderId, text) {
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: this._token
            },
            method: "POST",
            json: {
                recipient: {
                    id: senderId
                },
                message: {
                    text: text
                },
            }
        }, (err, res, body) => {
            if (err) return console.log("Error: " + err)
            if (res.body.error) return console.log("err: " + res.body.error)
        })
    }
    sendImage(senderId, url) {
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: this._token
            },
            method: 'POST',
            json: {
                recipient: {
                    id: senderId
                },
                message: {
                    attachment: {
                        type: "image",
                        payload: {
                            url: url
                        }
                    },
                }
            }
        },
            (err, res, body) => {
                if (err) return console.log("Error: " + err)
                if (res.body.error) return console.log("err: " + res.body.error)
            })
    }
    sendButtonUrl(senderId, text, url, title) {
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: this._token
            },
            method: "POST",
            json: {
                recipient: {
                    id: senderId
                },
                message: {
                    attachment: {
                        type: "template",
                        payload: {
                            template_type: "button",
                            text: text,
                            buttons: [
                                {
                                    type: "web_url",
                                    url: url,
                                    title: title
                                },
                            ]
                        }
                    }
                }
            }
        },
            (err, res, body) => {
                if (err) return console.log("Error: " + err)
                if (res.body.error) return console.log("err: " + res.body.error)
            })
    }
}
module.exports = new sendMessage()