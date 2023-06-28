import express from 'express';
import User from '../models/users.js';
import utils from '../utils.js';
const router = express.Router();
router.post('/register', async (req, res) => {
    try {
        const { email } = req.body;
        if (await User.findOne({ email }))
            return res.status(400).send({ error: 'User already exists with this email' });
        const user = await User.create(req.body);
        user.password = undefined;
        user.salt = undefined;
        return res.send({
            user,
            id: user.id,
            token: utils.generateToken({ id: user.id })
        });
    }
    catch (err) {
        return res.status(400).send({ error: `${err}` });
    }
});
router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).select('+password +salt');
        if (!user)
            return res.status(400).send({ error: 'User not found' });
        let isCorrectPassword = utils.authenticatePassword(password, user.password, user.salt);
        if (!isCorrectPassword)
            return res.status(400).send({ error: 'Invalid Password' });
        user.password = undefined;
        user.salt = undefined;
        return res.status(200).send({
            user,
            token: utils.generateToken({ id: user.id })
        });
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({ error: `${err}` });
    }
});
export default (app) => app.use('/user', router);
