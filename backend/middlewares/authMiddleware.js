const jwt = require ('jsonwebtoken')

function authMiddleware(req, res, next){

const authHeader = req.headers['authorization'];

const token = authHeader && authHeader.split(' ')[1];

if(!token) return res.status(401).json({error: "Token mancante o non valido"})

jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if(err) return res.status(403).json({error: "Token non valido o scaduto"})

        console.log("Token ricevuto:", token);

    

     req.user = user;
     
     next();


})
} 
module.exports = authMiddleware;