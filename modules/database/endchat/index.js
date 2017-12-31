var mongodb = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017',
    endC = require('../resUser/endChat');

var endChat = (senderId) => {
    mongodb.connect(url, (err, db) => {
        if (err) throw err;
        let collect = db.db('cspheartsync').collection('paired');
        collect.find({ id1: senderId.toString }).toArray((err, a) => {
            if (err) throw err;
            let partnerId = a[0].id2;
            collect.deleteOne({ id1: senderId.toString() }, (err, b) => {
                if (err) throw err;
                collect.deleteOne({ id1: parnerId.toString() }, (err, c) => {
                    if (err) throw err;
                    endC.endC(senderId).then(d => {
                        endC.endC(partnerId).then(e => {
                            sendTextMessageWithPromise(senderId, "Bạn đã kết thúc cuộc trò chuyện").then(f => {
                                sendTextMessageWithPromise(partnerId, "Bạn đã kết thúc cuộc trò chuyện");
                            })
                        })
                    })
                })
            })
        })
    })
}

module.exports={endChat:endChat}