const db = require('../../utils/db')
const shareValidators = require("./../validators/shareValidators")
const responseHelper = require('../../utils/responseHelper');
const { post } = require('../../../routes');


class userAuth{

    async registerUser(req, res) {
        try {            
            console.log("Register User", req.body);
            await shareValidators.validateRegisterForm(req.body);

            await db.registerUser(req.body);

            responseHelper.success(res, 'REGISTER_SUCCESS', req.headers.language, { code: 1, message: 'Success', data: req.body })
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async buyStock(req, res) {
        try {            
            console.log("Buy Stock", req.body);
            await shareValidators.buyStockValidation(req.body);

            await db.buyStock(req.body);

            responseHelper.success(res, 'BUY_STOCK_SUCCESS', req.headers.language, { code: 1, message: 'Success', data: req.body })
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async sellStock(req, res) {
        try {            
            console.log("Sell Stock", req.body);
            await shareValidators.sellStockValidation(req.body);

            await db.sellStock(req.body);

            responseHelper.success(res, 'SELL_STOCK_SUCCESS', req.headers.language, { code: 1, message: 'Success', data: req.body })
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async getAlltransactions(req,res){
        try {            
            console.log("Get All Transactions", req.body);

            const transactions =  await db.getAlltransactions(req.body);

            responseHelper.success(res,'GET_ALL_TRANSACTIONS_SUCCESS', req.headers.language, { code: 1, message: 'Success', transactions })
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async userPL(req,res){
        try {            
            // console.log("User profit and loss", req.body);
            await shareValidators.userPLValidation(req.body);
            const transactions =  await db.userPL(req.body) 
            // const total = 500000 - transactions ;
            responseHelper.success(res,'USER_PROFIT_AND_LOSS', req.headers.language, { code: 1, message: 'Your profit and loss or the TATA Stock', transactions })
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async limitedTransaction(req,res){
        try {            
            // console.log("User profit and loss", req.body);
           
            const transactions =  await db.limitedTransaction(req.body) 
     
            responseHelper.success(res,'LIMITED_TRANSACTIONS_SUCCESS', req.headers.language, { code: 1, message: 'Your profit and loss or the TATA Stock', transactions })
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }


}

module.exports= new userAuth();