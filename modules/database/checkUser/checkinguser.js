var mongodb = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017';
var checkincovers = (senderId) =>{
    mongodb.connect(url,(err,db)=>{
        if(err) throw err;
        let dbase = db.db('cspheartsync');
        let collect = dbase.collection('users');
        collect.find({_id:1746618088744994},(err,res)=>{
            if(err) throw err;
            console.log(res.toArray().then(r=>{console.log(r)}));
        })
    })
}

checkincovers(123)