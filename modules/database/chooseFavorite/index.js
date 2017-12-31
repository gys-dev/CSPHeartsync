var mongodb = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017';

var chooseFavorite = (senderId, gender) => {
    return new Promise((resolve, reject) => {
        mongodb.connect(url, (err, db) => {
            if (err) throw err;
            db.db('cspheartsync').collection('users').update({ _id: senderId.toString }, { $set: { favorite: gender } }, (err, res) => {
                if (err) throw err;
                if (gender === 'male') { resolve("Hì. Bạn ghép đôi tiếp theo là trai nhá :D ") }
                if (gender === 'female') { resolve("Hì. Bạn ghép đôi tiếp theo là nữ nhá :D") }
                if (gender === 'none') { resolve("Hì. Bạn ghép đôi tiếp theo là giới tính lạ không xác định được hihi :D") }
            })
        })
    })
}


module.exports = { chooseFavorite: chooseFavorite }