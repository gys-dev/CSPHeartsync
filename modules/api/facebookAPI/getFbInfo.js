var request = require('request');
var getFbInfo = (senderId) => {
    return new Promise((resolve, reject) => {
        request({
            url: 'https://graph.facebook.com/v2.11/' + senderId,
            qs: {
                access_token: "EAALBIgDENZB8BAJYSxchUNyB0wECTzNo5ZCSEzt2WlZA0fbTeH4GsiZAZCmSVYToeRdGJD0l7ZBUZB9ZBKdlRdqN0ptmiVVCXFix8GrT5jaOq0J3jtkNZC7AtZBZCToLwh8ajrzsMChgI12lugnamE1CQBm9crBqdpBxXYDdy4iqZCZCSoORMgZCRwr53R"
            },
            method: "GET"
        }, (err, res, body) => {
            if (err) return reject(err);
            body = JSON.parse(body);
            var obj = {
                name: body.last_name + " " + body.first_name,
                profile_pic: body.profile_pic,
                gender: body.gender,
                _id: body.id + "",
                favorite: "none",
                inconversation: 0 //0 no, 1 pending, 2 yep
            };
            resolve(obj);
        })
    })
}

module.exports = { getFbInfo: getFbInfo };