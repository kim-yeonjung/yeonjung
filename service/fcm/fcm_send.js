let serverKey = process.env.FCM_SERVER_KEY;
let FCM = require('fcm-push');
let fcm = new FCM(serverKey);

let message = {
    to: '/topics/app_topic',
    collapse_key: '0',
    notification: {
        title: 'Title default',
        body: 'body default'
    },
    time_to_live: 14400 // 4시간
};

exports.sendFCM = function (channel, notificationTitle, notificationBody) {
    let topicKey = 'channel_notice';
    let type = '';
    if (channel.includes('MORNING')) {
        topicKey = 'channel_feed_morning';
        type = 'morning';
    } else if (channel.includes('EVENING')) {
        topicKey = 'channel_feed_evening';
        type = 'evening';
    } else if (channel.includes('QUICK')) {
        topicKey = 'channel_feed_quickly';
        type = 'quick';
    }

    message.notification.title = notificationTitle;
    message.notification.body = notificationBody;
    message.collapse_key = type;
    message.to = '/topics/' + topicKey;

    if ((process.env.MAINTAIN_MODE).toUpperCase() === 'NO') {
        fcm.send(message, function (err, response) {
            if (err) {
                console.log(type + " FCM   : ", err);
            } else {
                console.log(type + " FCM   : ", response);
                console.log(type + " FCM   : ", message.notification.title);
                console.log(type + " FCM   : ", message.notification.body);
            }
        });
    }
};