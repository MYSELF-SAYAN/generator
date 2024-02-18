import express from 'express';
import db from "../db.js";

const router = express.Router();
router.get('/:email', (req, res) => {
    const { email } = req.params;
    db.query('SELECT prompts FROM prompts_code WHERE email = ?', [email], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error fetching prompts");
        } else {
            res.send(result);
        }
    });
});
router.post('/add', (req, res) => {
    const { email, prompt } = req.body;
    db.query('INSERT INTO prompts_code (email,prompts) VALUES (?, ?)', [email, prompt], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error adding prompt");
        } else {
            res.send(result);
            console.log("prompt added");
        }
    });
});

export default router;
