let checkincovers = require('./database/checkUser/checkinconversUser'),
    getPartner = require('./database/partner/getPartner'),
    pending = require('./database/pair/pending'),
    sendMessage = require('./api/facebookAPI/sendMessage'),
    postInfoUser = require('./database/postInfoUser/index');
class asyncBot {
    reply(senderId, textInput) {
        async(() => {
            let incovers = await (checkincovers.checkincovers(senderId));
            if (incovers === 0) {
                sendMessage.sendTextMessage(senderId,"Đang thả câu <3");
                pending.pending(senderId);
            }
            if (incovers === 1) {
                sendMessage.sendTextMessage(senderId,"Bạn đã yêu cầu rồi. Vui lòng chờ để tìm người bạn phù hợp nhất nhá");
            }
            if (incovers === 2) {
                let partnerId = await (getPartner.getPartner(senderId));
                sendMessage.sendTextMessage(partnerId,textInput);
            }
        })()
    }
    get_started(senderId){
        postInfoUser.postInfoUser(senderId);
        sendMessage.sendTextMessage(senderId,"Chào bạn <3");
    }
}
module.exports = new asyncBot();