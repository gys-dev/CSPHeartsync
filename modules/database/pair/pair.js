var MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017';

var pair = (senderId, gender, fav) => {
    if (fav != 'none') {
        if (fav === gender) {
            MongoClient.connect(url, (err, db) => {
                let dbase = db.db('cspheartsync');let collect = dbase.collection('pending');
                collect.find({ gender: gender, favorite: fav }).limit(1).toArray(function (err, res) {
                    var partnerId = res[0]._id;
                    if (partnerId != '') {
                        collect.deleteOne({ _id: senderId.toString() });
                        collect.deleteOne({ _id: partnerId.toString() });
                        let paired = dbase.collection('paired');
                        paired.insert({ id1: senderId.toString(), id2: partnerId.toString() }, (err, res) => {
                    //         //Trả về có bạn
                        });
                     }
                    else {
                        //Trả về không có trai :<
                    }
                })
            })
        }
        if (fav != gender) {

        }
    }
    else {

    }
}


pair(123123, "male", "male")