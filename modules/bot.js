let checkincovers = require('./database/checkUser/checkinguser');
class asyncBot {
    reply(senderId, textInput) {
        async(() => {
            let incovers = await checkincovers.checkincovers(senderId);
            if (incovers === 0){
                //Pair
            }
            if(incovers===1){
                //Send tin nhắn đã send
            }
            if(incovers===2){
                //tìm partyner
            }
        })()
    }
}
module.exports = new asyncBot();