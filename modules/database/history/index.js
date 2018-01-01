var mongodb = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017',
    getName = require('../checkUser/getName');

var pair_log = async(senderId, partnerId) => {
    let name1 = await (getName.getName(senderId));
    let name2 = await (getName.getName(partnerId));
    mongodb.connect(url, (err, db) => {
        db.db('cspheartsync').collection('history').insert({
            name1: name1,
            name2: name2,
            time: new Date().getTime().toString()
        },(err,res)=>{if(err) throw err})
        console.log ("User 1: " + name1.toString() + " User 2: " + name2.toString ());
    })
}
module.exports = {pair_log:pair_log}