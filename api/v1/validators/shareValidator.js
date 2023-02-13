const db = require('../../utils/db')
const promise = require('bluebird')
const joi = require('joi')
const joiValidator = require('../../utils/joiValidator')

class userValidator {
    async getAlluserDataValidator(body) {
        console.log(body)
        try {
            let schema = joi.object().keys({
                Firstname: joi.string().required(),
                Lastname: joi.string().required(),
                Username: joi.string().required(),
                Birthdate: joi.date().required(),
                City: joi.string().required(),                
                Gender: joi.string().required(),
                Phone: joi.string().required(),
                Email: joi.string().email().required(),
                Password: joi.string().required()
            
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
           }
        }

    
    async validateSignupForm(body) {
        console.log(body)
        try {
            let schema = joi.object().keys({
                firstname: joi.string().required(),
                lastname: joi.string().required(),
                username: joi.string().required(),
                email: joi.string().email().required(),
                password: joi.string().required(),
                birthdate: joi.date().required(),
                city: joi.string().required(),                
                gender: joi.string().required(),
                phone: joi.string().required(),
                bankname: joi.string().required(),
                broker: joi.string().required(),
                payment_method: joi.string().required(),
                fund: joi.number().required(),
                user_type: joi.string().required(),
                // c_time : joi.default(Date())
            
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
           }
        }
        async updateAlluserDataValidator(body) {
            try {
                let schema = joi.object().keys({
                first_name: joi.string().optional(),
                last_name:joi.string().optional(),
                gender: joi.string().optional(),
                email: joi.string().required(),
                password: joi.string().required()
                      })
                await joiValidator.validateJoiSchema(body, schema);
            } catch (error) {
                return promise.reject(error)
            }
        }

        async validateChnagePasswordForm(body) {
            try {
                let schema = joi.object().keys({
                    old_password: joi.string().required(),
                    new_password: joi.string().required(),
                    id: joi.number().required()
                })
                await joiValidator.validateJoiSchema(body, schema);
            } catch (error) {
                return promise.reject(error)
            }
        }  

        async validateOldPassword(db_password, body_password) {
            try {
                if (db_password != body_password) {
                    throw 'INCORRECT_OLD_PASSWORD'
                }
                return true
            } catch (error) {
                return promise.reject(error)
            }
        }


        async validateSigninForm(body) {
            try {
                let schema = joi.object().keys({
                    email:joi.string().required(),
                    password: joi.string().required()
                })
                await joiValidator.validateJoiSchema(body, schema);
            } catch (error) {
                return promise.reject(error)
            }
        }

        async isUserWithEmailExist(body, throw_error_for_exists) {
            try {
                let selectParams = '*',
                    where = `email='${body.email}'`,
                    user = await db.select('user', selectParams, where)
                if (throw_error_for_exists) {
                    if (user.length > 0) {
                        throw 'USER_WITH_EMAIL_ALREADY_EXISTS'
                    } else {
                        return true
                    }
                } 
                    if (user.length > 0) {
                            return user[0]
                    } else {
                        throw 'USER_WITH_EMAIL_NOT_FOUND'
                    }
                
            } catch (error) {
                return promise.reject(error)
            }
        }

        async validatePassword(db_password, body_password) {
            try {
                if (db_password != body_password) {
                    throw 'INCORRECT_PASSWORD'
                }
                return true
            } catch (error) {
                return promise.reject(error)
            }
        }

        async buyStockValidation(body){
            try{
                let schema = joi.object().keys({
                    user_id : joi.number().required(),
                    company_id : joi.number().required(),
                    stock_buy_price : joi.number().required(),
                    stock_quantity  : joi.number().required(),
                    stock_sell_price: joi.number().required(),
                    stock_current_price: joi.number().required(),
                    total : joi.number().required(),
                    // fund : joi.number().required()
                    // c_time : joi.date()  
                })
                await joiValidator.validateJoiSchema(body,schema)
            }catch(error){
                return promise.reject(error)
        }
        }
      
        async sellstockValidation(body){
            try{
                let schema = joi.object().keys({
                    user_id : joi.number().required(),
                    company_id : joi.number().required(),
                    stock_buy_price : joi.number().required(),
                    stock_quantity  : joi.number().required(),
                    stock_sell_price: joi.number().required(),
                    stock_current_price: joi.number().required(),
                    total : joi.number().required(),
                    // fund : joi.number().required()
                    // c_time : joi.date()  
                })
                await joiValidator.validateJoiSchema(body,schema)
            }catch(error){
                return promise.reject(error)
        }
        }

        async userPLValidation(body){
            try{
                let schema = joi.object().keys({
                    user_id : joi.number().required(),
                })
                await joiValidator.validateJoiSchema(body,schema)
            }catch(error){
                return promise.reject(error)
            }
        }
      
       /* async deleteAlluserDataValidator(body) {
            try {
                let schema = joi.object().keys({
                   
                first_name: joi.string().optional(),
                last_name:joi.string().optional(),
                gender: joi.string().optional(),
                email: joi.string().required(),
                password: joi.string().required()
                })
                await joiValidator.validateJoiSchema(body, schema);
            } catch (error) {
                return promise.reject(error)
            }
        }
    
    */

        async getuserProfile(id) {
            try {
            let where = `id = ${id}`,
                    selectParams = '*',
                    user = await db.select('user', selectParams, where)
                return user
            } catch (err){
                console.log(`there was an error ${err}`) 
                }
        }
    

    }
    module.exports = new userValidator()














    





