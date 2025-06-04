const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieControllers');
const upload = require('../middlewares/multer');

//INDEX
router.get('/', movieController.index);

//SHOW
router.get('/:id', movieController.show);

//STORE
router.post('/', movieController.store);

//UPDATE
router.put('/:id', movieController.update);

//MODIFY
router.patch('/:id', movieController.modify);

//DESTROY
router.delete('/:id', movieController.destroy);

//STORE REVIEWS
router.post('/:id/reviews', movieController.reviewStore);

module.exports = router;