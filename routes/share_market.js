const express = require('express');
const router = express.Router();
// const checkauth = require('../api/utils/checkauth'); 
// const upload = require('../api/utils/uploads')
const headerValidator = require('../api/utils/headersValidator')

const shareController = require('../api/v1/controllers/shareController')



/******************************** all user API ******************************* */
//add user data signup API
router.post('/signup', shareController.signup);
//signin API
router.post('/signin', shareController.signin);
//get all user API
router.get('/getuser', shareController.getuser);
//get all transaction API
router.get('/getTransaction', shareController.getTransaction);
//get all company API
router.get('/getCompany', shareController.getCompany);
//update user API
router.put('/updateUser/:id', shareController.updateUser);
//get buy stock API
router.post('/buystock/:id', shareController.buystock);
//sell stock API
router.post('/sellstock/:id', shareController.sellstock);
//sell update API
// router.put('/update/:id', shareController.Update)
//get userpl
router.get('/userpl', shareController.userpl);
//get limited transaction
router.get('/limitedTransaction', shareController.limitedTransaction);


module.exports = router;