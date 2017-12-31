var mongodb = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017';

var chooseFavorite = (senderId, gender) => {
    return new Promise((resolve, reject) => {
        mongodb.connect(url, (err, db) => {
            if (err) throw err;
            db.db('cspheartsync').collection('users').update({ _id: senderId.toString }, { $set: { favorite: gender } }, (err, res) => {
                if (err) throw err;
                resolve('ok')
            })
        })
    })
}


module.exports = { chooseFavorite: chooseFavorite }