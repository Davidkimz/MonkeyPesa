const jwt = require("jsonwebtoken");
//Auth--Middleware function that ensures that a user is validated.
//(next) will run if a user exist in the database.

const ensureAuthenticated = (req, res, next) => {
    try {
        //const token = req.header("x-auth-token");
        const token = req.session.token;

        if(!token){

            return res
            .status(401)
            .render('../views/pages/login.ejs', res);
        }


        /*If there is a token. we verify the token(jwt.verify decodes the token: 
        giving the user info and ID and matches with the secret to ensure token hvent been tampered with)*/
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified){
            return res
        .status(401)
        .render('../views/pages/login.ejs', res);
        }
        

        req.user = verified.id;
        next();
    } catch(err){
        res.status(500).json({ error: err.message});
    }
};   



module.exports = ensureAuthenticated;
// module.exports = restrictTo