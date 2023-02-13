const promise = require('bluebird')
const joi = require('@hapi/joi')
const joivalidator = require('./../../utils/joivalidator')



class UserAuthValidator{

    async validateRegisterForm(body){
        try{
            let schema = joi.object().keys({
                name : joi.string().required(),
                email:  joi.string().required(),
                phone:  joi.number().required(),
                bankname:  joi.string().required(),
                broker:  joi.string().required(),
                payment_method :  joi.string().required(),
                password:  joi.string().required(),
                fund : joi.number().required()
            })
            await joivalidator.validateJoiSchema(body,schema)
        }catch(error){
            return promise.reject(error)
    }
    }

    async buyStockValidation(body){
        try{
            let schema = joi.object().keys({
                user_id : joi.number().required(),
                company_id : joi.number().required(),
                company_name : joi.string().required(),
                stock_buy_price : joi.number().required(),
                stock_sell_price: joi.number(),
                company_stock_name : joi.string().required(),
                stock_quantity  : joi.number().required(),
                total : joi.number().required(),
                c_time : joi.date()
            })
            await joivalidator.validateJoiSchema(body,schema)
        }catch(error){
            return promise.reject(error)
    }
    }

    async transactions(body){
        try{
            let schema = joi.object().keys({
                transaction_id : joi.number().required(),
                user_id : joi.number().required(),
                company_id : joi.number().required(),
                company_name : joi.string().required(),
                stock_name:joi.string().required(),
                stock_buy_price : joi.number().required(),
                stock_selling_price : joi.number(),
                stock_current_price : joi.number(),
                Date : joi.date().required()
            })
            await joivalidator.validateJoiSchema(body,schema)
        }catch(error){
            return promise.reject(error)
        }
    }

    async sellStockValidation(body){
        try{
            let schema = joi.object().keys({
                user_id : joi.number().required(),
                company_id : joi.number().required(),
                company_name : joi.string().required(),
                stock_buy_price : joi.number(),
                stock_sell_price: joi.number().required(),
                company_stock_name : joi.string().required(),
                stock_quantity  : joi.number().required(),
                total : joi.number().required(),
                c_time : joi.date()
            })
            await joivalidator.validateJoiSchema(body,schema)
        }catch(error){
            return promise.reject(error)
        }
    }

    async userPLValidation(body){
        try{
            let schema = joi.object().keys({
                user_id : joi.number().required(),
            })
            await joivalidator.validateJoiSchema(body,schema)
        }catch(error){
            return promise.reject(error)
        }
    }


    
}
module.exports=new UserAuthValidator()