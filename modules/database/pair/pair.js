var mongodb = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017';

var pair = (senderId, gender, fav) => {
    if (fav != 'none') {
        if (fav === gender) {
            mongodb.connect(url, (err, db) => {
                let dbase = db.db('cspheartsync');
                let collect = dbase.collection('pending');
                collect.count({ gender: gender, favorite: fav }).then(count => {
                    if (count < 2) {
                        return console.log("Oh noo =))) Không có user nào");
                    }
                    collect.deleteOne({ _id: senderId.toString() });
                    collect.find({ gender: gender, favorite: fav }).limit(1).toArray((err, result) => {
                        let partnerId = result[0]._id;
                        collect.deleteOne({ _id: partnerId.toString() });
                        let paired = dbase.collection('paired');
                        console.log ("User 1 : " + senderId.toString() + " ; User 2 : " + partnerID.toString() +"\n");
                        paired.insert({ id1: senderId.toString(), id2: partnerId.toString() });
                        paired.insert({ id1: partnerId.toString(), id2: senderId.toString() });
                    })
                })
            })
        }
        
        if (fav != gender) {
            mongodb.connect(url, (err, db) => {
                let dbase = db.db('cspheartsync');
                let collect = dbase.collection('pending');
                collect.deleteOne({ _id: senderId.toString() });

                collect.count({ gender: fav, favorite: gender }).then(count => {
                    if (count < 1) {
                        return console.log("Oh noo =))) Không có user nào");
                    }
                    collect.find({ gender: fav, favorite: gender }).limit(1).toArray((err, result) => {
                        let partnerId = result[0]._id;
                        collect.deleteOne({ _id: partnerId.toString() });
                        let paired = dbase.collection('paired');
                        console.log ("User 1 : " + senderId.toString() + " ; User 2 : " + partnerID.toString() +"\n");
                        paired.insert({ id1: senderId.toString(), id2: partnerId.toString() });
                        paired.insert({ id1: partnerId.toString(), id2: senderId.toString() });
                    })
                })
            })
        }
    }
        if (fav === 'none') {               
                
            mongodb.connect(url, (err, db) => {
                let dbase = db.db('cspheartsync');
                let collect = dbase.collection('pending');
                collect.count({ favorite: "none" }).then(res => {
                    if (res >= 2) {
                        collect.deleteOne({ _id: senderId.toString() });
                        collect.find({ favorite: "none" }).limit(1).toArray((err, result) => {
                            let partnerId = result[0]._id;
                            collect.deleteOne({ _id: partnerId.toString() });
                            let paired = dbase.collection('paired');
                            console.log ("User 1 : " + senderId.toString() + " ; User 2 : " + partnerID.toString() +"\n");
                            paired.insert({ id1: senderId.toString(), id2: partnerId.toString() });
                            paired.insert({ id1: partnerId.toString(), id2: senderId.toString() });
                        })
                    }
                    else {
                        collect.deleteOne({ _id: senderId.toString() });
                        collect.find({ favorite: gender }).limit(1).toArray((err, result) => {
                            let partnerId = result[0]._id;
                            collect.deleteOne({ _id: partnerId.toString() });
                            let paired = dbase.collection('paired');
                            console.log ("User 1 : " + senderId.toString() + " ; User 2 : " + partnerID.toString() +"\n");
                            paired.insert({ id1: senderId.toString(), id2: partnerId.toString() });
                            paired.insert({ id1: partnerId.toString(), id2: senderId.toString() });
                        })
                    }
                })
            })
        }
}
