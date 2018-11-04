const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productsController');
const checkAuth = require('../middleware/authentication');


router.get('/', productCtrl.getAllProducts);

router.post('/',productCtrl.createProduct);

router.get('/:id', productCtrl.getSingleProduct);

router.patch('/:id', productCtrl.updateProduct);

router.delete('/:id', productCtrl.deleteProduct);

module.exports = router;