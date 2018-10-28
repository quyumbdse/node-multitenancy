

const express = require('express');
const router = express.Router();
const tenantContl =  require('../controllers/tenantController');

router.get('/', tenantContl.getAllTenants );

router.post('/', tenantContl.postTenant);

router.get('/:tenantId',);

module.exports = router;