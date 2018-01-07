require('dotenv').config()
var mongodb = require('mongodb').MongoClient,
url = process.env.URL_DB,
    getName = require('../checkUser/getName');
    getAvatar = require('../checkUser/getAvatar');

var pair_log = async(senderId, partnerId) => {
    let name1 = await (getName.getName(senderId));
    let name2 = await (getName.getName(partnerId));
    let ava1 = await (getAvatar.getAvatar(senderId));
    let ava2 = await (getAvatar.getAvatar(partnerId));
    mongodb.connect(url, (err, db) => {
        db.db('cspheartsync').collection('history').insert({
            name1: name1,
            name2: name2,
            avatar1: ava1,
            avatar2: ava2,
            time: new Date().getTime().toString()
        },(err,res)=>{if(err) throw err})
        console.log ("User 1: " + name1.toString() + " User 2: " + name2.toString ());
    })
}
module.exports = {pair_log:pair_log}