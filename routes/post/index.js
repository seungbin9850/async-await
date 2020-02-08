const router = require('express').Router();
const controller = require('./post');
const authMiddleware = require('../../middlewares/auth');

router.post('/', authMiddleware, controller.writeOne);
router.delete('/:_id', authMiddleware, controller.remove);
router.get('/', authMiddleware, controller.read);

module.exports = router;