const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');

router.get('/', workoutController.index);
router.get('/:id', workoutController.show);
router.post('/create', workoutController.create);
router.delete('/:id', workoutController.destroy);
router.patch('/:id', workoutController.update);

module.exports = router;