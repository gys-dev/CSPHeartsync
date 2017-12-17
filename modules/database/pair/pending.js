var mongodb = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017',
    getFav = require('../checkUser/checkFav'),
    getGender = require('../checkUser/checkGender'),
    pair = require('./pair');
var pending = (senderId) => {
    let favorite = await getFav.checkFav(senderId);
    let gender = await getGender.checkGender(senderId);
    mongodb.connect(url, (err, db) => {
        let collect = db.db('cspheartsync').collection('pending');
        collect.insert({ _id: senderId.toString(), favorite: favorite, gender: gender });
        collect.count.then(res => {
            if (res >= 2) {
                pair(senderId.toString(), gender,fav);
            }
        })
    })
}

module.exports= {pending:pending}