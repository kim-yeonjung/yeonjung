const fs = require('fs');
let data = {
    "name": "YeonJung Kim",
    "job": "Student",
    "about": "컴퓨터정보공학부 3학년 재학 중에 있습니다.",
    "profile_image_src": "https://avatars3.githubusercontent.com/u/4367890?s=460&v=4",
    "contact": {
        "linkedin": "https://kr.linkedin.com/in/%EC%97%B0%EC%A4%91-%EA%B9%80-172989119",
        "github": "http://github.com/duswnd25",
        "mail": "duswnd25@gmail.com"
    },
    "basic_information": {
        "location": "광주광역시 / 경기도 부천",
        "email": "duswnd25@gmail.com",
        "website": "https://yeonjung.herokuapp.com",
        "blog": "https://kyeonjung.tistory.com",
        "nationality": "Korea Republic of"
    },
    "language": [
        {
            "title": "한국어",
            "level": "모국어"
        },
        {
            "title": "English",
            "level": "의사표현 / 문서 읽기"
        }
    ],
    "language_programming": [
        {
            "title": "Java",
            "description": "",
            "level": "Junior",
            "percentage": "40"
        },
        {
            "title": "Android",
            "description": "어플리케이션 제작 가능",
            "level": "Junior",
            "percentage": "40"
        },
        {
            "title": "Node.js & express",
            "description": "",
            "level": "Junior",
            "percentage": "25"
        }
    ],
    "education": [
        {
            "name": "가톨릭대학교",
            "description": "컴퓨터정보공학부",
            "start": "2014",
            "end": ""
        },
        {
            "name": "전남고등학교",
            "description": "고등학교",
            "start": "2011",
            "end": "2014"
        },
        {
            "name": "동명중학교",
            "description": "중학교",
            "start": "2008",
            "end": "2011"
        }
    ],
    "conference": [],
    "license": [],
    "career": [],
    "project": [],
    "award": []
};

function dateSort(a, b) {
    if (a.date === b.date) {
        return 0
    }
    return a.date > b.date ? -1 : 1;
}

exports.getData = function () {
    let projectList = [], awardList = [], careerList = [], licenseList = [], conferenceList = [];
    let path = '/../../resource/portfolio';

    // 프로젝트
    fs.readdirSync(__dirname + path + '/project').forEach(file => {
        projectList.push(require(__dirname + path + '/project/' + file));
    });

    // 수상
    fs.readdirSync(__dirname + path + '/award').forEach(file => {
        awardList.push(require(__dirname + path + '/award/' + file));
    });

    // 경력
    fs.readdirSync(__dirname + path + '/career').forEach(file => {
        careerList.push(require(__dirname + path + '/career/' + file));
    });

    // 자격증
    fs.readdirSync(__dirname + path + '/license').forEach(file => {
        licenseList.push(require(__dirname + path + '/license/' + file));
    });

    // 컨퍼런스
    fs.readdirSync(__dirname + path + '/conference').forEach(file => {
        conferenceList.push(require(__dirname + path + '/conference/' + file));
    });

    data.project = projectList.sort(dateSort);
    data.award = awardList.sort(dateSort);
    data.career = careerList.sort(dateSort);
    data.license = licenseList.sort(dateSort);
    data.conference = conferenceList.sort(dateSort);

    return data;
};