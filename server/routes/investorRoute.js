const express = require('express');
const router = express.Router();

const investorController = require('../controllers/investorController');

router.get('/', investorController.homepage);
router.get('/add', investorController.addInvestor);
router.post('/add', investorController.postInvestor);
router.get('/view/:id', investorController.view);
router.get('/edit/:id', investorController.edit);
router.put('/edit/:id', investorController.editPost);
router.delete('/edit/:id', investorController.deleteInvestor);

module.exports = router;
