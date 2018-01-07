require('dotenv').config()
var mongodb = require('mongodb').MongoClient,
url = process.env.URL_DB,
    endC = require('../resUser/endChat'),
    sendMessage = require('../../api/facebookAPI/sendMessage');

var endChat = (senderId) => {
    mongodb.connect(url, (err, db) => {
        if (err) throw err;
        let collect = db.db('cspheartsync').collection('paired');
        collect.find({ id1: senderId.toString() }).toArray((err, a) => {
            if (a.length != 0) {
                if (err) throw err;
                let partnerId = a[0].id2;
                collect.deleteOne({ id1: senderId.toString() }, (err, b) => {
                    if (err) throw err;
                    collect.deleteOne({ id1: partnerId.toString() }, (err, c) => {
                        if (err) throw err;
                        endC.endC(senderId).then(d => {
                            endC.endC(partnerId).then(e => {
                                sendMessage.sendBotMessageWithPromise(senderId, "Bạn đã kết thúc cuộc trò chuyện", "Bấm phím bất kỳ để tiếp tục tìm bạn nha").then(f => {
                                    sendMessage.sendBotMessageWithPromise(partnerId, "Cuộc trò chuyện đã kết thúc", "Bấm phím bất kỳ để tiếp tục tìm bạn nha");
                                })
                            })
                        })
                    })
                })
            }
            else {
                endC.endC(senderId).then(g => {
                    db.db('cspheartsync').collection('pending').deleteOne({ _id: senderId.toString() }, (err, res) => {
                        if (err) throw err
                        sendMessage.sendTextMessage(senderId, "Bạn đã hủy yêu cầu tìm bạn. Nhắn bất kỳ thứ gì để tìm bạn lại nhé")
                    })
                })
            }
        })
    })

}

module.exports = { endChat: endChat }