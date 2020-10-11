const jwt = require('jsonwebtoken');
const express = require("express");
const db = require('../util/database');
const router = express.Router();
const Jimp = require('jimp');
const jwtKey = "My KEy Shhhhh";
const jwtExpirySeconds = 300;
var verifyToken;

router.get('/', (req, res) => {
    res.redirect("/login");
});

// login user :-o
router.post('/login', (req, res) => {
    // var sess = req.session;
    // sess.uid = username;
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(401).send("not verified");
    } else {
        db.execute('SELECT user_id FROM user WHERE user_id = ? AND password = ?', [username, password])
            .then(([users]) => {
                if (users.length == 0) {
                    return res.status(401).send("user not verified");
                } else {
                    const token = jwt.sign({ username }, jwtKey, {
                        algorithm: 'HS256',
                        expiresIn: jwtExpirySeconds
                    })
                    // set cookie value with timeout(maxAge) 
                    res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 })
                    res.status(200).send(token);
                }
            }).catch(err => console.log(err));
    }

});

// after login user can access this functionality. Otherwise throw error :-/
router.post('/user', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send("not verified");
    }

    try {
        verifyToken = jwt.verify(token, jwtKey);
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).send("not verified");
        } else {
            return res.status(400).send("bad request");
        }
    }

    const { choice } = req.body;
    // 1. create survey(By current user) 2. view(of any user) 3.take(by current user) 4.result

    if (!choice) {
        res.status(400).send(`data missing`);
    }
    else {
        var sendOrnot = false;
        choice.forEach(element => {

            // 1 insert survey question
            if (element.no == 1) {
                if (!element.question) {
                    res.status(400).send(`invalid syntax`);
                } else {
                    sendOrnot = true;
                    db.execute(`INSERT INTO survey(user_id,question) VALUES(?,?)`, [verifyToken.username, element.question])
                        .catch(err => console.log(err));
                }
            }
            // 2 show survey questions (of any user) 
            else if (element.no == 2) {
                if (!element.username) {
                    res.status(400).send(`invalid syntax`);
                } else {
                    var user_view = element.username;
                    res.redirect(`viewsurvey/${user_view}`);
                }
            }
            // 3 Survey answers
            else if (element.no == 3) {
                if (!element.surveyId || !element.answer) {
                    res.status(400).send(`invalid syntax`);
                } else {
                    sendOrnot = true;
                    var ser_id = element.surveyId;
                    db.execute('INSERT INTO surveyanswer(survey_id,answer,by_user_id) VALUES(?,?,?)', [ser_id, element.answer, verifyToken.username])
                        .catch(err => res.status(400).send(`something went wrong ${err}`));
                }
            }
            // 4 View Answer (current user's only) 
            else if (element.no == 4) {
                db.execute('SELECT s1.survey_id,s1.question,s2.answer,s2.by_user_id,s2.on_date FROM survey s1 JOIN surveyanswer s2 ON s1.survey_id=s2.survey_id WHERE s1.user_id=? ORDER BY `s2`.`on_date` DESC', [verifyToken.username])
                    .then(([data]) => {
                        res.status(200).send(data);
                    }).catch(err => res.status(400).send(`something went wrong ${err}`));
            }
        });
        if (sendOrnot) {
            res.status(200).send(`changes made by ${verifyToken.username} !`);
        }
    }
});

router.get('/viewsurvey/:user_view', (req, res) => {
    var user_name = req.params.user_view;
    // console.log(user_name); 
    db.execute('SELECT  * FROM survey WHERE user_id=?', [user_name])
        .then(([data]) => {
            res.status(200).send(data);
        }).catch(err => res.status(400).send(err));
});

// Extra Task :-)
router.post('/imageDownloader', (req, res) => {
    if (!req.body) {
        res.status(400).send(`invalid syntax`);
    }
    else {
        const { imgURL } = req.body;
        async function resize() {
            const image = await Jimp.read(imgURL);
            await image.resize(50, 50);
            var cdate = Date.now();
            await image.writeAsync(`image/${cdate}_50x50.png`);
            res.status(200).send(`Thumbnail Created with ${cdate}.png`);
        }
        resize();
    }
});

exports.routes = router;