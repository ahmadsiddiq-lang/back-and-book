const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports ={
    verify : (req,res, next)=>{
        // console.log(req.session.token)
        try{
            token = req.session.token;
            const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
            req.token = decoded
            // console.log(req.token)
            next();
        }catch(err){
            // console.log(err)
            res.json({
                messege:'token infalid'
            })
        }
    }
}