var request = require('request');
var getFbInfo = (senderId) => {
    return new Promise((resolve, reject) => {
        request({
            url: 'https://graph.facebook.com/v2.11/' + senderId,
            qs: {
                access_token: "EAALBIgDENZB8BACVI8gHoHmRkNFYE2Cm4W1uwXV0Ywl60Id5mGg1ljJsUA0VKJMy6A0tGJtGJqA38eZAWtZA03g1XeLGHN3Um0Yfn4FcUeo3V5NCOZAbiCfwVpXpAzqd6RjZCUgNMUaWDs9JVvXwVraGkEhcQeiV2CRJFBwMg9AZDZD"
            },
            method: "GET"
        }, (err, res, body) => {
            if (err) return reject(err);
            body = JSON.parse(body);
            var prf_url = body.profile_pic,
                pic_id = prf_url.split ('_')[1];
            var obj = {
                name: body.last_name + " " + body.first_name,
                profile_pic: body.profile_pic,
                gender: body.gender,
                pic_id: pic_id,
                _id: body.id + "",
                favorite: "none",
                inconversation: 0 //0 no, 1 pending, 2 yep
            };
            resolve(obj);
        })
    })
}

module.exports = { getFbInfo: getFbInfo };