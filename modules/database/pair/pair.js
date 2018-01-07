var mongodb = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017',
    sendMessage = require('../../api/facebookAPI/sendMessage'),
    pairr = require('../resUser/pairr'),
    pair_log = require('../history'),
    checkPairCount=require('../checkUser/checkPaircount');
var user_pair = (senderId, partnerId, collect, list) => {
    collect.deleteOne({
        _id: partnerId.toString()
    }, (err, obj) => {
        let paired = list.collection('paired');
        pairr.pairr(senderId)
            .then(a => {
                pairr.pairr(partnerId)
                    .then(b => {
                        var objinsert = [{
                            id1: senderId.toString(),
                            id2: partnerId.toString()
                        },
                        {
                            id1: partnerId.toString(),
                            id2: senderId.toString()
                        }
                        ]
                        paired.insertMany(objinsert, (err, res) => {
                            if (err) throw (err);          
                            checkPairCount.checkPairCount(senderId).then(senderCount=>{
                                checkPairCount.checkPairCount(partnerId).then(partnerCount=>{
                                            list.collection('users').update({_id:senderId.toString()},{$set:{pair_count:senderCount+1}},(err,x)=>{
                                                list.collection('users').update({_id:partnerId.toString()},{$set:{pair_count:partnerCount+1}},(err,y)=>{
                                                    sendMessage.sendBotMessageWithPromise(senderId,"Đã có một người được kết nối với bạn","Chúc hai bạn nói chuyện vui vẻ nha").then(a=>{
                                                      sendMessage.sendBotMessageWithPromise(partnerId, "Đã có một người được kết nối với bạn", "Chúc hai bạn nói chuyện vui vẻ nha").then(b=>{pair_log.pair_log(senderId,partnerId)})
                                                })
                                            })
                                    })
                                })
                            })                

                        })
                    })
            })

    });
}
var pair = (senderId, gender, fav) => {
    mongodb.connect(url, (err, database) => {
        let list = database.db('cspheartsync');
        let collect = list.collection('pending');
        collect.deleteOne({
            _id: senderId.toString()
        }, (err, obj) => {
            if (err) throw err;
            if (gender === 'male') {
                if (fav === 'male') {
                    collect.count({
                        gender: 'male',
                        favorite: 'male'
                    }).then(
                        count => {
                            if (count === 0) // found no (male; male) - (male; male) match
                            {
                                collect.count({
                                    gender: 'male',
                                    favorite: 'none'
                                }).then(
                                    count => {
                                        if (count === 0) // No match found, reinsert user to database
                                        {
                                            collect.insert({
                                                _id: senderId.toString(),
                                                favorite: fav,
                                                gender: gender
                                            }, (err, result) => {
                                                return 'unmatched'
                                            });
                                        } else // (male; male) - (male; none) match found
                                        {
                                            collect.find({
                                                gender: 'male',
                                                favorite: 'none'
                                            }).limit(1).toArray(
                                                (err, result) => {
                                                    let partnerId = result[0]._id;
                                                    user_pair(senderId, partnerId, collect, list);
                                                    return 'matched'
                                                }
                                                );
                                        }
                                    }
                                    )
                            } else // (male; male) - (male; male) match found
                            {
                                collect.find({
                                    gender: 'male',
                                    favorite: 'male'
                                }).limit(1).toArray(
                                    (err, result) => {
                                        let partnerId = result[0]._id;
                                        user_pair(senderId, partnerId, collect, list);
                                    }
                                    );
                            }
                        }
                        );
                } else if (fav === 'female') {
                    collect.count({
                        gender: 'female',
                        favorite: 'male'
                    }).then(
                        count => {
                            if (count === 0) // found no (male; female) - (female; male) match
                            {
                                collect.count({
                                    gender: 'female',
                                    favorite: 'none'
                                }).then(
                                    count => {
                                        if (count === 0) // No match found, reinsert user to database
                                        {
                                            collect.insert({
                                                _id: senderId.toString(),
                                                favorite: fav,
                                                gender: gender
                                            });
                                        } else // (male; female) - (female; none) match found
                                        {
                                            collect.find({
                                                gender: 'female',
                                                favorite: 'none'
                                            }).limit(1).toArray(
                                                (err, result) => {
                                                    let partnerId = result[0]._id;
                                                    user_pair(senderId, partnerId, collect, list);
                                                }
                                                );
                                        }
                                    }
                                    )
                            } else // (male; female) - (female; male) match found
                            {
                                collect.find({
                                    gender: 'female',
                                    favorite: 'male'
                                }).limit(1).toArray(
                                    (err, result) => {
                                        let partnerId = result[0]._id;
                                        user_pair(senderId, partnerId, collect, list);
                                    }
                                    );
                            }
                        }
                        );
                } else if (fav === 'none') {
                    collect.count({
                        favorite: 'male'
                    }).then(
                        count => {
                            if (count === 0) // found no user with male preference
                            {
                                collect.count({
                                    favorite: 'none'
                                }).then(
                                    count => {
                                        if (count === 0) // No match found, reinsert user to database
                                        {
                                            collect.insert({
                                                _id: senderId.toString(),
                                                favorite: fav,
                                                gender: gender
                                            });
                                        } else // (male; none) - (x; none) match found
                                        {
                                            collect.find({
                                                favorite: 'none'
                                            }).limit(1).toArray(
                                                (err, result) => {
                                                    let partnerId = result[0]._id;
                                                    user_pair(senderId, partnerId, collect, list);
                                                }
                                                );
                                        }
                                    }
                                    )
                            } else // (male; none) - (x; male) match found
                            {
                                collect.find({
                                    favorite: 'male'
                                }).limit(1).toArray(
                                    (err, result) => {
                                        let partnerId = result[0]._id;
                                        user_pair(senderId, partnerId, collect, list);
                                    }
                                    );
                            }
                        }
                        );
                }
            }

            if (gender === 'female') {
                if (fav === 'male') {
                    collect.count({
                        gender: 'male',
                        favorite: 'female'
                    }).then(
                        count => {
                            if (count === 0) // found no (female; male) - (male; female) match
                            {
                                collect.count({
                                    gender: 'male',
                                    favorite: 'none'
                                }).then(
                                    count => {
                                        if (count === 0) // No match found, reinsert user to database
                                        {
                                            collect.insert({
                                                _id: senderId.toString(),
                                                favorite: fav,
                                                gender: gender
                                            });
                                        } else // (female; male) - (male; none) match found
                                        {
                                            collect.find({
                                                gender: 'male',
                                                favorite: 'none'
                                            }).limit(1).toArray(
                                                (err, result) => {
                                                    let partnerId = result[0]._id;
                                                    user_pair(senderId, partnerId, collect, list);
                                                }
                                                );
                                        }
                                    }
                                    )
                            } else // (female; male) - (male; female) match found
                            {
                                collect.find({
                                    gender: 'male',
                                    favorite: 'male'
                                }).limit(1).toArray(
                                    (err, result) => {
                                        let partnerId = result[0]._id;
                                        user_pair(senderId, partnerId, collect, list);
                                    }
                                    );
                            }
                        }
                        );
                } else if (fav === 'female') {
                    collect.count({
                        gender: 'female',
                        favorite: 'female'
                    }).then(
                        count => {
                            if (count === 0) // found no (female; female) - (female; female) match
                            {
                                collect.count({
                                    gender: 'female',
                                    favorite: 'none'
                                }).then(
                                    count => {
                                        if (count === 0) // No match found, reinsert user to database
                                        {
                                            collect.insert({
                                                _id: senderId.toString(),
                                                favorite: fav,
                                                gender: gender
                                            });
                                        } else // (male; female) - (female; none) match found
                                        {
                                            collect.find({
                                                gender: 'female',
                                                favorite: 'none'
                                            }).limit(1).toArray(
                                                (err, result) => {
                                                    let partnerId = result[0]._id;
                                                    user_pair(senderId, partnerId, collect, list);
                                                }
                                                );
                                        }
                                    }
                                    )
                            } else // (female; female) - (female; female) match found
                            {
                                collect.find({
                                    gender: 'female',
                                    favorite: 'female'
                                }).limit(1).toArray(
                                    (err, result) => {
                                        let partnerId = result[0]._id;
                                        user_pair(senderId, partnerId, collect, list);
                                    }
                                    );
                            }
                        }
                        );
                } else if (fav === 'none') {
                    collect.count({
                        favorite: 'female'
                    }).then(
                        count => {
                            if (count === 0) // found no user with female preference
                            {
                                collect.count({
                                    favorite: 'none'
                                }).then(
                                    count => {
                                        if (count === 0) // No match found, reinsert user to database
                                        {
                                            collect.insert({
                                                _id: senderId.toString(),
                                                favorite: fav,
                                                gender: gender
                                            });
                                        } else // (female; none) - (x; none) match found
                                        {
                                            collect.find({
                                                favorite: 'none'
                                            }).limit(1).toArray(
                                                (err, result) => {
                                                    let partnerId = result[0]._id;
                                                    user_pair(senderId, partnerId, collect, list);
                                                }
                                                );
                                        }
                                    }
                                    )
                            } else // (female; none) - (x; female) match found
                            {
                                collect.find({
                                    favorite: 'female'
                                }).limit(1).toArray(
                                    (err, result) => {
                                        let partnerId = result[0]._id;
                                        user_pair(senderId, partnerId, collect, list);
                                    }
                                    );
                            }
                        }
                        );
                }
            }
        });

    })
}
module.exports = {
    pair: pair
}