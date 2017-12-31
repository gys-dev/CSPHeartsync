var mongodb = require('mongodb').MongoClient,
url="mongodb://localhost:27017";

var inconverPending = (senderId)=>{
    return new Promise((resolve,reject)=>{
        mongodb.connect(url,(err,db)=>{
            if(err) throw err;
            db.db('cspheartsync').collection('users').update({_id:senderId.toString()},{$set:{inconversation: 1}},(err,res)=>{resolve('ok')})
        })
    })

}

module.exports = {inconverPending:inconverPending}