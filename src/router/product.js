const express = require('express');
const Router = express();
const multer = require('multer');
const path = require('path');
const ProductController = require('../controllers/product');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './upload');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString().replace(/:/g,'-')+file.originalname);
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
    .post('/insert', upload.single('image'), ProductController.insertProduct)
    .patch('/update/:id_product', ProductController.updateProduct)
    .delete('/delete/:id_product', ProductController.deleteProduct)
    .get('/detail/:id_product', ProductController.detailProduct)
    .get('/searc/:name', ProductController.searcProduct)
    .get('/pagination/:page', ProductController.pagination)
    .post('/sort/:name', ProductController.Sort)
    .get('/getcart', ProductController.getCart)
    .post('/cart', ProductController.addToCart)
    .delete('/deletecart', ProductController.deleteCart)
    .post('/order', ProductController.order)
    .post('/register', ProductController.register)
    .get('/login', ProductController.login);

module.exports = Router;