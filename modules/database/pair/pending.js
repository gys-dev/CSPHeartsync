var mongodb = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017',
    getFav = require('../checkUser/checkFav'),
    getGender = require('../checkUser/checkGender'),
    pair = require('./pair');
var pending = async (senderId) => {
    let favorite = await (getFav.checkFav(senderId));
    let gender = await (getGender.checkGender(senderId));
    mongodb.connect(url, (err, db) => {
        if (err) throw err;
        let collect = db.db('cspheartsync').collection('pending');
        collect.insert({
            _id: senderId.toString(),
            favorite: favorite,
            gender: gender
        }, (err, res) => {
            if (err) throw err;
            collect.count().then(res => {
                if (res >= 2) {
                    collect.find().skip(res - 1).limit(1).toArray((err, result) => {
                        // pair(res[0]._id.toString(), res[0]._id.gender, res[0]._id.fav);
                        // console.log(result);
                       pair.pair(result[0]._id.toString(), result[0].gender, result[0].favorite);
                    })
                }
            })
        });

    })
}

module.exports = {
    pending: pending
}