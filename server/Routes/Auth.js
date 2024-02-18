
import express from 'express';
import db from "../db.js";

const router = express.Router();
router.post('/signup', (req, res) => {
    const { email, password, username } = req.body;
    db.query('INSERT INTO user (username,email, password) VALUES (?, ?, ?)', [username, email, password], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password], (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        if (result.length > 0) {
            res.send(result);
        } else {
            res.status(500).send({ message: "Wrong email/password combination!" });
        }
    });
});

export default router;
