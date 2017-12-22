var mongodb = require('mongodb').MongoClient,
	url = 'mongodb://localhost:27017',
	sendMessage = require('../../api/facebookAPI/sendMessage');

var user_pair = (senderId, partnerId) =>
{
	collect.deleteOne({ _id: partnerId.toString() });
	let paired = dbase.collection('paired');
	console.log ("User 1 : " + senderId.toString() + " ; User 2 : " + partnerID.toString() +"\n");
	paired.insert({ id1: senderId.toString(), id2: partnerId.toString() });
	paired.insert({ id1: partnerId.toString(), id2: senderId.toString() });
}
var pair = (senderId, gender, fav) => 
{
	mongodb.connect (url, (err, database) => 
	{
		let list = database.db ('cspheartsync');
		let collect = list.collection ('pending'); 
		collect.deleteOne (senderId.toString ());
		if (gender === 'male')
		{
			if (fav === 'male')
			{
				collect.count ({gender : 'male', favorite: 'male'}).then (count => 
				{
					if (count === 0)
					{
						collect.count ({gender : 'female', favorite: 'male'}).then (count => 
						{
							if (count === 0)
							{
								collect.insert({ _id: senderId.toString(), favorite: fav, gender: gender });
							}
							else
							{
								collect.find({ gender: 'female', favorite: 'male' }).limit(1).toArray((err, result) => 
								{
									let partnerId = result[0]._id;
									user_pair (senderId, partnerId);
								});
							}
						})
					}
					else
					{
						collect.find({ gender: gender, favorite: fav }).limit(1).toArray((err, result) => 
						{
							let partnerId = result[0]._id;
							user_pair (senderId, partnerId);
						});
					}
				});
			}	
		}
		if (gender === 'female')
		{

		}
	})
}
var pair2 = (senderId, gender, fav) => {
	if (fav != 'none') {
		if (fav === gender) {
			mongodb.connect(url, (err, db) => {
				let dbase = db.db('cspheartsync');
				let collect = dbase.collection('pending');
				collect.count({ gender: gender, favorite: fav }).then(count => {
					if (count < 2) {
						return sendMessage.sendTextMessage(senderId,"Oh noo :< Không có người nào onl rùi. Chờ xíu ha");
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
						return sendMessage.sendTextMessage(senderId,"Oh noo :< Không có người nào onl rùi. Chờ xíu ha");
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
