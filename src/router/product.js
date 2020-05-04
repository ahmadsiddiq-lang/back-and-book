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
    .get('/', auth.verify, ProductController.getProduct)
    .post('/insert', upload.single('image'), ProductController.insertProduct)
    .patch('/update/product', ProductController.updateProduct)
    .patch('/update/stock', ProductController.updateStockProduct)
    .delete('/delete/:id_product', ProductController.deleteProduct)
    .get('/detail/:id_product', ProductController.detailProduct)
    .get('/searc/:name', ProductController.searcProduct)
    .get('/pagination/:page', ProductController.pagination)
    .post('/sort/:name', ProductController.Sort)
    .get('/getcart', ProductController.getCart)
    .post('/cart', ProductController.addToCart)
    .post('/update/cart', ProductController.updateCart)
    .delete('/deletecart/:id_cart', ProductController.deleteCart)
    .delete('/deleteall/cart', ProductController.deleteAllCart)
    .post('/order', ProductController.order)
    .post('/register', ProductController.register)
    .post('/login', ProductController.login)
    .get('/verify', auth.verify, ProductController.verifyLogin)
    .get('/logout', ProductController.logout)
    .post('/income/day', ProductController.incomeInDay)
    .post('/income/year', ProductController.incomeInYear)
    .post('/orders/total', ProductController.orderTotal);

module.exports = Router;