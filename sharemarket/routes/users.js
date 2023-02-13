var express = require('express');
const { route } = require('.');
var router = express.Router();
const shareController = require("./../api/v1/controllers/shareControllers")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post("/registerUser",shareController.registerUser)
router.post("/buyStock",shareController.buyStock)
router.post("/sellStock",shareController.sellStock)
router.get("/getAlltransactions",shareController.getAlltransactions)
router.get("/userPL",shareController.userPL)
router.get("/limitedTransaction",shareController.limitedTransaction)

module.exports = router;
