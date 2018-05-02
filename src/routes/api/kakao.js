const express = require("express");
const router = express.Router();

// 읽기
router.get("/:target_column/:user_query", (req, res) => {
    res.render('index');
});

module.exports = router;