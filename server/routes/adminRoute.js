const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

// Auth
// router.post('/register', adminController.register); Endpoint disabled.
router.post('/login', adminController.login);

router.get('/', adminController.homepage);
router.get('/about', adminController.about);
router.get('/add', adminController.addInvestor);
router.post('/add', adminController.postInvestor);
router.get('/view/:id', adminController.view);
router.get('/edit/:id', adminController.edit);
router.put('/edit/:id', adminController.editPost);
router.delete('/edit/:id', adminController.deleteInvestor);

router.post('/search', adminController.searchInvestors);

module.exports = router;
