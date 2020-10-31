const jwt = require('jsonwebtoken')

module.exports ={
    
    async logged(req, res, next){
        const auth = req.headers.token ? req.headers.token: req.body.token
        
        const token = auth.split(' ')
        
        jwt.verify(token[1], process.env.SECRET, (err)=>{
            
            if(err != null){
                
                return res.status(401).json({msg: 'Unauthorization'})
            }

            next()
        })    
    
}
        
}