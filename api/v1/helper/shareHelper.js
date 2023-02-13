const promise = require('bluebird')
const { request } = require('express')
const dateHelper = require('../../utils/dateHelper')
const db = require('../../utils/db')


class userHelper {
    async getuser(body){
        try{
            let selectParams = '*'
            let table = 'user'
            let stock  = await db.select(table, selectParams)
            return stock
        }catch(err){
            console.log(`there was an error ${err}`);
        }
    }

    async getTransaction(body){
        try{
            let selectParams = '*'
            let table = 'transactions'
            let stock  = await db.select(table, selectParams)
            return stock
        }catch(err){
            console.log(`there was an error ${err}`);
        }
    }

    async getCompany(body){
        try{
            let selectParams = '*'
            let table = 'company'
            let stock  = await db.select(table, selectParams)
            return stock
        }catch(err){
            console.log(`there was an error ${err}`);
        }
    }

    async buystock(body, id){
        try{
            let data =  {
                user_id : body.user_id,
                company_id : body.company_id,
                stock_buy_price : body.stock_buy_price,
                stock_quantity  : body.stock_quantity,
                stock_sell_price: body.stock_sell_price,
                stock_current_price: body.stock_current_price,
                total : body.total,
            }
           const table = 'transactions'
           let stock = await db.insert(table, data)
            const where = `id = ${id}`
            let user = await db.select (`user WHERE id = ${id}`, 'fund' )
            console.log(user)
            const dat = {
                fund : `${user[0].fund} `-` ${body.total}`
            }
            let sql = await db.update('user', where, dat)
            return sql
        }catch(err){
            console.log(`there was an error ${err}`);
        }
    }

    async sellstock(body, id){
        try{
            let data =  {
                user_id : body.user_id,
                company_id : body.company_id,
                stock_buy_price : body.stock_buy_price,
                stock_quantity  : body.stock_quantity,
                stock_sell_price: body.stock_sell_price,
                stock_current_price: body.stock_current_price,
                total : body.total,
            }
           const table = 'transactions'
           let stock = await db.insert(table, data)
            const where = `id = ${id}`
            let user = await db.select (`user WHERE id = ${id}`, 'fund' )
            console.log(user)
            const dat = {
                fund : `${user[0].fund} `+` ${body.total}`
            }
            let sql = await db.update('user', where, dat)
            return sql
        }catch(err){
            console.log(`there was an error ${err}`);
        }
    }

    async userpl(body){
        try{
            let user = await db.select (`user WHERE id = ${body.user_id}`, 'fund')
            const fundAmount = user[0].fund
            const finalresult = 500000 - fundAmount
            return (finalresult*-1)
        }catch(err){
            console.log(`there was an error ${err}`);
        }
    }    

    async limitedTransaction(body){
        try{
            let {page, size} = body;
            if(!page){
                page = 1;
            }
            if(!size){
                size = 1;
            }
            const limit = parseInt(body.size);
            const skip = (body.page - 1) * body.size;
            let user = await db.select (`user LIMIT ${limit} OFFSET ${skip}`, '*')
            return user
        }catch(err){
            console.log(`there was an error ${err}`);
        }
    }

    async updateUser(body, id){
        try{
            const table = 'user'
            const condition = `id = ${id}`
            const user = await db.update(table, condition, body)
            return body
    }catch (err){
            console.log(`there was an error ${err}`) 
            }
}


    // async Deleteuser(body,id){
    //     try{
    //       const table = 'user'
    //       const condition = `id = ${id}`
    //       const user = await db.delete(table, condition)
    //       return user
          // let sql = `DELETE FROM user WHERE User_id = ${id}`;
          // console.log(sql)
          // let user = await db.query(sql, [body])
          // if (user.length<1){
          //     throw 'USER_NOT_FOUND'
          // }else{
          //     return user[0];
          // }
    //     }catch(err){
    //         console.log(`there was an error ${err}`);
    //     }
    // }

   


// async insertAlluserData(body) {
//     try {
//         var data = {
//             first_name: joi.string().optional(),
//             last_name:joi.string().optional(),
//             gender: joi.number().precision(3).optional(),
//             email: joi.string().required(),
//             password: joi.string().required()
//         }
//         let result = await db.insert('facebook', data)
//         var resultData = { "user_id": result }
//         return resultData

//     } catch (error) {
//         throw error
//     }
// }

// async updateAlluserData(body, id){
//     try{
//         const table = 'user'
//         const condition = `User_id = ${id}`
//         const user = await db.update(table, condition, body)
//         return body
//    }catch (err){
//         console.log(`there was an error ${err}`) 
//         }
// }

// async deleteAlluserData(body, id){
//     try{
//         const table = 'user'
//         const condition = `User_id = ${id}`
//         const user = await db.delete(table, condition)
//         return user
//    }catch (err){
//         console.log(`there was an error ${err}`) 
//         }
// }


// async getuserProfile(id) {
//     try {
//         let where = `id = ${id}`,
//             selectParams = '*',
//             table = 'user'
//             user = await db.select(table, selectParams, where)
//         return user
//     } catch (err){
//         console.log(`there was an error ${err}`) 
//         }
// }

// async getuserProfile(id) {
//     try {
//     let where = `id = ${id}`,
//             selectParams = '*',
//             user = await db.select('user', selectParams, where)
//         return user
//     } catch (err){
//         console.log(`there was an error ${err}`) 
//         }
// }

// async changePassword(body,id) {
//     try {
//         let data = {
//             Password: body.new_password,
//             // modified_date: dateHelper.getCurrentTimeStamp()
//         }
//             where = `id=${id}`
//             table = 'user'
//         let result= await db.update(table, where, data)
//         console.log("change password", result)
//         return true
//     } catch (err){
//         console.log(`there was an error ${err}`) 
//         }
// }


// async changePassword(body) {
//     try {
//         let data = {
//             Password: body.new_password,
//             //modified_date: dateHelper.getFormattedDate()
//         },
//             where = `id=${body.id}`
//         let result= await db.update('user', where, data)
//         console.log('change password' , result)
//         return true
//     } catch (error) {
//         console.log(error)
//         return promise.reject(error)
//     }

// }

/*async updateAlluserData(body) {
    try {
        var data = {
            first_name: joi.string().optional(),
            last_name:joi.string().optional(),
            gender: joi.number().precision(3).optional(),
            email: joi.string().required(),
            password: joi.string().required()
        }
        let result = await db.update('facebook', data)
     var resultData = { "user_id": result }
        return resultData

    } catch (error) {
        throw error
    }
}*/



/*async updateAlluserData(body) {
        try {
            //let condition = `user_id = ${body.user_id}`,
                data = {
           
                    created_date: dateHelper.getFormattedDate(),
                    modified_date: dateHelper.getFormattedDate()
                }
            let result = await db.update('facebook', condition, data)
            return result
        } catch (error) {
            throw(error)
        }
    }*/

    
    
   /* async deleteAlluserData(body) {
            try {
                let where = ` user_id = ${body.book_id} `;
                let data = await db.delete('facebook', where)
                console.log('delete success'.data);
                return data
            } catch (error) {
                throw error
            }
        }
        */

}
module.exports = new userHelper()


























