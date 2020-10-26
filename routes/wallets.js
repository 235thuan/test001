let router = require('express').Router();
let walletController = require('../controller/walletController');

router.route('/create')
    .post(walletController.createWallet);
router.route('/update')
    .post(walletController.updateWallet);
module.exports = router;


