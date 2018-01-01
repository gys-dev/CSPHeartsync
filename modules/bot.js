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
        else if (textInput === 'end chat' | textInput === 'end') { endChat.endChat(senderId) }
        else {
            (async () => {
                let incovers = await (checkincovers.checkincovers(senderId));
                if (incovers == null) { sendMessage.sendTextMessage(senderId, "Đã có lỗi xảy ra. Vui lòng xóa tất cả inbox và thử lại") }
                if (incovers === 0) {
                    sendMessage.sendTextMessage(senderId, "Đang tìm cặp cho bạn <3");
                    pending.pending(senderId);
                }
                if (incovers === 1) {
                    sendMessage.sendTextMessage(senderId, "Bạn vẫn đang ở trong hàng đợi. Vui lòng chờ thêm một lúc nữa nhé <3");
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
            sendMessage.sendBotMessage(senderId, res, "Cảm ơn bạn");
        })()
    }
    procImage(senderId, payload) {
        (async () => {
            let incovers = await (checkincovers.checkincovers(senderId));
            if (incovers == null) { sendMessage.sendTextMessage(senderId, "Đã có lỗi xảy ra. Vui lòng xóa tất cả inbox và thử lại") }
            if (incovers === 0) {
                sendMessage.sendTextMessage(senderId, "Đang tìm cặp cho bạn <3");
                pending.pending(senderId);
            }
            if (incovers === 1) {
                sendMessage.sendTextMessage(senderId, "Bạn vẫn đang ở trong hàng đợi. Vui lòng chờ thêm một lúc nữa nhé <3");
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
            if (incovers == null) { sendMessage.sendTextMessage(senderId, "Đã có lỗi xảy ra. Vui lòng xóa tất cả inbox và thử lại") }
            if (incovers === 0) {
                sendMessage.sendTextMessage(senderId, "Đang tìm cặp cho bạn <3");
                pending.pending(senderId);
            }
            if (incovers === 1) {
                sendMessage.sendTextMessage(senderId, "Bạn vẫn đang ở trong hàng đợi. Vui lòng chờ thêm một lúc nữa nhé <3");
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
            if (incovers == null) { sendMessage.sendTextMessage(senderId, "Đã có lỗi xảy ra. Vui lòng xóa tất cả inbox và thử lại") }
            if (incovers === 0) {
                sendMessage.sendTextMessage(senderId, "Đang tìm cặp cho bạn <3");
                pending.pending(senderId);
            }
            if (incovers === 1) {
                sendMessage.sendTextMessage(senderId, "Bạn vẫn đang ở trong hàng đợi. Vui lòng chờ thêm một lúc nữa nhé <3");
            }
            if (incovers === 2) {
                let partnerId = await (getPartner.getPartner(senderId));
                sendMessage.sendAudio(partnerId, payload);
            }
        })()
    }
}
module.exports = new asyncBot();