const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { name, username, password } = req.body;
    try {
        let user = await User.findOneByUsername(username);
        if (user) {
            throw new Error('이미 있는 아이디');
        }
        user = await User.create(name, username, password);
        res.status(200).json({
            user
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    const secret = req.app.get('jwt-secret');
    try {
        let user = await User.findOneByUsername(username);
        if (!user) {
            throw new Error('로그인 실패');
        } else {
            if (user.verify(password)) {
                const token = jwt.sign({
                        _id: user._id,
                        name: user.name,
                        username: user.username,
                    },
                    secret,
                    {
                        expiresIn: '5m',
                    });
                res.status(200).json({
                    token
                });
            } else {
                throw new Error('로그인 실패');
            }
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    register,
    login
}