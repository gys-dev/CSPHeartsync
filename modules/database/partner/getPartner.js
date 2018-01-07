require('dotenv').config()
var mongodb = require('mongodb').MongoClient,
url = process.env.URL_DB;
var getPartner = (senderId) => {
    return new Promise((resolve, reject) => {
        mongodb.connect(url, (err, db) => {
            let dbase = db.db('cspheartsync');
            let collect = dbase.collection('paired');
            collect.find({ id1: senderId.toString() }).toArray((err, res) => {
                resolve(res[0].id2);
            })
        })
    })
}

module.exports = { getPartner: getPartner }