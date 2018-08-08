const fs = require('fs');
let data = {
    "name": "YeonJung Kim",
    "job": "Student",
    "profile_image_src": "https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-1/p240x240/20431252_1424912337594313_2648547940675637225_n.jpg?_nc_cat=0&oh=de4be995ce67b29973404317976ed333&oe=5C103DBB",
    "contact": {
        "linkedin": "https://kr.linkedin.com/in/%EC%97%B0%EC%A4%91-%EA%B9%80-172989119",
        "github": "http://github.com/duswnd25",
        "mail": "duswnd25@gmail.com"
    },
    "basic_information": {
        "location": "광주광역시 / 경기도 부천",
        "email": "duswnd25@gmail.com",
        "website": "https://yeonjung.herokuapp.com",
        "blog": "",
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
            "percentage": "30"
        },
        {
            "title": "Android",
            "description": "어플리케이션 제작 가능",
            "level": "Junior",
            "percentage": "35"
        },
        {
            "title": "Node.js & express",
            "description": "",
            "level": "Junior",
            "percentage": "25"
        }
    ],
    "about": "컴퓨터정보공학부 3학년 재학 중에 있습니다.",
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
    "career": [
        {
            "company": "Betdon",
            "role": "외주 개발자",
            "description": "에고소드 게임 서버, 관리자용 Dashboard 프로그램 개발 및 유지보수",
            "start": "2018.2",
            "end": "",
            "tech": [
                "Node.js", "HTML", "CSS", "heroku", "mongoDB", "Parse.com", "Bootstrap"
            ]
        },
        {
            "company": "GH International MERKEN",
            "role": "쇼핑몰 유지 보수 및 전산 담당",
            "description": "쇼핑몰 플랫폼 이전 및 유지/보수 각종 전산작업 담당",
            "start": "2017.10",
            "end": "",
            "tech": [
                "HTML", "CSS", "Javascript", "cafe24"
            ]
        },
        {
            "company": "제 11 기계화 보병사단",
            "role": "대한민국 육군 병장 만기 전역",
            "description": "중대 본부 정비반 장비수리부속공구보급병",
            "start": "2015.8",
            "end": "2017.5",
            "tech": [
                "장비수리부속공구보급", "특급전사"
            ]
        },
        {
            "company": "웰대리",
            "role": "메인 개발자",
            "description": "사회적 기업, 협동조합 모델을 통한 지속 발전 가능한 상생형 대리운전 시스템의 고객용, 기사용 Client 및 모니터링, 관리 프로그램 개발",
            "start": "2014",
            "end": "2015",
            "tech": [
                "Android", "HTML", "CSS", "Javascript", "Parse.com", "Bootstrap"
            ]
        }
    ],
    "activity": [
        {
            "title": "",
            "position": "",
            "description": ""
        }
    ],
    "project": [],
    "license": [
        {
            "title": "GTQ 2급",
            "organization": "한국생산성본부",
            "date": "2015"
        },
        {
            "title": "운전면허 1종 보통",
            "organization": "전남지방경찰청",
            "date": "2014"
        },
        {
            "title": "워드프로세서 1급",
            "organization": "대한상공회의소",
            "date": "2007"
        },
        {
            "title": "워드프로세서 2급",
            "organization": "대한상공회의소",
            "date": "2006"
        }
    ],
    "award": [
        {
            "title": "학술연구장학",
            "grade": "2위",
            "organization": "가톨릭대학교 컴퓨터정보공학부",
            "date": "2017"
        },
        {
            "title": "학습커뮤니티 우수 사례 선정",
            "grade": "",
            "organization": "가톨릭대학교",
            "date": "2017"
        },
        {
            "title": "학술제 창의소프트웨어 부문",
            "grade": "2위 (개인)",
            "organization": "가톨릭대학교 컴퓨터정보공학부",
            "date": "2017"
        },
        {
            "title": "대한민국 육군 특급전사 표창",
            "grade": "",
            "organization": "제 11기계화보병사단",
            "date": "2016"
        },
        {
            "title": "창업아이디어 공모전 인문사회 기술융합형",
            "grade": "우수상",
            "organization": "가톨릭대학교 창업대학",
            "date": "2014"
        },
        {
            "title": "학술제 창의소프트웨어 부문",
            "grade": "2위 (개인)",
            "organization": "가톨릭대학교 컴퓨터정보공학부",
            "date": "2014"
        },
        {
            "title": "동아리 활동 발표 대회",
            "grade": "은상",
            "organization": "전남고등학교",
            "date": "2012"
        },
        {
            "title": "과학, 정보 동아리 연구활동 발표대회",
            "grade": "3위",
            "organization": "전남고등학교",
            "date": "2012"
        },
        {
            "title": "과학탐구대회 로봇과학 부문",
            "grade": "1위",
            "organization": "광주동명중학교",
            "date": "2010"
        },
        {
            "title": "영재교육 창의적 산출물 발표대회",
            "grade": "1위",
            "organization": "광주광역시교육감",
            "date": "2009"
        },
        {
            "title": "광주학생명예헌장",
            "grade": "자랑스런 광주학생 표창",
            "organization": "2009",
            "date": "광주광역시교육감"
        },
        {
            "title": "대한민국 학생 창의력 올림피아드 광주 예선",
            "grade": "1위",
            "organization": "광주광역시교육감",
            "date": "2009"
        },
        {
            "title": "대한민국 학생 창의력 올림피아드 구조물 부문",
            "grade": "1위",
            "organization": "지식경제부장관",
            "date": "2009"
        },
        {
            "title": "대한민국 학생 창의력 올림피아드 즉석과제부문",
            "grade": "1위",
            "organization": "한국학교발명협회장",
            "date": "2009"
        }
    ]
};

exports.getData = function () {
    let projectList = [];
    fs.readdirSync(__dirname + './../project').forEach(file => {
        let data = require(__dirname + './../project/' + file);
        projectList.push(data);
    });
    data.project = projectList;
    console.log(data.project);
    return data;
};