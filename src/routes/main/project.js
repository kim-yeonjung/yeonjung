const express = require("express");
const router = express.Router();
const fs = require('fs');

const title = "YeonJung Kim - 프로젝트";

router.get("/", function (req, res) {
    let projectList = [];
    fs.readdirSync('./../../../resource/project/post').forEach(file => {
        let temp = {
            'title': file.split('-')[2].replace('.md', ''),
            'index': file.split('-')[0],
            'src': file.split('-')[1]
        };
        projectList.push(temp);
    });
    res.render('basic_layout', {title: title, page: 'project/project_list', data: projectList, active_index: 2});
});

module.exports = router;