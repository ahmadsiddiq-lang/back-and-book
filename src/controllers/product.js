const productModels = require('../models/product');
const bcrypt = require('bcrypt-nodejs');

module.exports = {
    getProduct: (req,res)=>{
        productModels.getProduct()
        .then(result=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    },

    insertProduct: (req,res)=>{
        req.body['image'] = `http://54.157.227.216:4000/upload/${req.file.filename}`;
        productModels.InsertProduct(req.body)
        .then(result=>{
            req.body['id_product'] = result.insertId
            res.json(req.body)
        }).catch(err=>console.log(err))
    },
    updateProduct: (req,res)=>{
        productModels.updateProduct(req.body, req.params.id_product)
        .then(result=>{
            req.body['id_product'] = req.params.id_product
            res.json(req.body)
        }).catch(err=>console.log(err))
    },
    deleteProduct: (req,res)=>{
        productModels.deleteProduct(req.params.id_product)
        .then(result=>{
            result['id_product'] = req.params.id_product
            res.json(result)
        }).catch(err=>console.log(err))
    },
    detailProduct: (req,res)=>{
        productModels.detailProduct(req.params.id_product)
        .then(result=>{
            res.json(result)
        }).catch(err=>console.log(err))
    },
    searcProduct: (req,res)=>{
        productModels.searcProduct(req.params.name)
        .then(result=>{
            res.json(result)
        }).catch(err=>console.log(err))
    },

    pagination: (req,res)=>{
        const page = req.params.page;
        const pages = 2;
        let offset = page > 1 ? (page*pages)-page : 0;
        productModels.countProduct()
        .then(count => {
            pageCount = Math.ceil(count[0].total/pages);
            productModels.pagination(offset, pages)
            .then(result=>{
                res.json({
                    page: page,
                    pages: pages,
                    Total: pageCount,
                    data: result
                })
            }).catch(err => console.log(err))
        })
    },
    Sort: (req,res)=>{
        const dataName = req.params.name;
        productModels.sort(dataName)
        .then(result => {
            res.json(result)
        }).catch(err => console.log(err))
    },
    getCart: (req,res)=>{
        productModels.getCart()
        .then(result => {
            res.json(result)
        }).catch(err => console.log(err))
    },
    addToCart: (req,res)=>{
        productModels.addToCart(req.body)
        .then(result => {
            data['id_cart']= result.insertId
            res.json(data)
        }).catch(err => console.log(err))
    },
    deleteCart: (req,res)=>{
        const id_cart = req.body;
        productModels.deleteCart(id_cart)
        .then(result => {
            res.json(result)
        }).catch(err => console.log(err))
    },
    order: (req,res)=>{
        const {total_price, stock, id_product} = req.body;
        productModels.order(total_price, stock, id_product)
        .then(result => {
            res.json(result)
        }).catch(err => console.log(err))
    },
    register: (req,res)=>{
        let salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(req.body.password, salt)
        req.body['password'] = password
        productModels.register(req.body)
        .then(result => {
            res.json(result)
        }).catch(err => console.log(err))
    },
    login: (req,res)=>{
        // email only
        productModels.login(req.body.email)
        .then(result => {
            const password = bcrypt.compareSync(req.body.password,result[0].password)
            if(password === true){
                res.json('Login Success')
            }else{
                res.json('Password Wrong')
            }
        }).catch(err => console.log(err))
    },
}