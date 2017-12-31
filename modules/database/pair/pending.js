var mongodb = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017',
    getFav = require('../checkUser/checkFav'),
    getGender = require('../checkUser/checkGender'),
    pair = require('./pair');
var pending = async(senderId) => {
    let favorite = await (getFav.checkFav(senderId));
    let gender = await (getGender.checkGender(senderId));
    mongodb.connect(url, (err, db) => {
        let collect = db.db('cspheartsync').collection('pending');
        collect.insert({
            _id: senderId.toString(),
            favorite: favorite,
            gender: gender
        });
        var out = 0;
        while (out === 0) {
            var last_count = -1;
            collect.count().then(res => {
                if (res >= 2) {
                    {
                        if (res === last_count) {
                            out = 1
                        } else {
                            collect.find().skip(res - 1).limit(1).toArray((err, result) => {
                                pair(res[0]._id.toString(), res[0]._id.gender, res[0]._id.fav);
                            })
                        }

                    }
                }
            })
        }
    })
}

module.exports = {
    pending: pending
}