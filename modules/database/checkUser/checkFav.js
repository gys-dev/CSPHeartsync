var mongodb = require('mongodb').MongoClient,
url = 'mongodb://localhost:27017';
var checkFav = (senderId) => {
    return new Promise((resolve, reject) => {
        mongodb.connect(url, (err, db) => {
            let collect = db.db('cspheartsync').collection('users');
            collect.find({_id: senderId.toString()}).toArray(function(err,res){
                if(err) return reject(err);
                resolve(res[0].preferences.favorite);
            })
        })
    })
}

module.exports= {checkFav:checkFav};