const shareHelper = require('../helper/shareHelper')
const shareValidator = require('../validators/shareValidator')
const responseHelper = require('../../utils/responseHelper')
const codeHelper = require('../../utils/codeHelper')
const bcrypt = require('bcrypt');
const saltRounds = 10;//
const DB= require('../../utils/db');
const { user } = require('../../utils/config');

class userController {

    async signup(req, res) {
        try {            
            console.log("SignUp Req ::: ",req.body);
            await shareValidator.validateSignupForm(req.body)
            // await bcrypt.hash(req.body.password, saltRounds, (err, hash)=>{
            //     req.body.password = hash;
                const table = 'user'
               DB.insert(table, req.body)
            // })
            responseHelper.success(res, 'SIGNUP_SUCCESS', req.headers.language, {username: req.body.username })
        }catch(error){
            console.log(error)
            responseHelper.error(res,error,req.headers.language);
            // res.send(error)
        }
    }

    async signin(req,res){
        try{
            await shareValidator.validateSigninForm(req.body)
            let token,
                user = await shareValidator.isUserWithEmailExist(req.body, false)
            await shareValidator.validatePassword(user.password, req.body.password)
            // await bcrypt.compare(user.password, req.body.password)
            if (user) {
                token = await codeHelper.getJwtToken(user.firstname)
            } 
            // responseHelper.success(res, 'SIGNIN_SUCCESS', req.headers.language, user, { auth_token: token })
            responseHelper.success(res, 'SIGNIN_SUCCESS', req.headers.language, {username: user.username, auth_token: token })
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

 async getuser(req, res){
        try{
            let users = await shareHelper.getuser(req.body)
            responseHelper.success(res, 'GET_USER_SUCCESS', req.headers.language, users)
        }catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async buystock(req, res){
        try{
            let id = req.params.id;
            await shareValidator.buyStockValidation(req.body);
            let users = await shareHelper.buystock(req.body,id)
            responseHelper.success(res, 'GET_USER_SUCCESS', req.headers.language, users)
        }catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async sellstock(req, res){
        try{
            let id = req.params.id;
            await shareValidator.sellstockValidation(req.body);
            let users = await shareHelper.sellstock(req.body,id)
            responseHelper.success(res, 'GET_USER_SUCCESS', req.headers.language, users)
        }catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async getTransaction(req, res){
        try{
            let users = await shareHelper.getTransaction(req.body)
            responseHelper.success(res, 'GET_USER_SUCCESS', req.headers.language, users)
        }catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }    

    async getCompany(req, res){
        try{
            let users = await shareHelper.getCompany(req.body)
            responseHelper.success(res, 'GET_USER_SUCCESS', req.headers.language, users)
        }catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }    

    async userpl(req,res){
        try{
            await shareValidator.userPLValidation(req.body);
            let users = await shareHelper.userpl(req.body)
            responseHelper.success(res, 'GET_USER_SUCCESS', req.headers.language, users)
        }catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async limitedTransaction(req,res){
        try{
            // let us = await DB.select('user', '*');
            let users = await shareHelper.limitedTransaction(req.body);
            responseHelper.success(res, 'GET_USER_SUCCESS', req.headers.language, users)
        }catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async updateUser(req, res){
        try{
            let id = req.params.id;
            await shareValidator.validateSignupForm(req.body);
            let users = await shareHelper.updateUser(req.body,id)
            responseHelper.success(res, 'EDIT_USER_SUCCESS', req.headers.language, users)
        }catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }   
    
    async Update(req, res){
        try{
            let id = req.params.id;
            // await shareValidator.buyStockValidation(req.body);
            let users = await shareHelper.Update(req.body,id)
            responseHelper.success(res, 'GET_USER_SUCCESS', req.headers.language, users)
        }catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }


    async getUserPage(req,res){
        try{
            let {page, size} =req.query;
            if (!page){
                page =1;
            }
            if (!size){
                size =1;
            }
            const limit = parseInt(size);
            const skip = (page - 1) * size;
            // let users = await userHelper.getuser(req.body)
            let user = await DB.select ('user', '*')
            let us = await DB.select (`user LIMIT ${limit} OFFSET ${skip}`, '*')
            responseHelper.success(res, 'GET_SIGNUPUSER_SUCCESS', req.headers.language, { total: user.length, page_no: page, size:us.length, users:us  })
        }catch(error){
            console.log(error)
            responseHelper.error(res,error,req.headers.language);
        }
    }
   

    async Deleteuser(req, res){
        try{
            let id = req.params.id;
            let users = await userHelper.Deleteuser(req.body,id)
            responseHelper.success(res, 'DELETE_USER_SUCCESS', req.headers.language, users)
        }catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

        
        

        
     

    async changePassword(req, res)
    {
       try {
        // let id = req.params.id;
           await userValidator.validateChnagePasswordForm(req.body)
           let user = await userHelper.getuserProfile(req.body.id)
           await userValidator.validateOldPassword(user.Password, req.body.old_Password)
           await userHelper.changePassword(req.body)
           responseHelper.success(res, 'CHANGE_PASSWORD_SUCCESS', req.headers.language,user)
       } catch (error) {
           console.log(error)
           responseHelper.error(res, error, req.headers.language, {})
       }
   }




}       
module.exports = new userController()