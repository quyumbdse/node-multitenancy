
const express = require('express');
const router = express.Router();
const tenantContl =  require('../controllers/tenantsController');
const checkAuth = require('../middleware/authentication');
const admin = require('../middleware/admin');

router.get('/', tenantContl.getAllTenants );

router.post('/', tenantContl.postTenant);

router.get('/:id', tenantContl.getSingleTenant);

router.patch('/:id', tenantContl.updateTenant);

router.delete('/:id', [checkAuth, admin], tenantContl.deleteTenant);

module.exports = router;