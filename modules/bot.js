var checkincovers = require('./database/checkUser/checkinconversUser'),
    getPartner = require('./database/partner/getPartner'),
    pending = require('./database/pair/pending'),
    sendMessage = require('./api/facebookAPI/sendMessage'),
    postInfoUser = require('./database/postInfoUser/postInfoUser'),
    chooseFavorite = require('./database/chooseFavorite'),
    endChat = require('./database/endchat');
class asyncBot {
    reply(senderId, textInput) {
        textInput = textInput.toLowerCase();
        if (textInput === 'đổi giới tính') { sendMessage.sendButtonSelectGender(senderId) }
        else if (textInput === 'end chat') { endChat.endChat(senderId) }
        else {
            (async () => {
                let incovers = await (checkincovers.checkincovers(senderId));
                if (incovers == null) { sendMessage.sendTextMessage(senderId, "Vui lòng xóa tất cả inbox và thử lại") }
                if (incovers === 0) {
                    sendMessage.sendTextMessage(senderId, "Đang thả câu <3");
                    pending.pending(senderId);
                }
                if (incovers === 1) {
                    sendMessage.sendTextMessage(senderId, "Bạn đã yêu cầu rồi. Vui lòng chờ để tìm người bạn phù hợp nhất nhá");
                }
                if (incovers === 2) {
                    let partnerId = await (getPartner.getPartner(senderId));
                    sendMessage.sendTextMessage(partnerId, textInput);
                }
            })()
        }
    }
    get_started(senderId) {
        postInfoUser.postInfoUser(senderId);
        sendMessage.sendTextMessage(senderId, "Chào bạn <3");
    }

    procPostback(senderId, payload) {
        switch (payload) {
            case "GET_STARTED": {
                this.get_started(senderId);
                break;
            }
            case "SELECT_MALE": {
                this.select(senderId, 'male');
                break;
            }
            case "SELECT_FEMALE": {
                this.select(senderId, 'female');
                break;
            }
            case "SELECT_ANY": {
                this.select(senderId, 'none');
                break;
            }
            case "CHANGE_FAV":{
                sendMessage.sendButtonSelectGender(senderId)
                break;
            }
        }
    }
    select(senderId, gender) {
        (async () => {
            let res = await (chooseFavorite.chooseFavorite(senderId, gender));
            sendMessage.sendTextMessage(senderId, res);
        })()
    }
    procImage(senderId, payload) {
        (async () => {
            let incovers = await (checkincovers.checkincovers(senderId));
            if (incovers == null) { sendMessage.sendTextMessage(senderId, "Vui lòng xóa tất cả inbox và thử lại") }
            if (incovers === 0) {
                sendMessage.sendTextMessage(senderId, "Đang thả câu <3");
                pending.pending(senderId);
            }
            if (incovers === 1) {
                sendMessage.sendTextMessage(senderId, "Bạn đã yêu cầu rồi. Vui lòng chờ để tìm người bạn phù hợp nhất nhá");
            }
            if (incovers === 2) {
                let partnerId = await (getPartner.getPartner(senderId));
                sendMessage.sendImage(partnerId, payload);
            }
        })()
    }
    procVideo(senderId, payload) {
        (async () => {
            let incovers = await (checkincovers.checkincovers(senderId));
            if (incovers == null) { sendMessage.sendTextMessage(senderId, "Vui lòng xóa tất cả inbox và thử lại") }
            if (incovers === 0) {
                sendMessage.sendTextMessage(senderId, "Đang thả câu <3");
                pending.pending(senderId);
            }
            if (incovers === 1) {
                sendMessage.sendTextMessage(senderId, "Bạn đã yêu cầu rồi. Vui lòng chờ để tìm người bạn phù hợp nhất nhá");
            }
            if (incovers === 2) {
                let partnerId = await (getPartner.getPartner(senderId));
                sendMessage.sendVideo(partnerId, payload);
            }
        })()
    }
    procAudio(senderId, payload) {
        (async () => {
            let incovers = await (checkincovers.checkincovers(senderId));
            if (incovers == null) { sendMessage.sendTextMessage(senderId, "Vui lòng xóa tất cả inbox và thử lại") }
            if (incovers === 0) {
                sendMessage.sendTextMessage(senderId, "Đang thả câu <3");
                pending.pending(senderId);
            }
            if (incovers === 1) {
                sendMessage.sendTextMessage(senderId, "Bạn đã yêu cầu rồi. Vui lòng chờ để tìm người bạn phù hợp nhất nhá");
            }
            if (incovers === 2) {
                let partnerId = await (getPartner.getPartner(senderId));
                sendMessage.sendAudio(partnerId, payload);
            }
        })()
    }
}
module.exports = new asyncBot();