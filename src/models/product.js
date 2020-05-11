require('dotenv').config();
const connecting = require('../config/db');
const fs = require('fs');

module.exports = {
    getProduct: ()=>{
        return new Promise((resolve, reject)=>{
            connecting.query('SELECT * FROM product', (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        })
    },
    InsertProduct: (data)=>{
        return new Promise((resolve, reject)=>{
            connecting.query('INSERT product SET ?',data, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        })
    },
    updateProduct: (data,id_product)=>{
        return new Promise((resolve, reject)=>{
            connecting.query('UPDATE product SET ? WHERE id_product = ?',[data,id_product], (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        })
    },
    updateStockProduct: (data,id_product)=>{
        return new Promise((resolve, reject)=>{
            connecting.query('UPDATE product SET stock = stock - ? WHERE id_product = ?',[data,id_product], (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        })
    },
    deleteProduct: (id_product, image)=>{
        return new Promise((resolve, reject)=>{
            connecting.query('DELETE FROM product WHERE id_product = ?',id_product, (err, result)=>{
                if(!err){
                    resolve(result);
                    const path = image.replace('http://54.164.243.82:4000', '.')
                    fs.unlink(path, function (err) {
                        if (err) throw err;
                        return
                      });
                }else{
                    reject(err);
                }
            })
        })
    },
    detailProduct: (id_product)=>{
        return new Promise((resolve, reject)=>{
            connecting.query('SELECT * FROM product WHERE id_product = ?',id_product, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        })
    },
    searcProduct: (data)=>{
        return new Promise((resolve, reject)=>{
            connecting.query(`SELECT * FROM product WHERE product_name LIKE '%${data}%'`, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        })
    },
    pagination: (page,pages)=>{
        return new Promise((resolve, reject)=>{
            connecting.query(`SELECT * FROM product LIMIT ${page+','+pages}`, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        })
    },
    countProduct: ()=>{
        return new Promise((resolve, reject)=>{
            connecting.query(`SELECT COUNT(*) AS total FROM product`, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        })
    },
    sort: (data)=>{
        return new Promise((resolve, reject)=>{
            connecting.query(`SELECT * FROM product ORDER BY ${data}`, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        })
    },
    getCart: ()=>{
        return new Promise((resolve, reject)=>{
            connecting.query(`SELECT * FROM cart`, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        })
    },
    addToCart: (data)=>{
        return new Promise((resolve, reject)=>{
            connecting.query(`INSERT cart SET ?`,data, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        });
    },
    deleteCart: (id_cart)=>{
        return new Promise((resolve, reject)=>{
            connecting.query(`DELETE FROM cart WHERE id_cart = ?`,id_cart, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        })
    },
    deleteAllCart: ()=>{
        return new Promise((resolve, reject)=>{
            connecting.query(`DELETE FROM cart`, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        })
    },
    updateCart: (data,id_cart)=>{
        return new Promise((resolve, reject)=>{
            connecting.query(`UPDATE cart SET ? WHERE id_cart = ?`,[data,id_cart], (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        })
    },
    order: (data)=>{
        return new Promise((resolve, reject)=>{
            connecting.query(`INSERT history SET ?`,data, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        })
    },
    register: (data)=>{
        return new Promise((resolve, reject)=>{
            connecting.query(`INSERT users SET ?`,data, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        })
    },
    login: (email)=>{
        return new Promise((resolve, reject)=>{
            connecting.query(`SELECT * FROM users WHERE email = ?`,email, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        })
    },
    incomeInDay: (date)=>{
        return new Promise((resolve, reject)=>{
            connecting.query(`SELECT SUM(total_price) AS total FROM history WHERE date_added = '${date}'`, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        })
    },
    incomeInYear: (year)=>{
        return new Promise((resolve, reject)=>{
            connecting.query(`SELECT YEAR(date_added) AS tahun, SUM(total_price) AS total FROM history WHERE YEAR(date_added)= '${year}' GROUP BY YEAR(date_added)`, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        })
    },
    orderTotal: (lastweek,newdate)=>{
        return new Promise((resolve, reject)=>{
            connecting.query(`SELECT COUNT(*) AS orders FROM history WHERE date_added BETWEEN '${lastweek}' AND '${newdate}'`, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        })
    },

}