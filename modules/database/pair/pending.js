var mongodb = require('mongodb').MongoClient,
url = 'mongodb://localhost:27017';

var pending = (senderId) => {
    mongodb.connect(url, (err, db) => {
        let dbase = db.db('cspheartsync');
        let collect1 = dbase.collection('users');
        collect1.find({ _id: '1746618088744994' }).toArray(function (err, result) {
            if (err) return reject(err)
            gender = result[0].gender;
            let collect2 = dbase.collection(gender);
            collect2.insert({_id:senderId})
        });
    })
}
