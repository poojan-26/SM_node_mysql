const promise = require('bluebird');
const config = require('./config')
const mysql = require("mysql");
const { resource } = require('../../server');
const { reject } = require('bluebird');




let connection

class DB {
  
  async getConnection() {
    return new promise((resolve, reject) => {
      connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'stockmarket',
      });
      connection.connect((err) => {
        if (err) {
          console.error('error connecting: ' + err.stack)
          reject('Error while connectiong database !')
        }
        console.log(`connected`)
        resolve('Database Connected !')
      })
    })
  }

  registerUser (body) {
    return new promise ((resolve, reject) => {
      let query = `INSERT INTO users SET ? `
      console.log(query);
      connection.query(query, body, (error, results) => {
        if (error) {
          console.log(error)
          reject('DB_ERROR')
        } else {
          resolve(results)     
        }
      })
    })
  }              


        buyStock(body){
        return new promise ((resolve,reject)=>{ 
      
          let query = `INSERT INTO transactions SET ? `
          console.log(query);
          connection.query(query, body, (error, results) => {
            if (error) {
              console.log(error)
              reject('DB_ERROR')
            } else {
              resolve(results)     
              connection.query(`UPDATE users SET fund=fund-3500 WHERE user_id=1`,function(err,results){
                if(err){
                  reject("Error in Select authentication file")
              }else{
              console.log("=================================================");
            }
          }
        )}
      })
    }) 
}   

      sellStock(body){
        return new promise ((resolve,reject)=>{ 

          let query = `INSERT INTO transactions SET ? `
          console.log(query);
          connection.query(query, body, (error, results) => {
            if (error) {
              console.log(error)
              reject('DB_ERROR')
            } else {
              resolve(results)     
              connection.query(`UPDATE users SET fund = fund+40000 WHERE user_id=1`,function(err,results){
                if(err){
                  reject("Error in Select authentication file")
              }else{
              resolve({message:"You are in profit for the TATA Steel Stock"});
            }
          }
        )}
      })
    }) 
  }   

  getAlltransactions(body){
    return new promise ((resolve, reject) => {
    connection.query("SELECT * FROM transactions",[body], function (err, result) {
      if (err) {
        reject('Error in SELECT authenctication file')
      }else{
        resolve(result)
      }
    });
    })
}


userPL(body){
  return new promise ((resolve, reject) => {
    connection.query("SELECT fund FROM users",[body.user_id], function (err, result) {
      const fundAmount = result[0].fund;
      if (err) {
        reject('Error in SELECT authenctication file')
      }else{
        const finalresult = 500000 - fundAmount
        resolve(finalresult*-1)
       
        // resolve({message:"Your in profit or loss for the TATA STOCK" ,fundAmount})
      }
    });
    })    
  }



limitedTransaction (body){
  return new promise ((resolve, reject) => {
    connection.query("SELECT * FROM transactions",[body.limit],[body.skip], function (err, result) {
      if (err) {
        reject('Error in SELECT authenctication file')
      }else{
        resolve(result)
      }
    });
    })

}
}

    












module.exports= new DB();