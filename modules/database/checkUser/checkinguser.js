var mongodb = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017';
var checkincovers = (senderId) => {
    return new Promise((resolve, reject) => {
        mongodb.connect('mongodb://localhost:27017', (err, db) => {
            if (err) throw err;
            let dbase = db.db('cspheartsync');
            let collect = dbase.collection('users');
            collect.find({ _id: '1746618088744994' }).toArray(function (err, result) {
                if (err) return reject (err)
                let incovers = result[0].preferences.inconversation;
                resolve(incovers);
            });
        })
    })
}

module.exports={checkincovers:checkincovers}