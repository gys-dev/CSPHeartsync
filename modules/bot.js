let checkincovers = require('./database/checkUser/checkinconversUser'),
    getPartner = require('./database/partner/getPartner'),
    pending = require('./database/pair/pending');
class asyncBot {
    reply(senderId, textInput) {
        async(() => {
            let incovers = await checkincovers.checkincovers(senderId);
            if (incovers === 0){
                pending.pending(senderId);
            }
            if(incovers===1){
                //Send tin nhắn đã send
            }
            if(incovers===2){
               let partnerId = await getPartner.getPartner(senderId);
                    //Gửi đến cho parner
            }
        })()
    }
}
module.exports = new asyncBot();