const express = require('express');
const Router = express();
const multer = require('multer');
const path = require('path');
const auth = require('../helpers/auth');
const ProductController = require('../controllers/product');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './upload');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString().replace(/:/g,'-')+file.originalname.replace(/\s/g,'-'));
    }
});

const upload = multer({
    storage: storage,
    fileFilter : (req, file, cb)=>{
    const ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== 'jpeg'){
      return cb(new Error('Only images are allowed'))
    }
    cb(null, true)
  },
    limits: {
        fileSize: 1024 * 1024
    }
})



Router
    .get('/', ProductController.getProduct)
    .post('/insert',auth.verify, upload.single('image'), ProductController.insertProduct)
    .patch('/update/product',auth.verify, ProductController.updateProduct)
    .patch('/update/stock',auth.verify, ProductController.updateStockProduct)
    .delete('/delete/:id_product',auth.verify, ProductController.deleteProduct)
    .get('/detail/:id_product', ProductController.detailProduct)
    .get('/searc/:name', ProductController.searcProduct)
    .get('/pagination/:page',auth.verify, ProductController.pagination)
    .post('/sort/:name',auth.verify, ProductController.Sort)
    .get('/getcart', ProductController.getCart)
    .post('/cart',auth.verify, ProductController.addToCart)
    .post('/update/cart',auth.verify, ProductController.updateCart)
    .delete('/deletecart/:id_cart',auth.verify, ProductController.deleteCart)
    .delete('/deleteall/cart',auth.verify, ProductController.deleteAllCart)
    .post('/order',auth.verify, ProductController.order)
    .post('/register', ProductController.register)
    .post('/login', ProductController.login)
    .get('/verify', auth.verify, ProductController.verifyLogin)
    .get('/logout',auth.verify, ProductController.logout)
    .post('/income/day', ProductController.incomeInDay)
    .post('/income/year', ProductController.incomeInYear)
    .post('/orders/total', ProductController.orderTotal);

module.exports = Router;