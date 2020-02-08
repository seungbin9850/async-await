const Post = require('../../models/post');

const writeOne = async (req, res) => {
    const { title, text } = req.body;
    const { name, username } = req.decoded;

    try {
        const post = await Post.create(name, title, text, username);
        res.status(200).json({
            message: "성공",
            post
        });
    }
    catch (err) {
        res.status(409).json({ message: err.message });
    }
}

const remove = async (req, res) => {
    try {
        const content = await Post.findOneByid(req.params._id);
        console.log(content);
        if (content.userId === req.decoded.username) {
            content.remove({ _id: req.params._id }, (err) => {
                if (err) res.status(500).json({ message: '실패' });
            });
            res.status(200).json({ message: "성공" });
        } else {
            res.status(409).json({ message: "실패" });
        }
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    } 
}

const read = async (req, res) => {
    try {
        const content = Post.findAll();
        res.status(200).json({
            content
        });
    }
    catch(err) {
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports = {
    writeOne,
    remove,
    read
}