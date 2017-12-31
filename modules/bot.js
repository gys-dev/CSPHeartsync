var checkincovers = require('./database/checkUser/checkinconversUser'),
    getPartner = require('./database/partner/getPartner'),
    pending = require('./database/pair/pending'),
    sendMessage = require('./api/facebookAPI/sendMessage'),
    postInfoUser = require('./database/postInfoUser/postInfoUser'),
    chooseFavorite = require('./database/chooseFavorite');
class asyncBot {
    reply(senderId, textInput) {
        textInput = textInput.toLowerCase();
        if (textInput === 'đổi giới tính') { sendMessage.sendButtonSelectGender(senderId) }
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
                chooseFavorite.chooseFavorite(senderId, 'male').then(res => {
                    sendMessage.sendTextMessage(senderId, "Hì. Bạn ghép đôi tiếp theo là trai nhá :D Hì");
                    break;
                })
            }
            case "SELECT_FEMALE": {
                chooseFavorite.chooseFavorite(senderId, 'female').then(res => {
                    sendMessage.sendTextMessage(senderId, "Hì. Bạn ghép đôi tiếp theo là nữ nhá :D Hì");
                    break;
                })
            }
            case "SELECT_ANY": {
                chooseFavorite.chooseFavorite(senderId, 'none').then(res => {
                    sendMessage.sendTextMessage(senderId, "Hì. Bạn ghép đôi tiếp theo là giới tính lạ không xác định được hihi :D");
                    break;
                })
            }
        }
    }
}
module.exports = new asyncBot();