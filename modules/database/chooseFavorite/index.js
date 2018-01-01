var mongodb = require('mongodb').MongoClient,
    pending = require('../pair/pending'),
    url = 'mongodb://localhost:27017';

var chooseFavorite = (senderId, gender) => {
    return new Promise((resolve, reject) => {
        mongodb.connect(url, (err, db) => {
            if (err) throw err;
            db.db('cspheartsync').collection('users').update({ _id: senderId.toString() }, { $set: { favorite: gender } }, (err, res) => {
                if (err) throw err;
                if (gender === 'male') { resolve("Bạn ghép đôi tiếp theo của bạn sẽ là một bạn nam nhá :D ") }
                if (gender === 'female') { resolve("Bạn ghép đôi tiếp theo của bạn sẽ là một bạn nữ nhá :D") }
                if (gender === 'none') { resolve("Bạn ghép đôi tiếp theo có thể là nam hay nữ đều được nhé :D") }
                db.db('cspheartsync').collection('pending').count ({_id : senderId.toString ()}).then (
                    count => 
                    {
                        console.log ("count is" + count)
                        /* if (count != 0) 
                        {
                            db.db('cspheartsync').collection('pending').update({ _id: senderId.toString() }, { $set: { favorite: gender } }, (err, res) => {
                                if (err) throw err;
                                pending.pending (senderId);
                            })
                        } */
                    }
                )
            })
        })
    })
}


module.exports = { chooseFavorite: chooseFavorite }