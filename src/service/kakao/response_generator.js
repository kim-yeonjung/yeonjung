let message = {};

message.rootMenu = ['최근 오픈 기록', '모든 오픈 기록', '계좌번호', '홈페이지'];

message.textType = (text) => {
    return {
        message: {
            text: text,
        },
        keyboard: {
            type: 'buttons',
            buttons: message.rootMenu
        }
    };
};

message.photoType = (text, imgSrc, label, buttonUrl) => {
    return {
        "message": {
            "text": text,
            "photo": {
                "url": imgSrc,
                "width": 1920,
                "height": 1080
            },
            "message_button": {
                "label": label,
                "url": buttonUrl
            }
        },
        "keyboard": {
            "type": "buttons",
            "buttons": message.rootMenu
        }
    };
};

message.buttonType = (text, label, buttonUrl) => {
    return {
        "message": {
            "text": text,
            "message_button": {
                "label": label,
                "url": buttonUrl
            }
        }, "keyboard": {
            "type": "buttons",
            "buttons": message.rootMenu
        }
    };
};

message.textWithSubMenuType = (text, type, subMenu) => {
    return {
        "message": {
            "text": text,
        },
        "keyboard": {
            "type": "buttons",
            "buttons": subMenu
        }
    };
};

module.exports = message;