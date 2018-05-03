const express = require("express");
const router = express.Router();

// 최초 접근
router.get("/keyboard", (req, res) => {
    return res.status(200).json({
        "type": "buttons",
        "buttons": [
            "최근 오픈 기록",
            "모든 오픈 기록",
            "홈페이지",
            "계좌번호"
        ]
    });
});

// 메시지
router.get("/friend", (req, res) => {
    return res.status(200);
});

// 친구 추가/제거
router.get("/friend", (req, res) => {
    return res.status(200);
});

// 채팅방 나가기
router.get("/chat_room/:user_key", (req, res) => {
    return res.status(200);
});


module.exports = router;