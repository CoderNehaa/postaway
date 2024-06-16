import jwt from "jsonwebtoken";


const jwtAuth = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(token);
    
    if(!token){
        return res.status(401).send('Unauthorized');
    }   

    try{
        const payload = jwt.verify(token, "pi0ubpUcs2JFH17dPd7unDpIq1fyupQz");
        req.userId = payload.userId
    } catch (err){
        console.log(err);
    }

    next();
    
}


export default jwtAuth;