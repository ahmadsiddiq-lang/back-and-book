require('dotenv').config();
const connecting = require('../config/db');

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
    deleteProduct: (id_product)=>{
        return new Promise((resolve, reject)=>{
            connecting.query('DELETE FROM product WHERE id_product = ?',id_product, (err, result)=>{
                if(!err){
                    resolve(result);
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
    addToCart: (data, stock, id_product)=>{
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
            connecting.query(`DELETE FROM cart WHERE ?`,id_cart, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        })
    },
    order: (total_price, stock, id_product)=>{
        return new Promise((resolve, reject)=>{
            connecting.query(`INSERT history SET total_price =  ?`,total_price, (err, result)=>{
                if(!err){
                    resolve(result);
                    connecting.query(`UPDATE product SET stock = stock-${stock} WHERE id_product =${id_product}`, (err, result)=>{
                        if(!err){
                            resolve(result);
                        }else{
                            reject(err);
                        }
                    })
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

}