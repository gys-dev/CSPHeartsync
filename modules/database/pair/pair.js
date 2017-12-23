var mongodb = require('mongodb').MongoClient,
	url = 'mongodb://localhost:27017',
	sendMessage = require('../../api/facebookAPI/sendMessage');
/* Todo
	fix user_pairing function to work in case of mongodb.insert being asycn
*/
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
				collect.count ({gender : 'male', favorite: 'male'}).then 
				(
					count => 
					{
						if (count === 0) // found no (male; male) - (male; male) match
						{
							collect.count ({gender : 'male', favorite: 'none'}).then 
							(
								count => 
								{
									if (count === 0) // No match found, reinsert user to database
									{
										collect.insert({ _id: senderId.toString(), favorite: fav, gender: gender });
									}
									else // (male; male) - (male; none) match found
									{
										collect.find({ gender: 'male', favorite: 'none' }).limit(1).toArray
										(
											(err, result) => 
											{
												let partnerId = result[0]._id;
												user_pair (senderId, partnerId);
											}
										);
									}
								}
							)
						}
						else // (male; male) - (male; male) match found
						{
							collect.find({ gender: 'male', favorite: 'male'}).limit(1).toArray
							(
								(err, result) => 
								{
									let partnerId = result[0]._id;
									user_pair (senderId, partnerId);
								}
							);
						}
					}
				);
			}
			else if (fav === 'female')
			{
				collect.count({gender: 'female', favorite: 'male'}).then
				(
					count => 
					{
						if (count === 0) // found no (male; female) - (female; male) match
						{
							collect.count({gender: 'female', favorite: 'none'}).then
							(
								count => 
								{
									if (count === 0) // No match found, reinsert user to database
									{
										collect.insert({_id: senderId.toString(),favorite: fav, gender: gender});
									} 
									else // (male; female) - (female; none) match found
									{
										collect.find({gender: 'female', favorite: 'none'}).limit(1).toArray
										(
											(err, result) => 
											{
												let partnerId = result[0]._id;
												user_pair(senderId, partnerId);
											}
										);
									}
								}
							)
						} 
						else // (male; female) - (female; male) match found
						{
							collect.find({gender: 'female', favorite: 'male'}).limit(1).toArray
							(
								(err, result) => 
								{
									let partnerId = result[0]._id;
									user_pair(senderId, partnerId);
								}
							);
						}
					}
				);
			}
			else if (fav === 'none')
			{
				collect.count({favorite: 'male'}).then
				(
					count => {
						if (count === 0) // found no user with male preference
						{
							collect.count({favorite: 'none'}).then
							(
								count => 
								{
									if (count === 0) // No match found, reinsert user to database
									{
										collect.insert({_id: senderId.toString(),favorite: fav,gender: gender});
									} 
									else // (male; none) - (x; none) match found
									{
										collect.find({favorite: 'none'}).limit(1).toArray
										(
											(err, result) => 
											{
												let partnerId = result[0]._id;
												user_pair(senderId, partnerId);
											}
										);
									}
								}
							)
						} 
						else // (male; none) - (x; male) match found
						{
							collect.find({favorite: 'male'}).limit(1).toArray
							(
								(err, result) => 
								{
									let partnerId = result[0]._id;
									user_pair(senderId, partnerId);
								}
							);
						}
					}
				);
			}
		}
		if (gender === 'female')
		{
			if (fav === 'male') 
			{
				collect.count({gender: 'male',favorite: 'female'}).then
				(
					count => 
					{
						if (count === 0) // found no (female; male) - (male; female) match
						{
							collect.count({gender: 'male',favorite: 'none'}).then
							(
								count => 
								{
									if (count === 0) // No match found, reinsert user to database
									{
										collect.insert({_id: senderId.toString(),favorite: fav,gender: gender});
									} 
									else // (female; male) - (male; none) match found
									{
										collect.find({gender: 'male',favorite: 'none'}).limit(1).toArray
										(
											(err, result) => 
											{
												let partnerId = result[0]._id;
												user_pair(senderId, partnerId);
											}
										);
									}
								}
							)
						} else // (female; male) - (male; female) match found
						{
							collect.find({gender: 'male',favorite: 'male'}).limit(1).toArray
							(
								(err, result) => 
								{
									let partnerId = result[0]._id;
									user_pair(senderId, partnerId);
								}
							);
						}
					}
				);
			} 
			else if (fav === 'female') 
			{
				collect.count({gender: 'female',favorite: 'female'}).then
				(
					count => 
					{
						if (count === 0) // found no (female; female) - (female; female) match
						{
							collect.count({gender: 'female',favorite: 'none'}).then
							(
								count => 
								{
									if (count === 0) // No match found, reinsert user to database
									{
										collect.insert({_id: senderId.toString(),favorite: fav,gender: gender});
									} 
									else // (male; female) - (female; none) match found
									{
										collect.find({gender: 'female',favorite: 'none'}).limit(1).toArray
										(
											(err, result) => 
											{
												let partnerId = result[0]._id;
												user_pair(senderId, partnerId);
											}
										);
									}
								}
							)
						} 
						else // (female; female) - (female; female) match found
						{
							collect.find({gender: 'female',favorite: 'female'}).limit(1).toArray
							(
								(err, result) => 
								{
									let partnerId = result[0]._id;
									user_pair(senderId, partnerId);
								}
							);
						}
					}
				);
			} 
			else if (fav === 'none') 
			{
				collect.count({favorite: 'female'}).then
				(
					count => 
					{
						if (count === 0) // found no user with female preference
						{
							collect.count({favorite: 'none'}).then
							(
								count => 
								{
									if (count === 0) // No match found, reinsert user to database
									{
										collect.insert({_id: senderId.toString(),favorite: fav,gender: gender});
									} 
									else // (female; none) - (x; none) match found
									{
										collect.find({favorite: 'none'}).limit(1).toArray
										(
											(err, result) => 
											{
												let partnerId = result[0]._id;
												user_pair(senderId, partnerId);
											}
										);
									}
								}
							)
						} 
						else // (female; none) - (x; female) match found
						{
							collect.find({favorite: 'female'}).limit(1).toArray
							(
								(err, result) => 
								{
									let partnerId = result[0]._id;
									user_pair(senderId, partnerId);
								}
							);
						}
					}
				);
			}
		}
	})
}